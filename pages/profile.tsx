import React from "react";

import { Flex } from "@chakra-ui/react";
import Shell from "../components/shell";
import UserProfile from "../components/profile/UserProfile";
import ProfileCard from "../components/profile/ProfileCard";
import { useUser } from "../Providers/user";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProfileTabs from "../components/profile/ProfileTabs";
import { UserProvider } from "../Providers/userEdit";

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

const Profile = () => {
  const userState = useUser();

  return (
    <Shell pageName="" pageSubName="">
      {userState?.status.type === "login" && (
        <Flex
          justifyContent="center"
          width="100%"
          maxWidth="1400px"
          flexDirection={{
            base: "column",
            xl: "row",
          }}
          gap={3}
        >
          <Flex flex="1" flexDirection="column">
            <UserProfile
              name={userState.status.data.user.name}
              image={userState.status.data.user.avatarUrl}
              email={userState.status.data.user.email}
            />
            <ProfileTabs />
          </Flex>

          <ProfileCard
            name={userState.status.data.user.name}
            image={userState.status.data.user.avatarUrl}
            email={userState.status.data.user.email}
            id={userState.status.data.user.id}
          />
        </Flex>
      )}
    </Shell>
  );
};

export default Profile;
