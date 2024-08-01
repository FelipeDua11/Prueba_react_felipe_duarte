import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const PageLayaout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Flex>
      {/* Barra lateral a la izquierda */}
      {pathname !== "/auth" && (
        <Box w={{ base: "70%", md: "240px" }}>
          <Sidebar />
        </Box>
      )}

      {/* Área principal de contenido */}
      <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}>
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayaout;
