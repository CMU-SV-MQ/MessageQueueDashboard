export const topics = [
  { id: "topic0", partitions: ["P0", "P1", "P2", "P3"] },
  { id: "topic1", partitions: ["P0", "P1", "P2"] },
];

export const consumerGroups = [
  { id: "consumerGroup0", consumers: ["consumer1", "consumer2"] },
  { id: "consumerGroup1", consumers: ["consumer3", "consumer4", "consumer5"] },
];

export const relationships = [
  { consumer: "consumer1", topic: "topic0", partition: "P0", type: "commit" },
  { consumer: "consumer2", topic: "topic1", partition: "P1", type: "stash" },
  { consumer: "consumer3", topic: "topic0", partition: "P2", type: "commit" },
  { consumer: "consumer4", topic: "topic1", partition: "P0", type: "stash" },
  { consumer: "consumer5", topic: "topic1", partition: "P2", type: "commit" },
];
