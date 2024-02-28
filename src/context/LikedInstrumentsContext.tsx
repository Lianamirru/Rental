import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCurrentUser } from "./../services/authService";
import { InstrumentType } from "../types/instrumentType";
import { getInstruments } from "../services/instrumentService";
import { getLikedInstruments } from "../services/likeService";

const LikedInstrumentsContext = createContext<{
  likedInstruments: InstrumentType[];
  handleInstrumentLike: (instrumentId: string) => void;
}>({
  likedInstruments: [],
  handleInstrumentLike: () => {},
});

const LikedInstrumentsProvider = ({ children }: { children: ReactNode }) => {
  const [likedInstruments, setInstruments] = useState<InstrumentType[]>([]);
  const user = useMemo(() => getCurrentUser(), []);
  console.log(likedInstruments);
  useEffect(() => {
    (async () => {
      try {
        const { data: instruments } = await getInstruments();
        if (!user) {
          setInstruments(instruments);
        } else {
          const { data: likedInstrumentsIds } = await getLikedInstruments();
          console.log(likedInstrumentsIds);
          const newInstruments = instruments.map((instrument) =>
            likedInstrumentsIds.includes(instrument._id)
              ? { ...instrument, like: true }
              : instrument
          );
          setInstruments(newInstruments);
        }
      } catch (ex) {}
    })();
  }, [user]);

  const handleInstrumentLike = (instrumentId: String) => {
    const updatedInstruments = likedInstruments.map((instrument) =>
      instrument._id === instrumentId
        ? { ...instrument, like: !instrument.like }
        : instrument
    );
    setInstruments(updatedInstruments);
  };

  return (
    <LikedInstrumentsContext.Provider
      value={{ likedInstruments, handleInstrumentLike }}
    >
      {children}
    </LikedInstrumentsContext.Provider>
  );
};

export const useLikedInstruments = () => useContext(LikedInstrumentsContext);
export default LikedInstrumentsProvider;
