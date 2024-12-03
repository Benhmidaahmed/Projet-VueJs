import { createRouter, createWebHistory } from 'vue-router'; // Vue Router version 4
import HomePage from '@/views/HomeView.vue'; // La page d'accueil
import BookDetailsPage from '@/views/BookDetailsPage.vue';
import Contact from "@/views/Contact.vue";
 // La page de détails du livre

const routes = [
  {
    path: '/', 
    name: 'Home', 
    component: HomePage, // Page d'accueil
  },
  {
    path: '/book/:id', // Route pour les détails du livre
    name: 'BookDetails', // Nom de la route
    component: BookDetailsPage, // Composant pour la page de détails
    props: true, // Passer les paramètres comme props dans le composant
  },
  {
    path: '/', // Route pour les détails du livre
    name: 'Contact', // Nom de la route
    component: Contact, // Composant pour la page de détails
    props: true, // Passer les paramètres comme props dans le composant
  },
];

const router = createRouter({
  history: createWebHistory(), // Utilisation de l'historique HTML5 pour la navigation
  routes, // Définition des routes
});

export default router;

