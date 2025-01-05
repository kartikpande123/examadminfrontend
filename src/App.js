import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import Questions from "./components/Questions";
import ExamDateNTime from "./components/Datentime";
import Notification from "./components/Notification";
import Syllabus from "./components/Syllabus";
import Concerns from "./components/Concerns";
import AdminLogin from "./components/Login";
import Candidates from "./components/Candidats";
import UploadExamQA from "./components/UploadQa";
import ExamResults from "./components/Results";
import Protected from "./components/Protected";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<Protected Component={AdminDashboard} />} />
          <Route path="/questions" element={<Protected Component={Questions} />} />
          <Route path="/datentime" element={<Protected Component={ExamDateNTime} />} />
          <Route path="/notification" element={<Protected Component={Notification} />} />
          <Route path="/syllabus" element={<Protected Component={Syllabus} />} />
          <Route path="/concirns" element={<Protected Component={Concerns} />} />
          <Route path="/uploadqa" element={<Protected Component={UploadExamQA} />} />
          <Route path="/candidates" element={<Protected Component={Candidates} />} />
          <Route path="/examresults" element={<Protected Component={ExamResults} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
