import styled from "styled-components";

export const HeaderPlaylists = styled.div`
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: 35px;
  justify-content: space-around;
  // margin-top: 5%;
  // border-bottom: 1px solid black; /* or any other color you prefer */
`;

export const BodyPlaylist = styled.div`
  display: flex;
  flex-direction: row;
  height: 35px;
  justify-content: space-around;
  // margin-top: 5%;
`;

export const CellItem = styled.div`
  width: 16vw;
  align-items: center;
  display: flex;
  justify-content: center;
  font-weight: bold;
`;
