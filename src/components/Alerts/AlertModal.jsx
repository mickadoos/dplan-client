import React from "react";

import classes from "./AlertModal.module.css";

import Button from "./Button";
import Card from "./Card";

const AlertModal = (props) => {
  const dismissErrorHandler = () => {
    props.onErrorClick();
  };
  return (
    <div>
      <div className={classes.backdrop} onClick={dismissErrorHandler} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={dismissErrorHandler}>Okay</Button>
        </footer>
      </Card>
    </div>
  );
};

export default AlertModal;