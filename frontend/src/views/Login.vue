<template>
  <div class="about">
    <h1>Connexion : </h1>
    <p>Veuillez remplir les champs : </p>
    
    <form method="POST" @submit.prevent = "envoi" class="login_form">                
                <div class="login__form__question">
                  <label for="email">Email: </label>
                  <input v-model="email" type="email" name="email" id="email" required>
                  <p id="emailErrorMsg"></p>
                </div>
                <div class="login__form__question">
                  <label for="password">Mot de passe: </label>
                  <input v-model="password" type="password" name="password" id="password" required>
                  <p id="passwordErrorMsg"></p>
                </div>
                <div class="login__form__submit">
                  <input type="submit" value="Valider" id="order">
                </div>
              </form>
  </div>
</template>

<style scoped>
form {
    margin-top: 50px;
    margin-left: 30%;
    display: flex;
    flex-direction: column;
    align-items: left;
    text-align: start;
}
</style>


<script>

import axios from 'axios'

export default {
  name: 'inscription',
  data(){
    return{
      email:"",
      password:""  
      }
  },
  methods:{
    envoi : function () {//Fonction qui envoi le formulaire d'inscription à l'API
      let token = ""
      console.log("Fonction login lancé mec ! mail : " + this.email + " MDP : " + this.password)
      if (this.email == "" || this.password == ""  ){
        alert('Veuillez remplir tous les champs avant d\'envoyer le formulaire !')
      }else {
      axios.post('http://localhost:3000/api/auth/login', {        
        "password": this.password,
        "email": this.email
      },
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer${token}`
            }
      })
      .then ((response) => {
        console.log('connection réussi ! (chez le front hein t\'exite pas ')
        let reponse = response.data;
        let userObject = JSON.stringify(reponse);
        console.table(userObject)
        localStorage.setItem('user', userObject)
        alert('Félicitation le front pense que vous êtes connecté !')
        /*pour l'avenir
        this.$localStorage.set('user', userObject)
        let user = JSON.parse(this.$localStorage.get('user'));
        token = user.token;//Token d'authentification
        */
        alert('Félicitation le front a passé l\'étape d\'après de connexion !')
        //window.location.href = "http://localhost:8080//#/connexion"
        })
      .catch(() => console.log('Echec de la connection catchée mais pas sûre en vrai')) 
      }
    }
  } 
}
</script>