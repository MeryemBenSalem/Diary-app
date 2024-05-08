import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import "../Styles/JournalPage.css";
import Navbar from "./Navbar";
import PopupForm from "./PopupForm";
import image from "../Assets/journal.png";
import { useParams } from 'react-router-dom';

function DiaryHero() {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [diaries, setDiaries] = useState([]);

    useEffect(() => {
        // Fetch diaries from your backend API
        fetch("http://localhost:8080/api/diary") // Update the API endpoint accordingly
            .then(response => response.json())
            .then(data => setDiaries(data))
            .catch(error => console.error("Error fetching diaries:", error));
    }, []);
    

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="home-section">
            <Navbar />
            <br /><br /><br /><br />
            <div className="journal-hero-container">
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

                <div
                    className={`journal-scroll-up ${showModal ? "show-scroll" : ""}`}
                    onClick={closeModal}
                >
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </div>
            </div>
        </div>
    );
}

export default DiaryHero;
