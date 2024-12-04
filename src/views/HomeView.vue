<template>
  <div class="home-page">
    <!-- Navigation Bar -->
    <NavBar v-model:searchQuery.sync="searchQuery" :cartCount="cartCount" />


    <!-- Carousel -->
    <div id="carouselExampleDark" class="carousel carousel-dark slide w-100" data-bs-ride="carousel">
  <!-- Indicateurs -->
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
  </div>
  
  <!-- Contenu du carrousel -->
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
      <img src="../assets/images/te.webp" class="d-block w-100 img-fluid" alt="Image 1">
      <div class="carousel-caption  d-md-block">
        <h5>Titre du Slide 1</h5>
        <p>Description du Slide 1</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="../assets/images/test3.webp" class="d-block w-100 img-fluid" alt="Image 2">
      <div class="carousel-caption  d-md-block">
        <h5 class="mb-5">Titre du Slide 2</h5>
        <p>Description du Slide 2</p>
      </div>
    </div>
  </div>

  <!-- Contrôles de navigation -->
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Précédent</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Suivant</span>
  </button>
</div>


    <!-- Books Section -->
    <section id="books" class="products">
      <h2 id="h2">Featured Books</h2>
      <div class="product-list" id="shop">
        
        <div
          v-for="book in filteredBooks"
          :key="book.id"
          class="product-card"
          :class="{ outOfStock: book.quantity === 0, limitReached: cart.filter(item => item.id === book.id).length >= book.quantity }"
        >
          <!-- Image Section -->
          <div class="image-container">
            <router-link :to="{ name: 'BookDetails', params: { id: book.id } }">
              <img
                class="product-image"
                :src="require(`@/assets/images/${book.image}`)"
                :alt="book.title"
                :class="{ blurred: cart.filter(item => item.id === book.id).length >= book.quantity || book.quantity === 0 }"
              />
            </router-link>
            <div v-if="book.quantity === 0" class="out-of-stock-label">Out of Stock</div>
          </div>

          <!-- Book Details -->
          <h5
            :class="{ blurred: cart.filter(item => item.id === book.id).length >= book.quantity || book.quantity === 0 }"
          >
            {{ book.title }}
          </h5>
          <p
            :class="{ blurred: cart.filter(item => item.id === book.id).length >= book.quantity || book.quantity === 0 }"
          >
            {{ book.author }}
          </p>

          <!-- Add to Cart Button -->
          <button
            class="shop-button"
            :disabled="cart.filter(item => item.id === book.id).length >= book.quantity || book.quantity === 0"
            :class="{ disabled: cart.filter(item => item.id === book.id).length >= book.quantity || book.quantity === 0 }"
            @click="addToCart(book)"
          >
            BUY
          </button>

          <!-- Decrease Cart Count Button -->
          <button
            class="shop-button"
            :disabled="!isInCart(book)"
            @click="decreaseCartCount(book)"
            :class="{ disabled: !isInCart(book) }"
            v-if="isInCart(book)"
          >
            CANCEL
          </button>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <div class="about" id="about">
      <div class="about_image">
        <img src="../assets/images/about.png" />
      </div>
      <div class="about_tag">
        <h1 id="about">About Us</h1>
        <p>Welcome to Bookphilia, where passion meets literature! Our mission is to provide book lovers with a curated selection of timeless classics, modern masterpieces, and everything in between. Whether you’re a seasoned reader or just starting your literary journey, we aim to inspire, educate, and connect you with stories that resonate.
At Bookphilia, we believe in the power of books to transform perspectives and ignite imagination. Beyond a bookstore, we are a community—a place where readers come to explore, share, and celebrate the beauty of the written word.
Join us as we embark on a journey to discover the world, one book at a time. Happy reading!</p>
        
      </div>
      
    </div>
  
    <div id="app">
      <MessageView @message-submitted="addReview" />
      <MessageList :reviews="reviews" />
    </div>

    <FooterView></FooterView>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from '@/components/NavBar.vue';
import MessageView from '@/components/MessageView.vue';
import MessageList from '../components/MessageList.vue';
import FooterView from "@/components/FooterView.vue";

export default {
  name: "HomePage",
  components: {
    NavBar,MessageList, MessageView, FooterView,
  },
  data() {
    return {
      books: [],
      searchQuery: "",
      cart: [],  // Store books added to the cart
      reviews: [],
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter((book) =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    cartCount() {
      return this.cart.length;
    },
  },
  mounted() {
    axios
      .get("https://raw.githubusercontent.com/Benhmidaahmed/books/main/books")
      .then((response) => {
        this.books = response.data.books;
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  },
  methods: {
    exploreBooks() {
      window.location.href = "#books";
    },
    addToCart(book) {
      this.cart.push(book);
      console.log(`Book ${book.id} added to cart.`);
    },
    decreaseCartCount(book) {
      const index = this.cart.findIndex(item => item.id === book.id);
      if (index !== -1) {
        this.cart.splice(index, 1);  // Remove the book from the cart
        console.log(`Cart count for book ${book.id} decreased.`);
      }
    },
    isInCart(book) {
      return this.cart.some(item => item.id === book.id);
    },
    addReview(newReview) {
      // Ajouter le commentaire reçu à la liste
      this.reviews.push(newReview);
    },
  },
};
</script>


<style scoped>
#h2{
 
  color:#e0d4b2;
    text-align: center;
    font-weight: bold;
    padding-top: 105px;
    
    text-shadow: 1px 1px 1px black;
    border-bottom: 2px ;
    margin-bottom:30px;
}
.learn-more-container .about_btn {
  background-color: #000000; /* Match the base color of other buttons */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: auto;
  transition: background-color 0.3s ease, transform 0.3s ease;
/* Global Styles */}
.learn-more-container .about_btn:hover {
  background-color: #7f7a42; /* Darker shade for hover effect */
  transform: scale(1.1); /* Slight scale on hover */
}
body {
  background-color: black;
}

/* Navbar Styles */
.navbar {
  background: linear-gradient(45deg, #e0d4b2, #f0e1b2); 
  color: #333;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); 
  padding: 20px 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.navbar .navbar-nav {
  flex-grow: 1;
}

#carouselExampleDark {
  width: 100%;
  max-height: 750px;
  overflow: hidden;
}

#carouselExampleDark .carousel-inner img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

/* Navbar hover effect */
.navbar:hover {
  background-color: #d0c18f;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); 
}

/* Navbar Links Styling */
.nav-links {
  font-size: 16px;
  list-style: none;
  display: flex;
  gap: 40px;
  margin-top: 10px;
}

.nav-links a {
  color: #4b4b4b; 
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #9a8f63; 
}

.nav-links a:before {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #fbfbfb;
  transition: width 0.3s ease;
}

.nav-links a:hover:before {
  width: 100%;
}

/* Navbar Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  transition: width 0.3s ease;
}

.search-bar {
  padding: 10px 15px;
  border: 1px solid #d1d1d1;
  border-radius: 50px;
  font-size: 14px;
  width: 200px;
  padding-right: 30px;
  transition: width 0.3s ease;
}

.search-bar:focus {
  width: 250px;
  border-color: #98906f;
}

.cart-icon img {
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.cart-icon:hover img {
  transform: scale(1.1);
}

.cart-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 3px 6px;
  font-size: 10px;
  font-weight: bold;
  min-width: 20px;
  text-align: center;
  animation: bounce 0.6s ease-in-out infinite alternate;
}

/* Cart count animation */
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

/* Hero Section */
.hero {
  background-color: #000;
  height: 400px;
  display: flex;
  align-items: center;
  padding: 0 50px;
}

.hero-content h1 {
  font-weight: bold;
  margin-bottom: 20px;
}

/* Products Section */
.products {
  padding: 20px;
  text-align: center;
  background-color: #ffffff;
  margin: 0 auto;
  width: 80%;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  width: calc(25% - 20px);
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}

.product-card:hover {
  transform: scale(1.05);
}

.image-container {
  position: relative;
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: filter 0.3s;
}

.product-card.limitReached {
  background-color: #f8e1e4;
  color: #9a2323;
  border: 2px solid #d9534f;
  transform: scale(1.02);
}

.product-card.limitReached .product-image {
  filter: grayscale(100%) blur(4px);
}

.product-card.limitReached h5,
.product-card.limitReached p {
  text-decoration: line-through;
}

.product-card.limitReached .shop-button {
  background-color: grey;
  color: #fff;
}

.product-card img.blurred {
  filter: blur(4px);
}

.product-card button {
  margin-top: 15px;
  background-color: #000000;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
}

.product-card button:hover {
  background-color: #555;
}

.shop-button {
  transition: background-color 0.3s ease;
}

.product-card img {
  transition: transform 0.3s ease;
}

.product-card button {
  margin-top: 15px;
  padding: 10px 20px;
}

.product-card button.disabled {
  background-color: grey;
  cursor: not-allowed;
}

.outOfStock {
  opacity: 0.6;
}
/* Styles pour les petits écrans */
@media screen and (max-width: 768px) {
  .product-list {
    display: grid;
    justify-items: left; /* Centre les éléments dans la grille */
    width: 100%; /* S'adapte à la largeur de l'écran */
    padding: 0 10px;
    box-sizing: border-box;
    gap: 20px; /* Ajoute un espacement entre les cartes */
  }

  .product-card {
    width: 95%; /* Augmente la largeur de la carte sur petits écrans */
    max-width: 500px; /* Augmente la largeur maximale */
    padding: 25px; /* Ajoute plus d'espace à l'intérieur */
    font-size: 1.3rem; /* Agrandit le texte */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Ajoute une ombre pour un meilleur visuel */
  }

  .product-image {
    width: 100%;
    height: auto;
    max-height: 450px; /* Augmente la hauteur maximale de l'image */
    object-fit: contain;
  }

  h5 {
    font-size: 1.7rem; /* Taille plus grande pour le titre */
    text-align: left;
  }

  p {
    font-size: 1.3rem; /* Agrandit le texte de l'auteur */
    text-align: left;
  }

  .shop-button {
    padding: 12px 20px; /* Bouton plus grand */
    font-size: 1.2rem; /* Taille du texte du bouton */
    margin: 15px auto; /* Espace au-dessus et au-dessous */
    display: block;
    background-color: black; /* Couleur du bouton */
    color: white;
    border: none;
    border-radius: 5px; /* Coins arrondis */
    cursor: pointer; /* Curseur pour indiquer qu'il est cliquable */
  }

  #h2 {
    text-align: left; /* Centre le texte horizontalement */
     /* Espace plus grand autour */
    font-size: 2.2rem; /* Ajuste la taille du h2 */
  }
  .products{
    width: 800px;
    display: flex;
    flex-direction: column;
    align-items: left;
    text-align: left;
    padding: 20px;
    margin-left: 120px;
    
  }
}








/* About Section */
.about {
  width: 100%;
  height: auto;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
}

.about .about_image img {
  width: 800px;
}

.about .about_tag p {
  line-height: 22px;
  width: 650px;
  text-align: justify;
  margin-bottom: 15px;
}

.about .about_tag {
  padding: 10px 20px;
  background: linear-gradient(45deg, #e0d4b2, #f0e1b2);
  color: #fff;
  text-decoration: none;
  position: relative;
  top: 50px;
  display: inline-block;
  transition: transform 0.3s ease;
  border-radius: 10px;
}

.about_btn {
  background-color: #000000;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: auto;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.about_btn:hover {
  background-color: #7f7a42;
  transform: scale(1.1);
}

/* Responsive Design for About Section */
@media (max-width: 768px) {
  .about {
    flex-direction: column; /* Change direction to column */
    align-items: center; /* Center items horizontally */
    text-align: center; /* Center text */
  }

  .about .about_image img {
    width: 90%; /* Scale image for small screens */
    margin-bottom: 20px; /* Add spacing between image and text */
  }

  .about .about_tag p {
    width: 100%; /* Make text container responsive */
    text-align: center; /* Center text for small screens */
  }
}
/* Centrage des éléments sur les petits écrans */
@media (max-width: 768px) {
  .home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  

  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }

  .about_image img {
    width: 100%;
    height: auto;
  }
}

/* Ajustement du carousel pour qu'il prenne toute la largeur */
#carouselExampleDark {
  width: 100vw;
  margin: 0 auto;
  max-width: 100%;
  height: 600px;
}

#carouselExampleDark .carousel-inner img {
  width: 100%;
  height: auto;
  object-fit: cover;
  height: 600px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  /* Adjust navbar and search for tablets and smaller screens */
  .navbar {
    padding: 15px 30px;
  }

  .navbar .navbar-brand {
    font-size: 20px;
  }

  .navbar-nav {
    flex-direction: column;
  }

  .search-container {
    width: 100%;
    margin: 10px 0;
  }

  .cart-icon {
    margin-top: 10px;
  }

  /* Products Section */
  .product-card {
    width: calc(33% - 20px); /* Adjust product cards */
  }

  .about {
    flex-direction: column;
    align-items: center;
  }

  .about .about_image img {
    width: 100%; /* Full width for small screens */
  }

  .about .about_tag {
    width: 100%;
    padding: 20px;
  }
  
  
}

@media (max-width: 768px) {
  /* Mobile Devices */
  .navbar {
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 20px;
  }

  .navbar .logo {
    display: none;
  }

  .nav-links {
    order: 2;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .nav-links a {
    color: white;
  }

  .search-container {
    order: 1;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }

  .search-bar {
    width: 80%;
    max-width: 300px;
    margin: 0 auto;
  }

  .cart-icon {
    order: 3;
    width: auto;
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
/* Carrousel Titre */
/* Carrousel Titre */
#carouselExampleDark .carousel-caption h5 {
  font-size: 3.5rem; /* Augmente la taille du titre */
  color: white; /* Définit la couleur du texte en blanc */
  font-weight: bold; /* Rend le texte en gras */
  text-align: left; /* Aligne le titre à gauche */
  position: absolute; /* Positionne le titre de manière absolue */
  top: -290px; /* Place le titre en haut du carrousel */
  left: 0; /* Place le titre à gauche */
  padding-left: 20px; /* Ajoute un peu d'espace à gauche du titre */
  padding-top: 20px; /* Ajoute un peu d'espace au-dessus du titre */
 
}

/* Carrousel Description */
#carouselExampleDark .carousel-caption p {
  color: white; /* Définit la couleur de la description en blanc */
  font-size: 1.2rem; /* Taille plus petite pour la description */
  text-align: left; /* Aligne la description à gauche */
  position: absolute; /* Positionne la description de manière absolue */
  top: -200px; /* Positionne la description juste en dessous du titre */
  left: 0; /* Aligne la description à gauche */
  padding-left: 20px; /* Ajoute un peu d'espace à gauche de la description */
}
@media (max-width: 1200px) {
  #carouselExampleDark .carousel-caption h5 {
    font-size: 2.5rem; /* Réduit la taille du titre sur les écrans moyens */
    top: -300px; /* Ajuste la position du titre sur les écrans moyens */
  }
  #carouselExampleDark .carousel-caption p {
    font-size: 1.2rem; /* Réduit la taille de la description sur les petits écrans */
    top: -230px; /* Ajuste la position de la description */
  }
}

@media (max-width: 992px) {
  #carouselExampleDark .carousel-caption h5 {
    font-size: -2.5rem; /* Réduit encore la taille du titre sur les petits écrans */
    top: -300px; /* Ajuste la position du titre sur les petits écrans */
  }

  #carouselExampleDark .carousel-caption p {
    font-size: 1.2rem; /* Réduit la taille de la description sur les petits écrans */
    top: -230px; /* Ajuste la position de la description */
  }
}

@media (max-width: 768px) {
  #carouselExampleDark .carousel-caption h5 {
    font-size: 2.5rem; /* Réduit la taille du titre sur les très petits écrans */
    top: -300px; /* Positionne le titre plus bas sur les petits écrans */
  }

  #carouselExampleDark .carousel-caption p {
    font-size: 1.2rem; /* Réduit la taille de la description sur les très petits écrans */
    top: -240px; /* Ajuste la position de la description */
  }
}

@media (max-width: 576px) {
  #carouselExampleDark .carousel-caption h5 {
    font-size: 2.5rem; /* Réduit encore la taille du titre pour les très petits écrans */
    top: -300px; /* Ajuste la position du titre sur les très petits écrans */
  }

  #carouselExampleDark .carousel-caption p {
    font-size: 1.2rem; /* Réduit la taille de la description */
    top: -230px; /* Ajuste la position de la description */
  }
}


 
</style>
