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
  instruments: InstrumentType[];
  likedInstruments: InstrumentType[];
  handleInstrumentLike: (instrumentId: string) => void;
}>({
  instruments: [],
  likedInstruments: [],
  handleInstrumentLike: () => {},
});

const LikedInstrumentsProvider = ({ children }: { children: ReactNode }) => {
  const [instruments, setInstruments] = useState<InstrumentType[]>([]);
  const [likedInstruments, setLikedInstruments] = useState<InstrumentType[]>(
    []
  );
  const user = useMemo(() => getCurrentUser(), []);

  useEffect(() => {
    (async () => {
      try {
        const { data: instruments } = await getInstruments();
        setInstruments(instruments);

        if (!user) {
          setLikedInstruments(instruments);
        } else {
          const { data: likedInstrumentsIds } = await getLikedInstruments();
          const newInstruments = instruments.map((instrument) =>
            likedInstrumentsIds.includes(instrument._id)
              ? { ...instrument, like: true }
              : instrument
          );
          setLikedInstruments(newInstruments);
        }
      } catch (ex) {}
    })();
  }, [user]);

  const handleInstrumentLike = (instrumentId: string) => {
    const updatedInstruments = likedInstruments.map((instrument) =>
      instrument._id === instrumentId
        ? { ...instrument, like: !instrument.like }
        : instrument
    );
    setLikedInstruments(updatedInstruments);
  };

  return (
    <LikedInstrumentsContext.Provider
      value={{ instruments, likedInstruments, handleInstrumentLike }}
    >
      {children}
    </LikedInstrumentsContext.Provider>
  );
};

export const useLikedInstruments = () => useContext(LikedInstrumentsContext);
export default LikedInstrumentsProvider;
