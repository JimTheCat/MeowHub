import {ActionIcon, Card, Divider, Group, Text} from "@mantine/core";
import {InnerHtmlHandler} from "../../../shared/components/InnerHtmlHandler";
import {useAuthStore} from "../../../shared/services/authStore.ts";
import {useParams} from "react-router-dom";
import {IconPencil} from "@tabler/icons-react";
import {modals} from "@mantine/modals";
import {ModalRichContent} from "../../../shared/consts";
import {useRef, useState} from "react";
import api from "../../../shared/services/api.ts";
import {useAlert} from "../../../../Providers/AlertProvider.tsx";
import {useTranslation} from "react-i18next";

export const ProfileAboutMe = (props: { htmlContent: string }) => {
  const auth = useAuthStore();
  const alert = useAlert();
  const {userTag} = useParams();
  const isProfileOfLoggedUser = userTag === auth.user?.tag;
  const [content, setContent] = useState("");
  const contentRef = useRef(content);
  const {t} = useTranslation('profile');

  const handleUpdateSection = () => {
    api.post('/api/profiles', null, {params: {content: contentRef.current}}).then(() => {
      alert.showError({
        title: t('aboutMe.alert.title'),
        message: t('aboutMe.alert.message'),
        level: "INFO",
        timestamp: new Date().toISOString(),
      });
    });
  };

  const handleContentChange = (content: string) => {
    setContent(content);
    contentRef.current = content;
  }

  const UpdateSection = () => modals.openConfirmModal({
    title: t('aboutMe.modal.title'),
    children: (
      <ModalRichContent content={props.htmlContent} handleContentChange={handleContentChange}/>
    ),
    labels: {confirm: t('aboutMe.modal.labels.confirm'), cancel: t('aboutMe.modal.labels.cancel')},
    confirmProps: {color: 'blue'},
    size: "auto",
    centered: true,
    closeOnClickOutside: false,
    onConfirm: handleUpdateSection,
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" w={500} withBorder>
      <Group justify={'space-between'}>
        <Text size={"lg"}>{t('aboutMe.card.title')}</Text>
        {isProfileOfLoggedUser &&
            <ActionIcon variant={'subtle'} radius={'xl'} color={"gray"} onClick={UpdateSection}>
                <IconPencil stroke={1.2}/>
            </ActionIcon>
        }
      </Group>

      <Divider my={"sm"}/>
      {props.htmlContent === "" && <Text c={"dimmed"}>{t('aboutMe.card.empty')}</Text>}
      <InnerHtmlHandler innerHtml={props.htmlContent}/>
    </Card>
  );
}