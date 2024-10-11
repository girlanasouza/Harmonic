"use client";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  Description,
  RightPanel,
  LeftPanel,
  Link,
  Logo,
  Title,
  Wrapper,
  Form,
} from "../LoginPanel/styles";
import {
  Stepper,
  StepperProps,
  StepperRefAttributes,
} from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Calendar } from "primereact/calendar";
import { Signup } from "@/app/types/user.type";
import { userAuthsignup } from "@/app/service/user";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/app/hooks/useUserAuth";

export interface IRegisterPage {
  setLoginForm: Dispatch<SetStateAction<Boolean>>;
}

const RegisterPage = ({ setLoginForm }: IRegisterPage) => {
  const { setUserAuth } = useAuthUser();
  const router = useRouter();
  const [register, setRegister] = useState<Signup>({
    name: "",
    birth: new Date("2000-01-01"),
    email: "",
    password: "",
    url_img_profile:
      "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
  });
  const [passConfim, setPassConfim] = useState<string | undefined>("");

  const stepperRef = useRef<StepperRefAttributes | null>(null);

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (register.password === passConfim) {
      try {
        const data = await userAuthsignup(register);
        setUserAuth(data);
        router.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Wrapper>
      <RightPanel>
        <Title>Cadastre-se</Title>
        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
          <Form>
            <label htmlFor="name">Nome</label>
            <InputText
              id="name"
              aria-describedby="name-help"
              value={register.name}
              onChange={(e) =>
                setRegister({ ...register, name: e.target.value })
              }
            />

            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              aria-describedby="email-help"
              value={register.email}
              onChange={(e) =>
                setRegister({ ...register, email: e.target.value })
              }
            />

            <label htmlFor="bith">Data de Aniversário</label>
            <Calendar
              value={register.birth}
              onChange={(e) =>
                setRegister({
                  ...register,
                  birth: e.target.value || new Date(),
                })
              }
            />
            <label htmlFor="password">Senha</label>
            <Password
              id="password"
              aria-describedby="password-help"
              toggleMask
              value={register.password}
              onChange={(e) =>
                setRegister({ ...register, password: e.target.value })
              }
            />

            <label htmlFor="password-confirm">Confirmar Senha</label>
            <Password
              id="password-confirm"
              aria-describedby="password-confirm-help"
              toggleMask
              value={passConfim}
              onChange={(e) => setPassConfim(e.target.value)}
            />
          </Form>
        </div>
        <div className="flex pt-4 justify-content-end">
          <Button
            className="m-2"
            label="Cadastrar"
            icon="pi pi-arrow-right"
            iconPos="right"
            onClick={submit}
          />
        </div>

        <Description>
          Já tem uma conta?{" "}
          <Link onClick={() => setLoginForm(true)}>Faça o Login</Link>
        </Description>
      </RightPanel>

      <LeftPanel>
        <Logo src="https://i.imgur.com/VQmGkm8.png" alt="Harmonic Logo" />
      </LeftPanel>
    </Wrapper>
  );
};

export default RegisterPage;
