import React, { useState } from "react";
import { Save, Edit, Trash2 } from "lucide-react";
import "./DateNTime.css";
import API_BASE_URL from './configApi';

const ExamDateNTime = () => {
  const [examTitle, setExamTitle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [marks, setMarks] = useState("");
  const [price, setPrice] = useState(""); // NEW: Price field
  const [exams, setExams] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to convert 24-hour time to 12-hour format with AM/PM
  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const hoursInt = parseInt(hours, 10);
    const amPm = hoursInt >= 12 ? "PM" : "AM";
    const twelveHour = hoursInt % 12 || 12;
    return `${twelveHour}:${minutes} ${amPm}`;
  };

  const saveExamToDatabase = async (examData) => {
    try {
      setLoading(true);
      const urlSafeTitle = encodeURIComponent(examData.title);

      const response = await fetch(
        `${API_BASE_URL}/api/exams/${urlSafeTitle}/date-time`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: examData.date,
            startTime: convertTo12HourFormat(examData.startTime),
            endTime: convertTo12HourFormat(examData.endTime),
            marks: examData.marks,
            price: examData.price,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save exam");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error saving exam:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateExam = async () => {
    if (!examTitle || !examDate || !startTime || !endTime || !marks || !price) {
      alert("Please fill in all fields, including marks and price.");
      return;
    }

    const newExam = {
      title: examTitle,
      date: examDate,
      startTime,
      endTime,
      marks,
      price,
    };

    try {
      const result = await saveExamToDatabase(newExam);

      if (editIndex !== null) {
        const updatedExams = [...exams];
        updatedExams[editIndex] = newExam;
        setExams(updatedExams);
        setEditIndex(null);
      } else {
        setExams([...exams, newExam]);
      }

      // Clear form
      setExamTitle("");
      setExamDate("");
      setStartTime("");
      setEndTime("");
      setMarks("");
      setPrice("");

      alert("Exam saved successfully!");
    } catch (error) {
      alert(`Failed to save exam: ${error.message}`);
    }
  };

  const handleEditExam = (index) => {
    const exam = exams[index];
    setExamTitle(exam.title);
    setExamDate(exam.date);
    setStartTime(exam.startTime);
    setEndTime(exam.endTime);
    setMarks(exam.marks);
    setPrice(exam.price);
    setEditIndex(index);
  };

  return (
    <div className="exam-manager">
      <h2 className="manager-title">Manage Exams</h2>
      <p className="manager-description">
        Add, edit, or delete exams with their date, time, marks, and price.
      </p>

      <div className="exam-inputs">
        <label>Exam Title:</label>
        <input
          type="text"
          value={examTitle}
          onChange={(e) => setExamTitle(e.target.value)}
          placeholder="Enter exam title"
          className="styled-input"
          disabled={loading}
        />
        <label>Exam Date:</label>
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          className="styled-input"
          disabled={loading}
        />
        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="styled-input"
          disabled={loading}
        />
        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="styled-input"
          disabled={loading}
        />
        <label>Total Marks:</label>
        <input
          type="number"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          placeholder="Enter total marks"
          className="styled-input"
          disabled={loading}
        />
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          className="styled-input"
          disabled={loading}
        />
        <button
          type="button"
          onClick={handleAddOrUpdateExam}
          className="action-button"
          disabled={loading}
        >
          <Save size={20} />
          {loading ? "Saving..." : editIndex !== null ? "Update Exam" : "Add Exam"}
        </button>
      </div>

      {exams.length > 0 && (
        <div className="exam-list">
          <h3 className="section-heading">Exam List</h3>
          <ul>
            {exams.map((exam, index) => (
              <li key={index} className="exam-item">
                <div className="exam-details">
                  <h4 className="exam-title">{exam.title}</h4>
                  <p className="exam-datetime">
                    Date: {exam.date}
                    <br />
                    Time: {convertTo12HourFormat(exam.startTime)} - {convertTo12HourFormat(exam.endTime)}
                    <br />
                    Marks: {exam.marks}
                    <br />
                    Price: ${exam.price}
                  </p>
                </div>
                <div className="exam-actions">
                  <button
                    type="button"
                    onClick={() => handleEditExam(index)}
                    className="edit-button"
                    disabled={loading}
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setExams(exams.filter((_, i) => i !== index))}
                    className="delete-button"
                    disabled={loading}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExamDateNTime;
