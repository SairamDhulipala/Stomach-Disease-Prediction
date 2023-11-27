from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

# Load your model
model = joblib.load('best_random_forest_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json['data']

        # Convert the received string to a list of integers
        data_list = list(map(int, data.split(',')))

        # Check if all values in the input data are zeros
        if all(val == 0 for val in data_list):
            return jsonify({'result': 'You are healthy'})
        elif len(data_list) == 23 and all(isinstance(val, int) for val in data_list):
            # Process the incoming data and make a prediction
            processed_data = np.array(data_list).reshape(1, -1)
            prediction = model.predict(processed_data)
            return jsonify({'result': prediction[0]})
        else:
            return jsonify({'error': 'Invalid input format'})
    except Exception as e:
        return jsonify({'error': str(e)})




if __name__ == '__main__':
    app.run(debug=True)
