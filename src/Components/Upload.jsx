import  { useState } from 'react';
import Alert from "../utils/Alert";

const Upload = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [status,setStatus] = useState(false);
  const requiredHeaders = [
    "customerID",
    "gender",
    "SeniorCitizen",
    "Partner",
    "Dependents",
    "tenure",
    "PhoneService",
    "MultipleLines",
    "InternetService",
    "OnlineSecurity",
    "OnlineBackup",
    "DeviceProtection",
    "TechSupport",
    "StreamingTV",
    "StreamingMovies",
    "Contract",
    "PaperlessBilling",
    "PaymentMethod",
    "MonthlyCharges",
    "TotalCharges"
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result;
        const allTextLines = text.split(/\r\n|\n/); // Split text by lines
        const headers = allTextLines[0].split(','); // Extract headers

        // Check if headers match required headers
        const isValid = requiredHeaders.every((header) => headers.includes(header)) && headers.length === requiredHeaders.length;

        if (isValid) {
          setAlertMessage('File uploaded successfully!');
          setStatus(true);
          // Proceed with file upload or processing
        } else {
          setAlertMessage('Invalid file format! Please upload a valid CSV file.');
          setStatus(false);
          // Clear the file input (if necessary)
          event.target.value = '';
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h2>Upload YOUR DATASET HERE</h2>
      <input
        type="file"
        accept=".csv"
        className="file-input w-full max-w-xs"
        onChange={handleFileUpload}
      />
      {alertMessage && <Alert message={alertMessage} status={status} />}
    </div>
  );
};

export default Upload;
