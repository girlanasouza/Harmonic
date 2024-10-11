import styled from "styled-components";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65vw;
  height: 70vh;
  border-radius: 15px;
  background-color: #e0f7fa;
`;

export const WrapperBlank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 65vw;
  height: 70vh;
  border-radius: 15px;
  background-color: #f5feff;
`;

export const LeftPanel = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-image: url("https://i.imgur.com/6Ny8ukM.png");
  background-color: #d6eaed;
  background-size: cover;
  height: 100%;
  max-width: 60%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const Logo = styled.img`
  height: 250px;
  position: relative;
  // bottom: 15%
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5feff;
  padding: 2rem;
  height: 100%;
  width: 40%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
  color: #22768c;
  font-weight: bold;
  margin-top: 4rem;
`;

export const Description = styled.p`
  margin-bottom: 4rem;
  color: #637f84;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #637f84;
`;

export const StyledInputText = styled(InputText)`
  margin-bottom: 1rem;
  padding: 0.8rem;
  border-radius: 5px;
  background-color: #d6eaed;
`;

export const StyledCalendar = styled(Calendar)`
  .p-inputtext {
    margin-bottom: 1rem !important;
    padding: 0.8rem !important;
    border-radius: 5px !important;
    background-color: #d6eaed !important;
  }
`;

export const StyledPassword = styled(Password)`
  .p-password-input {
    background-color: #d6eaed;
    border-radius: 5px;
    width: 300px;
  }
  margin-bottom: 10px;
`;

export const StyledButton = styled(Button)`
  background-color: #22768c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1c6274;
  }
`;

export const Link = styled.a`
  color: #006064;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
