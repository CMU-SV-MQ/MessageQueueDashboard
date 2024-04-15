/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/SideMenu";
import Card from "../components/OperationCard";
import {
  Button,
  VStack,
  Flex,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

function Operations() {
  useEffect(() => {
    // This is where you'd fetch data from the API
  }, []);

  const sidebarWidth = "210px";
  const pageContentPadding = "1.5rem"; // Increase padding here as necessary

  return (
    <Flex>
      <Header />
      <VStack
        spacing={4}
        ml={sidebarWidth}
        w={`calc(100% - ${sidebarWidth})`}
        p={pageContentPadding}
      >
        <Flex w="100%" justify="space-between" wrap="wrap">
          {/* Topic Operations Section */}
          <Card title="Create Topic">
            <Input placeholder="Topic name" mb="2" />
            <NumberInput min={1}>
              <NumberInputField placeholder="Partition number" />
            </NumberInput>
            <Button colorScheme="blue" mt="4">
              Create
            </Button>
          </Card>

          <Card title="Subscribe to Topic">
            <Input placeholder="Topic" mb="2" />
            <Input placeholder="Group ID" mb="2" />
            <Input placeholder="Consumer ID" mb="2" />
            <Button colorScheme="blue">Subscribe</Button>
          </Card>

          {/* Message Operations Section */}
          <Card title="Publish Message">
            <Input placeholder="Message value" mb="2" />
            <Input placeholder="Topic" mb="2" />
            <Button colorScheme="teal">Publish</Button>
          </Card>

          <Card title="Consume Message">
            <Input placeholder="Topic" mb="2" />
            <Input placeholder="Group ID" mb="2" />
            <Input placeholder="Consumer ID" mb="2" />
            <NumberInput min={1}>
              <NumberInputField placeholder="Message count" />
            </NumberInput>
            <Button colorScheme="orange" mt="4">
              Consume
            </Button>
          </Card>

          <Card title="Commit Offset">
            <Input placeholder="Group ID" mb="2" />
            <Input placeholder="Consumer ID" mb="2" />
            <Input placeholder="Topic" mb="2" />
            <Button colorScheme="green">Commit</Button>
          </Card>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default Operations;
