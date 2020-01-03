import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";

type CloseCallback = () => void;

interface Props {
  open: boolean;
  onClose: CloseCallback;
}

const techs = {
  ReactJS: "reactjs.org",
  TypeScript: "www.typescriptlang.org",
  NodeJS: "nodejs.org",
  "Material-UI": "material-ui.com",
  ExpressJS: "expressjs.com",
  Webpack: "webpack.js.org",
  Jest: "jestjs.io",
  CircleCI: "circleci.com",
  Docker: "docker.com",
  "Material Icons": "material.io/resources/icons",
  "Favicon Generator": "realfavicongenerator.net",
  "Roboto Font": "fonts.google.com/specimen/Roboto",
};

function externalLink(url: string): React.ReactElement {
  return (
    <a href={`https://${url}`} rel="noopener noreferrer" target="_blank">
      {url}
    </a>
  );
}

const AboutDialog: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="about-dialog-title"
      aria-describedby="about-dialog-description"
    >
      <DialogTitle id="about-dialog-title">
        A propos de : OVH Phone Forward
      </DialogTitle>
      <DialogContent id="about-dialog-description">
        <Typography color="textSecondary" paragraph>
          Gérer simplement la redirection de lignes téléphoniques OVH Telecom.
          <br />
          <br />
          Réalisé par : Jérémie COLOMBO {externalLink("anvok.net")}
          <br />
          Page web : {externalLink("github.com/beaukode/ovh-phone-forward")}
          <br />
          Problèmes, bugs, suggestions :{" "}
          {externalLink("github.com/beaukode/ovh-phone-forward/issues")}
          <br />
        </Typography>
        <Typography variant="h5" component="h3">
          Technologies / Crédits
        </Typography>
        <Typography component="ul" color="textSecondary" paragraph>
          {Object.entries(techs).map(([name, link]) => {
            return (
              <li key={name}>
                {name} : {externalLink(link)}
              </li>
            );
          })}
        </Typography>
        <Typography variant="h5" component="h3">
          MIT License
        </Typography>
        <Typography color="textSecondary" align="justify" paragraph>
          Copyright (c) 2020 Jérémie COLOMBO
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          "Software"), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions: <br />
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software. <br />
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AboutDialog;
