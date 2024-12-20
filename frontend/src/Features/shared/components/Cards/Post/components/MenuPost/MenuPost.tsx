import {ActionIcon, Menu} from "@mantine/core";
import {IconDots} from "@tabler/icons-react";
import {EditPost} from "../EditPost";
import {RemovePost} from "../RemovePost";

type MenuPostProps = {
  content?: string;
}

export const MenuPost = (props: MenuPostProps) => {
  return (
    <Menu radius={'sm'} shadow="xl" width={"auto"} closeOnItemClick>
      <Menu.Target>
        <ActionIcon size="lg" color="gray" radius={"xl"} variant={"subtle"}>
          <IconDots stroke={1.5}/>
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Manage</Menu.Label>
        <EditPost content={props.content}/>
        <RemovePost/>
      </Menu.Dropdown>
    </Menu>
  );
}