import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
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
import { ParsedUrlQuery } from "querystring";

type PasswordResetInputs = {
  password: string;
  password2: string;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
};

let params: ParsedUrlQuery;

const ForgotPasswordConfirm = () => {
  const { t } = useTranslation("translation");
  const [queryExists, setQueryExists] = useState(false);
  const authState = useAuth();
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordResetInputs>({
    mode: "onChange",
    defaultValues: {
      password: "",
      password2: "",
    },
  });

  useEffect(() => {
    return () => {
      authState.clearState();
    };
  }, []);

  useEffect(() => {
    if (!router.isReady) return;

    params = router.query;
    Object.keys(params).length !== 0 && setQueryExists(true);
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (authState.status.type === "success") {
      toast({
        title: `${t("toastMsg.resetPasswordSuccessTitle")}`,
        variant: "solid",
        status: "success",
        isClosable: true,
      });
      authState.clearState();
      router.push("/login");
    }
    if (authState.status.type === "error") {
      toast({
        title: `${t("toastMsg.resetPasswordFailureTitle")}`,
        description: `${t("toastMsg.resetPasswordFailureDescription")}`,
        variant: "subtle",
        status: "error",
        isClosable: true,
      });
      authState.clearState();
    }
  }, [authState.status.type]);

  const onSubmit: SubmitHandler<PasswordResetInputs> = async (
    newPassword: PasswordResetInputs
  ) => {
    authState.resetPassword(params.oobCode as string, newPassword.password);
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
                <FormControl isRequired isInvalid={!!errors.password}>
                  <FormLabel htmlFor="password">
                    {t("resetPassword.label1")}
                  </FormLabel>
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
                    <FormErrorMessage>
                      {errors.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.password2}>
                  <FormLabel htmlFor="password2">
                    {t("resetPassword.label2")}
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
              <Stack spacing="3">
                {queryExists ? (
                  <Button type="submit" variant="primary">
                    {t("forgotPassword.confirm")}
                  </Button>
                ) : (
                  <Button isDisabled type="submit" variant="primary">
                    {t("forgotPassword.confirm")}
                  </Button>
                )}
                <Button variant="outline" onClick={() => router.push("/login")}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default ForgotPasswordConfirm;
