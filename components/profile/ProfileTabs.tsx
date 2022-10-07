import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Box,
} from "@chakra-ui/react";

const ProfileTabs = () => {
  return (
    <Flex>
      <Box mt={6} bgColor="whiteAlpha.900" w="full" rounded="xl" shadow="lg">
        <Tabs w="100%" isFitted>
          <TabList mb="1em">
            <Tab
              pb={6}
              pt={6}
              _selected={{ color: "white", textColor: "teal.600" }}
              fontSize={{ base: "17px", sm: "17px", md: "30px", lg: "2rem" }}
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Account
            </Tab>
            <Tab
              pb={6}
              pt={6}
              _selected={{ color: "white", textColor: "teal.600" }}
              fontSize={{ base: "17px", sm: "17px", md: "30px", lg: "2rem" }}
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Two
            </Tab>
            <Tab
              pb={6}
              pt={6}
              _selected={{ color: "white", textColor: "teal.600" }}
              fontSize={{ base: "17px", sm: "17px", md: "30px", lg: "2rem" }}
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Three
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default ProfileTabs;
