import { createRouter, createWebHistory } from 'vue-router'; 
import HomePage from '@/views/HomeView.vue'; 
import BookDetailsPage from '@/views/BookDetailsPage.vue';
import Contact from "@/views/Contact.vue";
 

const routes = [
  {
    path: '/', 
    name: 'Home', 
    component: HomePage, 
  },
  {
    path: '/book/:id', 
    name: 'BookDetails', 
    component: BookDetailsPage, 
    props: true, 
  },
  {
    path: '/', 
    name: 'Contact', 
    component: Contact, 
    props: true, 
  },
];

const router = createRouter({
  history: createWebHistory(), 
  routes, 
});

export default router;

