import { useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Alert from "../utils/Alert";
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Upload = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [status, setStatus] = useState(false);
  const [data, setData] = useState([]); // State to hold the parsed CSV data
  const [headers, setHeaders] = useState([]); // State to hold CSV headers
  const [showCharts, setShowCharts] = useState(false); // State to manage chart visibility
  const [loading, setLoading] = useState(false); // State to manage loading
  const [predictions, setPredictions] = useState({}); // State to manage predictions
  const [predictionLoading, setPredictionLoading] = useState(null); // State to manage loading for predictions

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
      setLoading(true); // Start loader
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result;
        const allTextLines = text.split(/\r\n|\n/); // Split text by lines
        const headers = allTextLines[0].split(','); // Extract headers
        setHeaders(headers);

        // Check if headers match required headers
        const isValid = requiredHeaders.every((header) => headers.includes(header)) && headers.length === requiredHeaders.length;

        if (isValid) {
          setAlertMessage('File uploaded successfully!');
          setStatus(true);
          setShowCharts(false); // Hide charts when a new file is uploaded

          // Parse CSV rows
          const rows = allTextLines.slice(1).map(line => line.split(','));
          setData(rows); // Update state with parsed data
        } else {
          setAlertMessage('Invalid file format! Please upload a valid CSV file.');
          setStatus(false);
          setShowCharts(false); // Hide charts if file is invalid
          // Clear the file input (if necessary)
          event.target.value = '';
        }

        setLoading(false); // Stop loader after processing file
      };

      reader.readAsText(file);
    }
  };

  const prepareChartData = useCallback((index) => {
    const columnData = data.map(row => row[index] || ''); // Extract column data, handle missing values
    const uniqueData = [...new Set(columnData)]; // Get unique values for labels
    const dataCount = uniqueData.map(item => columnData.filter(value => value === item).length); // Count occurrences

    return {
      labels: uniqueData,
      datasets: [
        {
          label: headers[index],
          data: dataCount,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [data, headers]);

  // Filter out "customerID" from headers and get its index
  const filteredHeaders = headers.filter(header => header !== "customerID");
  const filteredData = data.map(row => row.filter((_, index) => headers[index] !== "customerID"));

  useEffect(() => {
    if (data.length > 0) {
      const timer = setTimeout(() => {
        setAlertMessage('');
      }, 3000); // Hide the alert after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer on unmount or data change
    }
  }, [data]);

  const handleVisualize = () => {
    setLoading(true); // Start loader before showing charts
    setTimeout(() => {
      setShowCharts(prev => !prev); // Toggle chart visibility
      setLoading(false); // Stop loader after showing charts
    }, 1000); // Simulating a delay for loader, adjust as needed
  };

  const handlePredict = async (row, rowIndex) => {
    setPredictionLoading(rowIndex); // Start loading for the specific row

    try {
      // Send request to the backend
      const response = await axios.post('https://churn-model-cyjl.onrender.com/predict', {
        SeniorCitizen: row[headers.indexOf('SeniorCitizen')],
        MonthlyCharges: row[headers.indexOf('MonthlyCharges')],
        TotalCharges: row[headers.indexOf('TotalCharges')],
        gender: row[headers.indexOf('gender')],
        Partner: row[headers.indexOf('Partner')],
        Dependents: row[headers.indexOf('Dependents')],
        PhoneService: row[headers.indexOf('PhoneService')],
        MultipleLines: row[headers.indexOf('MultipleLines')],
        InternetService: row[headers.indexOf('InternetService')],
        OnlineSecurity: row[headers.indexOf('OnlineSecurity')],
        OnlineBackup: row[headers.indexOf('OnlineBackup')],
        DeviceProtection: row[headers.indexOf('DeviceProtection')],
        TechSupport: row[headers.indexOf('TechSupport')],
        StreamingTV: row[headers.indexOf('StreamingTV')],
        StreamingMovies: row[headers.indexOf('StreamingMovies')],
        Contract: row[headers.indexOf('Contract')],
        PaperlessBilling: row[headers.indexOf('PaperlessBilling')],
        PaymentMethod: row[headers.indexOf('PaymentMethod')],
        tenure: row[headers.indexOf('tenure')]
      });

      // Update prediction state
      setPredictions(prev => ({
        ...prev,
        [rowIndex]: response.data
      }));

    } catch (error) {
      alert('Error making prediction: ' + error.message);
    } finally {
      setPredictionLoading(null); // Reset loading state for the row
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Upload Your Dataset Here</h2>
      <input
        type="file"
        accept=".csv"
        className="file-input w-full max-w-xs mb-4"
        onChange={handleFileUpload}
      />

      {alertMessage && <Alert message={alertMessage} status={status} />}

      {loading && <span className="loading loading-dots loading-lg"></span>}

      {!loading && data.length > 0 && (
        <div>
          <div className="overflow-auto max-h-[500px] border rounded-lg mt-4 bg-gray-800 text-white">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-gray-900 sticky top-0 z-10 text-white">
                <tr>
                  {filteredHeaders.map((header, index) => (
                    <th key={index} className="px-4 py-2 border-b-2 font-bold">{header}</th>
                  ))}
                  <th className="px-4 py-2 border-b-2 font-bold">Action</th>
                  <th className="px-4 py-2 border-b-2 font-bold">Prediction</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex} className={`hover:bg-gray-700 ${rowIndex % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-2 border-b">{cell || 'N/A'}</td>
                    ))}
                    <td className="px-4 py-2 border-b">
                      {predictionLoading === rowIndex ? (
                        <span className="loading loading-dots loading-sm"></span>
                      ) : (
                        <button
                          className="bg-green-500 text-white py-1 px-2 rounded"
                          onClick={() => handlePredict(row, rowIndex)}
                        >
                          Predict
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {predictions[rowIndex] && (
                        <div className="bg-gray-800 p-2 rounded">
                          <p>Prediction: {predictions[rowIndex].prediction}</p>
                          <p>Confidence: {predictions[rowIndex].confidence}</p>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleVisualize}
            >
              {showCharts ? 'Hide Charts' : 'Visualize Data'}
            </button>
          </div>
        </div>
      )}

      {showCharts && !loading && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {filteredHeaders.map((header, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <Bar
                data={prepareChartData(headers.indexOf(header))}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: header,
                    },
                  },
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Upload;
