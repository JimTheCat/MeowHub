import {useEffect, useRef, useState} from "react";
import {Box, Button, Group} from "@mantine/core";
import {useTranslation} from "react-i18next";

export const TruncatedText = ({text, lines = 3, textSize = 13}: {
  text: string,
  lines?: number,
  textSize?: number
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const {t} = useTranslation('truncatedTextComponent');

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollWidth > textRef.current.clientWidth ||
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsTruncated(isOverflowing);
    }
  }, [text]);

  return (
    <Box>
      <Box
        ref={textRef}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: showFullText ? 'none' : lines,
          WebkitBoxOrient: "vertical" as const,
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: `${textSize}px`,
        }}
      >
        {text}
      </Box>
      {isTruncated && (
        <Group justify={'flex-end'}>
          <Button
            variant="transparent"
            size="xs"
            onClick={() => setShowFullText((prev) => !prev)}
          >
            {showFullText ? t('less') : t('more')}
          </Button>
        </Group>
      )}
    </Box>
  );
};
