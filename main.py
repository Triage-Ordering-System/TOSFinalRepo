from patients import Patients

# Specify input and output file names
input_file_name = 'symptoms.txt'

#my_dict is dictionary holding key: sympton name, value: [base score, young, old]
my_dict = {}


# Function to remove duplicates and write to the output file
def assign_to_dict(input_file_name, mydict):
    with open(input_file_name, 'r') as input_file:
        for line in input_file:
            # Remove leading/trailing white spaces and convert to lowercase to handle case insensitivity
            tempstring = ""
            tempval = []
            clean_line = line.strip().lower()
            for char in clean_line:
                if char == ":":
                    continue

                elif (char.isdigit()):
                    tempval.append(int(char))
                else:
                    tempstring += char
                    newstring = tempstring[:-2]
            my_dict[newstring] = tempval


# Call the function to remove duplicates and write to the output file
assign_to_dict(input_file_name, my_dict)

print(f'Unique content from {input_file_name} has been written to mydict.')



#calculates total score
def score_calculator(patient, mydict):
    score = 0
    symptoms = patient.get_list_of_symptoms_durations()
    for item in symptoms:
        first_e, second_e = item
        score+= mydict[first_e][0]
        if patient.get_age < 13:
            score = score * mydict[first_e][1]
        if patient.get_age >= 65:
            score = score * mydict[first_e][2]
            
        if patient.get_severity > 5:
            if patient.get_duraction < 7:
                score = score * 3
            elif patient.get_duraction < 21:
                score = score * 2.5
            else:
                score = score * 2
        
        if patient.get_severity <= 5:
            if patient.get_duraction > 7:
                score = score * 0.5
            elif patient.get_duraction < 21:
                score = score * 1
            else:
                score = score * 2
    
        score = score * second_e
        score = score * patient.get_severity
    patient.set_score(score)
    return


#create patient objects

#calculate final score for patient

#add patient to database


#for key, value in my_dict.items():
    print(f"Key: {key}, Value: {value}")





