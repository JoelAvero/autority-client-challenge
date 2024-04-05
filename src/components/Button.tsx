import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";

type Props = {
  props: any;
  children: any;
};

const Button = (props: any) => {
  return (
    <BootstrapButton style={{ width: "100%", fontWeight: "600" }} {...props}>
      {props.children}
    </BootstrapButton>
  );
};

export default Button;
