Gestion d'Église
Description
Le projet "Gestion d'Église" est une application web conçue pour simplifier la gestion administrative et organisationnelle des activités au sein d'une église. L'application permet aux utilisateurs de se connecter en tant qu'administrateur, bénévole ou fidèle, offrant des fonctionnalités spécifiques à chaque rôle. Les principales fonctionnalités incluent la gestion des fidèles et des bénévoles, la gestion des événements et des bénévolats, ainsi que la réservation aux événements et aux activités bénévoles.

Installation
Pour installer et configurer le projet localement, suivez ces étapes :

Clonez ce dépôt GitHub sur votre machine locale en utilisant la commande suivante :

git clone <lien-du-depot>
Accédez au répertoire backend du projet :
cd backend

Initialisez le projet en exécutant la commande :
npm init

Installez les modules nécessaires en exécutant la commande suivante :
npm install bcrypt cors express jsonwebtoken jwt-decode mysql2

Configurez votre base de données en suivant les instructions du fichier script-bd.md. Assurez-vous que la base de données s'appelle "gestion-eglise". (du sql donc wamp server)

Lancez le serveur en utilisant pm2 avec la commande :

pm2 start server.js

Accédez au répertoire frontend du projet :
cd ../frontend

Compilez les fichiers Sass en CSS en exécutant la commande :
npm run sass
Utilisation
Une fois le projet installé et configuré, vous pouvez accéder à l'interface utilisateur en ouvrant en live server le fichier user.html . Voici quelques points à prendre en compte lors de l'utilisation de l'application :

Pour accéder à l'interface administrateur, connectez-vous en utilisant vos identifiants en ouvrant la page admin.html. Si aucun token n'est présent, vous serez redirigé vers la page d'inscription.
Les utilisateurs peuvent s'inscrire et se connecter en tant que bénévole ou fidèle. Les bénévoles n'ont pas accès à la fonctionnalité de réservation aux événements, réservée aux fidèles.
Les tokens ont une durée d'expiration de 30 minutes.
En cliquant sur "Messagerie", les utilisateurs devraient etre dirigés vers un groupe WhatsApp pour toute demande d'intégration mais cela n'a pas été implémenté.
Exemples
AddEvenement :
Pour ajouter un nouvel événement à l'église, suivez ces étapes :

Connectez-vous à l'interface administrateur.
Accédez à la section "Gestion des événements".
Cliquez sur le bouton "Ajouter un événement".
Remplissez le formulaire avec les détails de l'événement.
Cliquez sur le bouton "Enregistrer" pour sauvegarder l'événement.
Contributions
Les contributions à ce projet sont les bienvenues ! Pour contribuer, suivez ces étapes :

Fork ce dépôt GitHub.
Créez une nouvelle branche pour votre fonctionnalité ou correction.
Faites vos modifications.
Envoyez une pull request avec une description détaillée de vos changements.
Licence
Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.

Auteurs
Ce projet a été développé par AGBEHONOU Yann Prince Djilan qui a réalisé tout le backend ainsi que la base de donnée et SOTONGBE joseph avec l'aide de AKAKPO Ayewnou ont realisé le frontend.

Contact
Pour toute question ou commentaire, veuillez nous contacter à l'adresse yannagbehonou@gmail.com.
voici une explication plus détaillé du code: 

titre du projet: gestion d'eglise; description: la logique de mon code veut que l'utilisateur se connecte sur la page admin.html; s'il n a pad de token, tous les liens sur lesquels il clickera le renveront vers la page d'inscription. Il y a deux acteurs au niveaux de cette page: benevole et fidele . Donc deux types d'inscriptions et de connexion ont été intégré mais si l'utilisateur veut se connecter en tant que fidele il doit d'abord entré son identifiant fidele qui lui aura été remis par le gerant lors du préeenregistrement au sein de l'eglise. S'il s'inscris et  se connecte en tant que benevole, il n'aura pas acces a la fonctionnalité evenement réservée uniquement aux fideles qui eux y auront access lors de leur connexion. On utilise pm2 au niveau du serveur au lieu de nodemon pour eviter que le serveur ne crash a chaque erreur. il s'intallera avec npm i pm2 et se lancera dans le dossier backend avec le script pm2 start server.js et s'arretera aavec pm2 stop all. De meme le frontend a été stylisé avec sass. Et pour le run, il faut se diriger dans le dossier frontend et lancé npm run sass. Tout cela poura etre realisé apres avoir creer une base de donnée avec le script présent dans script-bd.md. le nom de la base de donnée est gestion- eglise. Tous les modules a installer dans la base de donnée sont:     
"bcrypt": "^5.1.1",
"cors": "^2.8.5",
"express": "^4.19.2",
"jsonwebtoken": "^9.0.2",
"jwt-decode": "^4.0.0",
mysql2": "^3.9.3". Tout cela apres avoir fait npm init dans le backend. Pour les fonctionnalités qui ont été ajoutées pour le benevole et le fidele, il y a la reservation  au benevolat disponible qui ont été au prealable intégrées par le gerant pour les deux acteurs et la reservation aux evenements qui ont ete integrés par le gerant uniquement pour le fidele. La fonctionalité contribution n 'a malheureusement pu etre intégrée et les lien dans le dashboard du gerant qui sont sensés recuperés les informations et les insérées dans le tbody des tableaux ne fonctionnenet pas . Cependant, l 'ajout des identifiants fideles et leur nom et prenom fonctions . les fontionnalités qui fonctionnent sont addEvenement, addBenevolat, addFidele et seDeconnecter. chaque token a une durée d'expiration de 30min. Et normalement cliquez sur messagerie devrait juste renvoyer vers un groupe whatsapp avec une demande d'integration.Le nom de l'eglise  mawulawoe n'est qu'un exemple et le site peut etre personnalisable selon les gouts de chacun. En temps normal lorsqu'on effectue une action comme s'incrire par exemple ou faire une reservation, on reçoit une notification en haut a droite.A noter que la responsivité n'a pas été au préalable gérée.

