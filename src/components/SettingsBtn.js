import { useState } from "react";
import { HiOutlineCog } from "react-icons/hi";
import {
  Flex,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Input,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

function SettingsBtn({ settings, update }) {
  const fieldMap = {
    heartbeat_duration: "Heartbeat Duration",
    random_duration: "Random Duration",
    timeout: "Timeout",
  };
  const [newSettings, setNewSettings] = useState({});
  return (
    <Popover>
      <PopoverTrigger>
        <Button colorScheme="gray" size="md" leftIcon={<HiOutlineCog />}>
          Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Cluster Settings</PopoverHeader>
        <PopoverBody>
          {Object.keys(settings).map((key, index) => {
            return (
              <Flex key={index} flexDirection={"column"}>
                <Text size="sm" fontWeight={"bold"}>
                  {fieldMap[key]}
                </Text>
                <Input
                  type="number"
                  defaultValue={settings[key]}
                  onChange={(e) => {
                    const newSetting = { ...newSettings };
                    // convert to number
                    newSetting[key] = +e.target.value;
                    setNewSettings(newSetting);
                  }}
                />
              </Flex>
            );
          })}
          <Button
            mt="4"
            colorScheme="blue"
            isDisabled={Object.keys(newSettings).length === 0}
            onClick={() => {
              update(newSettings);
            }}
          >
            Update
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

SettingsBtn.propTypes = {
  settings: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
};

export default SettingsBtn;
