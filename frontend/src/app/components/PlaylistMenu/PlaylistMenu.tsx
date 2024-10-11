import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { StyledMenu } from "./style";
import { PlaylistSimple } from "@/app/types/playlist.type";
import { usePlaylist } from "@/app/hooks/usePlaylist";

export default function PlaylistMenu({
  simplePlaylist,
}: {
  simplePlaylist: PlaylistSimple;
}) {
  const menuRef = React.useRef<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const { removePlaylist, altPlaylist } = usePlaylist();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
    menuRef.current = event.currentTarget;
  };

  const handleClose = () => {
    setOpen(false);
    menuRef.current = null;
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color="secondary"
        disableElevation
        onClick={handleClick}
      >
        <i className="text-black pi pi-ellipsis-h"></i>
      </Button>

      <StyledMenu
        id="popup_menu_left"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={menuRef.current}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => altPlaylist(simplePlaylist)}>
          <i className="text-primary bi bi-pen-fill"> Edit </i>
        </MenuItem>
        <MenuItem onClick={() => removePlaylist(simplePlaylist.id)}>
          <i className=" text-danger bi bi-trash-fill"> Delete </i>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
