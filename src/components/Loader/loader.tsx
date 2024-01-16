import React from "react";
import css from "./styles.module.css";

type LoaderProps = {
  isLoading: boolean;
  children: React.ReactNode;
};
const Loader = ({ isLoading, children }: LoaderProps) => {
  return isLoading ? <div className={css["loader"]}></div> : children;
};

export default Loader;