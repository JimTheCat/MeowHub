import {Affix, Box, Button, Container, Divider, Space, TableOfContents, Text, Title,} from '@mantine/core';
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {IconArrowUp} from "@tabler/icons-react";

export const Privacy = () => {
  const dateOfLastUpdate = '18.01.2025';
  const {t} = useTranslation('privacy');
  const [affixVisible, setAffixVisible] = useState(false);

  const sections = [
    {id: "mdx-personal-data", label: t('table.sections.section1')},
    {id: "mdx-cookies", label: t('table.sections.section2')},
    {id: "mdx-data-sharing", label: t('table.sections.section3')},
    {id: "mdx-rights", label: t('table.sections.section4')},
    {id: "mdx-security", label: t('table.sections.section5')},
    {id: "mdx-data-retention", label: t('table.sections.section6')},
    {id: "mdx-contact", label: t('table.sections.section7')},
  ];

  // Observe scrolling to toggle Affix visibility
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setAffixVisible(scrollPosition > 200);
  };

  // Attach scroll listener
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

  return (
    <Container>
      {/* Header */}
      <Title order={1} ta="center" mt={'xl'}>{t('navbar.title')}</Title>
      <Text ta="center" mt="md">
        {t('navbar.description')}
      </Text>
      <Text ta={'center'} mt={'md'} c={'dimmed'}>
        {t('navbar.lastUpdated', {date: dateOfLastUpdate})}
      </Text>

      <Space h="xl"/>

      {/* Table of Contents */}
      <TableOfContents
        variant="light"
        color="pink"
        size="md"
        radius="md"
        scrollSpyOptions={{
          selector: 'h3',
        }}
        getControlProps={({data}) => ({
          onClick: () => data.getNode().scrollIntoView(),
          children: data.value,
        })}
      />

      <Space h="xl"/>
      <Divider my="lg"/>

      {/* Sections */}
      {sections.map((section) => (
        <Box id={section.id} key={section.id}>
          <Title order={3}>{section.label}</Title>
          <Text mt="sm">
            {t(`section${sections.indexOf(section) + 1}.description`)}
          </Text>
          <Space h="lg"/>
        </Box>
      ))}

      <Space h="xl"/>
      <Text ta="center" size="sm" c="dimmed">
        {t('footer.description')}
      </Text>

      {/* Affix */}
      <Affix position={{bottom: 20, right: 20}} hidden={!affixVisible}>
        <Button leftSection={<IconArrowUp size={16}/>} component="a" href="#top">
          {t('affix')}
        </Button>
      </Affix>
      <Space h="xl"/>

    </Container>
  );
};
