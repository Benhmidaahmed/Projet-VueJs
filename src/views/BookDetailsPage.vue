<template>
    <div class="book-details-page">
      <nav class="navbar">
        <div class="logo"><b style="margin-left: 50px;">PROJECT</b></div>
        <ul class="nav-links">
          <router-link :to="{ name: 'Home' }"><li><a style="border-bottom: 2px solid red" href="#">Home</a></li></router-link>
          <li><a href="#books">Library</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
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
  
      <h1>{{ book.title || 'Book Details' }}</h1>
  
      <div v-if="book.title">
        <img :src="book.image ? require(`@/assets/images/${book.image}`) : require('@/assets/images/shopping-bag.png')" :alt="book.title" />
        <h2>{{ book.title }}</h2>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Description:</strong> {{ book.description }}</p>
      </div>
  
      <!-- Add to Cart Button -->
      <button
        class="shop-button"
        :disabled="cartCount >= book.quantity"
        :aria-disabled="cartCount >= book.quantity"
        :class="{ disabled: cartCount >= book.quantity }"
        @click="addToCart(book.id)"
      >
        Add to Cart
      </button>
  
      <!-- Decrease Cart Count Button -->
      <button
        class="shop-button"
        :disabled="cartCount === 0"
        @click="decreaseCartCount"
        :class="{ disabled: cartCount === 0 || book.quantity === 0 }"
        v-if="cartCount > 0"
      >
        Decrease Cart Count
      </button>
  
      <div v-else>
        <p>Loading book details...</p>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  name: 'BookDetailsPage',
  data() {
    return {
      book: {}, // Book data
      searchQuery: '', // Search query for the search bar
      cartCount: 0, // Count of books in the cart
    };
  },
  mounted() {
    const bookId = Number(this.$route.params.id); // Get book ID from route
    axios
      .get('https://raw.githubusercontent.com/Benhmidaahmed/books/main/books')
      .then((response) => {
        const bookData = response.data.books.find((b) => b.id === bookId);
        if (bookData) {
          this.book = bookData; // Set the book data
        } else {
          console.error('Book not found!');
        }
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  },
  methods: {
    exploreBooks() {
      window.location.href = "#books";
    },
    addToCart(bookId) {
      if (this.cartCount < this.book.quantity) {
        this.cartCount++; // Increase cart count only if it's less than available stock
        console.log(`Book ${bookId} added to cart.`);
      }
    },
    decreaseCartCount() {
      if (this.cartCount > 0) {
        this.cartCount--; // Decrease cart count
        console.log("Cart count decreased.");
      }
    },
  },
};
</script>

  
  <style scoped>
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

  .book-details-page {
    padding-top: 80px;
    text-align: center;
  }
  .book-detail img {
    width: 50%;
    max-width: 500px;
    object-fit: cover;
    margin-bottom: 20px;
  }
  .book-detail h1,
  .book-detail h2 {
    font-size: 2em;
  }
  .book-detail p {
    font-size: 1.2em;
  }
  </style>
  