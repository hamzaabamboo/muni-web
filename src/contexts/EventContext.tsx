import { fetchD4DB } from "api/fetchD4DB";
import { getEventData } from "api/getEventData";
import { createContext, useEffect, useState } from "react";
import { Event } from "types/Event";

export const EventContext = createContext<{ event?: Event }>({});

export const EventProvider = ({ children }) => {
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    const f = async () => {
      const data = await getEventData();
      setEvent(data);
    };
    f();
  }, []);

  return (
    <EventContext.Provider value={{ event }}>{children}</EventContext.Provider>
  );
};
