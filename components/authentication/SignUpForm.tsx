import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
  UseToastOptions,
  ToastId,
} from "@chakra-ui/react";

import { Logo } from "../Logo";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { useTranslation } from "next-i18next";
import { useAuth } from "../../Providers/authentication";

type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInputs>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const authState = useAuth();
  const toast = useToast();
  const toastIdRef = useRef<ToastId>();
  const { t } = useTranslation("translation");

  const setToast = (toastOptions: UseToastOptions) => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
    toastIdRef.current = toast(toastOptions);
  };

  useEffect(() => {
    if (authState.status.type === "loading") {
      toast({
        title: `${t("toastMsg.creatingAcc")}`,
        status: "loading",
        isClosable: false,
      });
    } else if (authState.status.type === "success") {
      toast({
        title: `${t("toastMsg.accountCreated")}`,
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      router.push("/");
    } else if (authState.status.type === "error") {
      toast({
        title: `${t("toastMsg.emailExists")}`,
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  }, [authState.status.type]);

  const onSubmit: SubmitHandler<SignUpInputs> = (formDataObj: SignUpInputs) => {
    authState.registerUser(formDataObj.email, formDataObj.password);
    authState.clearState();
  };

  return (
    <Container
      maxW="md"
      py={{ base: "0", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
      boxShadow={{
        base: useColorModeValue("md", "md-dark"),
        sm: useColorModeValue("md", "md-dark"),
      }}
      borderRadius={{ base: "none", sm: "xl" }}
    >
      <Stack spacing="8">
        <Stack spacing="6" align="center">
          <Logo />
          <Stack spacing="3" textAlign="center">
            <Heading size="xs">{t("signinForm.signinTitle")}</Heading>
            <HStack justify="center" spacing="1">
              <Text color="muted">{t("signinForm.haveAcc")}</Text>
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => router.push("/login")}
              >
                {t("form.login")}
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">{t("signinForm.name")}</FormLabel>
                <Input
                  {...register("name", {
                    required: `${t("validation.enterName")}`,
                    minLength: {
                      value: 4,
                      message: `${t("validation.minimumLenght")}`,
                    },
                    maxLength: {
                      value: 30,
                      message: `${t("validation.maxLenght")}`,
                    },
                  })}
                  id="name"
                  type="text"
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">{t("form.email")}</FormLabel>
                <Input
                  {...register("email", {
                    required: `${t("validation.emailRequired")}`,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: `${t("validation.validEmail")}`,
                    },
                  })}
                  id="email"
                  type="email"
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">{t("form.password")}</FormLabel>
                <Input
                  {...register("password", {
                    required: `${t("validation.needPassword")}`,
                    pattern: {
                      value:
                        /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()<>\-__+.,:;/\?]){1,}).{8,}$/,
                      message: `${t("validation.passwordReq")}`,
                    },
                  })}
                  id="password"
                  type="password"
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.password2}>
                <FormLabel htmlFor="password2">
                  {t("signinForm.repeat")}
                </FormLabel>
                <Input
                  {...register("password2", {
                    required: `${t("validation.repeatPassword")}`,
                    validate: (val: string) => {
                      if (watch("password") !== val) {
                        return `${t("validation.passwordMatch")}`;
                      }
                    },
                  })}
                  id="password2"
                  type="password"
                />
                {errors.password2 && (
                  <FormErrorMessage>
                    {errors.password2.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button
                type="submit"
                variant="primary"
                isLoading={authState.status.type === "loading"}
              >
                {t("signinForm.createAcc")}
              </Button>
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  {t("form.signupWith")}
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};
