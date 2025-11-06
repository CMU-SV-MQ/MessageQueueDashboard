/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
// import axios from "axios";
import { HiOutlineServer, HiRefresh } from "react-icons/hi";
import PageTitle from "../components/PageTitle";
// eslint-disable-next-line no-unused-vars
import { Box, VStack, Flex, Button, HStack, Spacer } from "@chakra-ui/react";
import AddBrokerBtn from "../components/AddBrokerBtn";
import BrokerCard from "../components/BrokerCard";
import ResetStrategyBtn from "../components/ResetStrategyBtn";
import Header from "../components/SideMenu";
import secrets from "../config.json";

const proxyUrl = secrets["proxy-url"];

function Dashboard() {
  const [, setLeader] = useState(null);
  const [, setAliveStatus] = useState([]);
  const [brokers, setBrokers] = useState([]);

  const sidebarWidth = "288px";

  const getNextServerIndex = () => {
    if (brokers.length === 0) {
      return 1;
    } else {
      const maxId = Math.max(...brokers.map((broker) => broker.brokerId));
      return maxId + 1;
    }
  };

  const addBroker = async (brokerId) => {
    const serverIndex = getNextServerIndex();
    const requestBody = {
      nodeId: brokerId,
      host: secrets.brokerHostNamePattern.replace("NODEID", brokerId),
      port: secrets.brokerPort,
      groupId: secrets.groupId
    };

    try {
      const response = await fetch(`${proxyUrl}/broker/addBroker`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      // console.log("Server index:", serverIndex);
      // console.log("Brokers:", brokers);
      if (result.success) {
        const newBroker = {
          brokerId: serverIndex,
        };
        setBrokers((prevBrokers) => [...prevBrokers, newBroker]);
      }
      await refreshData();
    } catch (error) {
      console.error("Failed to add broker:", error);
    }
  };

  const stopBroker = async (brokerId) => {
    const requestBody = { nodeId: brokerId, groupId: secrets.groupId };

    try {
      const response = await fetch(`${proxyUrl}/broker/stopBroker`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Network response was not ok");
      }

      console.log(result.message);
      setBrokers((prevBrokers) =>
        // eslint-disable-next-line prettier/prettier
        prevBrokers.filter((broker) => broker.brokerId !== brokerId)
      );
      await refreshData();
    } catch (error) {
      console.error("Failed to stop broker:", error);
    }
  };

  const getBrokerLeader = () => {
    console.log("getBrokerLeader called");
    return fetch(`${proxyUrl}/broker/leader`)
      .then((response) => {
        console.log("getBrokerLeader Response received:", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((leaderData) => {
        console.log("INSIDE getBrokerLeader", leaderData);
        return leaderData;
      })
      .catch((error) => {
        console.error("Failed to get broker leader:", error);
      });
  };

  const checkBrokersAlive = () => {
    console.log("checkBrokersAlive called");
    return fetch(`${proxyUrl}/broker/checkAlive`)
      .then((response) => {
        console.log("checkBrokersAlive Response received:", response);
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((aliveData) => {
        console.log("Parsed data:", aliveData);
        return aliveData;
      })
      .catch((error) => {
        console.error("Failed to check if brokers are alive:", error);
      });
  };

  const refreshData = () => {
    Promise.all([getBrokerLeader(), checkBrokersAlive()])
      .then(([leaderData, aliveData]) => {
        // console.log("Leader:", leaderData);
        // console.log("AliveData:", aliveData);

        setLeader(leaderData);
        setAliveStatus(aliveData);

        const activeBrokers = aliveData.checkAliveList.filter(
          (broker) => broker.isAlive
        );

        const updatedBrokers = activeBrokers.map((node) => {
          return {
            ...node,
            isLeader: node.brokerId.toString() === leaderData.leaderId,
          };
        });
        setBrokers(updatedBrokers);
      })
      .catch((error) => {
        console.error("Error during refresh:", error);
      });
  };

  const resetBrokerStrategy = async (selectedStrategy) => {
    try {
      const endpoint = `${proxyUrl}/broker/brokerStrategy/${selectedStrategy}`;
      const response = await fetch(endpoint, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(
        `Failed to set broker strategy to ${selectedStrategy}:`,
        // eslint-disable-next-line prettier/prettier
        error
      );
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <Flex>
      <Header />
      <VStack
        spacing={4}
        ml={{ base: "0", lg: sidebarWidth }}
        w={{ base: "100%", lg: `calc(100% - ${sidebarWidth})` }}
        p="4"
      >
        <Flex w="100%" px="2rem" flexDirection="column">
          <Flex w="100%" justifyContent="space-between" alignItems="center">
            <PageTitle title="Broker Management" icon={HiOutlineServer} />
            <Spacer />
            <HStack spacing="1rem">
              <Button
                colorScheme="purple"
                variant="ghost"
                size="sm"
                leftIcon={<HiRefresh />}
                onClick={refreshData}
              >
                Refresh
              </Button>
              <ResetStrategyBtn settings={{}} update={resetBrokerStrategy} />
              <AddBrokerBtn addNode={addBroker} />
            </HStack>
          </Flex>
          <Flex w="100%" flexWrap="wrap" justifyContent="start">
            {brokers.map((node) => (
              <BrokerCard
                key={node.brokerId}
                nodeData={node}
                stopBroker={() => stopBroker(node.brokerId)}
              />
            ))}
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default Dashboard;
