from pymongo import MongoClient
from patients import Patients
import json

import datetime
from bson.objectid import ObjectId


def add_patient(patient):
    cluster = "mongodb+srv://DNSNate:2003@cluster0.gn4y1m0.mongodb.net/Patient_report?retryWrites=true&w=majority"

    client = MongoClient(cluster)
    db = client.Patient_report
    symptoms = []
    durations = []
    for s in patient.get_list_of_symptoms_durations():
        symptoms.append(s[0])
        durations.append(s[1])
   
    todo1 = {"name" : str(patient.get_name()), "age": int(patient.get_age()), "symptoms": symptoms, "durations": durations, "severity": patient.get_severity(), "Past History": patient.patient_history, "score": patient.score}
    
    todos = db.Patient
    todos.delete_one({"_id" : id})
    result = todos.insert_one(todo1)
   

    all_patients_data = list(todos.find().sort("score", -1))

    # Convert all documents to a JSON-serializable format
    for patient in all_patients_data:
        patient['_id'] = str(patient['_id'])  # Convert ObjectId to string

    # Define the name of your JSON file
    json_filename = 'all_patients_data.json'

    # Write all the data to a JSON file
    with open(json_filename, 'w') as json_file:
        json.dump(all_patients_data, json_file, default=str, indent=4)

    # Return the name of the JSON file that contains all the patient data
    return json_filename

def remove_patient(id):
    # Convert the id to ObjectId
    patient_id = ObjectId(id)
    
    cluster = "mongodb+srv://DNSNate:2003@cluster0.gn4y1m0.mongodb.net/Patient_report?retryWrites=true&w=majority"
    client = MongoClient(cluster)
    db = client.Patient_report
    
    todos = db.Patient
    
    todos.delete_one({"_id" : patient_id})
    all_patients_data = list(todos.find().sort("score", -1))

    # Convert all documents to a JSON-serializable format
    for patient in all_patients_data:
        patient['_id'] = str(patient['_id'])  # Convert ObjectId to string

    # Define the name of your JSON file
    json_filename = 'all_patients_data.json'

    # Write all the data to a JSON file
    with open(json_filename, 'w') as json_file:
        json.dump(all_patients_data, json_file, default=str, indent=4)

    # Return the name of the JSON file that contains all the patient data
    return json_filename


