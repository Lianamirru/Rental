import { MouseEventHandler } from "react";

type LikesType = {
  like: boolean;
  onClick: MouseEventHandler<HTMLImageElement>;
};

const Likes = ({ like, onClick }: LikesType) => {
  return (
    <img
      className="clickable add-to-favorites"
      src={like ? "/images/heart-filled.png" : "/images/heart.png"}
      alt="like icon"
      onClick={onClick}
    />
  );
};

export default Likes;
