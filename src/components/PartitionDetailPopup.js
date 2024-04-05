/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Divider,
  Code,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const PartitionDetailsModal = ({ isOpen, onClose, partitionDetails }) => {
  const details = partitionDetails || {
    messages: [],
    groupCurrentOffsets: {},
    groupCommittedOffsets: {},
  };

  const dividerColor = useColorModeValue("purple.100", "purple.600");

  const renderOffsets = (offsets) => {
    return Object.entries(offsets).map(([groupId, offset], idx) => (
      <Box key={idx}>
        <Text as="span" fontWeight="bold">
          {groupId}:
        </Text>{" "}
        <Code>{JSON.stringify(offset)}</Code>
      </Box>
    ));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bgGradient="linear(to-r, purple.600, purple.300)"
          color="white"
          borderTopRadius="md"
        >
          Partition Details
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Box p={2}>
              <Text fontSize="md" fontWeight="semibold">
                Messages
              </Text>
              <Divider borderColor={dividerColor} />
              {details.messages.map((message, idx) => (
                <Text key={idx} mt={2}>
                  {message.value}
                </Text>
              ))}
            </Box>
            <Box p={2}>
              <Text fontSize="md" fontWeight="semibold">
                Current Offsets
              </Text>
              <Divider borderColor={dividerColor} />
              {renderOffsets(details.groupCurrentOffsets)}
            </Box>
            <Box p={2}>
              <Text fontSize="md" fontWeight="semibold">
                Committed Offsets
              </Text>
              <Divider borderColor={dividerColor} />
              {renderOffsets(details.groupCommittedOffsets)}
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default PartitionDetailsModal;
