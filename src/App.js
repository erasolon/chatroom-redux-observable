import React from 'react';
import Diabeteml from "./components/diabeteml/diabeteml";
import PredictionList from "./components/diabeteml/predictionlist";

function App() {
  return (
    <div className="App">
        <Diabeteml />
        <PredictionList/>
    </div>
  );
}

export default App;
