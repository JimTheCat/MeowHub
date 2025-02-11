import {Flex, Title} from '@mantine/core';
import {useTranslation} from 'react-i18next';

export const UnselectedChat = () => {
  const {t} = useTranslation('messenger');
  return (
    <Flex align={'center'} justify={'center'} direction="column" h="100vh" style={{flexGrow: 1}}>
      <Title>
        {t('unselectedChat')}
      </Title>
    </Flex>
  );
};
