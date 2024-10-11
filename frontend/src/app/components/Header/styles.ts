import Link from "next/link";
import styled from "styled-components";

export const SpanNav = styled.span`
  display: none;
`;

export const NavLink = styled(Link)`
  &:hover ${SpanNav} {
    display: inline-block;
  }
`;
