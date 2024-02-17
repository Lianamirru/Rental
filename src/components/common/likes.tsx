import { MouseEventHandler } from "react";

import icon from "../../images/heart.png";
import likedIcon from "../../images/heart-clicked.png";

type LikesType = {
  liked: boolean;
  onClick: MouseEventHandler<HTMLImageElement>;
};

const Likes = ({ liked, onClick }: LikesType) => {
  return (
    <img
      className="clickable likeIcon"
      src={liked === true ? likedIcon : icon}
      alt="my icon"
      onClick={onClick}
    />
  );
};

export default Likes;
