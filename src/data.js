/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
const apiResponse = {
  success: true,
  error: null,
  consumerGroup: {
    consumerGroupId: "g0",
    consumers: [
      {
        memberId: "c0",
        priority: 0,
        topicPartitions: [
          { topic: "t0", partitions: [{ partition_id: 0, messages: [] }] },
          { topic: "t1", partitions: [{ partition_id: 1, messages: [] }] },
          { topic: "t3", partitions: [{ partition_id: 0, messages: [] }] },
        ],
      },
      {
        memberId: "c1",
        priority: 0,
        topicPartitions: [
          { topic: "t0", partitions: [{ partition_id: 1, messages: [] }] },
          { topic: "t2", partitions: [{ partition_id: 0, messages: [] }] },
          { topic: "t3", partitions: [{ partition_id: 1, messages: [] }] },
        ],
      },
      {
        memberId: "c2",
        priority: 0,
        topicPartitions: [
          { topic: "t1", partitions: [{ partition_id: 0, messages: [] }] },
          { topic: "t2", partitions: [{ partition_id: 1, messages: [] }] },
        ],
      },
    ],
  },
};

// Helper to generate unique topic-partition keys
const generateTopicPartitionKey = (topic, partition) =>
  `${topic}_P${partition}`;

// Step 1: Extract Topics and Partitions Dynamically
let topics = [];
const topicPartitionsSet = new Set();

apiResponse.consumerGroup.consumers.forEach((consumer) => {
  consumer.topicPartitions.forEach((tp) => {
    tp.partitions.forEach((partition) => {
      const key = generateTopicPartitionKey(tp.topic, partition.partition_id);
      if (!topicPartitionsSet.has(key)) {
        topicPartitionsSet.add(key);
        // Add to topics if new
        let topicObj = topics.find((t) => t.id === tp.topic);
        if (!topicObj) {
          topicObj = { id: tp.topic, partitions: [] };
          topics.push(topicObj);
        }
        topicObj.partitions.push(`P${partition.partition_id}`);
      }
    });
  });
});

// Step 2: Format Consumer Groups Dynamically
const consumerGroups = [
  {
    id: apiResponse.consumerGroup.consumerGroupId,
    consumers: apiResponse.consumerGroup.consumers.map(
      (consumer) => consumer.memberId
    ),
  },
];

// Step 3: Generate Relationships Dynamically
const relationships = [];

apiResponse.consumerGroup.consumers.forEach((consumer) => {
  consumer.topicPartitions.forEach((tp) => {
    tp.partitions.forEach((partition) => {
      relationships.push({
        consumerGroup: apiResponse.consumerGroup.consumerGroupId,
        consumer: consumer.memberId,
        topic: tp.topic,
        partition: `P${partition.partition_id}`,
        type: "commit",
      });
    });
  });
});

export { topics, consumerGroups, relationships };
