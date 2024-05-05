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
            if (isSignIn) {
                if (!username || !password) {
                    setErrorMessage("Please fill in all fields");
                    return;
                }
            } else {
                if (!username || !password || !confirmPassword) {
                    setErrorMessage("Please fill in all fields");
                    return;
                }
                if (password !== confirmPassword) {
                    setErrorMessage("Passwords do not match");
                    return;
                }
                if (password.length < 8) {
                    setErrorMessage("Password must be at least 8 characters long");
                    return;
                }
            }

            const response = isSignIn
                ? await axios.post("http://localhost:8080/users/signin", { username, password })
                : await axios.post("http://localhost:8080/users/signup", { username, password });

            const token = response.data.token;
            localStorage.setItem("token", token);
            setLoggedInUser(username);
            setShowModal(false);
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setErrorMessage(""); // Clear any previous error messages
        } catch (error) {
            console.error("Authentication failed:", error.response.data);
            setErrorMessage(error.response.data.message); // Set the error message
        }
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem("token");
            setLoggedInUser(null);
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
