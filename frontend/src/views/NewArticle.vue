<template>
    <form
      id="formtog"
      method="POST"
      class="from-group"
      @submit.prevent="sendMessage"
      enctype="multipart/form-data"
    >
    <h2>Ecrire un nouveau message</h2>
      <div class="form-group">
        <label class="messa" for="message">
          
        </label>
        <textarea
          class="form-control"
          name="message"
          id="message"
          cols="30"
          rows="5"
          v-model="message"
        >
        </textarea>
      </div> 
      <div class="button">
        <input type="file" @change="onFileChange" id="picture" name="picture"  accept="image/png, image/jpeg, image/gif"/>
        <button type="submit" id="envoi" class="btn btn-danger">
          Envoyer
        </button>
      </div>
    </form>
</template>

<script>
import axios from "axios"


export default {
    data() {
    return {
      data: null,
      message: "",
      user: "",
      picture: "",
    }
  },
  
  methods:{
    
    onFileChange(e){
      this.picture=e.target.files[0].name // ne marche pas  ".name" ajouté pour avoir qq chose.
      console.log("onFileChange lancé : " + this.picture)
      console.table(this.picture)

    },

    sendMessage(){      
      axios.post("http://localhost:3000/api/articles/", {
        "articlecontent" : this.message,
        "picture": this.picture,
        "userid": localStorage.getItem('userId')
      },
      {
        headers:{
          //"Content-Type":"multipart/form-data",
          "Authorization":"Bearer:"+localStorage.getItem('token')
        }        
      })
      window.location.href = " http://localhost:8080/#/"
    }
  }
  
}
</script>


<style scoped>
.form-group {
  padding: 10px;  
  animation: loader-container 0.5s;
  animation-fill-mode:unset;
}
@keyframes loader-container{
    0%{
        display:none;
        height:0;
        transform:scale(0);
    }

    100%{
        display:inline-block;
        
        transform:scale(1);
    }
}
</style>