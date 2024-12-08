import {ReactNode} from "react";

interface IContainerVhVw {
  vh?: number;
  vw?: number;
  children: ReactNode;
}

/**
 * @deprecated Use CenterContainer instead
 */
export const ContainerVhVw = (props: IContainerVhVw) => {
  return (
    <div style={{width: props.vw + 'vw', height: props.vh + 'vh'}}>
      {props.children}
    </div>
  );
}