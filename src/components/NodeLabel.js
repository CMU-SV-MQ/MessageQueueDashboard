import { Badge } from "@chakra-ui/react";
import PropTypes from "prop-types";

function NodeLabel({ status }) {
  const mapping = {
    healthy: {
      color: "green",
      label: "Healthy",
    },
    unhealthy: {
      color: "yellow",
      label: "Unhealthy",
    },
  };

  // Default status object in case the status is not in the mapping
  const defaultStatusObj = {
    color: "gray",
    label: "Unknown",
  };

  // Get the status object from mapping, or use the default if the status is not in mapping
  const statusObj = mapping[status] || defaultStatusObj;

  return (
    <Badge colorScheme={statusObj.color} variant={"solid"}>
      {statusObj.label}
    </Badge>
  );
}

NodeLabel.propTypes = {
  status: PropTypes.string,
};

export default NodeLabel;
