import { As, Button, ButtonProps, HStack, Icon, Text } from "@chakra-ui/react";
import * as React from "react";

interface NavButtonProps extends ButtonProps {
  icon: As;
  label: string;
}

const NavButton = (props: NavButtonProps) => {
  const { icon, label, ...buttonProps } = props;
  return (
    <Button variant="ghost-on-accent" justifyContent="start" {...buttonProps}>
      <HStack spacing="3">
        <Icon as={icon} boxSize="6" color="on-accent-subtle" />
        <Text>{label}</Text>
      </HStack>
    </Button>
  );
};
export default NavButton;
