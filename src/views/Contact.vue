<template>
  <div class="contact-page">
    <NavBar></NavBar>

    <!-- Contact Form Section -->
    <section class="contact-form">
      <h2>Contact Us</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" v-model="form.name" id="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="form.email" id="email" required />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea v-model="form.message" id="message" required></textarea>
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
      <div v-if="submitted" class="thank-you-message">
        <p>Thank you for contacting us! We will get back to you soon.</p>
      </div>
    </section>

    
  </div>
  <FooterView></FooterView>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import FooterView from '@/components/FooterView.vue';


export default {
  name: "ContactPage",
  components:{
    NavBar,FooterView
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: ""
      },
      submitted: false
    };
  },
  methods: {
    submitForm() {
      this.submitted = true;
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    }
  }
};
</script>

<style scoped>
.contact-page {
  padding: 40px;
  font-family: Arial, sans-serif;
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

.contact-form {
  max-width: 600px;
  margin: 100px auto;
  background-color: #f0e1b2;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.form-group textarea {
  height: 120px;
  resize: vertical;
}

.submit-button {
  display: inline-block;
  padding: 8px 16px; 
  background: linear-gradient(45deg, #e0d4b2, #f0e1b2);
  color: black;
  text-transform: uppercase;
  font-size: 14px; 
  font-weight: bold;
  border: none;
  border-radius: 4px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1); 
  cursor: pointer;
  transition: all 0.3s ease; 
  text-align: center;
}

.submit-button:hover {
  background: #e0d4b2;
  transform: scale(1.1);
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.15); 
}

.thank-you-message {
  margin-top: 20px;
  text-align: center;
  color: #555;
}

footer {
  text-align: center;
  padding: 20px;
  background-color: #000;
  color: white;
  margin-top: 40px;
}
</style>
