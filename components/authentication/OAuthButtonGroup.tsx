import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { AuthProvider } from "../../firebase/client/services";
import { useAuth } from "../../Providers/authentication";
import { GitHubIcon, GoogleIcon, TwitterIcon } from "./ProviderIcons";

const providers = [
  {
    name: "google",
    icon: <GoogleIcon boxSize="5" />,
    service: AuthProvider.google,
  },
  {
    name: "twitter",
    icon: <TwitterIcon boxSize="5" />,
    service: AuthProvider.twitter,
  },
];

export const OAuthButtonGroup = () => {
  const authState = useAuth();
  return (
    <ButtonGroup variant="outline" spacing="4" width="full">
      {providers.map(({ name, icon, service }) => (
        <Button
          key={name}
          width="full"
          onClick={() => authState.login(service)}
        >
          <VisuallyHidden>Sign in with {name}</VisuallyHidden>
          {icon}
        </Button>
      ))}
    </ButtonGroup>
  );
};
