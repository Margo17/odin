import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
} from "@chakra-ui/react";

type TotalTraderCardProps = {
  traderAmount: number;
  winAmount: number;
  lossAmount: number;
};

const TotalTraderCard = ({
  traderAmount,
  winAmount,
  lossAmount,
}: TotalTraderCardProps) => {
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
      pt="3"
    >
      <Box p="3">
        <Stat>
          <StatLabel>Total Trader</StatLabel>
          <StatNumber>{traderAmount}</StatNumber>
          <StatHelpText>
            {winAmount} W / {lossAmount} L
          </StatHelpText>
        </Stat>
      </Box>
    </Box>
  );
};

export default TotalTraderCard;
