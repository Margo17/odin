import { Box, Flex, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import ImageCropper from "./ImageCropper";
import { inputBorderDashed } from "../../theme/components/profile";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const ProfilePicture = ({
  file,
  setFile,
}: {
  file?: File;
  setFile: Dispatch<SetStateAction<File | undefined>>;
}) => {
  const [picture, setPicture] = React.useState(null);
  const [picURL, setPicURL] = React.useState<string>();
  const [isCropOpen, setIsCropOpen] = React.useState(false);
  const [cropFile, setCropFile] = React.useState(null);

  const { t } = useTranslation("translation");

  const closeCropModal = (image: any) => {
    setIsCropOpen(false);
    setPicture(image);
    setFile(image);
    setPicURL(URL.createObjectURL(image));
  };

  const onDrop = React.useCallback((acceptedFiles: any) => {
    if (acceptedFiles[0]) {
      setPicture(acceptedFiles[0]);
      setPicURL(URL.createObjectURL(acceptedFiles[0]));
    }
    sendFileToCrop(acceptedFiles[0]);
  }, []);

  const sendFileToCrop = async (image: File) => {
    const imageDataUrl: any = await readFile(image);
    setCropFile(imageDataUrl);
    setPicture(imageDataUrl);
    setIsCropOpen(true);
  };
  function readFile(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
      setFile(file);
    });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });
  return isCropOpen && cropFile ? (
    <ImageCropper
      isOpen={isCropOpen}
      onClose={closeCropModal}
      imageUrl={cropFile}
      aspect={1}
      cropShape="round"
    />
  ) : (
    <>
      <Box
        w="150px"
        h="150px"
        borderRadius="full"
        border={inputBorderDashed}
        overflow="hidden"
        bgColor="whiteAlpha.300"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {picURL ? (
          <Image
            objectFit="cover"
            width="150px"
            height="150px"
            src={picURL}
            alt="avatar pic"
          />
        ) : (
          <Flex minH="100%" flexDir="column" justifyContent="center">
            <input {...getInputProps()} />
            <Text
              fontStyle="normal"
              fontWeight="bold"
              fontSize="11px"
              lineHeight="16px"
              letterSpacing="-0.011em"
              textAlign="center"
              color="black"
            >
              {isDragActive
                ? `${t("profile.drag")}`
                : `${t("profile.selectAvatar")}`}
            </Text>
          </Flex>
        )}
      </Box>
    </>
  );
};

export default ProfilePicture;
