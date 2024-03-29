// import PropTypes from "prop-types";
// import { Box, Wrap, WrapItem } from "@chakra-ui/react";
// import { motion } from "framer-motion";

// const MotionBox = motion(Box);

// const ConsumerGroupCard = ({ group }) => (
//   <MotionBox
//     bg="blue.100"
//     p={4}
//     borderRadius="md"
//     boxShadow="base"
//     layout
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//   >
//     <Wrap spacing="10px">
//       {group.consumers.map((consumer) => (
//         <WrapItem key={consumer}>
//           <Box
//             bg="purple.200"
//             p={2}
//             border="2px"
//             borderColor="purple.300"
//             borderRadius="md"
//           >
//             {consumer}
//           </Box>
//         </WrapItem>
//       ))}
//     </Wrap>
//   </MotionBox>
// );

// ConsumerGroupCard.propTypes = {
//   group: PropTypes.shape({
//     consumers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
//   }).isRequired,
// };

// export default ConsumerGroupCard;
