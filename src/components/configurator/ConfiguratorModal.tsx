'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useConfigurator } from '@/store/useConfigurator';
import ProgressStepper from './ProgressStepper';
import TemplateSelector from './TemplateSelector';
import DimensionsEditor from './DimensionsEditor';
import MaterialSelector from './MaterialSelector';
import ServicesSelector from './ServicesSelector';
import FinishSelector from './FinishSelector';
import ReviewStep from './ReviewStep';
import PricingSidebar from './PricingSidebar';

export default function ConfiguratorModal() {
  const {
    isOpen,
    closeConfigurator,
    currentStep,
    entryPath,
    setStep,
    reset,
  } = useConfigurator();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeConfigurator();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeConfigurator]);

  if (!isOpen || !entryPath) return null;

  const handleClose = () => {
    closeConfigurator();
    // Reset after animation
    setTimeout(reset, 300);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'template':
        return <TemplateSelector />;
      case 'dimensions':
        return <DimensionsEditor />;
      case 'material':
        return <MaterialSelector />;
      case 'services':
        return <ServicesSelector />;
      case 'finish':
        return <FinishSelector />;
      case 'review':
        return <ReviewStep />;
      default:
        return <TemplateSelector />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'template': return 'Choose Template';
      case 'dimensions': return 'Set Dimensions';
      case 'material': return 'Select Material';
      case 'services': return 'Add Services';
      case 'finish': return 'Choose Finish';
      case 'review': return 'Review Order';
      default: return 'Configure Part';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-6xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-200">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-browning-charcoal">
                {getStepTitle()}
              </h2>
              <p className="text-sm text-gray-500 hidden md:block">
                {entryPath === 'builder' && 'Build your custom part step by step'}
                {entryPath === 'upload' && 'Configure your uploaded design'}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Progress Stepper */}
          <div className="px-4 md:px-6 pb-4">
            <ProgressStepper
              currentStep={currentStep}
              entryPath={entryPath}
              onStepClick={setStep}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col lg:flex-row h-full">
            {/* Main Content */}
            <div className="flex-1 p-4 md:p-6 overflow-auto">
              {renderStepContent()}
            </div>

            {/* Pricing Sidebar - Desktop */}
            <div className="hidden lg:block w-80 border-l border-gray-200 p-6 bg-gray-50 overflow-auto">
              <PricingSidebar />
            </div>
          </div>
        </div>

        {/* Mobile Pricing Summary */}
        <div className="lg:hidden flex-shrink-0 border-t border-gray-200 bg-white p-4">
          <PricingSidebar />
        </div>
      </div>
    </div>
  );
}
