/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Header from "../components/SideMenu";
import React, { useMemo, useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Handle,
  MiniMap,
} from "reactflow";
import axios from "axios";
import "reactflow/dist/style.css";
import { ChakraProvider, Box, Text } from "@chakra-ui/react";
// import { motion } from "framer-motion";
import GroupNode from "../components/GroupNode";
import secrets from "../config.json";

const proxyHost = secrets["proxy-dns"];
const proxyPort = secrets["proxy-port"];

const columnXPosition = {
  topics: 100,
  consumerGroups: 500,
};
const groupSpacing = 20;

// const MotionBox = motion(Box);

const CustomNode = ({ data }) => {
  const isPartition = data.label.startsWith("P");
  const bgColor = isPartition ? "purple.700" : "purple.100";
  const borderColor = isPartition ? "purple.700" : "purple.100";
  const textColor = isPartition ? "white" : "gray.800";
  return (
    <Box
      width="40px"
      height="40px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
      borderRadius="full"
      border={borderColor}
      boxShadow="md"
      style={{ position: "relative" }}
    >
      <Text fontSize="sm" color={textColor} textAlign="center">
        {data.label}
      </Text>
      <Handle
        type="target"
        position="left"
        id={`${data.id}_left`}
        style={{ visibility: "hidden" }}
      />
      <Handle
        type="source"
        position="right"
        id={`${data.id}_right`}
        style={{ visibility: "hidden" }}
      />
    </Box>
  );
};

// const CustomGroupNode = ({ data }) => {
//   return (
//     <Box
//       p={2}
//       bg="gray.50"
//       border="2px"
//       borderColor="gray.300"
//       borderRadius="md"
//       boxShadow="lg"
//       style={{ width: "100%", position: "relative" }} // Make sure to cover the full width of the parent container
//     >
//       <Text fontSize="md" fontWeight="bold" textAlign="center">
//         {data.label}
//       </Text>
//       {/* Now, child nodes will be positioned within this box by React Flow */}
//     </Box>
//   );
// };

const nodeTypes = {
  custom: CustomNode,
  group: GroupNode,
};

const transformDataToElements = (topics, consumerGroups, relationships) => {
  let currentTopicY = 0;
  let currentConsumerGroupY = 0;

  const nodes = [];
  const edges = [];

  topics.forEach((topic, index) => {
    const topicGroupHeight = (topic.partitions.length + 0.2) * 50;
    nodes.push({
      id: `group_${topic.id}`,
      type: "group",
      position: { x: columnXPosition.topics, y: currentTopicY },
      data: { label: topic.id },
      // label: topic.id,
      // labelStyle: { transform: "translate(0, -100%)", fontWeight: "bold" },
      draggable: false,
      style: {
        // width: "60px",
        height: topicGroupHeight,
        backgroundColor: "gray.50",
        borderColor: "gray.100",
        borderRadius: "md",
        // boxShadow: "lg",
        padding: "2",
      },
    });
    currentTopicY += topicGroupHeight + groupSpacing;

    topic.partitions.forEach((partition, pIndex) => {
      nodes.push({
        id: `${topic.id}_${partition}`,
        type: "custom",
        position: { x: 10, y: pIndex * 50 + 10 },
        data: { label: partition },
        draggable: false,
        parentNode: `group_${topic.id}`,
        extent: "parent",
      });
    });
  });

  consumerGroups.forEach((group, index) => {
    const groupHeight = (group.consumers.length + 0.2) * 50;
    nodes.push({
      id: `group_${group.id}`,
      type: "group",
      position: { x: columnXPosition.consumerGroups, y: currentConsumerGroupY },
      data: { label: group.id },
      draggable: false,
      style: {
        height: groupHeight,
        backgroundColor: "gray.50",
        borderColor: "gray",
        borderRadius: "md",
        boxShadow: "lg",
        padding: "2",
      },
    });

    currentConsumerGroupY += groupHeight + groupSpacing;

    group.consumers.forEach((consumer, cIndex) => {
      const uniqueConsumerId = `${group.id}_${consumer}`;
      nodes.push({
        id: uniqueConsumerId,
        type: "custom",
        position: { x: 10, y: cIndex * 50 + 10 },
        data: { label: consumer },
        draggable: false,
        parentNode: `group_${group.id}`,
        extent: "parent",
      });
    });
  });

  // Create edges for relationships
  relationships.forEach((relation) => {
    const edgeColor = "purple.500";
    const sourceId = `${relation.topic}_${relation.partition}`;
    const targetId = `${relation.consumerGroup}_${relation.consumer}`;

    const edge = {
      id: `e${targetId}-${sourceId}`,
      source: sourceId,
      target: targetId,
      sourceHandle: `${sourceId}_right`,
      targetHandle: `${targetId}_left`,

      style: { stroke: edgeColor },
    };

    console.log("Creating edge:", edge);
    edges.push(edge);
  });

  return { nodes, edges };
};

export default function App() {
  const [data, setData] = useState({
    topics: [],
    consumerGroups: [],
    relationships: [],
  });
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${proxyHost}:${proxyPort}/broker`);
        if (response.data.success) {
          const transformedData = transformApiResponseToData(
            response.data.brokerRes
          );
          setData(transformedData);
        } else {
          console.error("API error:", response.data.error);
        }
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };

    fetchData();
  }, []);

  const transformApiResponseToData = (brokerData) => {
    const topics = [];
    const consumerGroups = [];
    const relationships = [];

    // Process topic partitions
    Object.entries(brokerData.topicPartitions).forEach(
      ([topicName, partitions]) => {
        const topicObj = {
          id: topicName,
          partitions: partitions.map((part) => `P${part.partitionId}`),
        };
        topics.push(topicObj);
      }
    );

    // Process consumer groups
    Object.entries(brokerData.consumerGroups).forEach(
      ([groupId, groupInfo]) => {
        const groupObj = {
          id: groupId,
          consumers: groupInfo.consumerRes.map((consumer) => consumer.memberId),
        };
        consumerGroups.push(groupObj);

        // Build relationships from assignedTopicPartitions
        groupInfo.consumerRes.forEach((consumer) => {
          Object.entries(consumer.assignedTopicPartitions).forEach(
            ([topicName, partitions]) => {
              partitions.forEach((part) => {
                relationships.push({
                  consumerGroup: groupId,
                  consumer: consumer.memberId,
                  topic: topicName,
                  partition: `P${part.partitionId}`,
                  type: "commit", // Assuming 'commit' is the type of relationship
                });
              });
            }
          );
        });
      }
    );

    return { topics, consumerGroups, relationships };
  };

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const elements = transformDataToElements(
      data.topics,
      data.consumerGroups,
      data.relationships
    );
    return elements;
  }, [data]);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  return (
    <ChakraProvider>
      <Header />
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <MiniMap nodeStrokeWidth={3} />
        </ReactFlow>
      </div>
    </ChakraProvider>
  );
}
