import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  const [data, setData] = useState([]); // State to hold the parsed CSV data
  const [headers, setHeaders] = useState([]); // State to hold CSV headers

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result;
        const allTextLines = text.split(/\r\n|\n/); // Split text by lines
        const headers = allTextLines[0].split(','); // Extract headers
        setHeaders(headers);

        // Check if headers match required headers
        const isValid = requiredHeaders.every((header) => headers.includes(header)) && headers.length === requiredHeaders.length;

        if (isValid) {
          alert('File headers are valid!');
          // Proceed with file upload or processing

          // Parse CSV rows
          const rows = allTextLines.slice(1).map(line => line.split(','));
          setData(rows); // Update state with parsed data
        } else {
          alert('Invalid file headers. Please upload a CSV with the correct headers.');
          // Clear the file input (if necessary)
          event.target.value = '';
        }
      };

      reader.readAsText(file);
    }
  };

  const prepareChartData = (index) => {
    const columnData = data.map(row => row[index]); // Extract column data
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
  };

  // Filter out "customerID" from headers and get its index
  const filteredHeaders = headers.filter(header => header !== "customerID");
  const filteredData = data.map(row => row.filter((_, index) => headers[index] !== "customerID"));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Upload Your Dataset Here</h2>
      <input
        type="file"
        accept=".csv"
        className="file-input w-full max-w-xs"
        onChange={handleFileUpload}
      />

      {/* Display whole CSV data with scrollbar */}
      {data.length > 0 && (
        <div className="overflow-auto max-h-[500px] border rounded-lg mt-4 bg-gray-800 text-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-900 sticky top-0 z-10 text-white">
              <tr>
                {filteredHeaders.map((header, index) => (
                  <th key={index} className="px-4 py-2 border-b-2 font-bold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex} className={`hover:bg-gray-700 ${rowIndex % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2 border-b">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Render charts for each column except "customerID" */}
      {filteredHeaders.map((header, index) => (
        <div key={index} className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">{header}</h3>
          <Bar
            data={prepareChartData(headers.indexOf(header))}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: 'white' // Change legend text color to white
                  }
                },
                title: {
                  display: true,
                  text: `Distribution of ${header}`,
                  color: 'white', // Change title text color to white
                  font: {
                    size: 18,
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: 'white', // Change x-axis text color to white
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Change x-axis grid color
                  }
                },
                y: {
                  ticks: {
                    color: 'white', // Change y-axis text color to white
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Change y-axis grid color
                  }
                }
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Upload;
