import {Box, getGradient} from "@mantine/core";

interface BluredGradientProps {
  fromColor?: string;
  toColor?: string;
  deg?: number;
  blur?: number;
}

export const BluredGradient = (props: BluredGradientProps) => {
  return (
    <Box style={(theme) => ({
      position: 'absolute',
      backgroundImage: getGradient({
        from: props.fromColor ?? 'hotpink',
        to: props.toColor ?? 'cyan',
        deg: props.deg ?? 45,
      }, theme),
      zIndex: -1,
      width: '35%',
      height: '40%',
      top: '0',
      filter: `blur(${props.blur ?? 500}px)`,

    })}/>
  );
}