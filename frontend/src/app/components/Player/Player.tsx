"use client";
import { useMusicPlayer } from "@/app/hooks/useMusicPlayer";
import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";
import "./player.scss";
import CardMusicPlay from "../CardMusicPlay/CardMusicPlay";

const Player: React.FC = () => {
  const { musicPlayer, play, pause, next, previous } = useMusicPlayer();

  return (
    <div
      className="border border-dark-subtle d-flex justify-content-center"
      style={{ backgroundColor: "#bbd8e2" }}
    >
      {musicPlayer.songs.length <= 0 ? (
        <div></div>
      ) : (
        <H5AudioPlayer
          src={musicPlayer.songs[musicPlayer.currentIndex].src}
          showSkipControls
          showJumpControls={false}
          onPlay={play}
          onPause={pause}
          onClickNext={next}
          onClickPrevious={previous}
          customControlsSection={[
            RHAP_UI.ADDITIONAL_CONTROLS,
            RHAP_UI.LOOP,
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.VOLUME_CONTROLS,
          ]}
          customAdditionalControls={[
            <CardMusicPlay
              title={musicPlayer.songs[musicPlayer.currentIndex].title}
              artist={musicPlayer.songs[musicPlayer.currentIndex].artist}
              img_url={musicPlayer.songs[musicPlayer.currentIndex].img_url}
              key="music_info"
            />,
          ]}
          customVolumeControls={[
            RHAP_UI.CURRENT_TIME,
            <em key="/">/</em>,
            RHAP_UI.DURATION,
            <div key="br">&nbsp;</div>,
            RHAP_UI.VOLUME,
          ]}
          customProgressBarSection={[]}
          customIcons={{
            play: <i className="bi bi-play-circle"></i>,
            pause: <i className="bi bi-pause-circle "></i>,
            previous: (
              <i className="bi bi-skip-start-circle next-prev-icon"></i>
            ),
            next: <i className="bi bi-skip-end-circle next-prev-icon"></i>,
          }}
        />
      )}
    </div>
  );
};

export default Player;
