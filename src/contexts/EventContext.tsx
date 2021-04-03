import { getEventData } from "api/getEventData";
import { usePromiseEffect } from "hooks/usePromiseEffect";
import { createContext, useEffect, useState } from "react";
import { Event } from "types/Event";

export const EventContext = createContext<{ event?: Event }>({});

export const EventProvider = ({ children }) => {
  const [event, setEvent] = useState<Event>();

  usePromiseEffect(getEventData, setEvent);

  return (
    <EventContext.Provider value={{ event }}>{children}</EventContext.Provider>
  );
};
