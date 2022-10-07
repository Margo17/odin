import React, { useCallback, useEffect, useState } from "react";

import {
  Flex,
  Stack,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  AspectRatio,
} from "@chakra-ui/react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";

import { getCroppedImg } from "../../utils/ImageCorp";
import { useTranslation } from "next-i18next";

interface Props {
  isOpen: boolean;
  imageUrl: any;
  onClose: (image: any) => void;
  aspect: number;
  cropShape: "round" | "rect";
}

const ImageCropper = ({
  isOpen,
  onClose,
  imageUrl,
  aspect,
  cropShape,
}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | undefined>(
    undefined
  );
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("translation");
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixelsTemp: Area) => {
      setCroppedAreaPixels(croppedAreaPixelsTemp);
    },
    []
  );

  useEffect(() => {
    if (croppedImage) {
      closeModal();
      setLoading(true);
    }
  }, [croppedImage]);

  const showCroppedImage = useCallback(async () => {
    try {
      setLoading(true);
      const croppedImageTemp = await getCroppedImg(
        imageUrl,
        croppedAreaPixels,
        0
      );
      setCroppedImage(croppedImageTemp);
    } catch (e) {
      setCroppedImage(null);
    }
  }, [croppedAreaPixels]);

  const closeModal = () => {
    onClose(croppedImage);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} closeOnOverlayClick={true}>
      <ModalOverlay />
      <ModalContent
        borderRadius="15px"
        bgColor="whiteAlpha.900"
        background="url(/2.png) left top no-repeat"
      >
        <ModalBody p="20px">
          <Flex w="100%" flexDir="column">
            <Stack spacing="10" w="100%">
              <AspectRatio position="relative" w="100%" ratio={aspect}>
                <Cropper
                  image={imageUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  cropShape={cropShape}
                  showGrid={false}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </AspectRatio>

              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-label="zoom"
                onChange={(_zoom) => setZoom(Number(_zoom))}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Button
                isLoading={loading}
                loadingText={t("validation.loading")}
                onClick={showCroppedImage}
              >
                {t("profile.save")}
              </Button>
            </Stack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageCropper;
