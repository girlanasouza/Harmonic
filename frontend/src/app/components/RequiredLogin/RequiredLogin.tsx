import { useAuthUser } from "@/app/hooks/useUserAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const RequiredLogin = () => {
  const { UserAuth } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!UserAuth) {
      toast.warn("Funcionalidade requer login....");
      router.push("/login");
    }
  });

  return <></>;
};

export default RequiredLogin;
