import React, { useState } from "react";
import axios from "axios";

function PopupForm({ setShowModal }) {
    const [diaryDate, setDate] = useState("");
    const [diaryTitle, setTitle] = useState("");
    const [diaryContent, setContent] = useState("");
    const [error, setError] = useState("");

    const handleSaveDiary = () => {
        const newDiaryEntry = {
            title: diaryTitle,
            date: diaryDate, // Convert date to ISO string
            content: diaryContent,
            user_id: 1 // Adjust as per your user's ID
        };

        axios.post("http://localhost:8080/api/diary", newDiaryEntry)
            .then(response => {
                console.log("Diary entry saved successfully:", response.data);
                setShowModal(false); // Close the modal after saving
            })
            .catch(error => {
                console.error("Error saving diary entry:", error.response);
                setError("Error saving diary entry. Please try again later.");
            });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                <h2>Add Diary Entry</h2>
                {error && <p className="error-message">{error}</p>}
                <label>Date:</label>
                <input type="date" value={diaryDate} onChange={(e) => setDate(e.target.value)} />
                <label>Title:</label>
                <input type="text" value={diaryTitle} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={diaryContent} onChange={(e) => setContent(e.target.value)}></textarea>
                <button onClick={handleSaveDiary}>Save</button>
            </div>
        </div>
    );
}

export default PopupForm;
