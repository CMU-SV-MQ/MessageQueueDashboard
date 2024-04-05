import { Flex, Icon, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

function PageTitle({ title, icon }) {
  return (
    <Flex alignItems="center" my="2rem">
      <Icon as={icon} fontSize="2xl" color="gray.600" />
      <Text fontSize="2xl" fontWeight="700" textColor="gray.600" ml="1rem">
        {title}
      </Text>
    </Flex>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
};

export default PageTitle;
