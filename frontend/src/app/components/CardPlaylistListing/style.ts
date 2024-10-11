import Image from "next/image";
import styled from "styled-components";

export const PlaylistItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 5px;
  width: 80vw;
  height: 70px;
`;

export const ImageCover = styled(Image)`
  position: relative;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;
`;

export const CellItemWithoutBold = styled.div`
  width: 16vw;
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const CellItemWithoutBoldBtn = styled.button`
  width: 16vw;
  align-items: center;
  display: flex;
  justify-content: center;
`;
