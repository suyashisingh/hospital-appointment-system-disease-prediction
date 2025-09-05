from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model and vectorizer
with open('model.pkl', 'rb') as f:
   vectorizer, clf = pickle.load(f)

@app.route('/')
def home():
   return "Hospital Appointment Backend Running"

@app.route('/predict', methods=['POST'])
def predict():
   try:
       data = request.json
       symptoms = data.get('symptoms', '').lower()
       print(f"Received symptoms: {symptoms}")
       X_test = vectorizer.transform([symptoms])
       prediction = clf.predict(X_test)[0]
       print(f"Prediction: {prediction}")
       return jsonify({"predicted_disease": prediction})
   except Exception as e:
       print(f"Error during prediction: {e}")
       return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
   app.run(debug=True)
