import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrafficMetric = ({ data }) => {
  return (
    <div className="metric-card">
      <h3>Network Traffic</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" hide />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="trafficIn" 
              fill="#413ea0" 
              isAnimationActive={false} 
            />
            <Bar 
              dataKey="trafficOut" 
              fill="#ff7300" 
              isAnimationActive={false} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficMetric;