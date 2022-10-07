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

const LastAndActiveTrades = () => {
  return (
    <Box
      flex="1"
      border="5px"
      w="100%"
      h="16rem"
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
              Last & Active Trades
            </TableCaption>
            <Thead>
              <Tr>
                <Th>PAIR</Th>
                <Th> SIDE</Th>
                <Th>STATUS</Th>
                <Th>POSITION VALUE</Th>
                <Th>PNL</Th>
                <Th>ACCOUNT</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontWeight="bold">BTC/USDT</Td>
                <Td>Short</Td>
                <Td>Closed</Td>
                <Td>$ 10000</Td>
                <Td>$ 15000 (150%)</Td>
                <Td>Binance Futures</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">ETH/USDT</Td>
                <Td>Long</Td>
                <Td>Running</Td>
                <Td>$ 15000</Td>
                <Td>$ 7500 (50%)</Td>
                <Td>Bybit Futures</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default LastAndActiveTrades;
