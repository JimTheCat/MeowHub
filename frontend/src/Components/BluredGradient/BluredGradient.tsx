import {Box} from "@mantine/core";

interface props {
  fromColor?: string;
  toColor?: string;
  deg?: number;
  blur?: number;
}

export const BluredGradient = (prop: props) => {
  return (
    <Box sx={(theme) => ({
      position: 'absolute',
      backgroundImage: theme.fn.gradient({
        from: prop.fromColor || 'hotpink',
        to: prop.toColor || 'cyan',
        deg: prop.deg || 45,
      }),
      zIndex: -1,
      width: '35%',
      height: '40%',
      top: '0',
      filter: `blur(${prop.blur || 500}px)`,

    })}/>
  );
}