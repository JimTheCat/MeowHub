import {Image, MantineRadius, MantineStyleProp, Skeleton} from "@mantine/core";
import {useState} from "react";

export const ImageWithSkeleton = (props: {
  src: string;
  alt: string,
  radius: number | MantineRadius,
  style?: MantineStyleProp
}) => {

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      {!isImageLoaded && <Skeleton height={400} radius={props.radius}/>}
      <Image
        src={props.src}
        alt={props.alt}
        radius={props.radius}
        onLoad={() => setIsImageLoaded(true)}
        style={props.style}
        display={isImageLoaded ? "block" : "none"}
      />
    </>
  );
}