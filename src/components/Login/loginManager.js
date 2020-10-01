import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase-config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0) {
         firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(result => {
            const { displayName, email, photoURL } = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;
        })
        .catch(error => {
            console.log(error.message);
        })
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedInUser = {
                isSignedIn: false,
                name: "",
                email: "",
                photo: "",
                password: "",
                error: "",
                success: ""
            }
            return signedInUser;
        })
        .catch(function (error) { });
}

export const createUserWithEmailAndPassword = (user) => {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(response => {
            const newUserInfo = { ...user };
            newUserInfo.password = "";
            newUserInfo.error = "";
            newUserInfo.success = "Sign in successful"
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = { ...user };
            newUserInfo.error = error.message;
            newUserInfo.success = "";
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (user) => {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(response => {
            const newUserInfo = { ...user };
            newUserInfo.password = "";
            newUserInfo.error = "";
            newUserInfo.success = "Log in successful"
            return newUserInfo;
        })
        .catch(function (error) {
            const newUserInfo = { ...user };
            newUserInfo.error = error.message;
            newUserInfo.success = "";
            return newUserInfo;
        });
}