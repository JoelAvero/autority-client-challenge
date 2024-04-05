import React from "react";
import { Container } from "react-bootstrap";
import style from "../styles/Layout.module.scss";

const Layout = ({ children }) => {
  return <Container className={style.main}>{children}</Container>;
};

export default Layout;
