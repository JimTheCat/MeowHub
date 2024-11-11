import {Card, Text} from "@mantine/core";
import {InnerHtmlHandler} from "../../InnerHtmlHandler/InnerHtmlHandler.tsx";

export const ProfileAboutMe = (props: { htmlContent: string }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" w={500} withBorder>
      <Text size={"lg"}>O mnie</Text>
      <InnerHtmlHandler innerHtml={props.htmlContent}/>
    </Card>
  );
}