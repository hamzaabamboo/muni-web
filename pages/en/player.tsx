import { EventInfo } from "components/EventInfo";
import { Navigation } from "components/Navigation";
import { PlayerDetails } from "components/PlayerDetails";
import { PlayerSearch } from "components/PlayerSearch";
import { GraphDisplayProvider } from "src/contexts/GraphDisplayContext";
import { PageProps } from "types/PageProps";

export const getStaticProps = async () => {
  return {
    props: {
      server: "en",
      head: {
        title: `Create むに web | Groovy Mix EN server`,
      },
    } as PageProps,
  };
};

export default function PlayerSearchPage() {
  return (
    <>
      <EventInfo />
      <Navigation en />
      <GraphDisplayProvider>
        <PlayerSearch />
        <PlayerDetails />
      </GraphDisplayProvider>
    </>
  );
}
