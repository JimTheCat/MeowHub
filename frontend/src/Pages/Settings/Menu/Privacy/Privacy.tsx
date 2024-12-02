import {Box, Fieldset, NativeSelect} from "@mantine/core";

export const Privacy = () => {
  return (
    <Box>
      <Fieldset legend="Overall">
        {/* Privacy settings */}
        <NativeSelect label={"Who can see your profile?"} data={["Everyone", "Only friends", "Nobody"]}/>
        <NativeSelect label={"Who can see your posts?"} data={["Everyone", "Only friends", "Nobody"]} mt={"md"}/>
        <NativeSelect label={"Who can see your friends?"} data={["Everyone", "Only friends", "Nobody"]} mt={"md"}/>
      </Fieldset>
    </Box>
  );
}