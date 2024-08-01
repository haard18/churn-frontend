import { useState } from 'react';
import axios from 'axios';

const Predict = () => {
    const [inputs, setInputs] = useState({
        query1: '', query2: '', query3: '', query4: '', query5: '', query6: '',
        query7: '', query8: '', query9: '', query10: '', query11: '', query12: '',
        query13: '', query14: '', query15: '', query16: '', query17: '', query18: '', query19: ''
    });

    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevState => ({ ...prevState, [name]: value }));
    }

    const handleClick = async () => {
        try {
            const response = await axios.post('https://churn-model-cyjl.onrender.com/predict', inputs);
            setResponse(response.data);
        } catch (error) {
            console.error('Error making prediction request:', error);
        }
    }

    const labels = [
        'Senior Citizen', 'Monthly Charges', 'Total Charges', 'Gender', 'Partner',
        'Dependents', 'Phone Service', 'Multiple Lines', 'Internet Service', 'Online Security',
        'Online Backup', 'Device Protection', 'Tech Support', 'Streaming TV', 'Streaming Movies',
        'Contract', 'Paperless Billing', 'Payment Method', 'Tenure'
    ];

    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-3 justify-center">
                {Object.keys(inputs).map((key, index) => (
                    <div key={index}>
                        <label className="block mb-2 text-lg font-medium text-white">
                            {labels[index]}
                        </label>
                        <input
                            type="text"
                            name={key}
                            value={inputs[key]}
                            onChange={handleChange}
                            placeholder={`Enter ${labels[index]}`}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                ))}
                <button onClick={handleClick} className="btn btn-outline btn-primary mt-4">Predict</button>
                {response && (
                    <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                        <p><strong>Prediction:</strong> {response.prediction}</p>
                        <p><strong>Confidence:</strong> {response.confidence}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Predict;
