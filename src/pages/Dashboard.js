import { useState, useEffect } from "react";
import { HiOutlineServer, HiRefresh } from "react-icons/hi";
import PageTitle from "../components/PageTitle";
import { VStack, Flex, Button, HStack, Spacer } from "@chakra-ui/react";
import AddBrokerBtn from "../components/AddBrokerBtn.js";
// import LoadingSpinner from "../components/LoadingSpinner";
import BrokerCard from "../components/BrokerCard.js";
// import useSocket from "../hooks/useSocket.js";
// import { getSocketStateColor, getSocketStateString } from "../utils/socket";
import SettingsBtn from "../components/ResetStrategyBtn.js";
import Header from "../components/Header";

function Dashboard() {
  const [, setLeader] = useState(null);
  const [, setAliveStatus] = useState([]);
  const [brokers, setBrokers] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [socketState, setSocketState] = useState(-1);
  // const [clusterSettings, setClusterSettings] = useState({});
  // const [nodes, setNodes] = useState([]);
  // const socket = useSocket(''); // Placeholder for socket URL

  // Dummy data for the NodeCards
  // const dummyNodes = [
  //   {
  //     id: 1,
  //     isLeader: true,
  //     status: "Active",
  //     type: "Type A",
  //     last_heartbeat: Date.now(),
  //   },
  //   {
  //     id: 2,
  //     isLeader: false,
  //     status: "Active",
  //     type: "Type B",
  //     last_heartbeat: Date.now(),
  //   },
  //   {
  //     id: 3,
  //     isLeader: false,
  //     status: "Inactive",
  //     type: "Type C",
  //     last_heartbeat: Date.now(),
  //   },
  // ];

  const addBroker = async (serverIndex) => {
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
    } catch (error) {
      console.error("Failed to add broker:", error);
    }
  };

  const stopBroker = async (serverIndex) => {
    const requestBody = {
      serverIndex,
    };

    try {
      const response = await fetch("http://localhost:8080/broker/stopBroker", {
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
    } catch (error) {
      console.error("Failed to stop broker:", error);
    }
  };

  const getBrokerLeader = async () => {
    try {
      const response = await fetch("http://localhost:8080/broker/leader");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const leaderData = await response.json();
      return leaderData;
    } catch (error) {
      console.error("Failed to get broker leader:", error);
    }
  };

  const checkBrokersAlive = async () => {
    try {
      const response = await fetch("http://localhost:8080/broker/checkAlive");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const aliveData = await response.json();
      return aliveData;
    } catch (error) {
      console.error("Failed to check if brokers are alive:", error);
    }
  };

  const refreshData = async () => {
    // Show a loading indicator here if you have one
    try {
      const [leaderData, aliveData] = await Promise.all([
        getBrokerLeader(),
        checkBrokersAlive(),
      ]);

      setLeader(leaderData);
      setAliveStatus(aliveData);

      // Assuming aliveData is an array with the status of each node,
      // you would transform it to match your nodes state structure and update it:
      const updatedNodes = aliveData.map((node) => {
        return {
          ...node,
          isLeader: node.id === leaderData.id, // Compare with leaderData to set the leader flag
        };
      });
      setBrokers(updatedNodes); // Update your nodes state with the new data
    } catch (error) {
      console.error("Error during refresh:", error);
      // Handle the error, for example by showing a notification to the user
    } finally {
      // Hide loading indicator here if you showed one
    }
  };

  useEffect(() => {
    refreshData(); // This will load initial data when the dashboard is first loaded
  }, []); // The empty array ensures this effect only runs once on mount

  return (
    <VStack spacing={4}>
      <Header />
      <Flex w="100%" px="2rem" flexDirection="column">
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          <PageTitle title="Broker Status" icon={HiOutlineServer} />
          <Spacer />
          <HStack spacing="1rem">
            <Button
              colorScheme="blue"
              variant="ghost"
              size="md"
              leftIcon={<HiRefresh />}
              onClick={refreshData}
            >
              Refresh
            </Button>
            <SettingsBtn settings={{}} update={() => {}} />
            <AddBrokerBtn addNode={addBroker} />
          </HStack>
        </Flex>
        <Flex w="100%" flexWrap="wrap" justifyContent="start">
          {brokers.map((node) => (
            <BrokerCard
              key={node.id}
              nodeData={node}
              stopBroker={() => stopBroker(node.id)}
            />
          ))}
        </Flex>
      </Flex>
    </VStack>
  );
}

export default Dashboard;
