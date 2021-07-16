import {
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Text
} from '@chakra-ui/react';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

import Logo from '@/components/Logo';
import Link from '@/components/Link';
import { useAppContext } from '@/context';

const Header = () => {
  const {
    state: { user },
    methods: { onLogOut }
  } = useAppContext();

  return (
    <Box
      alignItems="center"
      bg="purple.500"
      display="flex"
      justifyContent="space-between"
      color="white"
      as="header"
      px={3}
      py={2}
      mb={8}
    >
      <Logo variant="white" />
      {user && (
        <Menu placement="bottom-end">
          {({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                rightIcon={
                  isOpen ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />
                }
                variant="ghost"
                colorScheme="whiteAlpha"
                _focus={{
                  outline: 0
                }}
                py={4}
              >
                <Box as="span" display="flex" alignItems="center">
                  <Avatar mr={2} src={user.avatar} name={user.displayName} />
                  <Text color="white">{user.displayName}</Text>
                </Box>
              </MenuButton>
              <MenuList color="purple.500" textAlign="right">
                <MenuItem as={Box}>
                  <Link width="100%" display="block" href="/">
                    Home
                  </Link>
                </MenuItem>
                <MenuItem as={Box}>
                  <Link width="100%" display="block" href="/playlists">
                    Playlists
                  </Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      )}
    </Box>
  );
};

export default Header;
