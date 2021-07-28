# RemiSany_9_17052021

## Projet 9 "Débuggez et testez un SaaS RH."

### CONTEXTE

#### Fiabiliser et améliorer le parcours employé :
- Fixer les bugs identifiés.
- Ajouter des tests unitaires et d'intégration.
- Rédiger un plan de test End-to-End pour le parcours employé

#### Bugs :
- Les notes de frais ne s’affichent pas par ordre décroissant.
- Il n’est pas possible de se connecter en tant qu’administrateur.
- Tous les formats de justificatifs sont actuellement acceptés, ce qui provoque un problème d’affichage.
- Sur le Dashboard administrateur, il n’est pas possible de déplier plusieurs listes de tickets et d’ensuite sélectionner un ticket.

#### Tests unitaires et d'intégration :
- Composant containers/Bills.
    - Couvrir tous les statements sauf les appels au back-end firebase.
    - Ajouter un test d’intégration GET Bills.
- Composant containers/NewBill.
    - Couvrir tous les statements sauf les appels au back-end firebase.
    - Ajouter un test d’intégration POST NewBill.


#### Plan de test End-to-End :
- [Plan E2E parcours employé](./Plan_E2E_ParcoursEmployé.pdf)

### TECHNOLOGIES UTILISÉES
- HTML5.
- CSS3.
- Javascript.
- React
- Jest
- React Testing Library
- Visual Studio Code.

Projet validé le 15 juillet 2021.


### INFORMATIONS COMPLEMENTAIRES

#### LANCER L'APPLICATION EN LOCAL
- Téléchargez le projet
- Accédez au dossier
- Installez les packages npm (décrits dans `package.json`) : npm install
- Installez live-server pour lancer un serveur local : npm install -g live-server
- Lancez l'application : live-server

#### LANCER TOUS LES TESTS EN LOCAL AVEC JEST
- npm run test
- Voir la couverture de test: `http://127.0.0.1:8080/coverage/lcov-report/`

