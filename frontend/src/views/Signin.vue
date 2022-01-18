<template>
  <div class="signin">
    <h1>Création d'un compte</h1>
    <p>Veuillez remplir les champs : </p>
    
    <form method="get" class="signin_form">
                <div class="signin__form__question">
                  <label for="name">Prénom et Nom : </label>
                  <input type="text" name="name" id="name" required>
                  <p id="nameErrorMsg"><!-- ci est un message d'erreur On le ferait mieux avec de v-show toto --></p>
                </div>
                <div class="signin__form__question">
                  <label for="email">Email: </label>
                  <input type="email" name="email" id="email" required>
                  <p id="emailErrorMsg"></p>
                </div>
                <div class="signin__form__question">
                  <label for="password">Mot de passe: </label>
                  <input type="password" name="password" id="password" required>
                  <p id="passwordErrorMsg"></p>
                </div>
                <div class="signin__form__submit">
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
function postForm() {
    console.log("fonction postForm lancée")
    let inputName = document.getElementById('name')  
    let inputMail = document.getElementById('email')  
    let inputPassword = document.getElementById('password')
    
    
    
    // destinataire    
    const user = {        
        name : inputName.value,
        email: inputMail.value,
        password : inputPassword.value        
    }
    
    console.table(user)
    /*

                Bon, ça marchera pas comme ça, va falloir écouter les évènements tout ça, @click de mes deux (dans le cafe-with-a-view P1C4-Solution /dans le HTML   
                
                voir même, regarer comment les autres ont fait....  
                
                )

    // options d'envoi
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(order)
    }
    // 3 et 4 Envoi et récupération de l'orderId
    fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
      let lienPageConfirmation="./confirmation.html?id=" + data.orderId
      localStorage.clear()
      document.location.href = lienPageConfirmation
    })
    .catch(function (error) {
        console.log ("Problème avec l'API : " + error.message)
    }) */
}


/*
const send = document.getElementById("order")
send.addEventListener("click", function () {  
  e.preventDefault()
  postForm()
})
*/


</script>
