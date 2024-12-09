import {ReactNode} from "react";

interface IContainerVhVw {
  vh?: number;
  vw?: number;
  children: ReactNode;
}

/**
 * @deprecated ContainerVhVw is deprecated due to bugs with displaying children nodes with raw html components and Mantine dependency.
 * Use CenterContainer instead which is more stable and is fully based on Mantine.
 */
export const ContainerVhVw = (props: IContainerVhVw) => {
  return (
    <div style={{width: props.vw + 'vw', height: props.vh + 'vh'}}>
      {props.children}
    </div>
  );
}