// import { VStack, Link, Flex, CloseButton } from "@chakra-ui/react";
// import PropTypes from "prop-types";

// const SidebarMenu = ({ showMenu, setShowMenu }) => {
//   return (
//     <Flex
//       direction="column"
//       w="200px"
//       h="100vh"
//       bg="white"
//       p="5"
//       display={showMenu ? "block" : "none"}
//       position="fixed" // Make it fixed to overlay content
//       zIndex="overlay" // Ensure it's above other content
//     >
//       <CloseButton alignSelf="flex-end" onClick={() => setShowMenu(false)} />
//       <VStack mt="2rem" spacing="1rem" align="stretch">
//         <Link href="/" p="2">
//           Broker Management
//         </Link>
//         <Link href="/relationshipView" p="2">
//           Relationship View
//         </Link>
//         <Link href="/topicDetail" p="2">
//           Topic Detail
//         </Link>
//       </VStack>
//     </Flex>
//   );
// };

// SidebarMenu.propTypes = {
//   showMenu: PropTypes.bool.isRequired,
//   setShowMenu: PropTypes.func.isRequired,
// };

// export default SidebarMenu;
