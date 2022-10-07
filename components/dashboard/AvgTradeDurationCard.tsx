import { Stat, StatLabel, StatNumber, Box } from "@chakra-ui/react";

type AvgTradeDurationCardProps = {
  avgDuration: string;
};

const AvgTradeDurationCard = ({ avgDuration }: AvgTradeDurationCardProps) => {
  return (
    <Box
      border="5px"
      w="49%"
      h="auto"
      borderWidth="5px"
      borderRadius="10px"
      borderColor="gray.500"
      background="whiteAlpha.900"
      boxShadow="lg"
      textAlign="center"
      pt="8"
    >
      <Box>
        <Stat>
          <StatLabel>Avg. Trade Duration</StatLabel>
          <StatNumber>{avgDuration}</StatNumber>
        </Stat>
      </Box>
    </Box>
  );
};

export default AvgTradeDurationCard;
