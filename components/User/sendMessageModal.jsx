import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, TextField } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    textTransform: "none",
    boxShadow: "none",
    padding: "0",
    float: "right",
    marginTop: "10px",
  },
}));

export default function SendMessageModal(props) {
  const { open, onClose, data, onSubmit, text, onChange } = props;

  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p>{data.username + " " + "ile konuşma başlat"}</p>
      <div>
        <TextField
          onChange={onChange}
          style={{ width: "100%" }}
          id="standard-textarea"
          label="yaz bişiler..."
          multiline
        />
        <Button
          disabled={!text}
          onClick={onSubmit}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Gönder
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
