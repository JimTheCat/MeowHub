import {useEffect, useState} from 'react';
import {Button, Group, Modal, Text, UnstyledButton} from '@mantine/core';
import {Trans, useTranslation} from "react-i18next";

export const CookiesPopup = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const {t} = useTranslation('cookiesComponent');

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    if (!hasAcceptedCookies && !window.location.pathname.includes('/privacy')) {
      setOpened(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true'); // Save to local storage
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={t('title')}
      centered
      closeOnEscape={false}
      closeOnClickOutside={false}
      withCloseButton={false}
      size="md"
    >
      <Text>
        <Trans
          i18nKey={t('message')}
          components={{
            1: (
              <UnstyledButton
                c={'blue'}
                onClick={() => window.open('/privacy', '_blank')}
              />
            ),
          }}
        />
      </Text>

      <Group justify="flex-end" mt="md">
        <Button onClick={handleAccept} color="blue">
          {t('button')}
        </Button>
      </Group>
    </Modal>
  );
}
