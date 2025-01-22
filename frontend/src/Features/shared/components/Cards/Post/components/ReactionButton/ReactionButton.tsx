import {ActionIcon, Button, Group, Popover} from "@mantine/core";
import {
  IconFaceId,
  IconFlame,
  IconHeart,
  IconMoodAngry,
  IconMoodHappy,
  IconMoodSad,
  IconPaw
} from "@tabler/icons-react";
import React from "react";
import {useDisclosure} from "@mantine/hooks";
import {useTranslation} from "react-i18next";

export const ReactionButton = ({onReact, children}: {
  onReact: (reaction: string) => void;
  children: React.ReactNode
}) => {
  const [opened, {close, open}] = useDisclosure(false);
  const reactionsSize = 20;
  const {t} = useTranslation('postComponent');

  const reactions = [
    {value: "Like", label: t('buttons.reaction.like'), icon: <IconMoodHappy size={reactionsSize}/>},
    {value: "Love", label: t('buttons.reaction.love'), icon: <IconHeart size={reactionsSize}/>},
    {value: "Haha", label: t('buttons.reaction.haha'), icon: <IconFaceId size={reactionsSize}/>},
    {value: "Wow", label: t('buttons.reaction.wow'), icon: <IconFlame size={reactionsSize}/>},
    {value: "Sad", label: t('buttons.reaction.sad'), icon: <IconMoodSad size={reactionsSize}/>},
    {value: "Angry", label: t('buttons.reaction.angry'), icon: <IconMoodAngry size={reactionsSize}/>},
  ];

  return (
    <Popover
      width={200}
      position="top"
      shadow="sm"
      withArrow
      opened={opened}
      onClose={close}
      radius={"xl"}
    >
      <Popover.Target>
        <Button
          variant="subtle"
          color="gray"
          leftSection={<IconPaw stroke={1.5}/>}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          {children}
        </Button>
      </Popover.Target>
      <Popover.Dropdown
        onMouseEnter={open}
        onMouseLeave={close}
        w={'fit-content'}
      >
        <Group wrap={'nowrap'} gap={'xs'}>
          {reactions.map((reaction) => (
            <ActionIcon
              key={reaction.label}
              variant="subtle"
              color={'violet'}
              radius={"xl"}
              size="md"
              onClick={() => onReact(reaction.label)}
              title={reaction.label}
            >
              {reaction.icon}
            </ActionIcon>
          ))}
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
