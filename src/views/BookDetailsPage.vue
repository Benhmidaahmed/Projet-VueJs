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
          Add to your cart
        </button>
    
        <!-- Decrease Cart Count Button -->
        <button
          class="shop-button"
          :disabled="cartCount === 0"
          @click="decreaseCartCount"
          :class="{ disabled: cartCount === 0 || book.quantity === 0 }"
          v-if="cartCount > 0"
        >
          Return the item
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
        book: {},
        searchQuery: '',
        cartCount: 0, 
      };
    },
    mounted() {
      const bookId = Number(this.$route.params.id);
      axios
        .get('https://raw.githubusercontent.com/AzizBouzezi/books/main/books')
        .then((response) => {
          const bookData = response.data.books.find((b) => b.id === bookId);
          if (bookData) {
            this.book = bookData;
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
          this.cartCount++;
          console.log(`Book ${bookId} added to cart.`);
        }
      },
      decreaseCartCount() {
        if (this.cartCount > 0) {
          this.cartCount--; 
          console.log("Cart count decreased.");
        }
      },
    },
  };
  </script>

    
<style >
.book-details-page {
  padding-top: 80px;
  display: flex;
  justify-content: center; 
  align-items: flex-start;
  min-height: 100vh;
  flex-direction: column;
}


.book-container {
  display: flex;
  justify-content: space-between;
  max-width: 960px; 
  width: 100%;
  padding: 20px;
  background-color:white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto; 
  margin-top: 50px;
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
  background-color: #e0d4b2;
  color: white;
  border: none;
  border-radius:20px;
  transition: background-color 0.3s ease;
}

.shop-button:hover {
  background-color: #555;
}

.shop-button:disabled,
.shop-button.disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

</style>

    