import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useMemo } from "react";
import { GraphContext } from "src/contexts/GraphContext";
import { Tier } from "types/Leaderboard";

export const TierSelector = () => {
  const { displayTier, setDisplayTier, allTiers } = useContext(GraphContext);

  const toggleTier = (t: Tier) => {
    if (displayTier?.includes(t))
      return setDisplayTier((dt) => dt.filter((i) => i !== t));
    setDisplayTier((dt) => [...dt, t]);
  };
  const moreTiers = useMemo(
    () => [
      {
        label: "Select All",
        tiers: allTiers,
      },
      {
        label: "Clear",
        tiers: [],
      },
      {
        label: "< T10",
        tiers: allTiers.filter((t) => t <= 10),
      },
      {
        label: "< T20",
        tiers: allTiers.filter((t) => t <= 20),
      },
      {
        label: "< T50",
        tiers: allTiers.filter((t) => t <= 50),
      },
      {
        label: "> T500",
        tiers: allTiers.filter((t) => t > 500),
      },
    ],
    [allTiers]
  );

  return (
    <Flex maxW={"60%"} w="full" flexWrap="wrap">
      {moreTiers.map((t) => (
        <Button
          m={2}
          key={t.label}
          bg="blue.200"
          onClick={() => setDisplayTier(t.tiers)}
        >
          {t.label}
        </Button>
      ))}
      {allTiers
        .sort((a, b) => a - b)
        .map((t) => (
          <Button
            m={2}
            key={t}
            bg={displayTier?.includes(t) ? "green.200" : "gray.200"}
            onClick={() => toggleTier(t)}
          >
            T{t}
          </Button>
        ))}
    </Flex>
  );
};
