import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from './configApi';

const PracticeTestStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/practice-test-students`);
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch student data');
        setLoading(false);
        console.error('Error fetching student data:', err);
      }
    };
    
    fetchStudentData();
  }, []);

  // Display student exam analytics
  const renderExamAnalytics = (analytics) => {
    if (!analytics || Object.keys(analytics).length === 0) {
      return <p className="text-gray-500">No exam attempts yet</p>;
    }

    return Object.entries(analytics).map(([examTitle, attempts]) => (
      <div key={examTitle} className="mb-4">
        <h4 className="font-semibold text-lg">{examTitle}</h4>
        <div className="space-y-2">
          {Object.entries(attempts).map(([attemptId, attemptData]) => (
            <div key={attemptId} className="bg-gray-100 p-3 rounded">
              <p><span className="font-medium">Date:</span> {attemptData.date} at {attemptData.time}</p>
              <p><span className="font-medium">Correct answers:</span> {attemptData.correctAnswers}</p>
              <p><span className="font-medium">Wrong answers:</span> {attemptData.wrongAnswers}</p>
              <p><span className="font-medium">Purchased on:</span> {attemptData.purchaseDate}</p>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  if (loading) {
    return <div className="text-center p-4">Loading student data...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (students.length === 0) {
    return <div className="text-center p-4">No students found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Practice Test Students</h2>
      
      <div className="space-y-6">
        {students.map((student) => (
          <div key={student.key} className="border rounded-lg p-4 shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold">{student.name || 'Unnamed Student'}</h3>
                <p><span className="font-medium">Student ID:</span> {student.studentId}</p>
                <p><span className="font-medium">Email:</span> {student.email || 'N/A'}</p>
                <p><span className="font-medium">Phone:</span> {student.phone || 'N/A'}</p>
              </div>
              <div>
                {student.purchaseDetails && (
                  <>
                    <p><span className="font-medium">Purchase ID:</span> {student.purchaseDetails.id || 'N/A'}</p>
                    <p><span className="font-medium">Purchase Date:</span> {student.purchaseDetails.date || 'N/A'}</p>
                    <p><span className="font-medium">Amount:</span> {student.purchaseDetails.amount || 'N/A'}</p>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Exam Analytics</h3>
              {renderExamAnalytics(student.ExamAnalytics)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeTestStudents;