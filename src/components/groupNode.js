/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import { Box } from "@chakra-ui/react";

const GroupNode = ({ id, data, isConnectable }) => {
  return (
    <Box
      p={2}
      border="2px solid #ddd"
      borderRadius="md"
      boxShadow="base"
      backgroundColor={data.bgColor || "#f0f0f0"}
      position="relative"
      width="fit-content"
      height="fit-content"
    >
      <div
        style={{
          position: "absolute",
          top: -25,
          left: 5,
          // fontWeight: "bold",
          backgroundColor: "#fff",
          padding: "0 4px",
        }}
      >
        {data.label}
      </div>
      {/* <Handle
        type="target"
        position={Position.Left}
        style={{ borderRadius: 0 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ borderRadius: 0 }}
        isConnectable={isConnectable}
      /> */}
    </Box>
  );
};

export default GroupNode;
