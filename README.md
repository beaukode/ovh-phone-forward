# Ovh Phone Forward
[![CircleCI](https://circleci.com/gh/beaukode/ovh-phone-forward/tree/master.svg?style=svg)](https://circleci.com/gh/beaukode/ovh-phone-forward/tree/master)

Gérer simplement la redirection de lignes OVH Telecom depuis votre ordinateur, smarphone et tablette sans passer par l'interface OVH.

Je suis développeur freelance et lorsque je quitte mon bureau, je redirige ma ligne fixe vers mon téléphone portable.
Régulièrement je me rends compte quelques minutes après mon départ que j'ai oublié de réaliser la redirection...
Cette page web me permet donc de gérer mes redirections de lignes avec mon smartphone sans avoir besoin de me connecter à l'interface OVH.

Un autre cas d'utilisation est par exemple la redirection vers la ligne d'un collaborateur.

![Capture d'écran de l'application](https://raw.githubusercontent.com/beaukode/ovh-phone-forward/master/media/screen_app.png)

## Avertissement sécurité
Le serveur web n'implémente **pas de sécurisation d'accès** à la page.
Le lancement sur une ip publique rendera accessible au monde la gestion de vos redirections!
Je conseil de l'utiliser derrière un reverse proxy HTTP (Je l'utilise avec traefik qui se charge de l'authentification)

Bien que la clé d'API (Consumer Key) est limitée à la gestion des lignes, il ne faut pas la partager !

## Disponibilité
L'application est disponible en container docker contenant le backend et frontend : https://hub.docker.com/r/beaukode/ovh-phone-forward

## Premier lancement

`docker run -p 8080:8080 beaukode/ovh-phone-forward`

Lors du lancement du container le serveur affiche un URL permetant l'autorisation d'un accès API OVH :
```
[OVH] MISSING_CREDENTIAL issue a new one: N9yAh3CUWgqOhbby30FaAgRaWTAOVB4r
Validate this cert with this url to continue:
https://eu.api.ovh.com/auth/?credentialToken=w2wwMU0lcNgKO8GHlkHM6ewHv7UpoOo0MMPpidVnt8PWkIwKbT2qIBASf2qIBay
```
Il faut ouvrir l'url dans un navigateur pour valider la nouvelle clé.

**ATTENTION par défaut la durée de validité est de 1 jour**, pour pouvoir autoriser un accès permanent il faut définir Validity = Unlimited

![Ecran validation clé API OVH](https://raw.githubusercontent.com/beaukode/ovh-phone-forward/master/media/screen_api.png)

Une fois la validation faite, le serveur va confirmer sans ses logs.

```
consumerKey Authorized!
******************************************************
*                                                    *
* New consumer key autorized.                        *
* To use it on next run set environement variable :  *
* OVH_CONSUMER_KEY=N9yAh3CUWgqOhbby30FaAgRaWTAOVB4r  *
*                                                    *
******************************************************
Connected to NIChandle: cj123456-ovh
Server ready at : http://localhost:8080
```
Conserver la variable d'environnement pour les prochains lancements (ex: OVH_CONSUMER_KEY=N9yAh3CUWgqOhbby30FaAgRaWTAOVB4r)

## Lancement avec Consumer Key
Une fois la clé autorisée il faut passer la variable d'environnement au container a chaque démarrage

`docker run -e "OVH_CONSUMER_KEY=N9yAh3CUWgqOhbby30FaAgRaWTAOVB4r" -p 8080:8080 beaukode/ovh-phone-forward`

## Problèmes, bugs, suggestions
Merci de centraliser les demandes sur git hub : https://github.com/beaukode/ovh-phone-forward/issues

Pull requests bienvenues (pensez à vous aujouter au contributeurs du README.md pour la première)

## TODO
- [ ] Ajouter un middleware pour authentification HTTP Basic
- [ ] Mise en forme des message d'erreur coté front
- [ ] Prise en charge api OVH amérique du nord
- [ ] Configurer des numéros pré saisi lors de l'activation d'une redirection
- [ ] Traduire l'application en anglais

## Technologies / Crédits
- ReactJS : [reactjs.org](https://reactjs.org/)
- TypeScript : [typescriptlang.org](https://www.typescriptlang.org/)
- NodeJS : [nodejs.org](https://nodejs.org/)
- Material-UI : [material-ui.com](https://material-ui.com/)
- ExpressJS : [expressjs.com](https://expressjs.com/)
- Webpack : [webpack.js.org](https://webpack.js.org/)
- Jest : [jestjs.io](https://jestjs.io/)
- CircleCI : [circleci.com](https://circleci.com/)
- Docker : [docker.com](https://docker.com/)
- Material Icons : [material.io/resources/icons](https://material.io/resources/icons/)
- Favicon Generator : [realfavicongenerator.net](https://realfavicongenerator.net/)
- Roboto Font : [fonts.google.com/specimen/Roboto](https://fonts.google.com/specimen/Roboto/)

## Contributeurs
Jérémie COLOMBO (beaukode) https://www.anvok.net/

## MIT License
Copyright (c) 2020 Jérémie COLOMBO

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
