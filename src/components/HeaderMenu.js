import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import {
  HiMenuAlt2,
  HiOutlineAnnotation,
  HiOutlineDatabase,
  HiOutlineServer,
} from "react-icons/hi";

function HeaderMenu() {
  return (
    <Menu>
      <MenuButton as={Button} colorScheme="blue" leftIcon={<HiMenuAlt2 />}>
        Menu
      </MenuButton>
      <MenuList>
        <MenuItem as="a" icon={<HiOutlineServer />} href="/">
          Cluster Management
        </MenuItem>
        <MenuItem as="a" icon={<HiOutlineAnnotation />} href="/monitor">
          Topic Monitoring
        </MenuItem>
        <MenuItem as="a" icon={<HiOutlineDatabase />} href="/brokerDetail">
          Data Flow
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default HeaderMenu;
