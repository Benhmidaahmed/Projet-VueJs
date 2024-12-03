<template>
  <div class="home-page">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="logo"><b style="margin-left: 50px;"><img src="../assets/images/logo1.jpg" alt=""></b></div>
      <ul class="nav-links">
        <li><a style="border-bottom: 2px solid red" href="#">Home</a></li>
        <li><a href="#books">Library</a></li>
        <li><a href="#about">About</a></li>
        <router-link :to="{ name: 'Contact' }"><li><a href="#">Contact</a></li></router-link>
      </ul>
      <div class="nav-actions">
        <div class="search-container">
          <input type="text" v-model="searchQuery" placeholder="Search books..." class="search-bar" />
          <div class="search-icon">
            <i class="bi bi-search"></i>
          </div>
        </div>
        <div class="cart-icon">
          <img src="../assets/images/shopping-bag.png" alt="Cart" />
          <div v-if="cartCount > 0" class="cart-count">{{ cartCount }}</div>
        </div>
      </div>
    </nav>

    <div id="carouselExampleDark" class="carousel carousel-dark slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
      <img src="../assets/images/image11.jpg" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="../assets/images/image22.jpg" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
   
    <span class="visually-hidden"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    
    <span class="visually-hidden"></span>
  </button>
</div>

    <!-- Books Section -->
    <section id="books" class="products">
      <h2>Featured Books</h2>
      <div class="product-list">
        <div
          v-for="book in filteredBooks"
          :key="book.id"
          class="product-card"
          :class="{ outOfStock: book.quantity === 0 }"
        >
          <!-- Image Section -->
          <div class="image-container">
            <router-link :to="{ name: 'BookDetails', params: { id: book.id } }">
              <img
                class="product-image"
                :src="require(`@/assets/images/${book.image}`)"
                :alt="book.title"
                :class="{ blurred: book.quantity === 0 }"
              />
            </router-link>
            <div v-if="book.quantity === 0" class="out-of-stock-label">Out of Stock</div>
          </div>

          <!-- Book Details -->
          <h5>{{ book.title }}</h5>
          <p>{{ book.author }}</p>

          <!-- Add to Cart Button -->
          <button
            class="shop-button"
            :disabled="cartCount >= book.quantity"
            :aria-disabled="book.quantity === 0"
            :class="{ disabled: book.quantity === 0 }"
            @click="addToCart(book)"
          >
            Add to Cart
          </button>

          <!-- Decrease Cart Count Button -->
          <button
            class="shop-button"
            :disabled="!isInCart(book)"
            @click="decreaseCartCount(book)"
            :class="{ disabled: !isInCart(book) }"
            v-if="isInCart(book)"
          >
            Decrease Cart Count
          </button>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <div class="about">
      <div class="about_image">
        <img src="../assets/images/about.png" />
      </div>
      <div class="about_tag">
        <h1 id="about">About Us</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae cumque atque dolor corporis architecto.</p>
        <a href="#" class="about_btn">Learn More</a>
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
import MessageView from '@/components/MessageView.vue';
import MessageList from '../components/MessageList.vue';
import FooterView from "@/components/FooterView.vue";

export default {
  name: "HomePage",
  components: {
    MessageList, MessageView, FooterView,
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
/* Global Styles */
/* Global Navbar styles */
/* Navbar Styles */
.navbar {
  background: #e0d4b2; /* Light beige background */
  color: #333; /* Dark text for contrast */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
#carouselExampleDark {
  max-height: 750px; /* Réglez la hauteur maximum */
  overflow: hidden; /* Cache le contenu qui dépasse */
}

#carouselExampleDark .carousel-inner img {
  height: 750px; /* Ajustez à la même hauteur que le conteneur */
  object-fit: cover; /* Assure que l'image reste proportionnelle */
}


/* Logo - make it smaller and add border radius */
.navbar .logo img {
  width: 50px; /* Make logo smaller */
  height: auto;
  border-radius: 10px; /* Add rounded corners to logo */
  transition: width 0.3s ease;
}

/* Navbar hover effect */
.navbar:hover {
  background-color: #d0c18f; /* Slightly darker beige */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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
  color: #9a8f63; /* Golden link hover */
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

/* Search bar */
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

/* Cart icon */
.cart-icon img {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 20px;
  position: relative;
  transition: transform 0.3s ease;
}

.cart-icon:hover img {
  transform: scale(1.1);
}

.cart-count {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 14px;
  font-weight: bold;
  min-width: 25px;
  text-align: center;
  animation: bounce 0.6s ease-in-out infinite alternate;
}

@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap; /* Permet aux éléments de passer à la ligne si nécessaire */
    justify-content: space-between; /* Distribution entre les éléments */
    align-items: center; /* Centre verticalement */
    padding: 10px 20px;
  }

  /* Cache le logo */
  .navbar .logo {
    display: none; /* Masque complètement le logo */
  }

  /* Barre de recherche centrée */
  .search-container {
    order: 1; /* Place la barre de recherche en premier */
    flex-grow: 1; /* Permet à la barre de recherche de s'étendre */
    display: flex;
    justify-content: center; /* Centre la barre de recherche horizontalement */
    margin: 10px 0; /* Ajoute un espace autour */
  }

  .search-bar {
    width: 80%; /* La barre de recherche occupe 80% de la largeur */
    max-width: 300px; /* Définit une largeur maximale */
    margin: 0 auto; /* Centre horizontalement */
  }

  /* Liens de navigation */
  .nav-links {
    order: 2; /* Place les liens après la recherche */
    display: flex;
    justify-content: center; /* Centre les liens */
    width: 100%;
    margin-top: 10px;
  }

  .nav-links a {
    font-size: 14px; /* Taille de police réduite */
  }

  /* Icône du panier */
  .nav-actions {
    order: 3; /* Place les icônes en dernier */
    width: auto;
    display: flex;
    justify-content: flex-end; /* Aligne les icônes à droite */
    margin-top: 10px;
  }
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
  height: 700px;
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
  width: 70%;
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
  transition: transform 0.3s ease;
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

.product-card img.blurred {
  filter: blur(4px);
}

.out-of-stock-label {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: red;
  color: white;
  padding: 5px;
  font-size: 12px;
  border-radius: 3px;
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
.product-image {
  transition: transform 0.3s ease;
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
/*about*/

.about{
    width: 100%;
    height: auto;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 20px;
}

.about .about_image img{
    width: 800px;
}

.about .about_tag p{
    line-height: 22px;
    width: 650px;
    text-align: justify;
    margin-bottom: 15px;
}

.about .about_tag .about_btn{
    padding: 10px 20px;
    background: #a3a8a8;
    color: #fff;
    text-decoration: none;
    position: relative;
    top: 50px;
}
/* about  end */
</style>
