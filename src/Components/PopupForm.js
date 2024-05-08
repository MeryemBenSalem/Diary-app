// PopupForm.js
import React, { useState } from "react";
import axios from "axios";

function PopupForm({ setShowModal }) {
    const [diaryDate, setDate] = useState("");
    const [diaryTitle, setTitle] = useState("");
    const [diaryContent, setContent] = useState("");

    const handleSaveDiary = () => {
        const newDiaryEntry = {
            date: diaryDate,
            title: diaryTitle,
            content: diaryContent
        };

        axios.post("/api/diary", newDiaryEntry)
            .then(response => {
                console.log("Diary entry saved successfully:", response.data);
                setShowModal(false); // Close the modal after saving
            })
            .catch(error => {
                console.error("Error saving diary entry:", error);
            });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                <h2>Add Diary Entry</h2>
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
