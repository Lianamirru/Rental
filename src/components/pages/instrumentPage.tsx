import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getInstrument } from "../../services/instrumentService";
import { logger } from "../../services/logService";

import { InstrumentType } from "../../types/instrumentType";

const InstrumentPage = () => {
  const [instrument, setInstrument] = useState<InstrumentType | null>(null);

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
      <h1> {instrument?.model}</h1>
      <div className="row">
        <div className="col">img</div>
        <div className="col">
          <p> description</p>
        </div>
      </div>
      <div>reviews</div>
    </main>
  );
};

export default InstrumentPage;
