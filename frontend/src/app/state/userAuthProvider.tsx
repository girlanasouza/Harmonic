"use client";
import { createContext, useEffect, useState } from "react";
import { Login, Signup, User } from "../types/user.type";
import {
  checkSession,
  userAuthLogin,
  userAuthlogout,
  userAuthsignup,
} from "../service/user";
import { toast } from "react-toastify";

interface UserAuthContext {
  UserAuth: User | null;
  setUserAuth: React.Dispatch<React.SetStateAction<User | null>>;
  signin: (dataLogin: Login) => void;
  signup: (dataRegister: Signup) => void;
  logout: () => void;
}

export const UserAuthContext = createContext<UserAuthContext>({
  UserAuth: null,
  setUserAuth: () => {},
  signin: () => {},
  signup: () => {},
  logout: () => {},
});

type UserAuthProps = {
  children: React.ReactNode;
};

const UserAuthProvider = ({ children }: UserAuthProps) => {
  const [UserAuth, setUserAuth] = useState<User | null>(null);

  useEffect(() => {
    const check = async () => {
      const data = await checkSession();

      if (data && data.uuid) {
        const userSession: User = data.user;
        setUserAuth(userSession);
      }
    };
    check();
  }, []);

  const signin = async (dataLogin: Login) => {
    try {
      const response = await userAuthLogin(dataLogin);
      if (!response) {
        toast.error("Fail Login!!");
        return;
      }

      const user: User = response;

      setUserAuth(user);
    } catch (err) {
      console.log(err);
    }
  };

  const signup = async (dataRegister: Signup) => {
    try {
      const response = await userAuthsignup(dataRegister);
      if (!response) {
        toast.error("Register faill!!");
        return;
      }
      toast.success("Register success");
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await userAuthlogout();
      setUserAuth(null);
      toast.success("Logout success");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        UserAuth,
        setUserAuth,
        signin,
        signup,
        logout,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
