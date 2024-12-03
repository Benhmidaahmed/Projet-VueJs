<template>
  <div class="home-page">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="logo"><b style="margin-left: 50px;">PROJECT</b></div>
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
            <img src="../assets/images/loupe.png" alt="Search" />
          </div>
        </div>
        <div class="cart-icon">
          <img src="../assets/images/shopping-bag.png" alt="Cart" />
          <div v-if="cartCount > 0" class="cart-count">{{ cartCount }}</div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <p style="color: red;">WINTER COLLECTION</p>
        <h1>Explore Our Library</h1>
        <p>Discover a variety of books available for you.</p>
        <button @click="exploreBooks" class="shop-button">Explore Books</button>
      </div>
    </section>

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
.navbar {
  background: #ffffff;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  position: fixed;
  top: 0;
  left: 0; 
  right: 0;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

.home-page {
  padding-top: 80px;
}

.nav-links {
  font-size: large;
  list-style: none;
  display: flex;
  gap: 50px;
  margin-top: 10px;
}

.nav-links a {
  color: black;
  text-decoration: none;
  font-weight: 100;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-container {
  position: relative;
  margin-right: 30px;
}

.search-bar {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 50px;
  font-size: 14px;
  width: 200px;
  padding-right: 30px; /* To make space for the icon */
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}

.search-icon img {
  width: 20px;
  height: 20px;
}

.cart-icon img {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 20px;
  position: relative;
}

.cart-count {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 14px;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
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
