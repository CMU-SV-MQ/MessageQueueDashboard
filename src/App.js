import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// import Monitor from "./pages/Monitor";
import TopicDetail from "./pages/TopicDetail";
import RelationshipView from "./pages/RelationshipView";
import TopicOperations from "./pages/Opearations";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/monitor" element={<Monitor />} /> */}
          <Route path="/topicDetail" element={<TopicDetail />} />
          <Route path="/relationshipView" element={<RelationshipView />} />
          <Route path="/operations" element={<TopicOperations />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
