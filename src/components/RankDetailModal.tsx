import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { thresholds } from "constants/threshold";
import { DateTime } from "luxon";
import React, { useContext, useEffect, useMemo, useRef } from "react";
import { EventContext } from "src/contexts/EventContext";
import { GraphContext } from "src/contexts/GraphContext";
import { LeaderboardChangesContext } from "src/contexts/LeaderboardChangesContext";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import { Tier } from "types/Leaderboard";
import { useSize } from "web-api-hooks";
import { ChangesTable } from "./ChangesTable";
import { Graph } from "./Graph";
import { PlayerGraph } from "./PlayerGraph";

export const RankDetailModal: React.FC<{
  tier?: Tier;
  onClose?: () => void;
}> = ({ tier, onClose }) => {
  const { changes } = useContext(LeaderboardChangesContext);
  const { lbData } = useContext(LeaderboardContext);

  const isOpen = !!tier;
  const data = lbData?.find((d) => d.rank === tier);

  if (!data) return null;

  return (
    <Modal isOpen={isOpen} size="4xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>T{tier} Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir={["column", null, "row"]}>
            <Flex flexDir="column" flex={1} px={2}>
              <Text>
                <Text fontWeight="bold" as="span">
                  Current player
                </Text>
                : {data.name}
              </Text>
              <Text>
                <Text fontWeight="bold" as="span">
                  Points
                </Text>
                : {data.points}
              </Text>
              {data.rate && (
                <Text>
                  <Text fontWeight="bold" as="span">
                    Rate
                  </Text>
                  : {data.rate}
                </Text>
              )}
              <Text>
                <Text fontWeight="bold" as="span">
                  Last Update
                </Text>
                : +{changes[tier]}
              </Text>
              <Text>
                <Text fontWeight="bold" as="span">
                  Last Updated
                </Text>
                : {DateTime.fromISO(data.date).toFormat("HH:mm:ss dd/MM/yyyy")}{" "}
                (
                {DateTime.now()
                  .diff(DateTime.fromISO(data.date))
                  .toFormat("hh:mm")}
                )
              </Text>
              <PlayerGraph tier={tier} />
            </Flex>
            <Flex minH="600px">
              <ChangesTable tier={tier} />
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
