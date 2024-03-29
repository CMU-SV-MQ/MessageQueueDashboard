// import Header from "../components/Header";
// import ConsumerCard from "../components/ConsumerCard";
// import TopicCard from "../components/TopicCard";
// import {
//   Box,
//   Grid,
//   GridItem,
//   Center,
//   Text,
//   VStack,
//   Button,
//   Stack,
// } from "@chakra-ui/react";

// // dummy data
// const topics = [
//   { id: "topic0", partitions: ["P0", "P1", "P2", "P3"] },
//   { id: "topic1", partitions: ["P0", "P1", "P2"] },
// ];

// const consumerGroups = [
//   { id: "consumerGroup0", consumers: ["c1", "c2"] },
//   { id: "consumerGroup1", consumers: ["c3", "c4", "c5"] },
// ];

// // Monitor component
// function Monitor() {
//   return (
//     <Box>
//       <Header />
//       <br></br>
//       <Stack direction="row" align="center">
//         <Box mr={6}></Box>
//         <a href="/relationshipView">
//           <Button colorScheme="blue" size="sm" variant="outline">
//             Relationship View
//           </Button>
//         </a>
//       </Stack>
//       <Grid templateColumns="repeat(2, 1fr)" gap={6} p={6}>
//         <GridItem>
//           <Center>
//             <Text fontSize="2xl" as="b" mb={4}>
//               Topics
//             </Text>
//           </Center>
//           <VStack spacing={4}>
//             {topics.map((topic) => (
//               <TopicCard key={topic.id} topic={topic} />
//             ))}
//           </VStack>
//         </GridItem>
//         <GridItem>
//           <Center>
//             <Text fontSize="2xl" as="b" mb={4}>
//               Consumers
//             </Text>
//           </Center>
//           <VStack spacing={4}>
//             {consumerGroups.map((group) => (
//               <ConsumerCard key={group.id} group={group} />
//             ))}
//           </VStack>
//         </GridItem>
//       </Grid>
//     </Box>
//   );
// }

// export default Monitor;
