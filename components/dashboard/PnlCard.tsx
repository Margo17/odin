import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";

type PnlCardProps = {
  label: string;
  mainStat: number;
  additionalStat: number;
  arrowType: "increase" | "decrease";
};

const PnlCard = ({
  label,
  mainStat,
  additionalStat,
  arrowType,
}: PnlCardProps) => {
  return (
    <Box
      border="5px"
      w="100%"
      borderWidth="5px"
      borderRadius="10px"
      borderColor="gray.500"
      background="whiteAlpha.900"
      boxShadow="lg"
    >
      <Box m="3">
        <Stat>
          <StatLabel>{label}</StatLabel>
          <StatNumber>{mainStat}€</StatNumber>
          <StatHelpText>
            <StatArrow type={arrowType} />
            {additionalStat}%
          </StatHelpText>
        </Stat>
      </Box>
    </Box>
  );
};

export default PnlCard;
