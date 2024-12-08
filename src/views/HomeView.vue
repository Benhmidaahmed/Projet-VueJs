<template>
  <div class="home-page">
    <!-- Navigation Bar -->
    <NavBar v-model:searchQuery.sync="searchQuery" :cartCount="cartCount" />


    <!-- Carousel -->
    <div id="carouselExampleDark" class="carousel carousel-dark slide w-100 fade-in1" data-bs-ride="carousel">
  <!-- Indicateurs -->
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
  </div>
  
  <!-- Contenu du carrousel -->
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="4000">
      <img src="../assets/images/te.webp" class="d-block w-100 img-fluid" alt="Image 1">
      <div class="carousel-caption  d-md-block">
        <h5>Welcome to BookPhilia</h5>
        <p>Where Stories Live and Imagination Thrives.</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="4000">
      <img src="../assets/images/test3.webp" class="d-block w-100 img-fluid" alt="Image 2">
      <div class="carousel-caption  d-md-block">
        <h5 class="mb-5">Looking for a book?</h5>
        <p>U came to the right place</p>
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
    <section id="books" class="products fade-in">
      <h2 id="h2">Featured Books</h2>
      <div class="product-list" id="shop">
        <div v-for="book in filteredBooks" 
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
    <div class="about fade-in" >
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
      cart: [],
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
      setTimeout(() => {
      document.querySelectorAll(".fade-in").forEach((element) => {
        element.style.opacity = "1"; 
      });
    }, 100); 
  },
  
  methods: {
    exploreBooks() {
      window.location.href = "#books";
     
    },
    addToCart(book) {
      this.cart.push(book);
    },
    decreaseCartCount(book) {
      const index = this.cart.findIndex(item => item.id === book.id);
      if (index !== -1) {
        this.cart.splice(index, 1); 
      }
    },
    isInCart(book) {
      return this.cart.some(item => item.id === book.id);
    },
    addReview(newReview) {
      this.reviews.push(newReview);
    },
  },
};
</script>


<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(50px); 
  }
  to {
    opacity: 1;
    transform: translateY(0); 
  }
}
.fade-in {
  animation: fadeIn 6s ease-in-out;
  opacity: 0;
  animation-fill-mode: forwards; 
}
.fade-in1{
  animation: fadeIn 2s ease-in-out; 
  opacity: 0;
  animation-fill-mode: forwards; 
}

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
.learn-more-container .about_btn:hover {
  background-color: #7f7a42; 
  transform: scale(1.1); 
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
  background-color: #e0d4b2;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  width: 80%;
  border-radius:30px;
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

@media screen and (max-width: 768px) {
  .product-list {
    display: grid;
    justify-items: left;
    width: 100%; 
    padding: 0 10px;
    box-sizing: border-box;
    gap: 20px; 
  }

  .product-card {
    width: 95%;
    max-width: 500px; 
    padding: 25px; 
    font-size: 1.3rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .product-image {
    width: 100%;
    height: auto;
    max-height: 450px; 
    object-fit: contain;
  }

  h5 {
    font-size: 1.7rem; 
    text-align: left;
  }

  p {
    font-size: 1.3rem;
    text-align: left;
  }

  .shop-button {
    padding: 12px 20px; 
    font-size: 1.2rem; 
    margin: 15px auto;
    display: block;
    background-color: black; 
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer; 
  }

  #h2 {
    text-align: left;
    
    font-size: 2.2rem;
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

@media (max-width: 768px) {
  .about {
    flex-direction: column; 
    align-items: center; 
    text-align: center;
  }

  .about .about_image img {
    width: 90%; 
    margin-bottom: 20px;
  }

  .about .about_tag p {
    width: 100%;
    text-align: center; 
  }
}
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

@media (max-width: 1024px) {
  
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
  .product-card {
    width: calc(33% - 20px);
  }

  .about {
    flex-direction: column;
    align-items: center;
  }

  .about .about_image img {
    width: 100%;
  }

  .about .about_tag {
    width: 100%;
    padding: 20px;
  }
  
  
}

@media (max-width: 768px) {
  
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

#carouselExampleDark .carousel-caption h5 {
  font-size: 3.5rem; 
  color: white; 
  font-weight: bold; 
  text-align: left;
  position: absolute; 
  top: -290px; 
  left: 0; 
  padding-left: 20px; 
  padding-top: 20px; 
 
}

#carouselExampleDark .carousel-caption p {
  color: white;
  font-size: 1.2rem;
  text-align: left; 
  position: absolute; 
  top: -200px; 
  left: 0; 
  padding-left: 20px; 
}
@media (max-width: 1200px) {
  #carouselExampleDark .carousel-caption h5 {
    font-size: 2.5rem;
    top: -300px; 
  }
  #carouselExampleDark .carousel-caption p {
    font-size: 1.2rem;
    top: -230px;
  }
}

@media (max-width: 992px) {
  #carouselExampleDark .carousel-caption h5 {
    font-size: -2.5rem; 
    top: -300px;
  }

  #carouselExampleDark .carousel-caption p {
    font-size: 1.2rem; 
    top: -230px; 
  }
}

@media (max-width: 768px) {
  #carouselExampleDark .carousel-caption h5 {
    font-size: 2.5rem; 
    top: -300px; 
  }

  #carouselExampleDark .carousel-caption p {
    font-size: 1.2rem; 
    top: -240px; 
  }
}

@media (max-width: 576px) {
  #carouselExampleDark .carousel-caption h5 {
    font-size: 2.5rem; 
    top: -300px;
  }

  #carouselExampleDark .carousel-caption p {
    font-size: 1.2rem; 
    top: -190px; 
  }
}


 
</style>
