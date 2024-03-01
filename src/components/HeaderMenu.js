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
      <MenuButton as={Button} colorScheme="yellow" leftIcon={<HiMenuAlt2 />}>
        Menu
      </MenuButton>
      <MenuList>
        <MenuItem as="a" icon={<HiOutlineServer />} href="/">
          Broker Management
        </MenuItem>
        <MenuItem
          as="a"
          icon={<HiOutlineAnnotation />}
          href="/relationshipView"
        >
          Relationship View
        </MenuItem>
        <MenuItem as="a" icon={<HiOutlineDatabase />} href="/brokerDetail">
          Topic Detail
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default HeaderMenu;
