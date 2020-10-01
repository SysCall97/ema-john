import React, { useState } from 'react';

import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import {
    handleGoogleSignIn,
    handleSignOut,
    initializeLoginFramework,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from './loginManager';



const Login = () => {
    initializeLoginFramework();
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        photo: ""
    });

    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
            })
    }




    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user)
                .then(res => {
                    setUser(res);
                    if (res.success) {
                        setLoggedInUser(res);
                        history.replace(from);
                    }
                })
        } else if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user)
                .then(res => {
                    setUser(res);
                    if (res.success) {
                        setLoggedInUser(res);
                        history.replace(from);
                    }
                })
        }
        event.preventDefault()
    }

    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === "email") {
            const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
            isFieldValid = isEmailValid;
        } else if (event.target.name === "password") {
            const isPasswordValid = event.target.value.length > 6 && /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    return (
        <div style={{ textAlign: "center" }}>

            {
                user.isSignedIn &&
                <div>
                    <p>Welcome, <span style={{ color: "red" }}>{user.name}</span></p>
                    <p>Email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>

            }
            {
                user.isSignedIn ?
                    <button onClick={signOut}>Sign out</button>
                    : <button onClick={googleSignIn}>Sign in</button>
            }


            <h1>Our own authentication:</h1>
            <input type="checkbox" onClick={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Registration</label>
            <form onSubmit={handleSubmit}>
                {newUser && <><input type="text" onBlur={handleBlur} name="name" placeholder="Name" required /> <br /> </>}
                <input type="email" onBlur={handleBlur} name="email" placeholder="Email" required /><br />
                <input type="password" onBlur={handleBlur} name="password" placeholder="Password" required /><br />
                <input type="submit" value="Submit" />
            </form>
            <p style={{ color: "red" }}>{user.error}</p>
            <p style={{ color: "green" }}>{user.success}</p>
        </div>
    );
};

export default Login;