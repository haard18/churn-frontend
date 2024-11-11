import { useState } from 'react';
import axios from 'axios';

const Predict = () => {
    const [inputs, setInputs] = useState({
        SeniorCitizen: '', MonthlyCharges: '', TotalCharges: '', gender: '', Partner: '', Dependents: '',
        PhoneService: '', MultipleLines: '', InternetService: '', OnlineSecurity: '', OnlineBackup: '', DeviceProtection: '',
        TechSupport: '', StreamingTV: '', StreamingMovies: '', Contract: '', PaperlessBilling: '', PaymentMethod: '', tenure: ''
    });

    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevState => ({ ...prevState, [name]: value }));
    }

    const handleClick = async () => {
        try {
            // const response = await axios.post('https://churn-model-cyjl.onrender.com/predict', inputs);
            const response = await axios.post('https://churn-model-1-1epf.onrender.com/predict', inputs);
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

    const inputKeys = [
        'SeniorCitizen', 'MonthlyCharges', 'TotalCharges', 'gender', 'Partner',
        'Dependents', 'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity',
        'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies',
        'Contract', 'PaperlessBilling', 'PaymentMethod', 'tenure'
    ];

    return (
        <>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inputKeys.map((key, index) => (
                        <div key={index} className="flex flex-col">
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
                </div>
            </div>
            {response && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                    <p><strong>Prediction:</strong> {response.prediction}</p>
                    <p><strong>Confidence:</strong> {response.confidence}</p>
                </div>
            )}
            <div className="flex justify-center mt-4">
                <button onClick={handleClick} className="btn btn-outline btn-primary">Predict</button>
            </div>
        </>
    )
}

export default Predict;
