const config = require("../../config/frontend"),
  signedIn = () => {
    document.getElementById("signIn").style.display = "none"
    document.title = window.localStorage.getItem("displayName")
  }

if (window.localStorage.getItem("userId")) signedIn()
else {
  firebase.initializeApp(config.firebase)

  document.getElementById("signIn").onclick = () =>
    firebase
      .auth()
      .signInViaPopup(new firebase.auth.TwitterAuthProvider())
      .then(result => {
        window.localStorage.setItem("displayName", result.user.displayname)
        /* userId => result.user.uid
         * accessToken => result.credential.accessToken
         * accessTokenSecret => result.credential.secret */

        signedIn()
      })
}