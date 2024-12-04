<template>
  <div class="review-container" >
    <h3 >Commentaires</h3>
   <div class="review">
    <ul>
      <li v-for="(review, index) in reviews" :key="index">
        <strong>{{ review.name }}</strong> <br/>
        Email: {{ review.email }}<br/>
        Phone:{{ review.phone}} <br/>
        <em>"{{ review.review }}"</em>
        <br />
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
export default {
  name: "MessageList",
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
h3 {
  color:#e0d4b2;
    text-align: center;
    font-weight: bold;
    
    
    text-shadow: 1px 1px 1px black;
    border-bottom: 2px ;
  text-align: center;

}
.review-container {
  width: 70%;
  padding: 20px;
  background-color: white;
  -webkit-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 20px -12px rgba(0, 0, 0, 0.57);
  margin:auto;
  margin-top: 20px ;
  border: 2px solid #d8d8d8;
}

.review-container li {
  margin-bottom: 30px;
}

</style>
