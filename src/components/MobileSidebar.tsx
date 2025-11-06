"use client";

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  VStack,
  useDisclosure,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  HiOutlineChartBar,
  HiOutlineDocumentText,
  HiOutlineCog,
} from "react-icons/hi";

const navigation = [
  { name: "Relationship View", href: "/relationshipView", icon: HiOutlineChartBar },
  { name: "Topic Detail", href: "/topicDetail", icon: HiOutlineDocumentText },
  { name: "Operations", href: "/operations", icon: HiOutlineCog },
];

function MobileSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* 汉堡菜单按钮 */}
      <IconButton
        icon={<HiMenu />}
        onClick={onOpen}
        variant="ghost"
        aria-label="Open menu"
        size="lg"
        _hover={{ bg: "gray.100" }}
      />

      {/* 抽屉侧边栏 */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Flex alignItems="center" gap="2">
              <Image
                src="/MQ_Logo.jpeg"
                alt="MQ Logo"
                boxSize="32px"
                borderRadius="full"
                objectFit="cover"
              />
              <Text fontSize="md" fontWeight="bold">
                Scotty Message Queue
              </Text>
            </Flex>
          </DrawerHeader>

          <DrawerBody pt="4">
            <VStack spacing="1" align="stretch">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  style={{ textDecoration: "none" }}
                >
                  <Flex
                    alignItems="center"
                    gap="2.5"
                    px="3"
                    py="2"
                    borderRadius="md"
                    fontSize="md"
                    fontWeight="medium"
                    color={isActive(item.href) ? "purple.600" : "gray.700"}
                    bg={isActive(item.href) ? "purple.50" : "transparent"}
                    transition="all 0.2s"
                    cursor="pointer"
                    _hover={{
                      bg: "gray.100",
                      color: isActive(item.href) ? "purple.600" : "gray.900",
                    }}
                  >
                    <Box as={item.icon} boxSize="5" />
                    <Text>{item.name}</Text>
                  </Flex>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MobileSidebar;

