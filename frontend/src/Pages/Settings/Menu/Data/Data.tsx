import {Box, Button, Fieldset, Tooltip} from "@mantine/core";

export const Data = () => {
  return (
    <Box>
      <Fieldset legend="Data">
        <Tooltip label={"Download your data"}>
          <Button variant="outline" color="blue">Download data</Button>
        </Tooltip>
      </Fieldset>
    </Box>
  );
}