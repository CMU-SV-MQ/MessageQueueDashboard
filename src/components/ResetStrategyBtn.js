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
  // const fieldMap = {
  //   heartbeat_duration: "Heartbeat Duration",
  //   random_duration: "Random Duration",
  //   timeout: "Timeout",
  // };
  // const [newSettings, setNewSettings] = useState({});

  const [strategy, setStrategy] = useState("round-robin");

  const handleUpdate = () => {
    update(strategy);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button colorScheme="gray" size="md" leftIcon={<HiOutlineCog />}>
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
              <Radio colorScheme="yellow" value="round-robin">
                Round Robin
              </Radio>
              <Radio colorScheme="yellow" value="range">
                Range
              </Radio>
              <Radio colorScheme="yellow" value="fail-over">
                Fail Over
              </Radio>
              <Radio colorScheme="yellow" value="sticky">
                Sticky
              </Radio>
            </Stack>
          </RadioGroup>
          <Button mt="4" colorScheme="yellow" onClick={handleUpdate}>
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
