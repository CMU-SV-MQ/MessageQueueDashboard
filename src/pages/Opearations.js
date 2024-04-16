/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineDatabase, HiRefresh } from "react-icons/hi";
import Header from "../components/SideMenu";
import Card from "../components/OperationCard";
import PageTitle from "../components/PageTitle";
import {
  Box,
  Flex,
  Input,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

function Operations() {
  const [topicName, setTopicName] = useState("");
  const [partitionNumber, setPartitionNumber] = useState();
  const [subscribeTopic, setSubscribeTopic] = useState("");
  const [groupId, setGroupId] = useState("");
  const [consumerId, setConsumerId] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [messageTopic, setMessageTopic] = useState("");
  const [consumeGroupId, setConsumeGroupId] = useState("");
  const [consumeConsumerId, setConsumeConsumerId] = useState("");
  const [consumeTopic, setConsumeTopic] = useState("");
  const [messageCount, setMessageCount] = useState();
  const [commitGroupId, setCommitGroupId] = useState("");
  const [commitConsumerId, setCommitConsumerId] = useState("");
  const [commitTopic, setCommitTopic] = useState("");

  useEffect(() => {
    // This is where you'd fetch data from the API
  }, []);

  const handleCreateTopic = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/producer/topic",
        {
          topic: topicName,
          partitionNumber: Number(partitionNumber),
        }
      );
      console.log(response.data); // Handle response appropriately
    } catch (error) {
      console.error("Failed to create topic:", error); // Handle error appropriately
    }
  };

  const handleSubscribeToTopic = async () => {
    const url = `http://localhost:8080/consumerGroup/${groupId}`;
    try {
      const response = await axios.post(url, {
        topic: subscribeTopic,
        groupId: groupId,
        consumerId: consumerId,
      });
      console.log("Subscribe response:", response.data);
    } catch (error) {
      console.error("Failed to subscribe to topic:", error);
    }
  };

  const handlePublishMessage = async () => {
    const url = `http://localhost:8080/producer/messages`;
    try {
      const response = await axios.post(url, {
        partitionkey: "absdcd",
        topic: messageTopic,
        value: messageValue,
      });
      console.log("Publish response:", response.data);
    } catch (error) {
      console.error("Failed to publish message:", error);
    }
  };

  const handleConsumeMessages = async () => {
    const url = `http://localhost:8080/consumerGroup/${consumeGroupId}/consumer/${consumeConsumerId}/topic/${consumeTopic}/messages/${messageCount}`;
    try {
      const response = await axios.get(url);
      console.log("Consume response:", response.data);
    } catch (error) {
      console.error("Failed to consume messages:", error);
    }
  };

  const handleCommitOffset = async () => {
    const url = `http://localhost:8080/consumerGroup/${commitGroupId}/consumer/${commitConsumerId}/topic/${commitTopic}/offsets`;
    try {
      const response = await axios.post(url);
      console.log("Offset commit successful:", response);
    } catch (error) {
      console.error("Failed to commit offsets:", error);
    }
  };

  const sidebarWidth = "210px";
  const pageContentPadding = "1.5rem"; // Increase padding here as necessary

  return (
    <Flex>
      <Header />
      <Box
        ml={sidebarWidth}
        w={`calc(100% - ${sidebarWidth})`}
        p={pageContentPadding}
      >
        {/* Topic Operations Section */}
        <PageTitle title="Topic Related Operations" icon={HiOutlineDatabase} />
        <Box mb={4}>
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <GridItem>
              <Card
                title="Create Topic"
                buttonText="Create"
                onClick={handleCreateTopic}
              >
                <Input
                  placeholder="Topic name"
                  mb="2"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                />
                <NumberInput
                  min={1}
                  value={partitionNumber}
                  onChange={(_, value) => setPartitionNumber(value)}
                >
                  <NumberInputField placeholder="Partition number" />
                </NumberInput>
              </Card>
            </GridItem>
            <GridItem>
              <Card
                title="Subscribe to Topic"
                buttonText="Subscribe"
                onClick={handleSubscribeToTopic}
              >
                <Input
                  placeholder="Topic"
                  mb="2"
                  value={subscribeTopic}
                  onChange={(e) => setSubscribeTopic(e.target.value)}
                />
                <Input
                  placeholder="Group ID"
                  mb="2"
                  value={groupId}
                  onChange={(e) => setGroupId(e.target.value)}
                />
                <Input
                  placeholder="Consumer ID"
                  mb="2"
                  value={consumerId}
                  onChange={(e) => setConsumerId(e.target.value)}
                />
              </Card>
            </GridItem>
          </Grid>
        </Box>

        {/* Message Operations Section */}
        <PageTitle
          title="Message Related Operations"
          icon={HiOutlineDatabase}
        />
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          <GridItem>
            <Card
              title="Publish Message"
              buttonText="Publish"
              onClick={handlePublishMessage}
            >
              <Input
                placeholder="Message value"
                mb="2"
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
              />
              <Input
                placeholder="Topic"
                mb="2"
                value={messageTopic}
                onChange={(e) => setMessageTopic(e.target.value)}
              />
            </Card>
          </GridItem>
          <GridItem>
            <Card
              title="Consume Message"
              buttonText="Consume"
              onClick={handleConsumeMessages}
            >
              <Input
                placeholder="Topic"
                mb="2"
                value={consumeTopic}
                onChange={(e) => setConsumeTopic(e.target.value)}
              />
              <Input
                placeholder="Group ID"
                mb="2"
                value={consumeGroupId}
                onChange={(e) => setConsumeGroupId(e.target.value)}
              />
              <Input
                placeholder="Consumer ID"
                mb="2"
                value={consumeConsumerId}
                onChange={(e) => setConsumeConsumerId(e.target.value)}
              />
              <NumberInput
                min={1}
                value={messageCount}
                onChange={(_, value) => setMessageCount(value)}
              >
                <NumberInputField placeholder="Message count" />
              </NumberInput>
            </Card>
          </GridItem>
          <GridItem>
            <Card
              title="Commit Offset"
              buttonText="Commit"
              onClick={handleCommitOffset}
            >
              <Input
                placeholder="Group ID"
                mb="2"
                value={commitGroupId}
                onChange={(e) => setCommitGroupId(e.target.value)}
              />
              <Input
                placeholder="Consumer ID"
                mb="2"
                value={commitConsumerId}
                onChange={(e) => setCommitConsumerId(e.target.value)}
              />
              <Input
                placeholder="Topic"
                mb="2"
                value={commitTopic}
                onChange={(e) => setCommitTopic(e.target.value)}
              />
            </Card>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
}

export default Operations;
