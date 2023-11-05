import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './NursePage.css';

function NursePage() {
  const [patientList, setPatientList] = useState([]);
  const [deletionID, setDeletionID] = useState('');
  const navigate = useNavigate();

  const deleteIDselect = (name) => {
    setDeletionID(name)
  }
  const patientView = () => {
    navigate(`/`);
  };

  const removePatient = (index) => {
    deleteIDselect(patientList[index].name)
    const data = {
      name: patientList[index].name};
    
    axios.post('http://localhost:5000/delete', data)
    

    const updatedList = [...patientList];
    updatedList.splice(index, 1);
    setPatientList(updatedList);
  };

  useEffect(() => {
    // Function to fetch patient data
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/patients');
        const data = response.data;
        if (Array.isArray(data)) {
          setPatientList(data);
        } else {
          console.error('Data is not an array');
        }
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
            <div>
            <p>Name: {patient.name} | Age: {patient.age} | Score: {patient.score} | History: {patient.pastHistory}</p>
            <button onClick={() => removePatient(index)} className="remove-patient">
              X
            </button>
            </div>
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