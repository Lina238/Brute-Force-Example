  function validate_email(email) {
      expression = /^[^@]+@\w+(\.\w+)+\w$/
      if (expression.test(email) == true) {
        // Email is good
        return true
      } else {
          
        // Email is not good
        return false
      }
    }
    
    function validate_password( password) {
      // Firebase only accepts lengths greater than 6
      if (password < 6 ) {
        return false
      } else {
        return true
      }
    }
    
    function validate_field(field) {
      if (field == null) {
        return false
      }
    
      if (field.length <= 0) {
        return false
      } else {
        return true
      }
    }

function signIn(){
    let emaill=document.getElementById('email').value
    let password=document.getElementById('password').value 
  if (validate_email(emaill) == false || validate_password(password) == false) {
    window.alert('email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  firebase.auth().signInWithEmailAndPassword( emaill, password).then(function() {
    // Declare user variable
    var user = firebase.auth().currentUser
       
    // Add this user to Firebase Database
    var database_ref = firebase.database().ref()
    
    if( user.emailVerified==false){
    window.alert("veuillez valider votre email!")
    return

    }
    
    
    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    window.alert('User Logged In!!')
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
    
       console.log("ila ywn oui ")
        return user;
      }else{
        console.log("nothing")
        return null;
      }
  
     })
    
  })
  .catch(function(error) {
    // Firebase will use this to window.alert of its errors
    var error_code = error.code
    var error_message = error.message
   
    window.alert(error_message)
  })
  
}
function signUpUser(){
    let email=document.getElementById('email').valueCreate
    //
    let password=document.getElementById('password').value 


  if(validate_email(email)==false ||validate_password(password)==false){
      window.alert('email ou mot de passe invalid')
      document.querySelector('password').value = '';
  }

  firebase.auth().createUserWithEmailAndPassword( email, password)
  .then(function() {

    // Declare user variable
    var user = firebase.auth().currentUser
     console.log(user);
    // Add this user to Firebase Database
    var database_ref =firebase.database().ref()
 
    // Create User data
    var user_data = {
      email : email,
      last_login : Date.now()
    }
   user.sendEmailVerification().then(function(){
    
    // Push to Firebase Database

    database_ref.child('users/' + user.uid).set(user_data)
     
    // DOne

    window.alert('User Created!! and email send')
}).catch(function(error) {
    // Firebase will use this to window.alert of its errors
    var error_code = error.code
    var error_message = error.message

    window.alert(error_message)
  })
  })
  .catch(function(error) {
    // Firebase will use this to window.alert of its errors
    var error_code = error.code
    var error_message = error.message

    window.alert(error_message)
  })
  }
  function LogoutUser(){
    firebase.auth().signOut().then(()=>{
    alert("deconnecter")
    window.location.href = "index.html";
    }).catch(e=>{
        alert(e)
    })
}