import {DatePickerInput} from "@mantine/dates";
import {ActionIcon, Popover, Select} from "@mantine/core";
import {IconDots} from "@tabler/icons-react";

export const MessengerChatSettings = () => {
  return (
    <Popover width={"300"} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <ActionIcon color={"gray"} c={"gray"} variant={"subtle"} radius={"xl"} size={"xl"}>
          <IconDots stroke={1.5}/>
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Select
          label="Select within Popover"
          placeholder="Select within Popover"
          comboboxProps={{withinPortal: false}}
          data={['React', 'Angular', 'Svelte', 'Vue']}
        />
        <DatePickerInput
          label="DatePickerInput within Popover"
          placeholder="DatePickerInput within Popover"
          popoverProps={{withinPortal: false}}
          mt="md"
        />
      </Popover.Dropdown>
    </Popover>
  );
}