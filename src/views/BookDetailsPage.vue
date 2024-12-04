<template>
  <div class="book-details-page">
    <NavBar v-model:searchQuery.sync="searchQuery" :cartCount="cartCount" />
    
    <div class="book-container">
      <div class="book-image">
        <img 
          :src="book.image ? require(`@/assets/images/${book.image}`) : require('@/assets/images/shopping-bag.png')" 
          :alt="book.title"
          :class="{ blurred: cartCount >= book.quantity || book.quantity === 0 }" />
      </div>
      <div class="book-details">
     
        <h1 :class="{ blurred: cartCount >= book.quantity || book.quantity === 0 }">{{ book.title }}</h1>
        <p :class="{ blurred: cartCount >= book.quantity || book.quantity === 0 }"><strong>Author:</strong> {{ book.author }}</p>
        <p :class="{ blurred: cartCount >= book.quantity || book.quantity === 0 }"><strong>Description:</strong> {{ book.description }}</p>
        
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
      </div>
    </div>
    
    <FooterView></FooterView>
  </div>
</template>

    
    <script>
  import axios from 'axios';
  import NavBar from "@/components/NavBar.vue"
  import FooterView from "@/components/FooterView.vue"

  export default {
    name: 'BookDetailsPage',
    components:{
      NavBar,FooterView,
    },
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
.book-details-page {
  padding-top: 80px;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: flex-start; /* Align to the top */
  min-height: 100vh; /* Ensure the container takes full height */
  flex-direction: column;
}


.book-container {
  display: flex;
  justify-content: space-between;
  max-width: 960px; /* Medium container */
  width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto; /* Center container horizontally and add top/bottom margin */
  margin-top: 50px; /* Custom margin-top for spacing */
}

.book-image {
  flex: 1;
  padding-right: 20px;
  display: flex;
  justify-content: center;
}

.book-image img {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
}

.book-details {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15px;
  max-width: 600px;
}

.book-details h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.book-details h2 {
  font-size: 1.5rem;
  margin: 10px 0;
}

.book-details p {
  font-size: 1rem;
  margin: 5px 0;
}

.shop-button {
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  transition: background-color 0.3s ease;
}

.shop-button:hover {
  background-color: #0056b3;
}

.shop-button:disabled,
.shop-button.disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

</style>

    