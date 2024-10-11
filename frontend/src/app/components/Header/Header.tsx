"use client";

import React from "react";
import UserProfileIcon from "../UserProfileIcon/UserProfileIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavLink, SpanNav } from "./styles";
const Header = () => {
  const pathname = usePathname();
  const showNavBar = !(pathname == "/login");

  if (!showNavBar) return;

  return (
    <div className="m-2 d-flex justify-content-between align-items-center">
      <div className="col">
        <span
          className="fs-4  fw-bold lh-1 font-monospace text-uppercase"
          id="name-topo"
        >
          Harmonic
        </span>
      </div>
      <div className="d-flex col justify-content-end align-items-center">
        <NavLink href={"/"} className="me-3 text-black text-decoration-none">
          <i className="bi bi-house fs-4"></i>
          <SpanNav>Home</SpanNav>
        </NavLink>

        <NavLink
          href={"/search"}
          className="me-3 text-black text-decoration-none"
        >
          <i className="text-black bi bi-search fs-4"></i>
          <SpanNav>Buscar</SpanNav>
        </NavLink>

        <NavLink
          href={"/playlists"}
          className="me-3 text-black text-decoration-none"
        >
          <i className="bi bi-music-note-list fs-4"></i>
          <SpanNav>Playlists</SpanNav>
        </NavLink>

        <UserProfileIcon />
      </div>
    </div>
  );
};

export default Header;
