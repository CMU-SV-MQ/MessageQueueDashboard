import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Monitor from "./pages/Monitor";
import BrokerDetail from "./pages/BrokerDetail";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/message-queue-admin" element={<Monitor />} />
          <Route path="/data-flow" element={<BrokerDetail />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
