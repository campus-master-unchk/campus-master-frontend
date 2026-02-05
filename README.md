# 💻 CampusMaster Frontend - Next.js 14+

L'interface utilisateur de la plateforme **CampusMaster**, développée avec **Next.js** (App Router). Cette application offre une expérience fluide, réactive et sécurisée pour les étudiants, les enseignants et les administrateurs.

## 🚀 Technologies Utilisées

* **Framework** : [Next.js 16](https://nextjs.org/) (App Router).
* **Langage** : TypeScript.
* **Styling** : Tailwind CSS + Lucide Icons / React Icons.
* **Gestion de formulaires** : React Hook Form + Zod (Validation).
* **Communication API** : Axios.
* **Notifications UI** : Sonner.

---

## 📦 Installation

### 1. Prérequis

* Node.js 18.17 ou supérieur
* NPM ou Yarn

### 2. Initialisation

```bash
# Cloner le projet
git clone [URL_DU_REPO_FRONT]
cd campus-master-frontend

# Installer les dépendances
npm install

```

### 3. Configuration de l'environnement (`.env.local`)

Créez un fichier `.env.local` à la racine du projet :

```env
# URL de base de l'API Laravel
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000

# Domaines autorisés pour l'optimisation des images Next.js
NEXT_PUBLIC_API_IMAGE_DOMAINS=127.0.0.1,localhost

```

---

## 🏗️ Structure du Projet (App Router)

Le projet utilise une organisation par groupes de routes pour gérer les différents types d'utilisateurs :

* **`app/`** :
* `page.tsx/` : Login, mot de passe oublié, réinitialisation.
* `admin/` : Gestion des utilisateurs, modules, analytics.
* `teacher/` : Gestion des cours, devoirs et notations.
* `student/` : Consultation des cours, dépôts et notes.


* **`components/`** : Composants UI réutilisables (Sidebars, Tables, StatsCards).
* **`services/`** : Logique d'appel API (Axios instances, AuthService).
* **`middleware.ts`** : Protection des routes et redirection par `user_type`.
* **`types/`** : Interfaces TypeScript pour une application robuste.

---

## 🚀 Commandes Utiles

* **Développement** : `npm run dev` (Lancement sur `http://localhost:3000`)
* **Build Production** : `npm run build`
* **Analyse de type** : `npm run lint`

---

## 📈 Fonctionnalités Implémentées

* ✅ Système de thèmes (Sombre/Clair).
* ✅ Tableaux de bord dynamiques (Recharts).
* ✅ Gestion des formulaires avec retour d'erreurs en temps réel.
* ✅ Toasts de notification pour chaque action utilisateur.

---

**Souhaites-tu que nous travaillions maintenant sur le composant "Dashboard Header" qui affiche le profil de l'utilisateur et le sélecteur de thème ?**