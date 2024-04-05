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

function AddBrokerBtn({ addNode }) {
  const initRef = useRef();
  const [isAdding, setIsAdding] = useState(false);
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
              <Flex mt={4}>
                <Button
                  colorScheme="purple"
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

AddBrokerBtn.propTypes = {
  addNode: PropTypes.func.isRequired,
};

export default AddBrokerBtn;
