'use client';

import { useState, useCallback } from 'react';
import { X, Check, Trash2, PenTool, Layout, ChevronRight, FileImage, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

interface DesignServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DesignStep = 'type' | 'requirements' | 'upload' | 'details' | 'material' | 'review' | 'success' | 'error';
type DesignType = 'sketch' | 'template' | null;

const STEPS: DesignStep[] = ['type', 'requirements', 'upload', 'details', 'material', 'review'];

const STEP_ICONS = {
  type: '1',
  requirements: '2',
  upload: '3',
  details: '4',
  material: '5',
  review: '6',
};

const MATERIAL_CATEGORIES = [
  { id: 'metals', name: 'Metals' },
  { id: 'composites', name: 'Composites' },
  { id: 'plastics', name: 'Plastics' },
  { id: 'wood', name: 'Wood and MDF' },
  { id: 'rubber', name: 'Rubber and Gasket' },
];

const MATERIAL_TYPES: Record<string, string[]> = {
  metals: ['Aluminum', 'Brass', 'Copper', 'Stainless Steel', 'Steel', 'Titanium'],
  composites: ['Carbon Fiber', 'Fiberglass', 'G10'],
  plastics: ['Acrylic', 'ABS', 'Delrin', 'HDPE', 'Polycarbonate', 'UHMW'],
  wood: ['Birch Plywood', 'MDF', 'Hardboard'],
  rubber: ['Neoprene', 'Silicone', 'EPDM', 'Cork'],
};

const THICKNESSES = ['0.030"', '0.060"', '0.090"', '0.125"', '0.188"', '0.250"', '0.375"', '0.500"'];

export default function DesignServicesModal({ isOpen, onClose }: DesignServicesModalProps) {
  const [currentStep, setCurrentStep] = useState<DesignStep>('type');
  const [designType, setDesignType] = useState<DesignType>(null);
  const [requirements, setRequirements] = useState({
    clearlyDrawn: false,
    visibleDimensions: false,
    allCallouts: false,
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    title: '',
    description: '',
  });
  const [materialSelection, setMaterialSelection] = useState({
    category: '',
    type: '',
    thickness: '',
  });

  const currentStepIndex = STEPS.indexOf(currentStep);

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentStepIndex + 1]);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(STEPS[currentStepIndex - 1]);
    }
  };

  const handleClose = () => {
    // Reset state
    setCurrentStep('type');
    setDesignType(null);
    setRequirements({ clearlyDrawn: false, visibleDimensions: false, allCallouts: false });
    setUploadedFiles([]);
    setProjectDetails({ title: '', description: '' });
    setMaterialSelection({ category: '', type: '', thickness: '' });
    onClose();
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).slice(0, 5);
    setUploadedFiles(prev => [...prev, ...files].slice(0, 5));
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).slice(0, 5) : [];
    setUploadedFiles(prev => [...prev, ...files].slice(0, 5));
  }, []);

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'type':
        return designType !== null;
      case 'requirements':
        return requirements.clearlyDrawn && requirements.visibleDimensions && requirements.allCallouts;
      case 'upload':
        return uploadedFiles.length > 0;
      case 'details':
        return projectDetails.title.trim() !== '' && projectDetails.description.trim() !== '';
      case 'material':
        return materialSelection.category !== '' && materialSelection.type !== '' && materialSelection.thickness !== '';
      case 'review':
        return true;
      default:
        return false;
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 90% success rate for demo
          if (Math.random() > 0.1) {
            resolve(true);
          } else {
            reject(new Error('Network error'));
          }
        }, 1500);
      });

      console.log('Design service request:', {
        designType,
        uploadedFiles,
        projectDetails,
        materialSelection,
      });
      setCurrentStep('success');
    } catch (error) {
      console.error('Submission error:', error);
      setCurrentStep('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Design services</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Steps - only show after type selection */}
          {currentStep !== 'type' && (
            <div className="flex items-center justify-center mt-4">
              {STEPS.slice(1).map((step, index) => {
                const stepIndex = index + 1; // Offset because we skip 'type'
                const isActive = STEPS.indexOf(currentStep) >= stepIndex;
                const isCurrent = currentStep === step;
                return (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-200 text-gray-500'
                      } ${isCurrent ? 'ring-2 ring-gray-800 ring-offset-2' : ''}`}
                    >
                      {isActive && stepIndex < STEPS.indexOf(currentStep) ? (
                        <Check size={16} />
                      ) : (
                        stepIndex
                      )}
                    </div>
                    {index < STEPS.length - 2 && (
                      <div
                        className={`w-12 md:w-20 h-0.5 ${
                          STEPS.indexOf(currentStep) > stepIndex ? 'bg-gray-800' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step: Type Selection */}
          {currentStep === 'type' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Which design service do you need help with?
              </h3>
              <p className="text-gray-600 mb-2">
                Send us a sketch or a template. Our Design Service Team will convert it to CAD and
                send you a cart link for purchase of your part.
              </p>
              <p className="text-gray-900 font-semibold mb-8">Pricing starts at $49</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <button
                  onClick={() => setDesignType('sketch')}
                  className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                    designType === 'sketch'
                      ? 'border-gray-800 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-4 flex items-center justify-center">
                      <PenTool size={64} className="text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        designType === 'sketch' ? 'border-gray-800' : 'border-gray-300'
                      }`}>
                        {designType === 'sketch' && <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />}
                      </div>
                      <span className="font-semibold text-gray-900">Convert Sketch</span>
                    </div>
                    <p className="text-gray-500 text-sm">Hand drawn with dimensions and callouts</p>
                  </div>
                </button>

                <button
                  onClick={() => setDesignType('template')}
                  className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                    designType === 'template'
                      ? 'border-gray-800 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-4 flex items-center justify-center">
                      <Layout size={64} className="text-amber-600" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        designType === 'template' ? 'border-gray-800' : 'border-gray-300'
                      }`}>
                        {designType === 'template' && <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />}
                      </div>
                      <span className="font-semibold text-gray-900">Convert Template</span>
                    </div>
                    <p className="text-gray-500 text-sm">Flat cardboard or paper cutout template</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step: Requirements */}
          {currentStep === 'requirements' && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Before you upload, make sure your {designType === 'sketch' ? 'sketch' : 'template'} meets our requirements
              </h3>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Example Image */}
                <div className="flex-shrink-0 w-full md:w-64 aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <PenTool size={48} className="mx-auto mb-2" />
                    <p className="text-sm">Example {designType === 'sketch' ? 'sketch' : 'template'}</p>
                  </div>
                </div>

                {/* Checklist */}
                <div className="flex-1 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requirements.clearlyDrawn}
                      onChange={(e) => setRequirements(prev => ({ ...prev, clearlyDrawn: e.target.checked }))}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                      My image is <strong>clearly {designType === 'sketch' ? 'sketched' : 'photographed'}</strong>, preferably on graph paper
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requirements.visibleDimensions}
                      onChange={(e) => setRequirements(prev => ({ ...prev, visibleDimensions: e.target.checked }))}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                      My lines and dimensions are <strong>visible and easy to read</strong> (not blurry)
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requirements.allCallouts}
                      onChange={(e) => setRequirements(prev => ({ ...prev, allCallouts: e.target.checked }))}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                      I have included callouts and dimensions for <strong>every feature</strong>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step: Upload */}
          {currentStep === 'upload' && (
            <div className="max-w-xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Upload an image of your {designType === 'sketch' ? 'sketch' : 'template'}
              </h3>

              {/* Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  isDragging
                    ? 'border-browning-red bg-red-50'
                    : 'border-blue-300 hover:border-blue-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <p className="text-gray-600 mb-4">Drop up to 5 files here or</p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept=".jpg,.jpeg,.gif,.pdf,.png,.tiff"
                    onChange={handleFileSelect}
                  />
                  <span className="bg-browning-red hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors inline-block">
                    SELECT FILES
                  </span>
                </label>
              </div>

              <p className="text-gray-500 text-sm text-center mt-3">
                Accepted file types: jpg, gif, pdf, png, tiff, jpeg. Max file size: 128 MB.
              </p>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <FileImage size={20} className="text-gray-500" />
                        </div>
                        <span className="text-gray-700 text-sm">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step: Project Details */}
          {currentStep === 'details' && (
            <div className="max-w-xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Project Details
              </h3>

              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Project title *"
                    value={projectDetails.title}
                    onChange={(e) => setProjectDetails(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Tell us about your project *"
                    value={projectDetails.description}
                    onChange={(e) => setProjectDetails(prev => ({ ...prev, description: e.target.value }))}
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step: Material Selection */}
          {currentStep === 'material' && (
            <div className="max-w-xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Select Material
              </h3>
              <p className="text-gray-600 text-center mb-8">
                We will design your file to ensure it works perfectly with your intended material.
                If you are unsure which material to use, we can help!
              </p>

              <div className="space-y-4">
                <select
                  value={materialSelection.category}
                  onChange={(e) => setMaterialSelection(prev => ({
                    ...prev,
                    category: e.target.value,
                    type: '',
                    thickness: ''
                  }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
                >
                  <option value="">Select a category *</option>
                  {MATERIAL_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={materialSelection.type}
                    onChange={(e) => setMaterialSelection(prev => ({ ...prev, type: e.target.value }))}
                    disabled={!materialSelection.category}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select a material type *</option>
                    {materialSelection.category && MATERIAL_TYPES[materialSelection.category]?.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>

                  <select
                    value={materialSelection.thickness}
                    onChange={(e) => setMaterialSelection(prev => ({ ...prev, thickness: e.target.value }))}
                    disabled={!materialSelection.type}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select a thickness *</option>
                    {THICKNESSES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step: Review */}
          {currentStep === 'review' && (
            <div className="max-w-xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Review Your Request
              </h3>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Service Type</h4>
                  <p className="text-gray-600">{designType === 'sketch' ? 'Convert Sketch' : 'Convert Template'}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Uploaded Files</h4>
                  <ul className="text-gray-600">
                    {uploadedFiles.map((file, i) => (
                      <li key={i}>{file.name}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Project Details</h4>
                  <p className="text-gray-900 font-medium">{projectDetails.title}</p>
                  <p className="text-gray-600 text-sm mt-1">{projectDetails.description}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Material</h4>
                  <p className="text-gray-600">
                    {MATERIAL_CATEGORIES.find(c => c.id === materialSelection.category)?.name} - {materialSelection.type} - {materialSelection.thickness}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">Design Service Fee: Starting at $49</p>
                  <p className="text-blue-600 text-sm mt-1">
                    Our team will review your request and send you a quote within 1-2 business days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {currentStep === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your design service request has been submitted successfully. Our team will review it and send you a quote within 1-2 business days.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-browning-red hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              >
                Return to Site
              </button>
            </div>
          )}

          {/* Error State */}
          {currentStep === 'error' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Sorry, we couldn&apos;t submit your request. Please try again later or contact us directly.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setCurrentStep('review')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft size={18} />
                  Try Again
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-browning-red hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Return to Site
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer - hide on success/error */}
        {currentStep !== 'success' && currentStep !== 'error' && (
          <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                {currentStep === 'type' ? (
                  <a
                    href="#"
                    className="text-browning-red hover:text-red-700 font-medium text-sm flex items-center gap-1"
                  >
                    VIEW DESIGN SERVICE GUIDELINES
                    <ChevronRight size={16} />
                  </a>
                ) : currentStep !== 'review' ? (
                  <a
                    href="#"
                    className="text-browning-red hover:text-red-700 font-medium text-sm flex items-center gap-1"
                  >
                    FAQS/HELP
                    <ChevronRight size={16} />
                  </a>
                ) : null}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors border border-gray-300 rounded-lg disabled:opacity-50"
                >
                  CANCEL
                </button>

                {currentStep !== 'type' && (
                  <button
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors border border-gray-300 rounded-lg disabled:opacity-50"
                  >
                    BACK
                  </button>
                )}

                {currentStep !== 'review' ? (
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="px-6 py-2 bg-browning-red hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                  >
                    NEXT
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-browning-red hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        SUBMITTING...
                      </>
                    ) : (
                      'SUBMIT REQUEST'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
