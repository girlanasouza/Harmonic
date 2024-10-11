import Image from "next/image";
import styled from "styled-components";

export const WrapperPlaylistDatails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  // margin-top: 20px;
`;

export const ImageCover = styled(Image)`
  position: relative;
  width: 500px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
`;

export const Infos = styled.div`
  margin-left: 2%;
`;
