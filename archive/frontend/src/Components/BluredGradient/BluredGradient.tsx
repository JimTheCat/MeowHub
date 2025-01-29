import {Box, getGradient} from "@mantine/core";

interface props {
  fromColor?: string;
  toColor?: string;
  deg?: number;
  blur?: number;
}

export const BluredGradient = (prop: props) => {
  return (
    <Box style={(theme) => ({
      position: 'absolute',
      backgroundImage: getGradient({
        from: prop.fromColor || 'hotpink',
        to: prop.toColor || 'cyan',
        deg: prop.deg || 45,
      }, theme),
      zIndex: -1,
      width: '35%',
      height: '40%',
      top: '0',
      filter: `blur(${prop.blur || 500}px)`,

    })}/>
  );
}