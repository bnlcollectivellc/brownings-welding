'use client';

import { ReactNode } from 'react';
import ConfiguratorModal from '@/components/configurator/ConfiguratorModal';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <ConfiguratorModal />
    </>
  );
}
