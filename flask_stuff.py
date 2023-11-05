from flask import Flask, request, jsonify
from flask_cors import CORS
from patients import Patients
import main

app = Flask(__name__)
CORS(app)

# Assuming we have a list to store our patient objects
patients_list = []
output = ''

@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.json
    
    try:
        # Creating a new patient object with the received data
        new_patient = Patients(
            name=data.get('name'),
            age=int(data.get('age')),
            score= 0,  # Assuming score will be calculated or set later
            severity=int(data.get('severity')),
            list_of_symptoms_durations=[(data.get('symptom_name'), data.get('time'))],
            #patient history
            patient_history = data.get('patient_history')
        )

        # print new patient . name
        print(new_patient.get_name())
        print(new_patient.get_age())
        print(new_patient.get_severity())
        print(new_patient.get_list_of_symptoms_durations())

        # Adding the new patient to our list
        patients_list.append(new_patient)

        # You may want to add functionality to calculate and set the score here
        #use main.Run
        output = main.run(new_patient)

        return jsonify({'message': 'Patient data received and processed successfully.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/patients', methods=['GET'])
def get_patients():
    try:
        # Serialize the patient data to send as JSON
        

        patients_data = [{
            'name': patient.get_name(),
            'age': patient.get_age(),
            'severity': patient.get_severity(),
            'symptoms_duration': patient.get_list_of_symptoms_durations(),
            'score': patient.get_score(),
            'pastHistory' : patient.patient_history
        } for patient in patients_list]

        return jsonify(patients_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/delete', methods=['POST'])
def delete():
    data = request.json
    try:
        print("hi")
        id_to_delete = data['id']
        return jsonify({'message': 'Data deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
