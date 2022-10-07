import React from "react";

import SelectExchange from "./SelectExchange";
import EnterAPI from "./EnterAPI";
import SyncData from "./SyncData";
import { ProgressSteps } from "./progressSteps/ProgressSteps";
import { steps } from "./progressSteps/data";
import { useStep } from "./progressSteps/useStep";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

type CreateAccountModal = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

const CreateAccountForm = ({ onOpen, onClose, isOpen }: CreateAccountModal) => {
  const [currentStep, { goToNextStep }] = useStep({
    maxStep: steps.length,
    initialStep: 0,
  });

  return (
    <>
      <Modal
        onClose={onClose}
        size="6xl"
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>
            Add a new exchange
            <Text fontSize="xs" color="grey">
              Select an exchange, and fill in the API details to connect
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p="6">
            <ProgressSteps currentStep={currentStep} />
            {currentStep === 0 ? (
              <SelectExchange onNext={goToNextStep} />
            ) : currentStep === 1 ? (
              <EnterAPI onNext={goToNextStep} />
            ) : (
              <SyncData />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateAccountForm;
