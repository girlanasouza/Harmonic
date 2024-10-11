import os
import psycopg2
import select
import time
from dotenv import load_dotenv
from psycopg2 import OperationalError, extensions
from recommendation import Recommendation  

# Load environment variables
load_dotenv()

# Database configuration
DATABASE_CONFIG = {
    'host': os.getenv("DATABASE_HOST"),
    'port': os.getenv("DATABASE_PORT"),
    'database': os.getenv("DATABASE"),
    'user': os.getenv("DATABASE_USER"),
    'password': os.getenv("DATABASE_PASSWORD")
}

CACHE_TIMEOUT = 3 
notification_cache = {}

def connect_to_database(config):
    """Establish a connection to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(**config)
        conn.set_isolation_level(extensions.ISOLATION_LEVEL_AUTOCOMMIT)
        return conn
    except OperationalError as e:
        print(f"Error connecting to database: {e}")
        raise

def execute_recommendation(user_id, is_new_user=True):
    """Execute recommendations based on the type of user."""
    try:
        recommendation = Recommendation(**DATABASE_CONFIG)
        if is_new_user:
            recommendation.recommend_for_new_users(user_id)
        else:
            recommendation.recommend_for_existing_users(user_id)
    finally:
        recommendation.close()

def listen_to_notifications(conn):
    """Listen for notifications on specified channels."""
    cur = conn.cursor()
    cur.execute("LISTEN new_user_created;")
    cur.execute("LISTEN new_song_added;")
    print("Waiting for notifications on channels 'new_user_created' and 'new_song_added'")
    
    while True:
        if select.select([conn], [], [], 5) == ([], [], []):
            continue
        else:
            conn.poll()
            while conn.notifies:
                notify = conn.notifies.pop(0)
                current_time = time.time()

                # Handle new user creation notification
                if notify.channel == 'new_user_created':
                    print(f"Received NOTIFY on 'new_user_created': {notify.payload}")
                    user_id = notify.payload
                    execute_recommendation(user_id, is_new_user=True)
                    notification_cache[user_id] = current_time
                    print(f"Recommendation for new user '{notify.payload}' finished")

                # Handle new song added notification
                elif notify.channel == 'new_song_added':
                    user_id = notify.payload
                    if user_id in notification_cache:
                        last_time = notification_cache[user_id]
                        if current_time - last_time < CACHE_TIMEOUT:
                            print(f"Ignoring duplicate notification for user '{user_id}' within {CACHE_TIMEOUT} seconds")
                            continue
                    
                    # Update cache and process the notification
                    notification_cache[user_id] = current_time
                    print(f"Received NOTIFY on 'new_song_added': {user_id}")
                    execute_recommendation(user_id, is_new_user=False)
                    print(f"Recommendation for existing user '{user_id}' finished")

if __name__ == "__main__":
    try:
        print('Recommendations service started')
        conn = connect_to_database(DATABASE_CONFIG)
        listen_to_notifications(conn)
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        if conn:
            conn.close()
