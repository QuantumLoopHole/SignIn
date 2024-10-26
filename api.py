from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)

def DataWrite(name, reason, InOrOut):
    file_path = "./data.json"
    current_date = datetime.now().strftime("%Y-%m-%d")
    
    # Initialize the data structure
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
    except (json.JSONDecodeError, FileNotFoundError):
        # If the file doesn't exist or is empty, create a new structure
        data = {}

    # Check if the current date already exists in the data
    if current_date not in data:
        data[current_date] = {}

    # Add or update the user's entry
    data[current_date][name] = {
        "InOrOut": InOrOut,
        "Time": datetime.now().strftime("%H:%M"),
        "reason": reason if reason else None  # Set to None if reason is empty
    }

    try:
        # Write the updated data back to the file
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)
        print("Data written successfully.")
    except Exception as e:
        print(f"Error writing to file: {e}")

    return f"Data for {name} has been written to the file."

@app.route("/Log", methods=['GET'])
def Log():
    name = request.args.get('LoginName') 
    reason = request.args.get('Reason')  
    inout = request.args.get("inout")
    message = DataWrite(name, reason, inout)
    return "(:)"
   # return jsonify({"message": message})

@app.route("/test", methods=['GET'])
def test():
    print("Test")
    return ":)"

@app.route("/getdata", methods=['GET'])
def getdata():
    with open("./data.json", 'r') as file:
        data = json.load(file)
    return data

if __name__ == '__main__':
    app.run(debug=True)
