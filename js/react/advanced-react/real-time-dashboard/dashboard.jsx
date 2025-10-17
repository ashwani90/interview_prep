import React from 'react';
import { useMetrics } from '../hooks/useMetrics';
import CPUMetric from './MetricCards/CPUMetric';
import MemoryMetric from './MetricCards/MemoryMetric';
import TrafficMetric from './MetricCards/TrafficMetric';
import './Dashboard.css';

const Dashboard = () => {
  const { metrics, isConnected, isPaused, togglePause } = useMetrics();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Real-Time System Metrics</h1>
        <div className="dashboard-controls">
          <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
          <button onClick={togglePause}>
            {isPaused ? 'Resume Stream' : 'Pause Stream'}
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <CPUMetric data={metrics} />
        <MemoryMetric data={metrics} />
        <TrafficMetric data={metrics} />
      </div>
    </div>
  );
};

export default Dashboard;