import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  Spacer,
  Progress,
  Flex,
} from "@chakra-ui/react";

type RatioCardProps = {
  longPercentage: number;
  longAmount: number;
  shortPercentage: number;
  shortAmount: number;
};

const RatioCard = ({
  longPercentage,
  longAmount,
  shortPercentage,
  shortAmount,
}: RatioCardProps) => {
  return (
    <Box
      border="5px"
      w="100%"
      borderWidth="5px"
      borderRadius="10px"
      borderColor="gray.500"
      background="whiteAlpha.900"
      boxShadow="lg"
      mt="2"
    >
      <Box m="4">
        <Stat>
          <Flex>
            <StatLabel>Long Ratio</StatLabel>
            <Spacer />
            <StatLabel>Short Ratio</StatLabel>
          </Flex>
          <Flex>
            <StatNumber>
              {longPercentage}% ({longAmount})
            </StatNumber>
            <Spacer />
            <StatNumber>
              {shortPercentage}% ({shortAmount})
            </StatNumber>
          </Flex>
        </Stat>
        <Progress value={70} colorScheme="whatsapp" backgroundColor="red" />
      </Box>
    </Box>
  );
};

export default RatioCard;
