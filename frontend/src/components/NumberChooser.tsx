import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Dialog,
  DialogTitle,
  ListItemAvatar,
  Avatar,
  colors,
  TextField,
  Fab,
  Collapse,
} from "@material-ui/core";
import {
  Phone as NumberIcon,
  Add as AddIcon,
  Check as ConfirmIcon,
} from "@material-ui/icons";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: colors.blue[100],
    color: colors.blue[600],
  },
});

type SelectCallback = (number?: string) => void;

interface Props {
  numbers: string[];
  onSelect: SelectCallback;
}

const NumberChooser: React.FC<Props> = ({ numbers, onSelect }) => {
  const classes = useStyles();
  const [custom, setCustom] = React.useState("");

  if (numbers.length === 0) {
    return null;
  }

  const handleListItemClick = (value: string) => {
    onSelect(value);
  };

  const handleCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustom(event.target.value);
  };

  const handleCustomConfirm = () => {
    onSelect(custom);
  };

  const customItem = (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AddIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <TextField
              placeholder="Un autre numéro"
              value={custom}
              onChange={handleCustomChange}
              fullWidth
            />
          }
        />
      </ListItem>
      <Collapse in={Boolean(custom)} timeout="auto" unmountOnExit>
        <ListItem style={{ justifyContent: "center" }}>
          <Fab
            color="primary"
            size="medium"
            aria-label="Confirmer"
            onClick={handleCustomConfirm}
          >
            <ConfirmIcon />
          </Fab>
        </ListItem>
      </Collapse>
    </>
  );

  return (
    <Dialog
      open={true}
      onClose={() => onSelect(undefined)}
      aria-labelledby="numberchooser-dialog-title"
    >
      <DialogTitle id="numberchooser-dialog-title">Transfer vers</DialogTitle>
      <List>
        {numbers.map(number => (
          <ListItem
            button
            onClick={() => handleListItemClick(number)}
            key={number}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <NumberIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={number} />
          </ListItem>
        ))}
        {customItem}
      </List>
    </Dialog>
  );
};

export default NumberChooser;
