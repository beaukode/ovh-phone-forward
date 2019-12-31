import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Box,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { PhoneForwarded as PhoneForwardedIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    secondary: {
      display: "flex",
      alignItems: "center",
    },
  })
);

type ChangeCallback = (number: string, forward: string | null) => void;

interface Props {
  number: string;
  forward: string | null;
  onChange?: ChangeCallback;
}

const Number: React.FC<Props> = ({ number, forward, onChange }) => {
  const classes = useStyles();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (onChange) {
      onChange(number, checked ? null : forward);
    }
  };

  const id = "number-" + number;
  const fwNode = forward ? (
    <>
      <PhoneForwardedIcon />
      <Box component="span" flexGrow={1} margin={1}>
        {forward}
      </Box>
    </>
  ) : null;
  return (
    <ListItem>
      <ListItemText
        primary={number}
        primaryTypographyProps={{ id }}
        secondary={fwNode}
        secondaryTypographyProps={{ className: classes.secondary }}
      />
      <ListItemSecondaryAction>
        <Switch
          data-testid="switch"
          edge="end"
          inputProps={{ "aria-labelledby": id }}
          checked={Boolean(forward)}
          onChange={handleChange}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Number;
