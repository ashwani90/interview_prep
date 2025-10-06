import React from 'react';
import DynamicForm from './components/FormGenerator';
import { sampleFormSchema } from './schemas/sampleFormSchema';
import './App.css';

function App() {
  return (
    <div className="App">
      <DynamicForm schema={sampleFormSchema} />
    </div>
  );
}

export default App;