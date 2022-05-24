import { Text, Link } from "@chakra-ui/react";
import { Alert, AlertTitle, AlertDescription } from "@chakra-ui/alert";

export const Announcements = () => {
  return (
    <Alert status="info" my={2}>
      <AlertTitle mr={2}>Announcement</AlertTitle>
      <AlertDescription>
        Hi, thank you for using Towa Web/ Muni Web (?). <br />
        We got EN server support now !!! Try it out{" "}
        <Text as="span" colorScheme="blue">
          <Link href={"/en/"}>Here</Link>
        </Text>
        . <br />
        Unfortunately, I&apos;ll probably not be updating the web as often. But
        feel free to contact me via discord HamP#4125 to let me know what could
        be improved or whether you want to help contribute.
      </AlertDescription>
    </Alert>
  );
};
