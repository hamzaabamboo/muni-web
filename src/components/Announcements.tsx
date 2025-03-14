import {
  Text,
  Link,
  Alert,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";

export const Announcements = () => {
  // return null;
  return (
    <Alert status="info" my={2}>
      <AlertTitle mr={2}>Announcement</AlertTitle>
      <AlertDescription>
        (2025/03/14) Hi, I'm back from the dead. we just hit over 5 million data
        points the other day, crazy. So I updated data for past events for both
        JP and EN, check it out&nbsp;
        <Text as="span" colorScheme="blue">
          <Link href={"/event"}>here</Link>
        </Text>
        .
      </AlertDescription>
    </Alert>
  );
};
