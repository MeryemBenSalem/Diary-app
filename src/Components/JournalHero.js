import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import "../Styles/JournalHero.css";
import "../Styles/JournalPage.css";
import axios from "axios";
import "../Styles/Navbar.css";
import PopupForm from "./PopupForm";

function JournalHero({ onAddClick, onViewClick, image }) {
    const [goUp, setGoUp] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [diaries, setDiaries] = useState([]);

    useEffect(() => {
        // Fetch diaries from your backend API
        axios.get("http://localhost:8080/api/diary") // Update the API endpoint accordingly
            .then(response => setDiaries(response.data))
            .catch(error => console.error("Error fetching diaries:", error));
    }, []);


    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

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

    useEffect(() => {
        const onPageScroll = () => {
            if (window.scrollY > 600) {
                setGoUp(true);
            } else {
                setGoUp(false);
            }
        };
        window.addEventListener("scroll", onPageScroll);

        return () => {
            window.removeEventListener("scroll", onPageScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="home-section">
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
            <br/><br/><br/><br/>
            <div className="journal-hero-container">
                
            {loggedInUser ? (<div>
                <div className="journal-hero-content">
                    <div className="journal-hero-text">
                        <h1 className="journal-hero-title">Welcome to My Diary App</h1>
                        <p className="journal-hero-description" onClick={openModal}>
                            <button>ADD DIARY</button>
                        </p>
                        {showModal && <PopupForm setShowModal={setShowModal} />}
                    </div>
                    <div className="journal-hero-image-container">
                        <div className="journal-hero-image-container" style={{ backgroundImage: `url(${image})` }}>
                        </div>
                    </div>
                </div>

                <div className="diaries-list">
                    <h2>My Diaries</h2>
                    <ul>
                        {diaries.map(diary => (
                            <li key={diary._id}>{diary.title}
                                <p className="diary-date">{new Date(diary.date).toLocaleDateString()}</p>
                                <p className="diary-content">{diary.content}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>):(
                <div className="journal-hero-content">
                    <div className="journal-hero-text">
                        <h1 className="journal-hero-title">Welcome to My Diary App</h1>
                        <p className="journal-hero-description">
                            Sign in to write down your thoughts, memories, and experiences...
                        </p>
                    </div>
                    <div className="journal-hero-image-container">
                        <div className="journal-hero-image-container" style={{backgroundImage: `url(${image})`}}>
                        </div>
                    </div>
                </div>
                )}
                <div
                    onClick={scrollToTop}
                    className={`journal-scroll-up ${goUp ? "show-scroll" : ""}`}
                >
                    <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                </div>
            </div>
        </div>
    );
}

export default JournalHero;
