import {Badge, Group, MantineSize, Stack, Text, Tooltip} from "@mantine/core";

type BadgeProps = {
  name: string;
  content: string;
  badgeFullWidth?: boolean;
  icon?: React.ReactNode;
}

type MatchingBadgeProps = {
  title: string;
  data: BadgeProps[];
  gap?: MantineSize;
}

export const MatchingBadge = (props: MatchingBadgeProps) => {
  return (
    <Stack gap={props.gap}>
      <Text c={'dimmed'}>
        {props.title}
      </Text>
      <Group>
        {props.data.map((badge, index) => (
          <Tooltip
            key={index}
            label={badge.name}
          >
            <Badge
              size={'xl'}
              color={'gray'}
              fullWidth={badge.badgeFullWidth}
              leftSection={badge.icon}
            >
              {badge.content}
            </Badge>
          </Tooltip>

        ))}
      </Group>
    </Stack>
  );
}