"use client";

import React, { useState } from "react";
import { Container } from "./styles";
import { LoginPanel } from "../LoginPanel/LoginPanel";
import RegisterPage from "../RegisterPage/RegisterPage";

const LoginPage: React.FC = () => {
  const [loginForm, setLoginForm] = useState<Boolean>(true);

  return (
    <Container>
      {loginForm ? (
        <LoginPanel setLoginForm={setLoginForm} />
      ) : (
        <RegisterPage setLoginForm={setLoginForm} />
      )}
    </Container>
  );
};

export default LoginPage;
