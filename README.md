# JOB SCROLL — guide de démarrage

Cette version est une **première application web progressive (PWA)** responsive. Elle contient une interface fonctionnelle, une recherche, des filtres, des favoris locaux et un formulaire d'authentification prêt à connecter à Supabase.

## Important avant publication
- Les 6 annonces intégrées sont des **données fictives de démonstration**.
- Les photos sont des illustrations de métiers, pas des photos garanties des entreprises qui recrutent.
- Les boutons renvoient vers la recherche générale France Travail : ils ne correspondent pas à une annonce précise.
- Aucun flux d'offres en direct n'est branché dans cette version.
- Les favoris sont enregistrés dans le navigateur de l'appareil. La synchronisation entre appareils n'est pas encore activée.

## Étape 1 — Tester l'application
Décompresse le ZIP. Ouvre `index.html` dans un navigateur. Pour tester l'installation PWA et le service worker, utilise un serveur local ou publie le site en HTTPS.

## Étape 2 — Mettre le code sur GitHub
1. Crée un compte sur https://github.com/.
2. Crée un nouveau dépôt nommé `job-scroll`.
3. Ajoute tous les fichiers de ce dossier à la racine du dépôt, puis valide (Commit).

## Étape 3 — Publier gratuitement avec Cloudflare Pages
1. Crée un compte sur https://pages.cloudflare.com/.
2. Choisis **Create a project** puis connecte GitHub.
3. Sélectionne le dépôt `job-scroll`.
4. Choisis le déploiement de site statique : commande de build vide, dossier de sortie ` / ` (racine du dépôt, généralement `.`).
5. Lance le déploiement. Cloudflare fournit une adresse publique en `pages.dev`.

Les offres gratuites, quotas et écrans de configuration des plateformes peuvent évoluer. Vérifie les limites affichées au moment de créer les comptes.

## Étape 4 — Activer les comptes e-mail avec Supabase
1. Crée un projet sur https://supabase.com/.
2. Dans le tableau de bord du projet, ouvre les paramètres API / Data API et copie l'URL du projet et la clé publique `anon` ou `publishable`.
3. Dans `config.js`, remplace `https://TON-PROJET.supabase.co` et `TA_CLE_ANON_OU_PUBLISHABLE`.
4. Ne copie **jamais** une clé `service_role` ou secrète dans le navigateur ou GitHub.
5. Dans Supabase Authentication, configure les URL autorisées et l'URL de redirection de ton site Cloudflare Pages.
6. Teste l'inscription puis la connexion avec une adresse e-mail.

La clé publique peut être présente dans le navigateur uniquement si les règles de sécurité côté base de données (RLS) sont correctement configurées. Cette version n'enregistre pas encore de profil candidat dans une table.

## Étape 5 — Ajouter de vraies offres d'emploi
Il faut connecter une source autorisée, par exemple l'API France Travail si l'accès est accordé. Les identifiants privés et jetons d'accès doivent rester côté serveur, par exemple dans un Cloudflare Worker avec des secrets, jamais dans `app.js` ou `config.js`.
Prévoir ensuite :
- un service serveur qui récupère les offres et normalise titre, lieu, contrat, description, image et URL de candidature ;
- une vérification des conditions d'utilisation et de réutilisation des données ;
- une modération / gestion des annonces expirées ;
- le remplacement de `demoJobs` dans `app.js` par les données reçues du service.

## Étape 6 — Avant l'ouverture au public
- Tester mobile, tablette et ordinateur.
- Ajouter politique de confidentialité, mentions légales et contact.
- Expliquer quelles données personnelles sont collectées et pourquoi.
- Configurer la sécurité, les règles d'accès et la suppression de compte.
- Vérifier les liens de candidature et la fraîcheur des offres.
- Tester les limites des offres gratuites des prestataires.

## Arborescence
- `index.html` : structure de la page
- `styles.css` : design responsive
- `app.js` : recherche, filtres, favoris et authentification
- `config.js` : paramètres publics Supabase à renseigner
- `manifest.webmanifest` et `sw.js` : installation PWA et cache
- `README.md` : guide de déploiement
