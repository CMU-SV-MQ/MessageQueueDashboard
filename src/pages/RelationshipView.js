/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Header from "../components/Header";
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

const columnXPosition = {
  topics: 100,
  consumerGroups: 500,
};
const groupSpacing = 20;

// const MotionBox = motion(Box);

const CustomNode = ({ data }) => {
  const isPartition = data.label.startsWith("P");
  const bgColor = isPartition ? "gray.300" : "gray.400";
  const borderColor = isPartition ? "gray.300" : "gray.400";
  return (
    <Box
      width="100%"
      bg={bgColor}
      p={2}
      border="2px"
      borderColor={borderColor}
      borderRadius="md"
      boxShadow="md"
      layout
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ position: "relative" }}
    >
      <Text fontSize="sm" textAlign="center">
        {data.label}
      </Text>
      <Handle
        type="target"
        position="left"
        id={`${data.id}_left`}
        style={{ top: "50%", borderRadius: 0, background: "#555" }} // Handles can also be styled to match
      />
      <Handle
        type="source"
        position="right"
        id={`${data.id}_right`}
        style={{ top: "50%", borderRadius: 0, background: "#555" }}
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
    const edgeColor = relation.type === "stash" ? "orange" : "green";
    const sourceId = `${relation.topic}_${relation.partition}`;
    const targetId = `${relation.consumerGroup}_${relation.consumer}`;

    const edge = {
      id: `e${targetId}-${sourceId}`,
      source: sourceId,
      target: targetId,
      sourceHandle: `${sourceId}_right`,
      targetHandle: `${targetId}_left`,
      label: relation.type,
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
        const response = await axios.get("http://localhost:8080/broker");
        if (response.data.success) {
          const transformedData = transformApiResponseToData(
            response.data.broker
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
    // Initialize structures to hold our topics, consumer groups, and relationships
    const topics = [];
    const consumerGroups = [];
    const relationships = [];
    const topicPartitionsSet = new Set();

    // Process topic partitions
    brokerData.topicPartitions.forEach((topicPartition) => {
      const topicObj = { id: topicPartition.topic, partitions: [] };

      topicPartition.partitions.forEach((partition) => {
        const partitionKey = `P${partition.partitionId}`;
        topicObj.partitions.push(partitionKey);
        // Keep track of unique topic-partition combinations
        topicPartitionsSet.add(`${topicPartition.topic}_${partitionKey}`);
      });

      topics.push(topicObj);
    });

    // Process consumer groups
    brokerData.consumerGroups.forEach((group) => {
      const groupObj = { id: group.consumerGroupId, consumers: [] };

      group.consumers.forEach((consumer) => {
        groupObj.consumers.push(consumer.memberId);

        consumer.topicPartitions.forEach((tp) => {
          tp.partitions.forEach((partition) => {
            const partitionKey = `P${partition.partitionId}`;
            if (topicPartitionsSet.has(`${tp.topic}_${partitionKey}`)) {
              relationships.push({
                consumerGroup: group.consumerGroupId,
                consumer: consumer.memberId,
                topic: tp.topic,
                partition: partitionKey,
                type: "commit",
              });
            }
          });
        });
      });

      consumerGroups.push(groupObj);
    });

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
