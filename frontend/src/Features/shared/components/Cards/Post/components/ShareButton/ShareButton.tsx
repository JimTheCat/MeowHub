import {ActionIcon, Button, Group, Popover, Tooltip} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconCopy,
  IconMail,
  IconShare3
} from "@tabler/icons-react";
import {useClipboard} from "@mantine/hooks";
import React from "react";

export const ShareButton = ({postId, children}: { postId: string, children: React.ReactNode }) => {
  const postLink = `${window.location.origin}/post/${postId}`;
  const clipboard = useClipboard();

  const handleCopyLink = () => {
    clipboard.copy(postLink);
  };

  const handleEmailShare = () => {
    const subject = "Check out this post!";
    const body = `Hi, I found this interesting post. Check it out here: ${postLink}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Popover width={250} position="top" shadow="sm" withArrow>
      <Popover.Target>
        <Button variant="subtle" color="gray" leftSection={<IconShare3 stroke={1.5}/>}>
          {children}
        </Button>
      </Popover.Target>
      <Popover.Dropdown w={'fit-content'}>
        <Group gap="sm" grow preventGrowOverflow={false}>
          {/* Copy Link */}
          <Tooltip label={clipboard.copied ? "Link copied!" : "Copy link"} withArrow>
            <ActionIcon
              size="md"
              radius="md"
              variant="light"
              onClick={handleCopyLink}
              title="Copy link"
            >
              <IconCopy size={18}/>
            </ActionIcon>
          </Tooltip>

          {/* Facebook */}
          <Button
            component="a"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postLink)}`}
            target="_blank"
            variant="light"
            size="xs"
            leftSection={<IconBrandFacebook/>}
          >
            Facebook
          </Button>

          {/* Twitter */}
          <Button
            component="a"
            href={`https://twitter.com/share?url=${encodeURIComponent(postLink)}&text=Check out this post!`}
            target="_blank"
            variant="light"
            size="xs"
            leftSection={<IconBrandTwitter/>}
          >
            Twitter
          </Button>

          {/* WhatsApp */}
          <Button
            component="a"
            href={`https://wa.me/?text=${encodeURIComponent(postLink)}`}
            target="_blank"
            variant="light"
            size="xs"
            leftSection={<IconBrandWhatsapp/>}
          >
            WhatsApp
          </Button>

          {/* Email */}
          <Button
            variant="light"
            size="xs"
            leftSection={<IconMail/>}
            onClick={handleEmailShare}
          >
            Email
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
