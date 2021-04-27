import { Flex, Text } from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { PageProps } from "types/PageProps";
import { getAbsolutePath } from "utils/assets";

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<{ props: PageProps }> {
  return {
    props: {
      backgroundImage: getAbsolutePath(`/images/background/school.jpg`),
    },
  };
}

const TowaLandDynamic = dynamic(() => import("components/TowaLand"), {
  ssr: false,
});
const TowaLandPage = () => {
  return (
    <>
      <Head>
        <script src={getAbsolutePath("lib/live2d.min.js")} />
        <script src={getAbsolutePath("lib/live2dcubismcore.min.js")} />
      </Head>
      <Flex
        flexDirection="column"
        flex={1}
        h="full"
        justifyContent="stretch"
        alignItems="stretch"
      >
        <Flex flexDirection="column" alignItems="center" py="4">
          <Text fontSize="3xl" fontWeight="bold">
            Welcome to Towa land
          </Text>
          <Text fontSize="lg" textAlign="center">
            No ongoing event right now, but you can look at Towa and Muni
            discussing about the next event.{" "}
          </Text>
          <Text fontSize="lg">
            While you wait, you can also browse old events too!{" "}
            <Link href={getAbsolutePath("/event")}>
              <Text
                as="span"
                fontStyle="underline"
                cursor="pointer"
                color="blue.200"
              >
                here
              </Text>
            </Link>
          </Text>
          <Text fontSize="lg">
            If there is an event, just go back to home page{" "}
            <Link href={getAbsolutePath("/")}>
              <Text
                as="span"
                fontStyle="underline"
                cursor="pointer"
                color="blue.200"
              >
                here
              </Text>
            </Link>
          </Text>
        </Flex>
        <Flex
          flex={1}
          alignItems="center"
          flexDirection="column"
          justifyContent="stretch"
        >
          <TowaLandDynamic />
        </Flex>
      </Flex>
    </>
  );
};

export default TowaLandPage;
