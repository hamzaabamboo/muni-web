import { getEventData } from "api/events";
import { usePromiseEffect } from "hooks/usePromiseEffect";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Event } from "types/Event";
import { getAbsolutePath } from "utils/assets";
import { ThemeContext } from "./ThemeContext";

export const EventContext = createContext<{ event?: Event }>({});

export const EventProvider: React.FC<{ event?: Event }> = ({
  event,
  children,
}) => {
  const { setBgImage } = useContext(ThemeContext);
  const [_event, setEvent] = useState<Event>(event);

  if (!event) usePromiseEffect(getEventData, setEvent);

  const res = useMemo(() => _event || event, [_event, event]);

  useEffect(() => {
    if (res) {
      setBgImage(
        getAbsolutePath(`/images/events/background/${res.eventid}.jpg`)
      );
    }
  }, [res]);

  return (
    <EventContext.Provider value={{ event: res }}>
      {children}
    </EventContext.Provider>
  );
};
