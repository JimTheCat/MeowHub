import {useEffect, useState} from 'react';
import {Button, Group, Modal, Text, UnstyledButton} from '@mantine/core';

export const CookiesPopup = () => {
  const [opened, setOpened] = useState<boolean>(false);

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
      title="Używamy ciasteczek 🍪"
      centered
      closeOnEscape={false}
      closeOnClickOutside={false}
      withCloseButton={false}
      size="md"
    >
      <Text>
        Nasza strona korzysta z ciasteczek w celu zapewnienia najlepszej jakości usług. Kontynuując
        przeglądanie, akceptujesz naszą <UnstyledButton c={'blue'} onClick={() => window.open("/privacy", '_blank')}>politykę
        prywatności</UnstyledButton>.
      </Text>

      <Group justify="flex-end" mt="md">
        <Button onClick={handleAccept} color="blue">
          Akceptuję
        </Button>
      </Group>
    </Modal>
  );
}
