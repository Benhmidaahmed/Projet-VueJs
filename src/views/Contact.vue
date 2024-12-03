<template>
    <div class="contact-page">
      <nav class="navbar">
        <div class="logo"><b style="margin-left: 50px;">PROJECT</b></div>
        <ul class="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#books">Library</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
  
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
  
      <footer>
        <p>&copy; 2024 PROJECT. All Rights Reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactPage",
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
        // Logic to handle form submission
        // Here you can integrate an API call to send the form data
        console.log("Form submitted", this.form);
  
        // After submission, show the thank you message
        this.submitted = true;
  
        // Reset the form
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
    background-color: #f9f9f9;
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
    background-color: #000;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
  }
  
  .submit-button:hover {
    background-color: #555;
  }
  
  .thank-you-message {
    margin-top: 20px;
    text-align: center;
    color: green;
  }
  
  footer {
    text-align: center;
    padding: 20px;
    background-color: #000;
    color: white;
    margin-top: 40px;
  }
  </style>
  