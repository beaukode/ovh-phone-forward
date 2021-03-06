import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  List,
  ListSubheader,
  Paper,
  Box,
  Typography,
  IconButton,
  colors,
} from "@material-ui/core";
import { Info as AboutIcon } from "@material-ui/icons";
import Number from "./components/Number";
import NumberChooser from "./components/NumberChooser";
import { Lines, extractNumbers } from "./Common";
import AboutDialog from "./components/AboutDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      margin: "auto",
    },
    paper: {
      margin: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    about: {
      color: colors.grey[500],
    },
  })
);

interface StatesResponse {
  nichandle: string;
  lines: Lines;
}

const App: React.FC = () => {
  const [lines, setLines] = React.useState<Lines>({});
  const [nic, setNic] = React.useState("Chargement des numéros...");
  const [error, setError] = React.useState("");
  const [numbers, setNumbers] = React.useState<string[]>([]);
  const [currentLine, setCurrentLine] = React.useState<string>();
  const [about, setAbout] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    window
      .fetch("states")
      .then(r => {
        if (r.status !== 200) {
          return Promise.reject(`${r.status} ${r.statusText}`);
        }
        return r.json().then((data: StatesResponse) => {
          setLines(data.lines);
          setNic(data.nichandle);
        });
      })
      .catch(err => {
        console.error(err);
        setError("Erreur lors du chargement des lignes");
      });
  }, []);

  const handleNumberChange = (number: string, forward: string | null) => {
    if (Boolean(forward)) {
      setLines(c => {
        return { ...c, [number]: null };
      });
      window
        .fetch("forward", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ line: number }),
        })
        .then(r => {
          if (r.status !== 200) {
            return Promise.reject(`${r.status} ${r.statusText}`);
          }
        })
        .catch(err => {
          console.error(err);
          setError("Erreur lors de la désactivation");
          setLines(c => {
            return { ...c, [number]: forward };
          });
        });
    } else {
      setCurrentLine(number);
      setNumbers(extractNumbers(lines));
    }
  };

  const handleNumberSelect = (to?: string) => {
    if (to && currentLine) {
      const line = currentLine;
      setLines(c => {
        return { ...c, [line]: to };
      });
      window
        .fetch("forward", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ line, to }),
        })
        .then(r => {
          if (r.status !== 200) {
            return Promise.reject(`${r.status} ${r.statusText}`);
          }
        })
        .catch(err => {
          console.error(err);
          setError("Erreur lors de l'activation");
          setLines(c => {
            return { ...c, [line]: null };
          });
        });
    }
    setNumbers([]);
    setCurrentLine(undefined);
  };

  const handleAboutClick = React.useCallback(() => {
    setAbout(true);
  }, []);

  const handleAboutClose = React.useCallback(() => {
    setAbout(false);
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <List subheader={<ListSubheader>{nic}</ListSubheader>}>
          {Object.entries(lines).map(([number, forward]) => {
            return (
              <Number
                key={number}
                number={number}
                forward={forward}
                onChange={handleNumberChange}
              />
            );
          })}
        </List>
        {Boolean(error) && (
          <Box margin={1}>
            <Typography paragraph>
              {error}
              <br />
              Vérifiez les logs du serveur
            </Typography>
          </Box>
        )}
      </Paper>
      <Box m={1} textAlign="right">
        <IconButton
          aria-label="A propos"
          size="small"
          className={classes.about}
          onClick={handleAboutClick}
        >
          <AboutIcon />
        </IconButton>
      </Box>
      <AboutDialog open={about} onClose={handleAboutClose} />
      <NumberChooser onSelect={handleNumberSelect} numbers={numbers} />
    </div>
  );
};

export default App;
