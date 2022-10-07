import * as React from "react";
import Link from "next/link";

import { Avatar, Box, HStack, Text } from "@chakra-ui/react";

interface UserProfileProps {
  name: string;
  image: any;
  email: string;
}

const UserProfile = ({ name, image, email }: UserProfileProps) => {
  return (
    <Link href="/profile" passHref>
      <HStack spacing="3" ps="2">
        <Avatar name={name} src={image} boxSize="10" cursor="pointer" />
        <Box>
          <Text
            color="on-accent"
            fontWeight="medium"
            fontSize="sm"
            cursor="pointer"
          >
            {name}
          </Text>
          <Text color="on-accent-muted" fontSize="sm" cursor="pointer">
            {email}
          </Text>
        </Box>
      </HStack>
    </Link>
  );
};

export default UserProfile;
