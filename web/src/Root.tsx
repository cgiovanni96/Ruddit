import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/index/Index";
import Register from "./components/register/Register";

const Root = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </ChakraProvider>
);

export default Root;
