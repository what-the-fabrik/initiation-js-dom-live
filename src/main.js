// Stocker danst des variables les élements du DOM dont on aura besoin
// Cf. https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector
const formEl = document.querySelector('#login-form')
const emailInput = document.querySelector('#email')
const emailMessageEl = document.querySelector('.email-field .message')
const passwordInput = document.querySelector('#password')
const passwordMessageEl = document.querySelector('.password-field .message')

// Fonctions fléchées qu'on utilisera plus tard
// Cf. https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/Arrow_functions

const setEmailMessage = (msg) => {
  emailMessageEl.innerHTML = msg
}

const setPasswordMessage = (msg) => {
  passwordMessageEl.innerHTML = msg
}

const resetField = (inputField) => {
  const input = document.querySelector(`#${inputField}`)
  const messageEl = document.querySelector(`.${inputField}-field .message`)
  input.classList.toggle('ring', false)
  input.classList.toggle('ring-red-400', false)
  messageEl.innerHTML = ''
} 

// Ajout d'écouteurs sur emailInput, passwordInput et formEl
// Cf. https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener
emailInput.addEventListener('blur', function (event) {
  const emailValue = emailInput.value
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const isValidEmail = emailRegex.test(emailValue)

  if (!isValidEmail) {
    setEmailMessage('Votre adresse email semble invalide')
    emailInput.classList.toggle('ring', true)
    emailInput.classList.toggle('ring-red-400', true)
  }
})

// Stockage dans une variable un tableau de regex que le mot de passe devra respecter
// Cf. https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array
const passwordRegexes = [
  /^.{8,}$/,
  /[A-Z]/,
  /[a-z]/,
  /[0-9]/,
  /[*_$-]/,
]

const isPasswordStrongEnough = str => {
  // Cf. https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  return passwordRegexes.every(function (regex) {
    // Cf. https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    return regex.test(str)
  })
}

passwordInput.addEventListener('blur', function (event) {
  const passwordValue = passwordInput.value.trim()
  const passwordRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const isStrongEnough = isPasswordStrongEnough(passwordValue)

  if (!isStrongEnough) {
    // afficher un message d'erreur
    setPasswordMessage('Votre mot de passe n\'est pas assez fort')
    // Ajouter des classes pour signifier un champ en erreur
    // Cf. https://developer.mozilla.org/fr/docs/Web/API/Element/classList
    passwordInput.classList.toggle('ring', true)
    passwordInput.classList.toggle('ring-red-400', true)
  }
})

emailInput.addEventListener('input', () => {
  resetField('email')
})

passwordInput.addEventListener('input', () => {
  resetField('password')
})

formEl.addEventListener('submit', function (event) {
  event.preventDefault()
  sendForm('/auth/token')
})

// Envoi du formulaire en AJAX avec XMLHttpRequest natif
// Cf. https://developer.mozilla.org/fr/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
function sendForm (url) {
  // Fonction qui sera exécutée une fois que le retour du serveur sera chargé
  function reqListener () {
    console.log(this.responseText)
  }
  
  // Création de l'objet XHR
  var xhr = new XMLHttpRequest()
  // Ajout de l'écouteur sur l'événement 'load' et association avec la fonction reqListener
  xhr.addEventListener("load", reqListener)

  // Création de l'objet contenant les données du formulaire
  const formData = new FormData()
  formData.append('email', emailInput.value)
  formData.append('password', passwordInput.value)
  // Paramètrage de l'envoi (méthode, url, asynchrone ou non)
  xhr.open("POST", url)
  // Envoi effectif de la requête avec les données du formulaire
  xhr.send(formData);
}