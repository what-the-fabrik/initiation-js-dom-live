# Projet d'exemple codé en live

Ceci est un projet npm très simple qui montre ce qu'on peut faire avec JS et le DOM.

## Prérequis

Il faut [Node.js](https://nodejs.org/fr/).

Le projet est cross-platform (fonctionne sur n'importe quel OS du moment qu'il y a Node.js).

## Cloner le projet

Cf. <https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository>

```
git clone https://github.com/what-the-fabrik/initiation-js-dom-live.git
cd initiation-js-dom-live
```

## Récupérer le projet sans git

Si Node.js (et npm, qui va avec) est installé, il est possible d'utiliser [`degit`](https://github.com/Rich-Harris/degit) :

### Installer degit de façon globale s'il n'est pas encore installé

À faire une seule fois.

```
npm i -g degit
```

### Récupérer le projet avec `degit`

```
degit what-the-fabrik/initiation-js-dom-live
cd initiation-js-dom
```

## Faire tourner le projet

### Installer les dépendances

Exécuter la commande suivante :

```
npm install
```

### Lancer le serveur en mode surveillance

Pour lancer le serveur web qui va surveiller les modifications des fichiers présents dans le dossier `src` du projet et recharger la page automatiquement (ou injecter le nouveau CSS sans rechargement pour le styles uniqument), exécuter la commande suivante :

```
npm run dev
```

Made with love by yours truly (Stan Ormières)
