import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';  // Add axios import

// Sample function to fetch data from backend
const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/');
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* Add a button to trigger the fetchData function */}
        <button onClick={fetchData}>
          Fetch Data from Backend
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
