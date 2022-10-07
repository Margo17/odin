import { useState } from "react";

import { useRouter } from "next/router";
import { useUser } from "../../Providers/user";
import UserProfile from "../authentication/UserProfile";

import { Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiBarChart2,
  FiBookmark,
  FiCheckSquare,
  FiHelpCircle,
  FiHome,
  FiSearch,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { Logo } from "../Logo";
import NavButton from "./NavButton";
import { DarkModeSwitch } from "../DarkModeSwitch";
import CreateAccountForm from "../account/CreateAccountForm";

const Sidebar = () => {
  const router = useRouter();
  const userState = useUser();
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Flex
      flex="1"
      bg="bg-accent"
      color="on-accent"
      overflowY="auto"
      maxW={{ base: "", lg: "xs" }}
      py={{ base: "6", sm: "8" }}
      px={{ base: "4", sm: "6" }}
    >
      <Stack justify="space-between" spacing="1">
        <Stack spacing={{ base: "5", sm: "6" }} shouldWrapChildren>
          <Flex justifyContent="space-between">
            <Logo />
            <DarkModeSwitch />
          </Flex>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="on-accent" boxSize="5" />
            </InputLeftElement>
            <Input placeholder="Search" variant="filled" colorScheme="blue" />
          </InputGroup>
          <Stack spacing="1">
            <NavButton
              label="Components"
              icon={FiHome}
              onClick={() => router.push("/components")}
            />
            <NavButton
              label="Dashboard"
              icon={FiBarChart2}
              aria-current="page"
              onClick={() => router.push("/dashboard")}
            />
            <NavButton label="Tasks" icon={FiCheckSquare} />
            <NavButton label="Bookmarks" icon={FiBookmark} />
            <NavButton label="Users" icon={FiUsers} />
          </Stack>
        </Stack>
        <Stack spacing={{ base: "5", sm: "6" }}>
          <Stack spacing="1">
            <NavButton label="Help" icon={FiHelpCircle} />
            <NavButton label="Settings" icon={FiSettings} />
          </Stack>
          {hasAccount === null && (
            <Box bg="bg-accent-subtle" px="4" py="5" borderRadius="lg">
              <Stack spacing="4">
                <Stack spacing="1">
                  <Text fontSize="sm" fontWeight="medium">
                    You have no exchanges.
                  </Text>
                  <Text fontSize="sm" color="on-accent-muted">
                    Create an exchange account and start tracking your activity.
                  </Text>
                </Stack>
                <HStack spacing="3">
                  <Button
                    variant="link-on-accent"
                    size="sm"
                    color="on-accent-muted"
                    onClick={() => setHasAccount(true)}
                  >
                    Dismiss
                  </Button>
                  <Button
                    variant="link-on-accent"
                    size="sm"
                    onClick={() => {
                      setHasAccount(false);
                      onOpen();
                    }}
                  >
                    Create Account
                  </Button>
                </HStack>
              </Stack>
            </Box>
          )}
          <CreateAccountForm
            onOpen={onOpen}
            onClose={onClose}
            isOpen={isOpen}
          />
          <Divider borderColor="bg-accent-subtle" />
          {userState.status.type === "login" && (
            <UserProfile
              name={userState.status.data.user.name}
              image={userState.status.data.user.avatarUrl}
              email={userState.status.data.user.email}
            />
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Sidebar;
