import { toast } from "react-toastify";
import { logger } from "../../services/logService";

import { likeInstrument } from "../../services/likeService";
import { InstrumentType } from "../../types/instrumentType";
import { useLikedInstruments } from "../../context/LikedInstrumentsContext";
import Item from "../page-item/favoriteItem";

const Favorites = () => {
  const { likedInstruments, handleInstrumentLike } = useLikedInstruments();
  const displayedInstruments = likedInstruments.filter((i) => i.like === true);

  const handleDeleteLike = async (itemId: string) => {
    try {
      await likeInstrument(itemId);
    } catch (ex: any) {
      if (ex.response && ex.response.status === 404) {
        toast.error("unable to delete from favorites");
      } else {
        logger(ex);
      }
    }
    handleInstrumentLike(itemId);
  };

  return (
    <div className="display-items">
      <>
        <h2 className="display-items__heading">Favorites</h2>
        <div className="grid favorites-grid">
          <h3>Instrument</h3>
          <h3>Price</h3>
          <h3></h3>
          {displayedInstruments.length === 0 && <p>No favorites</p>}
          {displayedInstruments.map((item) => (
            <Item
              key={item._id}
              item={item}
              onDelete={() => handleDeleteLike(item._id)}
            />
          ))}
        </div>
      </>
    </div>
  );
};

export default Favorites;
