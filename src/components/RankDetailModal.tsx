import {
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
import React, { useContext, useMemo } from "react";
import { EventContext } from "src/contexts/EventContext";
import { LeaderboardChangesContext } from "src/contexts/LeaderboardChangesContext";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import { Tier } from "types/Leaderboard";
import { ChangesTable } from "./ChangesTable";

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
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>T{tier} Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir={["column", null, "row"]}>
            <Flex flexDir="column">
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
              {changes[tier] && (
                <Text>
                  <Text fontWeight="bold" as="span">
                    Last Update
                  </Text>
                  : +{changes[tier]}
                </Text>
              )}
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
