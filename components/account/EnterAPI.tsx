import { useForm, SubmitHandler } from "react-hook-form";

import {
  Box,
  VStack,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

type EntrerApiInputs = {
  name: string;
  api: string;
  secret: string;
};

const EnterAPI = ({ onNext }: { onNext: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EntrerApiInputs>({
    mode: "onChange",
    defaultValues: {
      name: "",
      api: "",
      secret: "",
    },
  });

  const onSubmit: SubmitHandler<EntrerApiInputs> = (
    formDataObj: EntrerApiInputs
  ) => {
    console.log(formDataObj);
    onNext();
  };

  return (
    <VStack p="3" gap={5}>
      <Text as="b">Enter API details</Text>
      <Text fontSize="sm" color="gray">
        Follow the instructions to input your account read-only API details
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing="6">
          <Stack spacing="5" w="40rem">
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Account Name</FormLabel>
              <Input
                {...register("name", {
                  required: "Field is required",
                })}
                id="name"
                type="text"
              />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.api}>
              <FormLabel htmlFor="api">API key</FormLabel>
              <Input
                {...register("api", {
                  required: "Field is required",
                  minLength: {
                    value: 6,
                    message: "Length must be at least 6",
                  },
                })}
                id="api"
                type="text"
              />
              {errors.api && (
                <FormErrorMessage>{errors.api.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.secret}>
              <FormLabel htmlFor="secret">Secret key</FormLabel>
              <Input
                {...register("secret", {
                  required: "Field is required",
                  minLength: {
                    value: 12,
                    message: "Length must be at least 12",
                  },
                })}
                id="secret"
                type="password"
              />
              {errors.secret && (
                <FormErrorMessage>{errors.secret.message}</FormErrorMessage>
              )}
            </FormControl>
          </Stack>
        </Stack>
        <Button
          type="submit"
          ml="120%"
          bg="#3182ce"
          _hover={{ transform: "scale(1.05)" }}
          _active={{ transform: "scale(0.9)", bg: "#3182ce" }}
          isDisabled={!isValid}
        >
          Connect
        </Button>
      </form>
    </VStack>
  );
};

export default EnterAPI;
