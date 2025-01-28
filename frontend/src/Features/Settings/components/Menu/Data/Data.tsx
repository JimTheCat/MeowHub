import {Box, Button, Fieldset, Group, Tooltip} from "@mantine/core";
import {useTranslation} from "react-i18next";
import api from "../../../../shared/services/api.ts";
import {useAuthStore} from "../../../../shared/services/authStore.ts";
import {ModificationModal} from "../../../../shared/components/ModificationModal";
import {useAlert} from "../../../../../Providers/AlertProvider.tsx";

export const Data = () => {
  const {t} = useTranslation('settings');
  const auth = useAuthStore();
  const alert = useAlert();

  const handleAccountRemove = async () => {
    const response = await api.delete(`/api/settings/account`);
    if (response.status === 200) {
      auth.logout();
      alert.showError({
        title: t('user.personalization.content.account.alert.title'),
        message: t('user.personalization.content.account.alert.message'),
        level: 'INFO',
        timestamp: new Date().toISOString(),
      });
    }
  };

  const confirmAccountRemoval = () => {
    ModificationModal({
      handleAction: () => {
        handleAccountRemove().catch()
      },
      title: t('user.personalization.content.account.modal.title'),
      buttonConfirmText: t('user.personalization.content.account.modal.confirmButton'),
      buttonConfirmColor: 'red',
      buttonCancelText: t('user.personalization.content.account.modal.cancelButton'),
      childrenContent: (
        <p>{t('user.personalization.content.account.modal.message')}</p>
      )
    });
  };

  return (
    <Box>
      <Fieldset legend={t('user.personalization.content.legend')}>
        <Group gap={'xs'}>
          <Tooltip label={t('user.personalization.content.data.tooltip')}>
            <Button variant="outline" color="blue">{t('user.personalization.content.data.children')}</Button>
          </Tooltip>
          <Tooltip label={t('user.personalization.content.account.tooltip')}>
            <Button variant="outline" color="red" onClick={confirmAccountRemoval}>
              {t('user.personalization.content.account.children')}
            </Button>
          </Tooltip>
        </Group>
      </Fieldset>
    </Box>
  );
}