import {useTranslation} from "react-i18next";

export const Status = (value: string | undefined) => {
  const {t} = useTranslation('messenger');

  let status: string;
  switch (value) {
    case 'ONLINE':
      status = t('status.online');
      break;
    case 'IDLE':
      status = t('status.idle');
      break;
    case 'OFFLINE':
      status = t('status.offline');
      break;
    default:
      status = t('status.offline');
  }

  return status;
}