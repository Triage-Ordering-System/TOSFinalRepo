

class Patients:
    def __init__(self, name, age, score, severity, list_of_symptoms_durations, patient_history):
        self.name = name
        self.age = age
        self.score = score
        self.severity = severity
        self.list_of_symptoms_durations = list_of_symptoms_durations
        self.patient_history = patient_history
        
    
    def get_name(self):
        return self.name
    
    def get_age(self):
        return self.age
    
    def get_duration(self):
        return int(self.list_of_symptoms_durations[0][1])
    
    def get_score(self):
        return self.score
    
    def get_list_of_symptoms_durations(self):
        return self.list_of_symptoms_durations
    
    def add_symptom(self, symptom, duration):
        t  = (symptom, duration)
        self.list_of_symptoms_durations += t

    def set_score(self, num):
        self.score = num
    
    def set_severity(self, num):
        self.severity = num
    
    def get_severity(self):
        return self.severity
        
            
# class Symptom:
#     def __init__(self, name, score, location, severity, duration, multiplier):
#         self.name = name
#         self.score = score
#         self.location = location
#         self.severity = severity
    
#     def get_symptom(self):
#         return self.name
    
#     def get_severity(self):
#         return self.severity


#     def set_severity(self, x):
#         self.severity = x
        
    

