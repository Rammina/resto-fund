import DefaultAvatarImg from "../../../assets/images/default-avatar.png";

import React from "react";

import "./ProfilePicture.scss";

const ProfilePicture = ({ imageSrc, className, onClick, onContextMenu }) => {
  const onClickHandler = (e) => {
    if (onClick !== undefined) onClick(e);
  };

  const onContextMenuHandler = (e) => {
    if (onContextMenu !== undefined) onContextMenu(e);
  };

  return (
    <div
      className={`profile-picture__div ${className || ""}`}
      onClick={onClickHandler}
      onContextMenu={onContextMenuHandler}
    >
      <img
        className={`profile-picture__img ${className || ""}`}
        src={imageSrc || DefaultAvatarImg}
      />
    </div>
  );
};

export default ProfilePicture;
