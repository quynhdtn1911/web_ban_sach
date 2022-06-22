// 1) Create a new firebaseui.auth instance stored to our local variable ui
const ui = new firebaseui.auth.AuthUI(firebase.auth())
var id = "";
// 2) These are our configurations.

const uiConfig = {

    callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
            // 3) This is the function that is called when the user is successfully signed in.
            //    authResult: The result of the sign-in, which contains the user's ID, email address, and basic profile.
            //    redirectUrl: If available, the redirect URL.
            //    Return false to avoid redirect.
            console.log(authResult.user.email)
            $( document ).ready(() => {
                if(authResult.user.email){
                    console.log(authResult.user.email);
                    const request ={
                        email: authResult.user.email,
                    }
                    console.log(request);
                    loginByGoogle(authResult.user.email);
                }
            })
            return false;

        },
        uiShown() {
            // document.getElementById("loader").style.display = "none"
        },
    },
    signInFlow: "popup",
    signInSuccessUrl: "./shop.html",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // Additional login options should be listed here
        // once they are enabled within the console.
    ]
}

const loginByGoogle = (email) =>{
    $.ajax({
        url: `http://localhost:5000/auth/loginByGoogle`,
        method: 'post',
        dataType: 'json',
        data: {
            email: email,
        },
        success: function (data) {
            window.location.href =`shop.html?user_id=${data._id}`
        },
        error: function (data) {
            console.log(data);
        }
    })

}

// 3) Call the 'start' method on our ui class
// including our configuration options.
ui.start("#firebaseui-auth-container", uiConfig)