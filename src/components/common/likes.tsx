import { MouseEventHandler } from "react";

import icon from "../../images/heart.png";
import likedIcon from "../../images/heart-clicked.png";

type LikesType = {
  like: boolean;
  onClick: MouseEventHandler<HTMLImageElement>;
};

const Likes = ({ like, onClick }: LikesType) => {
  return (
    <img
      className="clickable add-to-favorites"
      src={like === true ? likedIcon : icon}
      alt="like icon"
      onClick={onClick}
    />
  );
};

export default Likes;
