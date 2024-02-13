import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MessageQueueAdmin from "./pages/MessageQueueAdmin";
import DataFlow from "./pages/DataFlow";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/message-queue-admin" element={<MessageQueueAdmin />} />
          <Route path="/data-flow" element={<DataFlow />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
