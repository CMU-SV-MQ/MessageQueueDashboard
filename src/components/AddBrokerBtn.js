import {
  Button,
  Flex, Input, InputGroup, InputLeftAddon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { HiCheck, HiPlus } from "react-icons/hi";
import { useRef, useState } from "react";

import PropTypes from "prop-types";

function AddBrokerBtn({ addNode }) {
  const initRef = useRef();
  const [isAdding, setIsAdding] = useState(false);
  const [nodeId, setNodeId] = useState("");
  return (
    <Popover initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              colorScheme="purple"
              size="sm"
              leftIcon={<HiPlus />}
              isLoading={isAdding}
            >
              Add Broker
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Confirmation</PopoverHeader>
            <PopoverBody>
              Are you sure you want to add a broker?
              <InputGroup mb="2">
                <InputLeftAddon width={10}>Message</InputLeftAddon>
                <Input
                  value={nodeId}
                  onChange={(e) => setNodeId(e.target.value)}
                />
              </InputGroup>
              <Flex mt={4}>
                <Button
                  colorScheme="purple"
                  leftIcon={<HiCheck />}
                  isLoading={isAdding}
                  onClick={async () => {
                    setIsAdding(true);
                    await addNode(nodeId);
                    onClose();
                    setIsAdding(false);
                  }}
                >
                  Confirm
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

AddBrokerBtn.propTypes = {
  addNode: PropTypes.func.isRequired,
};

export default AddBrokerBtn;
