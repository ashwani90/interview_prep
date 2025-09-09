// components/EnvironmentBanner.js
'use client';

import { useEffect, useState } from 'react';

export default function EnvironmentBanner() {
  const [environment, setEnvironment] = useState('production');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const env = process.env.NEXT_PUBLIC_APP_ENV || 'production';
    setEnvironment(env);
    setIsVisible(env !== 'production');
  }, []);

  if (!isVisible) return null;

  const bannerConfig = {
    development: {
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-300',
      textColor: 'text-yellow-800',
      label: 'Development',
    },
    staging: {
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-800',
      label: 'Staging',
    },
    test: {
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-300',
      textColor: 'text-purple-800',
      label: 'Testing',
    },
  };

  const config = bannerConfig[environment] || bannerConfig.development;

  return (
    <div className={`${config.bgColor} ${config.borderColor} ${config.textColor} border-b p-2 text-center text-sm font-medium`}>
      {config.label} Environment - Content may differ from production
    </div>
  );
}s