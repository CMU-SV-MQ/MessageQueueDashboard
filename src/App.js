import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// import Monitor from "./pages/Monitor";
import BrokerDetail from "./pages/BrokerDetail";
import RelationshipView from "./pages/RelationshipView";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/monitor" element={<Monitor />} /> */}
          <Route path="/brokerDetail" element={<BrokerDetail />} />
          <Route path="/relationshipView" element={<RelationshipView />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
