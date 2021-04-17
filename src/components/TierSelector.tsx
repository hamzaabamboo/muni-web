import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useMemo } from "react";
import { GraphContext } from "src/contexts/GraphContext";
import { GraphDisplayContext } from "src/contexts/GraphDisplayContext";
import { Tier } from "types/Leaderboard";

export const TierSelector = () => {
  const { displayTier, setDisplayTier, allTiers } = useContext(
    GraphDisplayContext
  );

  const toggleTier = (t: Tier) => {
    if (displayTier?.includes(t))
      return setDisplayTier((dt) => dt.filter((i) => i !== t));
    setDisplayTier((dt) => [...(dt || []), t]);
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
        label: "< T100",
        tiers: allTiers.filter((t) => t <= 100),
      },
      {
        label: "> T500",
        tiers: allTiers.filter((t) => t >= 500),
      },
    ],
    [allTiers]
  );

  return (
    <Flex w="full" flexWrap="wrap" mx="auto">
      {moreTiers.map((t) => (
        <Button
          m={2}
          key={t.label}
          colorScheme="blue"
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
            colorScheme={displayTier?.includes(t) ? "green" : "gray"}
            onClick={() => toggleTier(t)}
          >
            T{t}
          </Button>
        ))}
    </Flex>
  );
};
