import { InstrumentType } from "../../types/instrumentType";

type ItemProps = {
  item: InstrumentType;
  onDelete: () => void;
};

const Item = ({ item, onDelete }: ItemProps) => {
  const { maker, model, year, monthlyRentalPrice } = item;
  return (
    <>
      <div>
        {maker} {model} {year}
      </div>
      <div>${monthlyRentalPrice}</div>
      <button className="btn--delete" onClick={onDelete}>
        <i className="fa fa-trash " aria-hidden="true"></i>
      </button>
    </>
  );
};

export default Item;
