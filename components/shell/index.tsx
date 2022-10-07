import { ReactNode, useEffect } from "react";

import {
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../../Providers/authentication";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
  pageName: string;
  pageSubName: string;
}

const Shell = ({ children, pageName, pageSubName }: Props) => {
  const router = useRouter();
  const authState = useAuth();

  useEffect(() => {
    if (
      authState.status.type === "error" ||
      authState.status.type === "initial"
    ) {
      // router.push("/login");
    }
  }, [authState.status.type]);

  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Flex
      as="section"
      direction={{ base: "column", lg: "row" }}
      height="100vh"
      bg="bg-canvas"
      overflowY="auto"
    >
      {isDesktop ? <Sidebar /> : <Navbar />}
      <Container py="8" flex="1">
        <Stack spacing={{ base: "8", lg: "6" }}>
          <Stack
            spacing="4"
            direction={{ base: "column", lg: "row" }}
            justify="space-between"
            align={{ base: "start", lg: "center" }}
          >
            <Stack spacing="1">
              <Heading
                size={useBreakpointValue({ base: "xs", lg: "sm" })}
                fontWeight="medium"
              >
                {pageName}
              </Heading>
              <Text color="muted">{pageSubName}</Text>
            </Stack>
            {/* <HStack spacing="3">
              <Button
                variant="secondary"
                leftIcon={<FiDownloadCloud fontSize="1.25rem" />}
              >
                Download
              </Button>
              <Button variant="primary">Create</Button>
            </HStack> */}
          </Stack>
          {children}
        </Stack>
      </Container>
    </Flex>
  );
};
export default Shell;
