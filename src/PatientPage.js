import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './PatientPage.css'


function PatientPage() {
  const [isSymptomDropdownOpen, setSymptomDropdownOpen] = useState(false);
  const [selectedButtonName, setSelectedButtonName] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [closeAddSymptom, setCloseSymptom] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [history, setHistory] = useState('');
  const [showContent, setShowContent] = useState(true);
  const navigate = useNavigate();

  
  const nurseView = () => {
    navigate(`/NursePage`);
  };

  const toggleSubmit = () => {
    setShowContent(false);
  };
  const toggleSymptomDropdown = () => {
    setSymptomDropdownOpen(!isSymptomDropdownOpen);
    
  };
  const toggleAddSymptom = () => {
    closeAddSymptom(!setCloseSymptom);
  };

  const handleButtonClicked = (symptom_name) => {
    setSelectedButtonName(symptom_name);
};
    const handleButtonClicked2 = (severity) => {
        setSelectedSeverity(severity);
    };
    const handleButtonClicked3 = (time) => {
        setSelectedTime(time);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };
    const handleHistoryChange = (event) => {
        setHistory(event.target.value);
    };

      const sendDataToBackend = () => {
        // Define the data to send
        setShowContent(false)
        const data = {
          name: name,
          age: age,
          symptom_name: selectedButtonName,
          time: selectedTime,
          severity: selectedSeverity,
          patient_history: history,
        };

        axios.post('http://localhost:5000/process_data', data)
      .then(response => {
        // Handle the response from the server if needed
        console.log('Data sent successfully', response.data);
      })
      .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error sending data to the server', error);
      });
  };
  

  return (
    <div className="patient-page">
        <div><button onClick={nurseView} className="view-swap">Nurse View</button></div>
        {showContent && (
            <div>

      <h1>Patient Page</h1>
      <h2>Name</h2>
      <input
        type="text"
        placeholder="Enter Name Here"
        value={name}
        className="name-input"
        onChange={handleNameChange}
      />
      <h2>Patient History</h2>
      <input
        type="text"
        placeholder="Enter all previous illness' and other notable injuries"
        value={history}
        className="history-input"
        onChange={handleHistoryChange}
      />
      <h3>Age</h3>
      <input
        type="number"
        placeholder="Enter Age Here"
        value={age}
        className="age-input"
        onChange={handleAgeChange}
      />
      
      {!closeAddSymptom && !isSymptomDropdownOpen &&  (<div className="symptom-bar" onClick={toggleSymptomDropdown} >
        Add Symptom

      </div> 
      )}
      {isSymptomDropdownOpen && (
        <div className="symptom-buttons">

        <button onClick={() => handleButtonClicked('Nausea and Vomiting')}>
          Nausea and Vomiting
        </button>

        <button onClick={() => handleButtonClicked('Foreign Object Injuries')}>
          Foreign Object Injuries
        </button>

        <button onClick={() => handleButtonClicked('Seizures')}>
        Seizures
        </button>

        <button onClick={() => handleButtonClicked('Bleeding')}>
        Bleeding
        </button>

        <button onClick={() => handleButtonClicked('Allergic reactions')}>
        Allergic reactions
        </button>

        <button onClick={() => handleButtonClicked('Fractures')}>
        Fractures
        </button>

        <button onClick={() => handleButtonClicked('Skin infections and abscesses')}>
        Skin infections and abscesses
        </button>

        <button onClick={() => handleButtonClicked('Respiratory distress')}>
        Respiratory distress
        </button>

        <button onClick={() => handleButtonClicked('Burns')}>
        Burns
        </button>

        <button onClick={() => handleButtonClicked('Cuts and Lacerations')}>
        Cuts and Lacerations
        </button>

        <button onClick={() => handleButtonClicked('Amnesia')}>
        Amnesia
        </button>

        <button onClick={() => handleButtonClicked('Disorientation')}>
        Disorientation
        </button>

        <button onClick={() => handleButtonClicked('Dizziness')}>
          Dizziness
        </button>

        <button onClick={() => handleButtonClicked('Hallucinations')}>
        Hallucinations
        </button>

        <button onClick={() => handleButtonClicked('Abrasions')}>
        Abrasions
        </button>

        <button onClick={() => handleButtonClicked('Bruises')}>
        Bruises
        </button>

        <button onClick={() => handleButtonClicked('Internal Pain')}>
          Internal Pain
        </button>

        <button onClick={() => handleButtonClicked('Confusion')}>
          Confusion
        </button>


      </div>
      )}
      <h2>Severity</h2>
      {isSymptomDropdownOpen && (
        <div className="severity-buttons">
        <button onClick={() => handleButtonClicked2('1')}>
            1
        </button>
        <button onClick={() => handleButtonClicked2('2')}>
            2
        </button>
        <button onClick={() => handleButtonClicked2('3')}>
            3
        </button>
        <button onClick={() => handleButtonClicked2('4')}>
            4
        </button>
        <button onClick={() => handleButtonClicked2('5')}>
            5
        </button>
        <button onClick={() => handleButtonClicked2('6')}>
            6
        </button>
        <button onClick={() => handleButtonClicked2('7')}>
            7
        </button>
        <button onClick={() => handleButtonClicked2('8')}>
            8
        </button>
        <button onClick={() => handleButtonClicked2('9')}>
            9
        </button>
        <button onClick={() => handleButtonClicked2('10')}>
            10
        </button>
        </div>
      )}
      <h2>How long has this been a problem</h2>
      <div className="duration-buttons">
        <button onClick={() => handleButtonClicked3('1')}>
        1 day
        </button>
        <button onClick={() => handleButtonClicked3('2')}>
        2 days
        </button>
        <button onClick={() => handleButtonClicked3('3')}>
        3 days
        </button>
        <button onClick={() => handleButtonClicked3('5')}>
        5 days
        </button>
        <button onClick={() => handleButtonClicked3('7')}>
        7 days
        </button>
        <button onClick={() => handleButtonClicked3('10')}>
        10 days
        </button>
        <button onClick={() => handleButtonClicked3('14')}>
        2 weeks
        </button>
        <button onClick={() => handleButtonClicked3('21')}>
        3 weeks
        </button>
        <button onClick={() => handleButtonClicked3('30')}>
        1 month
        </button>
        <button onClick={() => handleButtonClicked3('31')}>
        longer than 1 month
        </button>
        </div>
        <button onClick={sendDataToBackend}> Submit </button>
        </div>
        )}
    {!showContent && (
            <div>
                <h1 classname="End" >Your response has been submitted, please wait for your name to be called.</h1>
                </div>)}

    </div>
  );
}

export default PatientPage;