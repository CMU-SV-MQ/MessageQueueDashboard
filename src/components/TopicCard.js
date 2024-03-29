// import PropTypes from "prop-types";
// import { Box, Wrap, WrapItem } from "@chakra-ui/react";
// // import { motion } from "framer-motion";

// // const MotionBox = motion(Box);

// const TopicCard = ({ topic }) => (
//   <Box
//     bg="gray.200"
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
//       {topic.partitions.map((partition) => (
//         <WrapItem key={partition}>
//           <Box
//             bg="purple.300"
//             p={2}
//             border="2px"
//             borderColor="purple.400"
//             borderRadius="md"
//           >
//             {partition}
//           </Box>
//         </WrapItem>
//       ))}
//     </Wrap>
//   </Box>
// );

// TopicCard.propTypes = {
//   topic: PropTypes.shape({
//     partitions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
//   }).isRequired,
// };

// export default TopicCard;
