import {GenericMessenger} from "../shared/components/GenericMessenger";
import {mainRegularChatConfig} from "../shared/components/GenericMessenger/consts";

export const Messenger = () => (
  <GenericMessenger config={mainRegularChatConfig}/>
);