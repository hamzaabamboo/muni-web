import { getEventData } from "api/events";
import { usePromiseEffect } from "hooks/usePromiseEffect";
import { createContext, useState } from "react";
import { Event } from "types/Event";

export const EventContext = createContext<{ event?: Event }>({});

export const EventProvider: React.FC<{ event?: Event }> = ({
  event,
  children,
}) => {
  const [_event, setEvent] = useState<Event>(event);

  if (!event) usePromiseEffect(getEventData, setEvent);

  return (
    <EventContext.Provider value={{ event: _event || event }}>
      {children}
    </EventContext.Provider>
  );
};
