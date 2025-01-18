import {ActionIcon, Menu} from "@mantine/core";
import {IconDots} from "@tabler/icons-react";
import {EditPost} from "../EditPost";
import {RemovePost} from "../RemovePost";
import {useTranslation} from "react-i18next";

type MenuPostProps = {
  postId?: string;
  content?: string;
}

export const MenuPost = (props: MenuPostProps) => {
  const {t} = useTranslation('postComponent')

  return (
    <Menu radius={'sm'} shadow="xl" width={"auto"} closeOnItemClick>
      <Menu.Target>
        <ActionIcon size="lg" color="gray" radius={"xl"} variant={"subtle"}>
          <IconDots stroke={1.5}/>
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t('menuPost.label')}</Menu.Label>
        <EditPost postId={props.postId} content={props.content}/>
        <RemovePost postId={props.postId}/>
      </Menu.Dropdown>
    </Menu>
  );
}