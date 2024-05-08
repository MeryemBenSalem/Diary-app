import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Navbar.css";

function Navbar() {
    const [showModal, setShowModal] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        checkLoggedInStatus();
    }, []);

    const checkLoggedInStatus = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await axios.get("http://localhost:8080/users/isloggedin", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setLoggedInUser(response.data.username);
            }
        } catch (error) {
            console.error("Error checking login status:", error);
        }
    };

    const handleToggleModal = () => {
        setShowModal(!showModal);
        setErrorMessage(""); // Clear any previous error messages
    };

    const handleToggleForm = () => {
        setIsSignIn(!isSignIn);
        setErrorMessage(""); // Clear any previous error messages
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Your existing code for form submission goes here
            const response = isSignIn
                ? await axios.post("http://localhost:8080/users/signin", { username, password }, {
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                    }
                })
                : await axios.post("http://localhost:8080/users/signup", { username, password }, {
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                    }
                });

            const token = response.data.token; // Extract token from response

            // After successful authentication, store the token in local storage
            localStorage.setItem("token", token);

            // Update logged in user state
            setLoggedInUser(username);

            // Clear form fields and error message
            setShowModal(false);
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setErrorMessage("");
        } catch (error) {
            console.error("Authentication failed:", error.response?.data);
            // Set error message
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("An unknown error occurred");
            }
        }
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem("token"); // Remove token from local storage
            setLoggedInUser(null); // Update state to reflect logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="navbar">
            <h1>My Diary</h1>
            {loggedInUser ? (
                <div className="user-info">
                    <span className="username">Welcome, {loggedInUser}</span>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button className="sign-in-btn" onClick={handleToggleModal}>
                    Sign In
                </button>
            )}
            {showModal && (
                <div className="modal-wrapper">
                    <div className="modal" onClick={handleToggleModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span className="close" onClick={handleToggleModal}>&times;</span>
                            <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <form className="auth-form" onSubmit={handleSubmit}>
                                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                {!isSignIn && <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />}
                                <button type="submit">{isSignIn ? "Sign In" : "Sign Up"}</button>
                            </form>
                            <p onClick={handleToggleForm}>
                                {isSignIn ? "New to My Diary? Sign Up" : "Already have an account? Sign In"}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;