import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Box,
  Container,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../Providers/authentication";

type EmailInput = {
  email: string;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
};

const ForgotPassword = () => {
  const { t } = useTranslation("translation");
  const authState = useAuth();
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailInput>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    return () => {
      authState.clearState();
    };
  }, []);

  useEffect(() => {
    authState.status.type === "success" &&
      toast({
        title: `${t("toastMsg.forgotPasswordSuccessTitle")}`,
        description: `${t("toastMsg.forgotPasswordSuccessDescription")}`,
        variant: "subtle",
        isClosable: true,
      });
    if (authState.status.type === "error") {
      toast({
        title: `${t("toastMsg.forgotPasswordFailureTitle")}`,
        description: `${t("toastMsg.forgotPasswordFailureDescription")}`,
        variant: "subtle",
        status: "error",
        isClosable: true,
      });
      authState.clearState();
    }
  }, [authState.status.type]);

  const onSubmit: SubmitHandler<EmailInput> = async (input: EmailInput) => {
    authState.forgotPassword(input.email);
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "60" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl isRequired isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">
                    {t("forgotPassword.label")}
                  </FormLabel>
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
                    height="42px"
                  />
                  {errors.email && (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                  )}
                  {authState.status.type === "success" && (
                    <FormHelperText>{t("forgotPassword.info")}</FormHelperText>
                  )}
                </FormControl>
              </Stack>
              <Stack spacing="3">
                {authState.status.type === "success" ? (
                  <Button isDisabled type="submit" variant="primary">
                    {t("forgotPassword.confirm")}
                  </Button>
                ) : (
                  <Button type="submit" variant="primary">
                    {t("forgotPassword.confirm")}
                  </Button>
                )}
                <Button variant="outline" onClick={() => router.push("/login")}>
                  {t("forgotPassword.return")}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default ForgotPassword;
