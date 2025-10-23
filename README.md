# Laboratoire_7-programmation-serveur-web

## Introduction
Dans ce laboratoire, nous avons mis sur pied une API interne
développée avec Node.js et Express, connectée à une base de données
MySQL pour le cafe **cafe Nova**.

### Fonctionnalites de l'application
L’application doit permettre :
- D’ajouter une réservation 
- De consulter la liste complète des reservations 
- D’obtenir le détail d’une réservation spécifique 
- De supprimer une réservation existante

### Fonctionnement du programme cote backend
- **POST** `/Reservations` : permet d'ajouter une réservation 
- **GET** `/Reservations` : permet de lister toutes les reservations
- **GET** `/Reservations/:id` : permet d'afficher les details d'une reservation specifique
- **DELETE** `/Reservations/:id` : permet de supprimer une reservation

**Codes de statut** utilisés : 200 (succes), 201 (ressource creee), 400 (requete invalide), 404 (non trouve), 500 (erreur serveur).


### Lancement du programme 
Dans notre programme :
- Nous avons utilise `express` pour cree un serveur dynamique
- Nous avons utilise `nodemon` pour permettre le redémarre automatiquement du serveur quand on modifie des fichiers.
- Nous avons utilise `mysql2` pour la communication entre le serveur et MySQL
-  Nous avons utilise `dotenv` pour gerer les variables d’environnement (fichier .env). Et proteger les informations sensibles (identifiants, mot de passe, etc.)
- Nous allons utiliser `postman` pour tester nos requetes HTTP

#### Démarrer le backend
Dans un terminal à la racine `BackEnd` :

- Installez les dépendances du package.json (express, nodemon, mysql2, dotenv)

```
npm install
```

- Lancez le backend avec nodemon 

```
npx nodemon index.js
```

- Rassurez vous que vous avez creez le fichier `.env` a la racine de votre BackEnd, et que vous avez inserez vos informations de connexion comme ci-dessous (remplacer la valeur des variables `DB_user` et `DB_PASS` uniquement  )

```
DB_HOST = localhost
DB_user = VOTRE NOM D'UTILISATEUR
DB_PASS= VOTRE MOT DE PASSE
DB_NAME = cafenova
```

- Ensuite allez dans postman et testez vos requetes HTTP
