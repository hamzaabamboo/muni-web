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
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import { Tier } from "types/Leaderboard";

export const RankDetailModal: React.FC<{
  tier?: Tier;
  onClose?: () => void;
}> = ({ tier, onClose }) => {
  const {} = useContext(LeaderboardContext);
  const isOpen = !!tier;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>T{tier} Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>No data yet, I'm lazy</Text>
          <Flex>
            <Flex>
              <Table variant="small">
                <Thead>
                  <Th>
                    <Td>Score</Td>
                    <Td>Change</Td>
                    <Td>Date/Time</Td>
                  </Th>
                </Thead>
                <Tbody></Tbody>
              </Table>
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
