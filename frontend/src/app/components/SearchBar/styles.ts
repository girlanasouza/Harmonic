import styled from "styled-components";

export const SearchBarWrapper = styled.div`
  position: relative;
  width: 100%;
  // margin-left: 20px;
  margin-top: 20px;
  // margin-right: 20px;
  //   margin: 0 auto;
`;

export const SearchPopup = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #bbd8e2;
  border: 1px solid #d6e7ef;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 4px;
`;

export const SearchPopupList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SearchPopupItem = styled.li`
  padding: 8px;
  border-bottom: 1px solid #d6e7ef;

  &:hover {
    background-color: #d6e7ef;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 8px 8px 40px;
  // background-color: #bbd8e2;
  border: 1px solid #d6e7ef;
  border-radius: 4px;
  outline: none;
  background-image: url("https://i.imgur.com/5p9K9GS.png"); // imagem da lupa
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 10px center;

  &:focus {
    border-color: #a1c4d6;
  }
`;
