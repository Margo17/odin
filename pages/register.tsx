import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { SignUpForm } from "../components/authentication/SignUpForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAuth } from "../Providers/authentication";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "translation",
        "common",
        "messages",
      ])),
    },
  };
}

const register = () => {
  const authState = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (authState.status.type === "success") {
      router.push("/");
    }
  }, [authState]);

  return (
    <Box py={{ base: "12", md: "24" }} maxW="7xl" mx="auto">
      <Stack direction="row" spacing="12">
        <Flex flex="1">
          <SignUpForm />
        </Flex>
        <Center
          flex="1"
          px={{ lg: "8" }}
          display={{ base: "none", lg: "flex" }}
        >
          <VStack spacing="8">
            <Stack direction="row" spacing="3">
              <Icon as={ImQuotesLeft} boxSize="8" mt="-4" />
              <Heading size="sm" fontWeight="medium" textAlign="center">
                What can I say - I fell in love with Chakra UI Pro.
              </Heading>
              <Icon as={ImQuotesRight} boxSize="8" alignSelf="end" />
            </Stack>
            <VStack spacing="4">
              <Avatar
                size="lg"
                src="https://avatars.githubusercontent.com/u/20296626?v=4"
                name="Simon Holzmayer"
              />
              <Stack textAlign="center" spacing="1">
                <Text fontSize="md" fontWeight="medium" color="muted">
                  Simon Holzmayer
                </Text>
                <Text fontWeight="medium" fontSize="sm" color="muted">
                  simon@chakra-ui.com
                </Text>
              </Stack>
            </VStack>
          </VStack>
        </Center>
      </Stack>
    </Box>
  );
};
export default register;
