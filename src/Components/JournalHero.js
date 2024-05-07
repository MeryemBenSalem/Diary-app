import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import "../Styles/JournalHero.css";
import Navbar from "./Navbar";
import image from "../Assets/journal.png";


function JournalHero({ onAddClick, onViewClick, image }) {
    const [goUp, setGoUp] = useState(false);

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
            <Navbar/>
            <br/><br/><br/><br/>
            <div className="journal-hero-container">
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
