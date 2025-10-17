import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MemoryMetric = ({ data }) => {
  return (
    <div className="metric-card">
      <h3>Memory Usage</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" hide />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="memory" 
              stroke="#82ca9d" 
              fill="#82ca9d" 
              dot={false} 
              isAnimationActive={false} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MemoryMetric;