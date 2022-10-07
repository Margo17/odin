import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
  useToast,
  ToastId,
  UseToastOptions,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { Logo } from "../Logo";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { useTranslation } from "next-i18next";
import { useAuth } from "../../Providers/authentication";
import { AuthProvider } from "../../firebase/client/services";

export const SignInForm = (props: StackProps) => {
  const router = useRouter();
  const authState = useAuth();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { t } = useTranslation("translation");
  const toastIdRef = React.useRef<ToastId>();

  const setToast = (toastOptions: UseToastOptions) => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
    toastIdRef.current = toast(toastOptions);
  };

  React.useEffect(() => {
    if (authState.status.type === "loading") {
      toast({
        title: `${t("toastMsg.authentication")}`,
        status: "loading",
        isClosable: false,
      });
    } else if (authState.status.type === "success") {
      toast({
        title: `${t("toastMsg.authenticated")}`,
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      router.push("/");
    } else if (authState.status.type === "error") {
      toast({
        title: `${t("toastMsg.error")}`,
        status: "error",
        isClosable: true,
        duration: 1500,
      });
      setError(authState.status.message);
    }
  }, [authState.status.type]);
  return (
    <Stack spacing="8" {...props}>
      <Stack spacing="6">
        {isMobile && <Logo />}
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
            {t("loginForm.loginTitle")}
          </Heading>
          <HStack spacing="1" justify="center">
            <Text color="muted">{t("loginForm.forgot")}</Text>
            <Button
              variant="link"
              colorScheme="blue"
              onClick={() => router.push("/register")}
            >
              {t("loginForm.signUp")}
            </Button>
          </HStack>
        </Stack>
      </Stack>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="email">{t("form.email")}</FormLabel>
            <Input
              id="email"
              placeholder={t("loginForm.enterEmail")}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">{t("form.password")}</FormLabel>
            <Input
              id="password"
              placeholder="********"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </Stack>
        <HStack justify="space-between">
          <Checkbox defaultChecked>{t("loginForm.remember")}</Checkbox>
          <Button
            variant="link"
            colorScheme="blue"
            size="sm"
            onClick={() => router.push("/forgot-password")}
          >
            {t("loginForm.forgot")}
          </Button>
        </HStack>
        <Stack spacing="6">
          {error !== "" && (
            <Text fontSize="sm" w="100%" textAlign="center" color="red">
              {error}
            </Text>
          )}
          <Button
            variant="primary"
            onClick={() => authState.login(AuthProvider.email, email, password)}
          >
            {t("form.login")}
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
    </Stack>
  );
};
