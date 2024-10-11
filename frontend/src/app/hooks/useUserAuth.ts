import { useContext } from "react";
import { UserAuthContext } from "../state/userAuthProvider";

export const useAuthUser = () => {
  const { UserAuth, setUserAuth, signin, signup, logout } =
    useContext(UserAuthContext);

  return { UserAuth, setUserAuth, signin, signup, logout };
};
