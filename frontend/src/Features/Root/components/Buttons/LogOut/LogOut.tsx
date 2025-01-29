import {Button} from "@mantine/core";
import {IconLogout} from "@tabler/icons-react";
import {useAuthStore} from "../../../../shared/services/authStore.ts";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const LogOut = () => {

  const {t} = useTranslation('root');
  const auth = useAuthStore();
  const navigate = useNavigate();

  return (
    <Button
      variant={"subtle"}
      size={"md"}
      leftSection={<IconLogout/>}
      autoContrast
      fullWidth
      justify={"flex-start"}
      color={"gray"}
      onClick={() => {
        auth.logout();
        navigate('/login');
      }}
    >
      {t('logOut.label')}
    </Button>
  );
}