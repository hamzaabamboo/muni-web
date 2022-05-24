import { TextProps, Text } from "@chakra-ui/react";
import { memo, useMemo } from "react";
import { Tier as ITier } from "types/Leaderboard";

const Tier: React.FC<{ tier: ITier; children: React.ReactNode }> = memo(
  ({ tier, children }) => {
    const styles: Partial<TextProps> = useMemo(() => {
      switch (tier) {
        case 1:
          return { fontSize: "xl", fontWeight: "bold", color: "yellow.400" };
        case 2:
          return { fontSize: "xl", fontWeight: "bold", color: "gray.400" };
        case 3:
          return { fontSize: "xl", fontWeight: "bold", color: "red.800" };
        case 10:
        case 50:
        case 100:
        case 500:
        case 1000:
        case 2000:
        case 5000:
        case 10000:
        case 20000:
        case 30000:
        case 50000:
          return { fontSize: "xl", fontWeight: "bold" };
        default:
          return {};
      }
    }, [tier]);
    return <Text {...styles}>{children || tier}</Text>;
  }
);

Tier.displayName = "Tier";

export { Tier };
