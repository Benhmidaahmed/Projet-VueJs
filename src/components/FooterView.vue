<template>
  <footer id="footer" data-aos="fade-up" data-aos-duration="1500">
    <h1 class="text-center">BookPhilia</h1>
    <p class="text-center">Where Stories Live and Imagination Thrives.</p>
    
    <!-- Social Media Icons -->
    <div class="icons text-center">
      <a href="https://facebook.com" target="_blank" aria-label="Facebook">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://twitter.com" target="_blank" aria-label="Twitter">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://instagram.com" target="_blank" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
        <i class="fab fa-linkedin-in"></i>
      </a>
    </div>

    <div class="copyright text-center">
      &copy; Copyright <strong>BookPhilia</strong>. All Rights Reserved
    </div>
    <div class="credite text-center">
      Designed By <a href="#"><span>Aziz BOUZEZI & Ahmed BEN HMIDA</span></a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterView",
};
</script>

<style>
#footer {
  width: 100%;
  background: linear-gradient(45deg, #e0d4b2, #f0e1b2);
  box-shadow: 0px 0px 5px black;
  margin-top: 50px;
  padding: 20px 0; 
}
#footer h1 {
  color: black;
  margin: 10px 0;
  font-size: 1.8rem;
}
#footer p {
  color: black;
  margin: 5px 0;
  font-size: 1rem; 
}
.icons {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  gap: 10px; 
}
.icons i {
  background-color: black;
  color: white;
  border-radius: 50%;
  padding: 8px;
  font-size: 18px; 
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}
.icons i:hover {
  background-color: rgb(179, 137, 132);
  color: white;
  transform: scale(1.1);
}
.copyright {
  color: black;
  margin-top: 10px; 
  font-size: 0.9rem; 
}
.credite {
  color: black;
  margin-top: 5px;
  font-size: 0.9rem; 
}

</style>
