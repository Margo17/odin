import { VStack, Text, CircularProgress } from "@chakra-ui/react";

const SyncData = () => {
  return (
    <VStack p="6" gap={5}>
      <Text as="b">Synchronize data</Text>
      <Text fontSize="sm" color="gray">
        Odin Platform automatically imports and tracks all your crypto
      </Text>
      <CircularProgress isIndeterminate />
      <Text>Fetching trading data</Text>
    </VStack>
  );
};

export default SyncData;
