"use client";

import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MobileSidebar from "../components/MobileSidebar";
import "../index.css";

const muiTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Scotty Message Queue</title>
        <link rel="icon" href="/MQ_Logo.jpeg" type="image/jpeg" />
        <meta name="description" content="Scotty Message Queue Dashboard" />
      </head>
      <body>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <ChakraProvider>
            {/* 顶部导航栏 - 仅在小屏幕显示 */}
            <Box
              display={{ base: "block", lg: "none" }}
              position="sticky"
              top="0"
              zIndex="40"
              h="16"
              bg="white"
              borderBottom="1px"
              borderColor="gray.200"
              boxShadow="sm"
              _dark={{
                bg: "gray.950",
                borderColor: "gray.800",
              }}
            >
              <Flex h="full" alignItems="center" px="4">
                <MobileSidebar />
              </Flex>
            </Box>
            {children}
          </ChakraProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

