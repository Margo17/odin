import { Flex, Divider, Center } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsInstagram, BsTelegram, BsTwitter } from "react-icons/bs";

const Socials = () => {
  return (
    <Flex mt="5" gap="5" color="gray.600">
      <Link href="https://telegram.org/" passHref>
        <a>
          <BsTelegram cursor="pointer" size="25px" />
        </a>
      </Link>
      <Center height="30px">
        <Divider orientation="vertical" />
      </Center>
      <Link href="https://www.instagram.com/" passHref>
        <a>
          <BsInstagram cursor="pointer" size="25px" />
        </a>
      </Link>
      <Center height="30px">
        <Divider orientation="vertical" />
      </Center>
      <Link href="https://twitter.com/" passHref>
        <a>
          <BsTwitter cursor="pointer" size="25px" />
        </a>
      </Link>
    </Flex>
  );
};

export default Socials;
