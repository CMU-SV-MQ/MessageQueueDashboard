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
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import secrets from "../config.json";

const proxyUrl = secrets["proxy-url"];

function Operations() {
  const toast = useToast();
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

  const showSuccessToast = (operation, details) => {
    toast({
      title: `${operation} successful`,
      description: details,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const handleCreateTopic = async () => {
    try {
      const response = await axios.post(
        `${proxyUrl}/producer/topic`,
        {
          topic: topicName,
          partitionNumber: Number(partitionNumber),
        }
      );
      console.log(response.data);
      showSuccessToast(
        "Create Topic",
        `Topic ${topicName} with ${partitionNumber} partitions created successfully.`
      );
    } catch (error) {
      console.error("Failed to create topic:", error);
      toast({
        title: "Failed to create topic",
        description: error.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleSubscribeToTopic = async () => {
    const url = `${proxyUrl}/consumerGroup/${groupId}`;
    try {
      const response = await axios.post(url, {
        topic: subscribeTopic,
        groupId: groupId,
        consumerId: consumerId,
      });
      console.log("Subscribe response:", response.data);
      showSuccessToast(
        "Subscribe to Topic",
        `Subscribed to ${subscribeTopic} in group ${groupId} with consumer ID ${consumerId}.`
      );
    } catch (error) {
      console.error("Failed to subscribe to topic:", error);
    }
  };

  const handlePublishMessage = async () => {
    const url = `${proxyUrl}/producer/messages`;
    try {
      const response = await axios.post(url, {
        partitionKey: "absdcd", // Note: property names should be in camelCase
        topic: messageTopic,
        value: messageValue,
      });
      console.log("Publish response:", response.data);
      showSuccessToast(
        "Publish Message",
        `Message published to topic ${messageTopic} with value: "${messageValue}".`
      );
    } catch (error) {
      console.error("Failed to publish message:", error);
      toast({
        title: "Failed to publish message",
        description: error.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleConsumeMessages = async () => {
    const url = `${proxyUrl}/consumerGroup/${consumeGroupId}/consumer/${consumeConsumerId}/topic/${consumeTopic}/messages/${messageCount}`;
    try {
      const response = await axios.get(url);
      console.log("Consume response:", response.data);
      showSuccessToast(
        "Consume Messages",
        `Consumed ${messageCount} messages from topic ${consumeTopic} for consumer ID ${consumeConsumerId}.`
      );
    } catch (error) {
      console.error("Failed to consume messages:", error);
      toast({
        title: "Failed to consume messages",
        description: error.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleCommitOffset = async () => {
    const url = `${proxyUrl}/consumerGroup/${commitGroupId}/consumer/${commitConsumerId}/topic/${commitTopic}/offsets`;
    try {
      const response = await axios.post(url);
      console.log("Offset commit successful:", response);
      showSuccessToast(
        "Commit Offset",
        `Offsets committed for topic ${commitTopic} with consumer ID ${commitConsumerId}.`
      );
    } catch (error) {
      console.error("Failed to commit offsets:", error);
      toast({
        title: "Failed to commit offsets",
        description: error.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const sidebarWidth = "210px";
  const pageContentPadding = "1.5rem"; // Increase padding here as necessary
  const fixedAddonWidth = "120px";

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
                <InputGroup mb="2">
                  <InputLeftAddon width={fixedAddonWidth}>
                    Topic Name
                  </InputLeftAddon>
                  <Input
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                  />
                </InputGroup>
                <InputGroup mb="2">
                  <InputLeftAddon width={fixedAddonWidth}>
                    Partitions
                  </InputLeftAddon>
                  <NumberInput
                    min={1}
                    value={partitionNumber}
                    onChange={(_, value) => setPartitionNumber(value)}
                    flex="1"
                  >
                    <NumberInputField />
                  </NumberInput>
                </InputGroup>
              </Card>
            </GridItem>
            <GridItem>
              <Card
                title="Subscribe to Topic"
                buttonText="Subscribe"
                onClick={handleSubscribeToTopic}
              >
                <InputGroup mb="2">
                  <InputLeftAddon width={fixedAddonWidth}>Topic</InputLeftAddon>
                  <Input
                    value={subscribeTopic}
                    onChange={(e) => setSubscribeTopic(e.target.value)}
                  />
                </InputGroup>
                <InputGroup mb="2">
                  <InputLeftAddon width={fixedAddonWidth}>
                    Group ID
                  </InputLeftAddon>
                  <Input
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                  />
                </InputGroup>
                <InputGroup mb="2">
                  <InputLeftAddon width={fixedAddonWidth}>
                    Consumer ID
                  </InputLeftAddon>
                  <Input
                    value={consumerId}
                    onChange={(e) => setConsumerId(e.target.value)}
                  />
                </InputGroup>
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
              <InputGroup mb="2">
                <InputLeftAddon width={fixedAddonWidth}>Message</InputLeftAddon>
                <Input
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                />
              </InputGroup>
              <InputGroup mb="2">
                <InputLeftAddon width={fixedAddonWidth}>Topic</InputLeftAddon>
                <Input
                  value={messageTopic}
                  onChange={(e) => setMessageTopic(e.target.value)}
                />
              </InputGroup>
            </Card>
          </GridItem>
          <GridItem>
            <Card
              title="Consume Message"
              buttonText="Consume"
              onClick={handleConsumeMessages}
            >
              <InputGroup mb="2">
                <InputLeftAddon width={fixedAddonWidth}>Topic</InputLeftAddon>
                <Input
                  value={consumeTopic}
                  onChange={(e) => setConsumeTopic(e.target.value)}
                />
              </InputGroup>
              <InputGroup mb="2">
                <InputLeftAddon width={fixedAddonWidth}>
                  Group ID
                </InputLeftAddon>
                <Input
                  value={consumeGroupId}
                  onChange={(e) => setConsumeGroupId(e.target.value)}
                />
              </InputGroup>
              <InputGroup mb="2">
                <InputLeftAddon width={fixedAddonWidth}>
                  Consumer ID
                </InputLeftAddon>
                <Input
                  value={consumeConsumerId}
                  onChange={(e) => setConsumeConsumerId(e.target.value)}
                />
              </InputGroup>
              <InputGroup mb="2">
                <InputLeftAddon width={fixedAddonWidth}>
                  Msg Count
                </InputLeftAddon>
                <NumberInput
                  min={1}
                  value={messageCount}
                  onChange={(_, value) => setMessageCount(value)}
                >
                  <NumberInputField />
                </NumberInput>
              </InputGroup>
            </Card>
          </GridItem>
          <GridItem>
            <Card
              title="Commit Offset"
              buttonText="Commit"
              onClick={handleCommitOffset}
            >
              <InputGroup mb="2">
                <InputLeftAddon width={fixedAddonWidth}>
                  Group ID
                </InputLeftAddon>
                <Input
                  value={commitGroupId}
                  onChange={(e) => setCommitGroupId(e.target.value)}
                />
              </InputGroup>
              <InputGroup mb="2">
                <InputLeftAddon width={fixedAddonWidth}>
                  Consumer ID
                </InputLeftAddon>
                <Input
                  value={commitConsumerId}
                  onChange={(e) => setCommitConsumerId(e.target.value)}
                />
              </InputGroup>
              <InputGroup mb="2">
                <InputLeftAddon width={fixedAddonWidth}>Topic</InputLeftAddon>
                <Input
                  value={commitTopic}
                  onChange={(e) => setCommitTopic(e.target.value)}
                />
              </InputGroup>
            </Card>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
}

export default Operations;
