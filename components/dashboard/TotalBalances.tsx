import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const TotalBalances = () => {
  return (
    <Box
      border="5px"
      flex="1"
      w="100%"
      h="19rem"
      borderWidth="5px"
      borderRadius="10px"
      borderColor="gray.500"
      background="whiteAlpha.900"
      boxShadow="lg"
    >
      <Box m="2">
        <TableContainer>
          <Table>
            <TableCaption placement="top" fontWeight="extrabold">
              Total Balances
            </TableCaption>
            <Thead>
              <Tr>
                <Th>SYMBOL</Th>
                <Th> PRICE (USDT)</Th>
                <Th>AMOUNT</Th>
                <Th>VALUE (USDT)</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontWeight="bold">BTC</Td>
                <Td>€ 22000</Td>
                <Td>0.0015</Td>
                <Td>€ 1562</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">ETH</Td>
                <Td>€ 1300</Td>
                <Td>22.5</Td>
                <Td>€ 222563</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">USDT</Td>
                <Td>€ 1</Td>
                <Td>15665</Td>
                <Td>€ 15665</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TotalBalances;
