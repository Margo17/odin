import {
  Avatar,
  Box,
  Flex,
  Text,
  WrapItem,
  Heading,
  HStack,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { HiMail } from "react-icons/hi";
import Socials from "./Socials";

interface UserProfileProps {
  name: string;
  image?: string;
  email: string;
}

const UserProfilePage = (userData: UserProfileProps) => {
  return (
    <Flex>
      <WrapItem w="100%">
        <Box
          w={{
            base: "100%",
          }}
          color="gray.300"
          border="1px"
          borderColor="gray.100"
          borderRadius="lg"
          p="6"
          pt="4vh"
          pb="4vh"
          background="whiteAlpha.900"
          boxShadow="lg"
        >
          <Flex
            alignItems="center"
            flexDir={{ md: "row", base: "column", sm: "column" }}
            gap={4}
          >
            <Box p={{ lg: "20px", md: "10px" }}>
              <Avatar
                size="2xl"
                name={userData.email}
                src={userData.image || userData.name}
              />
            </Box>
            <Flex>
              <Box color="blackAlpha.700">
                <Heading
                  fontSize={{ md: "2xl", sm: "2xl" }}
                  display={{ md: "block", sm: "flex" }}
                  alignContent={{ sm: "center" }}
                  justifyContent={{ sm: "center" }}
                  fontWeight="extrabold"
                  letterSpacing="tight"
                  marginEnd="6"
                >
                  {userData.name}
                </Heading>
                <HStack
                  mb="2"
                  display={{ md: "inline-flex", sm: "flex" }}
                  alignContent={{ lg: "center", sm: "center" }}
                  justifyContent={{ lg: "center", sm: "center" }}
                >
                  <Icon as={HiMail} color="gray.600" />
                  <Text fontWeight="medium">{userData.email}</Text>
                </HStack>

                <Text
                  maxWidth="400px"
                  mt="3px"
                  fontSize="sm"
                  display={{ md: "block", sm: "flex" }}
                  textAlign={{ lg: "left", md: "left", sm: "center" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate laborum molestiae maiores.
                </Text>

                <Flex
                  alignContent={{ md: "left", sm: "center" }}
                  justifyContent={{ md: "left", sm: "center" }}
                >
                  <Socials />
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </WrapItem>
    </Flex>
  );
};

export default UserProfilePage;
