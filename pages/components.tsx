import { useState } from "react";
import NextLink from "next/link";

import Shell from "../components/shell";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Heading,
  Box,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CircularProgress,
  Progress,
  Skeleton,
  Spinner,
  useToast,
  Wrap,
  WrapItem,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tag,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
  Button,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  RadioGroup,
  Radio,
  HStack,
  IconButton,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  PinInput,
  PinInputField,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  SimpleGrid,
  Switch,
  Textarea,
  CloseButton,
  ListItem,
  UnorderedList,
  Divider,
} from "@chakra-ui/react";

// * Not included here — Overlay, Meda and Icons, Data Display (code, divider, keyboard key), Other (only close button), Typography.
const Components = () => {
  const toast = useToast();
  const [value, setValue] = useState("1");

  const variants = ["solid", "subtle", "left-accent", "top-accent"];

  return (
    <Shell
      pageName="Chakra Components"
      pageSubName="Here you can have a general oveview of available components and their style variations."
    >
      <Heading>Button</Heading>
      <Stack direction="row" spacing={4} align="center">
        <Button colorScheme="teal" variant="solid">
          Button
        </Button>
        <Button colorScheme="teal" variant="outline">
          Button
        </Button>
        <Button colorScheme="teal" variant="ghost">
          Button
        </Button>
        <Button colorScheme="teal" variant="link">
          Button
        </Button>
      </Stack>

      <Heading>Checkbox</Heading>
      <Checkbox>Check me!</Checkbox>

      <Heading>Editable Field</Heading>
      <Editable defaultValue="Take some chakra">
        <EditablePreview />
        <EditableInput />
      </Editable>

      <Heading>Form Control</Heading>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We&apos;ll never share your email.</FormHelperText>
      </FormControl>

      <FormControl as="fieldset">
        <FormLabel as="legend">Favorite Naruto Character</FormLabel>
        <RadioGroup defaultValue="Itachi">
          <HStack spacing="24px">
            <Radio value="Sasuke">Sasuke</Radio>
            <Radio value="Nagato">Nagato</Radio>
            <Radio value="Itachi">Itachi</Radio>
            <Radio value="Sage of the six Paths">Sage of the six Paths</Radio>
          </HStack>
        </RadioGroup>
        <FormHelperText>Select only if you&apos;re a fan.</FormHelperText>
      </FormControl>

      <Heading>Icon Button</Heading>
      <IconButton aria-label="Search database" icon={<SearchIcon />} />

      <Heading>Input</Heading>
      <Stack spacing={3}>
        <Input variant="outline" placeholder="Outline" />
        <Input variant="filled" placeholder="Filled" />
        <Input variant="flushed" placeholder="Flushed" />
        <Input variant="unstyled" placeholder="Unstyled" />
      </Stack>

      <Stack spacing={4}>
        <InputGroup>
          <InputLeftAddon>+370</InputLeftAddon>
          <Input type="tel" placeholder="phone number" />
        </InputGroup>

        {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
        <InputGroup size="sm">
          <InputLeftAddon>https://</InputLeftAddon>
          <Input placeholder="mysite" />
          <InputRightAddon>.com</InputRightAddon>
        </InputGroup>
      </Stack>

      <Input
        placeholder="Select Date and Time"
        size="md"
        type="datetime-local"
      />

      <Heading>Number Input</Heading>
      <NumberInput>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Heading>Pin Input</Heading>
      <HStack>
        <PinInput>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>

      <Heading>Radio</Heading>
      <RadioGroup onChange={setValue} value={value}>
        <Stack direction="row">
          <Radio value="1">First</Radio>
          <Radio value="2">Second</Radio>
          <Radio value="3">Third</Radio>
        </Stack>
      </RadioGroup>

      <Heading>Range Slider</Heading>
      {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
      <RangeSlider aria-label={["min", "max"]} defaultValue={[10, 30]}>
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>

      <Heading>Select</Heading>
      <HStack spacing={3}>
        <Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>

        <Select variant="outline" placeholder="Outline" />
        <Select variant="filled" placeholder="Filled" />
        <Select variant="flushed" placeholder="Flushed" />
        <Select variant="unstyled" placeholder="Unstyled" />
      </HStack>

      <Heading>Slider</Heading>
      <Slider aria-label="slider-ex-1" defaultValue={30}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <Heading>Switch</Heading>
      <FormControl as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
        <FormLabel htmlFor="isChecked">isChecked:</FormLabel>
        <Switch id="isChecked" isChecked />

        <FormLabel htmlFor="isDisabled">isDisabled:</FormLabel>
        <Switch id="isDisabled" isDisabled defaultChecked />

        <FormLabel htmlFor="isFocusable">isFocusable:</FormLabel>
        <Switch id="isFocusable" isFocusable isDisabled />

        <FormLabel htmlFor="isInvalid">isInvalid:</FormLabel>
        <Switch id="isInvalid" isInvalid />

        <FormLabel htmlFor="isReadOnly">isReadOnly:</FormLabel>
        <Switch id="isReadOnly" isReadOnly />

        <FormLabel htmlFor="isRequired">isRequired:</FormLabel>
        <Switch id="isRequired" isRequired />
      </FormControl>

      <Heading>Textarea</Heading>
      <Textarea placeholder="Here is a sample placeholder" />

      <Heading>Close Button</Heading>
      <CloseButton />

      <Heading>Accordion</Heading>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Heading>Tabs</Heading>
      <HStack>
        <Tabs variant="line">
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Tabs variant="enclosed">
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Tabs variant="enclosed-colored">
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Tabs variant="soft-rounded">
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Tabs variant="solid-rounded">
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>

      <Heading>Alert</Heading>
      <Alert status="error" variant="subtle">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="error" variant="solid">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="error" variant="left-accent">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="error" variant="top-accent">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="success" variant="subtle">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="success" variant="solid">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="success" variant="left-accent">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="success" variant="top-accent">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="warning" variant="subtle">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="warning" variant="solid">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="warning" variant="left-accent">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="warning" variant="top-accent">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="info" variant="subtle">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="info" variant="solid">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="info" variant="left-accent">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Alert status="info" variant="top-accent">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      <Heading>Circular Progress</Heading>
      <CircularProgress value={80} />
      <CircularProgress isIndeterminate />

      <Heading>Progress</Heading>
      <Progress value={80} />
      <Progress hasStripe value={64} />
      <Progress isIndeterminate />

      <Heading>Skeleton</Heading>
      <Skeleton>
        <div>contents won&apos;t be visible</div>
      </Skeleton>

      <Heading>Spinner</Heading>
      <Spinner />

      <Heading>Toast</Heading>
      <Button
        onClick={() =>
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        }
      >
        Show Toast
      </Button>
      <Wrap>
        {variants.map((variant, i) => (
          <WrapItem key={i}>
            <Button
              onClick={() =>
                toast({
                  title: `${variant} toast`,
                  variant: variant,
                  isClosable: true,
                })
              }
            >
              Show {variant} toast
            </Button>
          </WrapItem>
        ))}
      </Wrap>

      <Heading>Badge</Heading>
      <Stack direction="row">
        <Badge>Default</Badge>
        <Badge colorScheme="green">Success</Badge>
        <Badge colorScheme="red">Removed</Badge>
        <Badge colorScheme="purple">New</Badge>
        <Badge variant="outline" colorScheme="green">
          Default
        </Badge>
        <Badge variant="solid" colorScheme="green">
          Success
        </Badge>
        <Badge variant="subtle" colorScheme="green">
          Removed
        </Badge>
      </Stack>

      <Heading>List</Heading>
      <UnorderedList>
        <ListItem>Lorem ipsum dolor sit amet</ListItem>
        <ListItem>Consectetur adipiscing elit</ListItem>
        <ListItem>Integer molestie lorem at massa</ListItem>
        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
      </UnorderedList>

      <Heading>Divider</Heading>
      <Divider />

      <Heading>Stat</Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Collected Fees</StatLabel>
          <StatNumber>£0.00</StatNumber>
          <StatHelpText>Feb 12 - Feb 28</StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Clicked</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>

      <Heading>Table</Heading>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <Heading>Tag</Heading>
      <Tag>Sample Tag</Tag>

      <Heading>Breadcrumb</Heading>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#">Docs</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading>Link</Heading>
      <NextLink href="/login" passHref>
        <Link>Go To Login Page</Link>
      </NextLink>
    </Shell>
  );
};

export default Components;
