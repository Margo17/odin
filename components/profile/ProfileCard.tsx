import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Text,
  ModalFooter,
  Input,
  FormErrorMessage,
  FormControl,
  useToast,
  ToastId,
  UseToastOptions,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../Providers/authentication";
import { useEditUserState } from "../../Providers/userEdit";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import ProfilePicture from "./ProfilePicture";
import { useAuth } from "../../Providers/authentication";

interface UserProfileProps {
  name: string;
  image?: string;
  email: string;
  id: string;
}

interface IFormData {
  name: string;
}

const profileCard = (userData: UserProfileProps) => {
  const userState = useAuth();
  const editUser = useEditUserState();

  const router = useRouter();
  const [file, setFile] = React.useState<File | undefined>(undefined);

  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("translation");

  const toast = useToast();
  const toastIdRef = React.useRef<ToastId>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  const setToast = (toastOptions: UseToastOptions) => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
    toastIdRef.current = toast(toastOptions);
  };

  const onSubmit = handleSubmit(async (formData) => {
    setLoading(true);
    editUser.editProfile(formData.name || userData.name, file);
    setLoading(false);
    onClose();
    setValue("name", "");
  });

  React.useEffect(() => {
    if (editUser.status.type === "loading") {
      setToast({
        title: `${t("validation.loading")}`,
        status: "loading",
        isClosable: false,
      });
    } else if (editUser.status.type === "success") {
      setToast({
        title: `${t("toastMsg.successUpdate")}`,
        status: "success",
        isClosable: false,
      });
    } else if (editUser.status.type === "error") {
      setToast({
        title: editUser.status.message,
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  }, [editUser.status.type]);

  return (
    <Flex maxWidth={{ xl: "440px" }}>
      <Box>
        <Modal
          blockScrollOnMount={false}
          size="xl"
          isOpen={isOpen}
          onClose={onClose}
        >
          <form onSubmit={onSubmit} noValidate>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{t("profile.editProfile")}</ModalHeader>
              <Flex
                width="100%"
                flexDirection="column"
                p="16px"
                justifyItems="center"
                alignItems="center"
              >
                <Box>
                  <ProfilePicture file={file} setFile={setFile} />
                </Box>
              </Flex>
              <Flex justifyItems="center" flexDirection="column">
                <Text p="4" fontWeight="bold">
                  {t("profile.nickname")}
                </Text>

                <FormControl
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                  isInvalid={!!errors.name}
                >
                  <Input
                    w="95%"
                    isRequired
                    type="text"
                    rounded="xl"
                    p="20px"
                    placeholder={userData.name}
                    {...register("name", {
                      required: false,
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
                  />
                  {errors.name && (
                    <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>
              <ModalCloseButton />
              <ModalFooter p={6} display="flex" justifyContent="center">
                <Button
                  p={6}
                  width="200px"
                  rounded="xl"
                  type="submit"
                  w="50%"
                  size="md"
                  mt="10px"
                  shadow="md"
                  _hover={{
                    color: "teal.500",
                  }}
                  mr={3}
                  isLoading={loading}
                >
                  {t("profile.save")}
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </Box>
      <Box
        border="1px"
        w={{
          base: "100%",
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "15vw",
        }}
        borderRadius="lg"
        borderColor="gray.100"
        background="whiteAlpha.900"
        boxShadow="lg"
      >
        <Flex flexDirection="column">
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              w="80%"
              p="25px"
              size="md"
              variant="outline"
              mt="10px"
              shadow="sm"
              rounded="xl"
              _hover={{
                background: "white",
                color: "teal.500",
              }}
              onClick={onOpen}
            >
              {t("profile.editProfile")}
            </Button>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              w="80%"
              size="md"
              p="25px"
              variant="outline"
              mt="10px"
              shadow="sm"
              rounded="xl"
              _hover={{
                background: "white",
                color: "teal.500",
              }}
              onClick={() => {
                authState.logOut();
                router.push("/login");
              }}
              isLoading={authState.status.type === "loading"}
            >
              {t("profile.signOut")}
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default profileCard;
