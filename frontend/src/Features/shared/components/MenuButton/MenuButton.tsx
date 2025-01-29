import {Button} from "@mantine/core";
import React from "react";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";

type MenuButtonProps = {
  text: string;
  icon: React.ReactNode;
  href?: string;
  mainMenu?: boolean;
  disabled?: boolean;
}

export const MenuButton = (props: MenuButtonProps) => {

  const location = useLocation();
  const navigate = useNavigate();

  // check if the current location is a part of the href

  const isMainMenuActive =
    props.href && location.pathname.startsWith(props.href);

  const isSubMenuActive =
    props.href && location.pathname === props.href;

  const isActive = props.mainMenu ? isMainMenuActive : isSubMenuActive;

  return (
    <Button
      variant={"subtle"}
      size={"md"}
      disabled={props.disabled}
      leftSection={props.icon}
      autoContrast
      fullWidth
      justify={"flex-start"}
      color={"gray"}
      style={() => ({
        backgroundColor: isActive ? 'var(--button-hover)' : '',
      })}
      onClick={() => {
        if (props.href) {
          navigate(props.href)
        }
      }}
    >
      {props.text}
    </Button>
  );
}