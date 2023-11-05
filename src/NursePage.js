import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';

function NursePage() {
  const [patientList, setPatientList] = useState([]);
  const navigate = useNavigate();

  const patientView = () => {
    navigate(`/`);
  };

  const removePatient = (index) => {
    const updatedList = [...patientList];
    updatedList.splice(index, 1);
    setPatientList(updatedList);
  };

  useEffect(() => {
    // Function to fetch patient data
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/process_data'); // Adjust the endpoint to match your Flask route
        const data = response.data;
        setPatientList(data);
      } catch (error) {
        console.error('Error fetching patient data', error);
      }
    };

    // Fetch patient data initially
    fetchPatientData();

    // Set up an interval to fetch patient data every, e.g., 30 seconds
    const intervalId = setInterval(fetchPatientData, 10000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const togglePatientDetails = (index) => {
    setPatientList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index].showDetails = !updatedList[index].showDetails;
      return updatedList;
    });
  };

  return (
    
    <div className="nurse-page">
    <button onClick={patientView} className="view-swap">Patient View</button>

      <h1>Nurse Page</h1>
      <h2>Live Patient List</h2>
      <ul>
        {patientList.map((patient, index) => (
          <li key={index}>
            <button onClick={() => togglePatientDetails(index)}>
              {patient.showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            <button onClick={() => removePatient(index)} className="remove-patient">
              X
            </button>
            <p>Name: {patient.name}</p>
            <p>Age: {patient.age}</p>
            <p>Score: {patient.score}</p>
            {patient.showDetails && (
              <div>
                {/* Additional patient details */}
                <p>Symptom: {patient.symptom}</p>
                <p>Severity: {patient.severity}</p>
                <p>Duration: {patient.duration}</p>
                <p>Past History: {patient.pastHistory}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NursePage;