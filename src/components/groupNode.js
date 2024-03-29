/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import { Box } from "@chakra-ui/react";

const GroupNode = ({ data }) => {
  return (
    <Box
      p={2}
      border="2px solid #ddd"
      borderRadius="md"
      boxShadow="base"
      // backgroundColor={data.bgColor || "#f0f0f0"}
      position="relative"
      // width="fit-content"
      // height="fit-content"
    >
      <div
        style={{
          position: "absolute",
          top: -25,
          left: 5,
          backgroundColor: "#fff",
          padding: "0 4px",
        }}
      >
        {data.label}
      </div>
    </Box>
  );
};

export default GroupNode;
