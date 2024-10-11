"use client";

import React from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import Library from "../Library/Library";
import { NavigationBarWrapper } from "./styles";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <div className="d-flex justify-content-center align-items-start w-100 h-75">
      <div
        className="d-flex flex-column  justify-content-evenly align-items-start p-2  h-50 rounded-4 fw-light "
        style={{ backgroundColor: "#bbd8e2", width: "90%" }}
      >
        <div className="">
          <Link href={"/"} className="text-black text-decoration-none">
            <FaHome size={30} /> Inicio
          </Link>
        </div>
        <div className="">
          <Link href={"/playlists"} className="text-black text-decoration-none">
            <Library /> Playlists
          </Link>
        </div>
        <div className="">
          <Link href={"/search"} className="text-black text-decoration-none">
            <FaSearch size={30} /> Buscar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
