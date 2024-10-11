import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { StyledMenu } from "./style";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useAuthUser } from "@/app/hooks/useUserAuth";
import Link from "next/link";

const UserProfileIcon = () => {
  const menuRef = React.useRef<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const { UserAuth, logout } = useAuthUser();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
    menuRef.current = event.currentTarget;
  };

  const handleClose = () => {
    setOpen(false);
    menuRef.current = null;
  };

  const handleProfile = () => {};

  return (
    <div>
      <div className="d-flex justify-content-end">
        {!UserAuth ? (
          <Link href="/login">
            <FaUserCircle size={50} />
          </Link>
        ) : (
          <div
            className="card bg-primary border-0 rounded-circle overflow-hidden"
            style={{ width: "50px", height: "50px" }}
          >
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
              <Image
                src={
                  UserAuth?.url_img_profile.length
                    ? UserAuth?.url_img_profile
                    : "https://cdn.pixabay.com/photo/2016/04/10/18/44/flamingo-1320475_1280.jpg"
                }
                alt="Playlist"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-circle"
              />
            </div>
          </div>
        )}
      </div>

      <StyledMenu
        id="popup_menu_left"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={menuRef.current}
        open={open}
        onClose={handleClose}
      >
        <p className="text-center fw-light">{UserAuth?.name}</p>
        <MenuItem>
          <Link href={"/userprofile"} className="text-decoration-none">
            <i className="text-sucess bi bi-person"> Perfil </i>
          </Link>
        </MenuItem>

        <MenuItem
          onClick={() => {
            logout(), setOpen(false);
          }}
        >
          <i className=" text-danger bi bi-door-open-fill"> Sair </i>
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default UserProfileIcon;
