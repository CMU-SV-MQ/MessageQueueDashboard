import { HiOutlineServer, HiRefresh } from "react-icons/hi";
import PageTitle from "../components/PageTitle";
import { VStack, Flex, Button, HStack, Spacer } from "@chakra-ui/react";
import AddNodeBtn from "../components/AddNodeBtn";
// import LoadingSpinner from "../components/LoadingSpinner";
import NodeCard from "../components/NodeCard";
// import useSocket from "../hooks/useSocket.js";
// import { getSocketStateColor, getSocketStateString } from "../utils/socket";
import SettingsBtn from "../components/SettingsBtn.js";
import Header from "../components/Header";

function Dashboard() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [socketState, setSocketState] = useState(-1);
  // const [clusterSettings, setClusterSettings] = useState({});
  // const [nodes, setNodes] = useState([]);
  // const socket = useSocket(''); // Placeholder for socket URL

  // Dummy data for the NodeCards
  const dummyNodes = [
    {
      id: 1,
      isLeader: true,
      status: "Active",
      type: "Type A",
      last_heartbeat: Date.now(),
    },
    {
      id: 2,
      isLeader: false,
      status: "Active",
      type: "Type B",
      last_heartbeat: Date.now(),
    },
    {
      id: 3,
      isLeader: false,
      status: "Inactive",
      type: "Type C",
      last_heartbeat: Date.now(),
    },
  ];

  // Dummy killNode function
  const killNode = (nodeId) => {
    console.log(`Killing node ${nodeId}`);
  };

  return (
    <VStack spacing={4}>
      <Header />
      <Flex w="100%" px="2rem" flexDirection="column">
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          <PageTitle title="Nodes Status" icon={HiOutlineServer} />
          <Spacer />
          <HStack spacing="1rem">
            <Button
              colorScheme="blue"
              variant="ghost"
              size="md"
              leftIcon={<HiRefresh />}
            >
              Refresh
            </Button>
            <SettingsBtn settings={{}} update={() => {}} />
            <AddNodeBtn addNode={() => {}} />
          </HStack>
        </Flex>
        <Flex w="100%" flexWrap="wrap" justifyContent="start">
          {dummyNodes.map((node) => (
            <NodeCard
              key={node.id}
              nodeData={node}
              killNode={() => killNode(node.id)}
            />
          ))}
        </Flex>
      </Flex>
    </VStack>
  );
}

export default Dashboard;
