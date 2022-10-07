import { Box, Button, Flex } from "@chakra-ui/react";

import Shell from "../components/shell";
import { useUser } from "../Providers/user";
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

const Index = () => {
  const userState = useUser();
  const authState = useAuth();

  return (
    <Shell pageName="Puslapis Page" pageSubName="Sub comment about page">
      <Button>Click me</Button>
      <Flex>{userState.status.type}</Flex>
      <Flex>{authState.status.type}</Flex>
      <Flex>
        {userState.status.type === "login" && (
          <Button
            onClick={() => {
              authState.logOut();
            }}
          >
            Logout
          </Button>
        )}
        <Button
          onClick={() => {
            console.log("userState");
            console.log(userState);
            console.log("authState");
            console.log(authState);
          }}
        >
          Log State
        </Button>
        <Flex>
          {userState.status.type === "login" && (
            <Button
              onClick={() =>
                userState.status.type === "login" &&
                console.log(userState.status.data)
              }
            >
              Log accounts
            </Button>
          )}
          {/* {userState.status.type === "login" &&
            userState.status.data.accounts.map((item) => (
              <Box key={item.id}>{item.name}</Box>
            ))} */}
        </Flex>
      </Flex>
    </Shell>
  );
};

export default Index;
