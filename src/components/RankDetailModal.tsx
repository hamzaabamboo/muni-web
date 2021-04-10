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
import { DateTime } from "luxon";
import React, { useContext } from "react";
import { AnalysisProvider } from "src/contexts/AnalysisContext";
import { LeaderboardChangesContext } from "src/contexts/LeaderboardChangesContext";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import { Tier } from "types/Leaderboard";
import { AnalysisOptions } from "./AnalysisOptions";
import { ChangesTable } from "./ChangesTable";
import { PlayerGraph } from "./PlayerGraph";
import { RateGraph } from "./RateGraph";

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
              <AnalysisProvider all>
                <RateGraph tier={tier} />
                <AnalysisOptions />
              </AnalysisProvider>
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
