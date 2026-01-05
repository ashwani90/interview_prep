import React from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import FormProgress from './components/FormProgress';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Review from './components/Review';
import './App.css';

const App = () => {
  const currentStep = useSelector(state => state.form.currentStep);
  
  const renderStep = () => {
    switch(currentStep) {
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />;
      case 4: return <Review />;
      default: return <Step1 />;
    }
  };

  return (
    <div className="app">
      <h1>Multi-Step Form</h1>
      <FormProgress />
      {renderStep()}
    </div>
  );
};

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;