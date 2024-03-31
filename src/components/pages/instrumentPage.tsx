import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";

import { getInstrument } from "../../services/instrumentService";
import { logger } from "../../services/logService";

import { InstrumentType } from "../../types/instrumentType";

const InstrumentPage = () => {
  const [instrument, setInstrument] = useState<InstrumentType | null>(null);

  let instrumentPhoto = "";
  if (instrument) {
    const buffer = Buffer.from(instrument.image.data);
    instrumentPhoto = `data:${
      instrument.image.contentType
    };base64,${buffer.toString("base64")}`;
  }

  const { id: instrumentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (instrumentId) {
          const { data } = await getInstrument(instrumentId);
          setInstrument(data);
        }
      } catch (ex: any) {
        if (ex.response && ex.response.status === 404) {
          navigate("/notFound");
        } else {
          logger(ex);
        }
      }
    })();
  }, [instrumentId, navigate]);

  return (
    <main className="container">
      <section className="instrument-section">
        <h2>Instrument Info</h2>
        <div className="instrument-info">
          <img
            className="instrument-photo"
            src={instrumentPhoto}
            alt={"instrument-photo"}
          ></img>
          <p>{instrument?.description}</p>
        </div>
      </section>
    </main>
  );
};

export default InstrumentPage;
