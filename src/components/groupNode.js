/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

// GroupNode component
import { Box } from "@chakra-ui/react";

const GroupNode = ({ data, style }) => {
  return (
    <Box
      p={2}
      border="transparent"
      bgColor="transparent"
      borderRadius="md"
      boxShadow="base"
      position="relative"
      width="fit-content"
      // width={style?.width || "100%"} // Apply width from the style prop or default to 100%
      // height={style?.height || "100%"} // Apply height from the style prop or default to 100%
      backgroundColor={data.bgColor || "#f0f0f0"}
      {...style} // Spread any additional style props
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
