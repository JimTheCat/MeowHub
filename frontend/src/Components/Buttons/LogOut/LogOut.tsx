import {Button} from "@mantine/core";
import {IconLogout} from "@tabler/icons-react";
import {useAuthStore} from "../../../Services/authStore.ts";
import {useNavigate} from "react-router-dom";

export const LogOut = () => {

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
      Wyloguj się
    </Button>
  );
}