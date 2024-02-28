import { toast } from "react-toastify";
import { logger } from "../services/logService";

import { likeInstrument } from "../services/likeService";
import { InstrumentType } from "../types/instrumentType";
import { useLikedInstruments } from "../context/LikedInstrumentsContext";

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
      {displayedInstruments.length ? (
        <>
          <h2 className="display-items__heading">Favorites</h2>
          <div className="display-items__table-heading">
            <h3>Instrument</h3>
            <h3>Price</h3>
          </div>
          {displayedInstruments.map((item) => (
            <Item
              key={item._id}
              item={item}
              onDelete={() => handleDeleteLike(item._id)}
            />
          ))}
        </>
      ) : (
        <p>No favorite instruments</p>
      )}
    </div>
  );
};

export default Favorites;

type ItemProps = {
  item: InstrumentType;
  onDelete: () => void;
};
const Item = ({ item, onDelete }: ItemProps) => {
  const { maker, model, year, monthlyRentalPrice } = item;
  return (
    <div className="items">
      <h4>
        {maker} {model} {year}
      </h4>
      <div className="items__info">
        <h4>${monthlyRentalPrice}</h4>
        <button className="items__delete" onClick={onDelete}>
          <i className="fa fa-trash " aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};
