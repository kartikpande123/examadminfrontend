import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from './configApi';

const PurchasedPracticeTestStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        // Call the new API endpoint we created
        const response = await axios.get(`${API_BASE_URL}/api/practicetestpurchasedstudents`);
        
        if (response.data.success) {
          // Convert object of objects to array of objects with keys
          const studentsData = response.data.data;
          const studentsArray = Object.keys(studentsData).map(key => ({
            key,
            ...studentsData[key]
          }));
          
          setStudents(studentsArray);
        } else {
          setError('Failed to fetch student data');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch student data');
        setLoading(false);
        console.error('Error fetching student data:', err);
      }
    };
    
    fetchStudentData();
  }, []);

  // Function to calculate score percentage
  const calculatePercentage = (correct, wrong) => {
    const total = parseInt(correct || 0) + parseInt(wrong || 0);
    if (total === 0) return 0;
    return Math.round((parseInt(correct || 0) / total) * 100);
  };

  // Display student exam analytics
  const renderExamAnalytics = (analytics) => {
    if (!analytics || typeof analytics !== 'object') {
      return <p className="text-gray-500">No exam attempts yet</p>;
    }

    return Object.entries(analytics).map(([examTitle, attempts]) => {
      if (!attempts || typeof attempts !== 'object') {
        return <p key={examTitle} className="text-gray-500">No attempts for {examTitle}</p>;
      }
      
      return (
        <div key={examTitle} className="mb-4">
          <h4 className="font-semibold text-lg">{examTitle}</h4>
          <div className="space-y-2">
            {Object.entries(attempts).map(([attemptId, attemptData]) => {
              if (!attemptData || typeof attemptData !== 'object') {
                return <p key={attemptId} className="text-gray-500">Invalid attempt data</p>;
              }
              
              const percentage = calculatePercentage(
                attemptData.correctAnswers,
                attemptData.wrongAnswers
              );
              
              return (
                <div key={attemptId} className="bg-gray-100 p-3 rounded">
                  <p><span className="font-medium">Date:</span> {attemptData.date || 'N/A'} {attemptData.time ? `at ${attemptData.time}` : ''}</p>
                  <p><span className="font-medium">Score:</span> {attemptData.correctAnswers || 0} correct, {attemptData.wrongAnswers || 0} wrong ({percentage}%)</p>
                  <p><span className="font-medium">Purchased on:</span> {attemptData.purchaseDate || 'N/A'}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  if (loading) {
    return <div className="text-center p-4">Loading student data...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!Array.isArray(students) || students.length === 0) {
    return <div className="text-center p-4">No students found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Purchased Practice Test Students</h2>
      
      <div className="space-y-6">
        {students.map((student) => (
          <div key={student.key} className="border rounded-lg p-4 shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold">{student.name || 'Unnamed Student'}</h3>
                <p><span className="font-medium">Student ID:</span> {student.studentId || 'N/A'}</p>
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

export default PurchasedPracticeTestStudents;