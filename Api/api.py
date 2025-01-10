from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)

# Create log if not exist
UserLog = "/log/user.log"

def FileCreation(File, Content):
    try:
        with open(File, 'x') as file:
            file.write(Content)
    except FileExistsError:
        print(f"{File} already exists.")

FileCreation(UserLog, "{\n}")


def DataWrite(name, reason, InOrOut):
    current_date = datetime.now().strftime("%Y-%m-%d")
    
    # Initialize the data structure
    try:
        with open(UserLog, 'r') as file:
            data = json.load(file)
    except (json.JSONDecodeError, FileNotFoundError):
        # If the file doesn't exist or is empty, create a new structure
        data = {}

    # Check if the current date already exists in the data
    if current_date not in data:
        data[current_date] = {}

    # Ensure the user's entry exists for the current date
    if name not in data[current_date]:
        data[current_date][name] = []

    # Create the new entry with the current time and reason
    new_entry = {
        "Time": datetime.now().strftime("%H:%M"),  # Include full time for accurate sorting
        "reason": reason if reason else None  # Set to None if reason is empty
    }
    
    # Append the new entry (it will be sorted later)
    data[current_date][name].append({InOrOut: new_entry})

    # Sort the entries for this user by time (ascending)
    data[current_date][name] = sorted(data[current_date][name], key=lambda x: x[list(x.keys())[0]]['Time'])

    # Sort the days by newest (latest date first)
    data = dict(sorted(data.items(), key=lambda x: x[0], reverse=True))

    # Write the updated data back to the file
    try:
        with open(UserLog, 'w') as file:
            json.dump(data, file, indent=4)
        print("Data written successfully.")
    except Exception as e:
        print(f"Error writing to file: {e}")

    print(InOrOut)
    return f"Data for {name} has been written to the file."


@app.route("/Log", methods=['GET'])
def Log():
    name = request.args.get('LoginName') 
    reason = request.args.get('Reason')  
    inout = request.args.get("inout")
    message = DataWrite(name, reason, inout)
    return "Logged"


@app.route("/test", methods=['GET'])
def test():
    print("Test")
    return "Test Worked"

@app.route("/getdata", methods=['GET'])
def getdata():
    with open(UserLog, 'r') as file:
        data = json.load(file)
    return jsonify(data)


if __name__ == '__main__':
    import socket
    myip = socket.gethostbyname(socket.gethostname())

    app.run(host="0.0.0.0", port=5000, debug=True, threaded=False)
