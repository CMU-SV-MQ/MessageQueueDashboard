import { useState, useEffect } from "react";
// import axios from "axios";
import { HiOutlineServer, HiRefresh } from "react-icons/hi";
import PageTitle from "../components/PageTitle";
import { VStack, Flex, Button, HStack, Spacer } from "@chakra-ui/react";
import AddBrokerBtn from "../components/AddBrokerBtn.js";
import BrokerCard from "../components/BrokerCard.js";
import ResetStrategyBtn from "../components/ResetStrategyBtn.js";
import Header from "../components/Header";

function Dashboard() {
  const [, setLeader] = useState(null);
  const [, setAliveStatus] = useState([]);
  const [brokers, setBrokers] = useState([]);

  const getNextServerIndex = () => {
    if (brokers.length === 0) {
      return 1;
    } else {
      const maxId = Math.max(...brokers.map((broker) => broker.brokerId));
      return maxId + 1;
    }
  };

  const addBroker = async () => {
    const serverIndex = getNextServerIndex();
    const requestBody = {
      serverIndex,
    };

    try {
      const response = await fetch("http://localhost:8080/broker/addBroker", {
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
    } catch (error) {
      console.error("Failed to add broker:", error);
    }
  };

  const stopBroker = async (brokerId) => {
    const requestBody = { serverIndex: brokerId };

    try {
      const response = await fetch("http://localhost:8080/broker/stopBroker", {
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
      // await refreshData();
    } catch (error) {
      console.error("Failed to stop broker:", error);
    }
  };

  const getBrokerLeader = () => {
    console.log("getBrokerLeader called");
    return fetch("http://localhost:8080/broker/leader")
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
    return fetch("http://localhost:8080/broker/checkAlive")
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
        console.log("Leader:", leaderData);
        console.log("AliveData:", aliveData);

        setLeader(leaderData);
        setAliveStatus(aliveData);

        const updatedNodes = aliveData.checkAliveList.map((node) => {
          return {
            ...node,
            isLeader: node.brokerId.toString() === leaderData.leaderId,
          };
        });
        setBrokers(updatedNodes);
      })
      .catch((error) => {
        console.error("Error during refresh:", error);
      });
  };

  const resetBrokerStrategy = async (selectedStrategy) => {
    try {
      const endpoint = `http://localhost:8080/broker/brokerStrategy/${selectedStrategy}`;
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
    <VStack spacing={4}>
      <Header />
      <Flex w="100%" px="2rem" flexDirection="column">
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          <PageTitle
            title="Broker Status"
            colorScheme="yellow"
            icon={HiOutlineServer}
          />
          <Spacer />
          <HStack spacing="1rem">
            <Button
              colorScheme="purple"
              variant="ghost"
              size="md"
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
  );
}

export default Dashboard;
