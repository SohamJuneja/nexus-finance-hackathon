# backend/app.py

from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS)
# This allows your React frontend to communicate with this backend
CORS(app)

# A simple root endpoint to verify the server is running
@app.route('/')
def index():
    return jsonify({"message": "Hello from Nexus Backend!"})

# This is the placeholder for our AI Risk Engine
# We will build this out later
@app.route('/api/assess-risk', methods=['POST'])
def assess_risk():
    # For now, we'll just get the data from the request and return a mock response
    data = request.get_json()
    print("Received data for risk assessment:", data)

    # Mock AI response
    mock_response = {
        "riskLevel": "Low",
        "healthFactor": 5.065,
        "projectedHealthFactor": 4.913,
        "alerts": [
            {"level": "info", "msg": "AI analysis complete. Position appears stable."}
        ]
    }
    return jsonify(mock_response)

# This allows you to run the server by executing "python app.py"
if __name__ == '__main__':
    app.run(debug=True, port=5000)