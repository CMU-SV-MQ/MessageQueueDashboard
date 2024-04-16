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
  InputLeftAddon,
  InputGroup,
  Flex,
  Input,
  Grid,
  GridItem,
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
              <Card title="Create Topic" buttonText="Create">
                {/* <InputGroup>
                  <InputLeftAddon>+234</InputLeftAddon>
                  <Input type="tel" placeholder="phone number" />
                </InputGroup> */}
                <Input placeholder="Topic name" mb="2" />
                <NumberInput min={1}>
                  <NumberInputField placeholder="Partition number" />
                </NumberInput>
              </Card>
            </GridItem>
            <GridItem>
              <Card title="Subscribe to Topic" buttonText="Subscribe">
                <Input placeholder="Topic" mb="2" />
                <Input placeholder="Group ID" mb="2" />
                <Input placeholder="Consumer ID" mb="2" />
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
            <Card title="Publish Message" buttonText="Publish">
              <Input placeholder="Message value" mb="2" />
              <Input placeholder="Topic" mb="2" />
            </Card>
          </GridItem>
          <GridItem>
            <Card title="Consume Message" buttonText="Consume">
              <Input placeholder="Topic" mb="2" />
              <Input placeholder="Group ID" mb="2" />
              <Input placeholder="Consumer ID" mb="2" />
              <NumberInput min={1}>
                <NumberInputField placeholder="Message count" />
              </NumberInput>
            </Card>
          </GridItem>
          <GridItem>
            <Card title="Commit Offset" buttonText="Commit">
              <Input placeholder="Group ID" mb="2" />
              <Input placeholder="Consumer ID" mb="2" />
              <Input placeholder="Topic" mb="2" />
            </Card>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
}

export default Operations;
