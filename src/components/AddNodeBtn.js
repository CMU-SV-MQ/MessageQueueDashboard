import {
  Button,
  Flex,
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

function AddNodeBtn({ addNode }) {
  const initRef = useRef();
  const [isAdding, setIsAdding] = useState(false);
  return (
    <Popover initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              colorScheme="green"
              size="md"
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
              Are you sure you want to add a node?
              <Flex mt={4}>
                <Button
                  colorScheme="green"
                  leftIcon={<HiCheck />}
                  isLoading={isAdding}
                  onClick={async () => {
                    setIsAdding(true);
                    await addNode();
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

AddNodeBtn.propTypes = {
  addNode: PropTypes.func.isRequired,
};

export default AddNodeBtn;
