import { useState } from "react";
import { HiOutlineCog } from "react-icons/hi";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

function ResetStrategyBtn({ update }) {
  const [strategy, setStrategy] = useState("round-robin");

  const handleUpdate = () => {
    update(strategy);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button bg="purple.50" size="md" leftIcon={<HiOutlineCog />}>
          Reset Strategy
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Choose Partition Strategy</PopoverHeader>
        <PopoverBody>
          <RadioGroup onChange={setStrategy} value={strategy}>
            <Stack direction="column">
              <Radio colorScheme="purple" value="round-robin">
                Round Robin
              </Radio>
              <Radio colorScheme="purple" value="range">
                Range
              </Radio>
              <Radio colorScheme="purple" value="fail-over">
                Fail Over
              </Radio>
              <Radio colorScheme="purple" value="sticky">
                Sticky
              </Radio>
            </Stack>
          </RadioGroup>
          <Button mt="4" colorScheme="purple" onClick={handleUpdate}>
            Reset
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

ResetStrategyBtn.propTypes = {
  settings: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
};

export default ResetStrategyBtn;
