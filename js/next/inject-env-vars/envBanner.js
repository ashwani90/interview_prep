// components/EnvironmentBanner.js
'use client';

import { useEnvContext } from './EnvProvider';

export default function EnvironmentBanner() {
  const { environment, isProduction, isLoading } = useEnvContext();

  if (isLoading || isProduction) {
    return null;
  }

  const bannerConfig = {
    development: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      label: 'Development',
    },
    staging: {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      label: 'Staging',
    },
    test: {
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      label: 'Test',
    },
  };

  const config = bannerConfig[environment] || bannerConfig.development;

  return (
    <div className={`${config.bgColor} ${config.textColor} p-2 text-center text-sm font-medium`}>
      {config.label} Environment - {process.env.NEXT_PUBLIC_APP_VERSION}
    </div>
  );
}