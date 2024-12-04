<template>
    <!-- contact  -->
<div class="container" id="contact" data-aos="fade-up" data-aos-duration="1500">
  <form class="review-form" @submit.prevent="onSubmit">
    <h1>Laisser un commentaire</h1>
    <div class="row" >
        <div class="col-md-4 py-1 py-md-0">
            <div class="form-group">
                <input type="text" class="form-control" id="name usr" v-model="name"  placeholder="Name"/>
            </div>
        </div>
        <div class="col-md-4 py-1 py-md-0">
            <div class="form-group">
                <input type="number" class="form-control" id="phone phn" v-model="phone" placeholder="Phone" />
            </div>
       </div>
       <div class="col-md-4 py-1 py-md-0">
            <div class="form-group">
               <input type="text" class="form-control" id="email eml" v-model="email" placeholder="Email" />
           </div>
       </div>
   </div>
    <div class="form-group">
       <textarea id="review comment" class="form-control" rows="5" v-model="review" placeholder="Message"></textarea>
    </div>
     <input type="submit" id="messagebtn" class="button" value="AJOUTER COMMENTAIRE" />
</form>
</div>
    <!-- contact end -->
</template>
<script>

export default {
 name: "MessageView",
 data() {
  return {
      name: '',
      review: '',
      email: '',
      phone: ''
  }
 },
 methods: {
onSubmit() {
  if (
    this.name === '' ||
    this.review === '' ||
    this.email === '' ||
    this.phone === ''
  ) {
    alert('Commentaire incomplet. SVP remplissez les champs.');
    return;
  }

  // Construire l'objet du message
  let productMessage = {
    name: this.name,
    review: this.review,
    email: this.email,
    phone: this.phone,
  };

  // Émettre l'événement avec le commentaire
  this.$emit('message-submitted', productMessage);

  // Réinitialiser les champs
  this.name = '';
  this.review = '';
  this.email = '';
  this.phone = '';
},
},

  
}
</script>
<style>
/* contact */

#contact h1{
  color:#e0d4b2;
  text-align: center;
  font-weight: bold;
  padding-top: 105px;
  
  text-shadow: 1px 1px 1px black;
  border-bottom: 2px 
}
#contact input{
  background: linear-gradient(45deg, #e0d4b2, #f0e1b2);
  transition:all 300ms
}
#contact input:hover{
  transform:scale(1.05);
}
#contact input::placeholder{
  color: white;
}
#contact textarea{
  background: linear-gradient(45deg, #e0d4b2, #f0e1b2);
  transition:all 300ms;
}
#contact textarea:hover{
  transform:scale(1.03);
}
#contact textarea::placeholder{
  color: white;
}
#messagebtn{
  text-align: center;
  margin:auto;
}
#messagebtn {
  display: inline-block;
  padding: 8px 16px; /* Reduce padding for a smaller size */
  background: linear-gradient(45deg, #e0d4b2, #f0e1b2);
  color: black;
  text-transform: uppercase;
  font-size: 14px; /* Slightly smaller font size */
  font-weight: bold;
  border: none;
  border-radius: 4px; /* Adjust border radius for smaller button */
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1); /* Slightly smaller shadow */
  cursor: pointer;
  transition: all 0.3s ease; /* Smooth transition for hover effects */
  text-align: center;
}

#messagebtn:hover {
  background: #e0d4b2; /* Hover effect */
  transform: scale(1.1); /* Slight zoom on hover */
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.15); /* Enhanced hover shadow */
}

/* contact */
</style>
