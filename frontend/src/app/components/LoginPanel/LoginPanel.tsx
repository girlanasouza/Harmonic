"use client";

import { InputText } from "primereact/inputtext";
import {
  LeftPanel,
  Logo,
  RightPanel,
  Wrapper,
  Form,
  Title,
  Description,
  Link,
  StyledInputText,
  StyledPassword,
  StyledButton,
} from "./styles";
import { Password } from "primereact/password";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAuthUser } from "@/app/hooks/useUserAuth";
import { Login } from "@/app/types/user.type";
import { color, fontFamily } from "@mui/system";

export interface ILoginPanel {
  setLoginForm: Dispatch<SetStateAction<Boolean>>;
}

export const LoginPanel = ({ setLoginForm }: ILoginPanel) => {
  const router = useRouter();
  const [loginValues, setLoginValues] = useState<Login>({
    email: "",
    password: "",
  });
  const { signin, UserAuth } = useAuthUser();

  useEffect(() => {
    if (UserAuth) {
      router.push("/");
    }
  }, [UserAuth]);

  const onSubmit: SubmitHandler<FieldValues> = (e) => {
    e.preventDefault();
    signin(loginValues);
  };

  return (
    <Wrapper>
      <LeftPanel>
        <Logo src="https://i.imgur.com/VQmGkm8.png" alt="Harmonic Logo" />
      </LeftPanel>

      <RightPanel>
        <Title>Bem vindo</Title>
        <Description>Faça seu login para continuar</Description>
        <Form>
          <label htmlFor="email" style={{ color: "#637F84" }}>
            Email:
          </label>
          <StyledInputText
            id="email"
            aria-describedby="email-help"
            value={loginValues.email}
            onChange={(e) =>
              setLoginValues({ ...loginValues, email: e.target.value })
            }
          />

          <label htmlFor="password" style={{ color: "#637F84" }}>
            Password:
          </label>
          <StyledPassword
            id="password"
            aria-describedby="password-help"
            toggleMask
            value={loginValues.password}
            onChange={(e) =>
              setLoginValues({ ...loginValues, password: e.target.value })
            }
            feedback={false}
          />

          <StyledButton
            id="submitBtn"
            className="m-2"
            label="Entrar"
            rounded
            onClick={onSubmit}
          />
        </Form>

        <Description>
          Não tem uma conta?{" "}
          <Link onClick={() => setLoginForm(false)}>Cadastre-se</Link>
        </Description>
      </RightPanel>
    </Wrapper>
  );
};
