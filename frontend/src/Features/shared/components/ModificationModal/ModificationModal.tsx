import {MantineColor} from "@mantine/core";
import {modals} from "@mantine/modals";
import React from "react";

type ModificationModalProps = {
  handleAction: () => void;
  buttonConfirmText: string;
  buttonConfirmColor: MantineColor;
  title: string;
  content?: string;
  childrenContent: React.ReactNode;
}

export const ModificationModal = (props: ModificationModalProps) => modals.openConfirmModal({
  title: props.title,
  children: (
    props.childrenContent
  ),
  labels: {confirm: props.buttonConfirmText, cancel: "Cancel"},
  confirmProps: {color: props.buttonConfirmColor},
  size: "auto",
  centered: true,
  closeOnClickOutside: false,
  onConfirm: props.handleAction
});
