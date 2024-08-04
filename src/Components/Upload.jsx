// import React from 'react';

const Upload = () => {
  // Define the required headers
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
          alert('File headers are valid!');
          // Proceed with file upload or processing
        } else {
          alert('Invalid file headers. Please upload a CSV with the correct headers.');
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
    </div>
  );
};

export default Upload;
