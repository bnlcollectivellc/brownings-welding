'use client';

import { useState, useCallback, useEffect } from 'react';
import { X, Upload, FileText, Trash2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const POSITIONS = [
  'Welder',
  'Machinist',
  'Fabricator',
  'Laser Operator',
  'General Labor',
  'Other',
];

export default function JobApplicationModal({ isOpen, onClose }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles].slice(0, 5));
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prev) => [...prev, ...selectedFiles].slice(0, 5));
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      message: '',
    });
    setFiles([]);
    setStatus('idle');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const formDataToSend = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append files
      files.forEach((file) => {
        formDataToSend.append('files', file);
      });

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit application');
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const handleClose = () => {
    if (status !== 'submitting') {
      setIsClosing(true);
      setTimeout(() => {
        resetForm();
        setIsVisible(false);
        setIsClosing(false);
        onClose();
      }, 200);
    }
  };

  if (!isOpen && !isVisible) return null;

  // Success state
  if (status === 'success') {
    return (
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 bg-black/60" onClick={handleClose} />
        <div
          className={`relative bg-white rounded-2xl p-8 max-w-md w-full text-center my-auto transition-all duration-200 ${
            isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Thank you for<br />your application!
          </h2>
          <p className="text-gray-600 mb-4">
            We&apos;ve received your application and<br />will review it shortly.
          </p>
          <p className="text-gray-600 mb-6">
            Questions? Contact us at:
            <br />
            <a href="mailto:Careers@browningswelding.com" className="text-browning-red hover:underline">
              Careers@browningswelding.com
            </a>
            <br />
            <a href="tel:+15016792184" className="text-browning-red hover:underline">
              +1 (501) 679-2184
            </a>
          </p>
          <button
            onClick={handleClose}
            className="bg-browning-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />
      <div
        className={`relative bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto my-auto transition-all duration-200 ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">Join Our Team</h2>
          <button
            onClick={handleClose}
            disabled={status === 'submitting'}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error message */}
          {status === 'error' && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
              <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-browning-red focus:border-transparent transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-browning-red focus:border-transparent transition-colors"
                  placeholder="john@email.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-browning-red focus:border-transparent transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Position */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Position Interest</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position Interested In <span className="text-red-500">*</span>
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-browning-red focus:border-transparent transition-colors"
              >
                <option value="">Select a position...</option>
                {POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tell Us About Yourself</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-browning-red focus:border-transparent transition-colors resize-none"
              placeholder="Share your experience, skills, and why you'd like to join our team..."
            />
          </div>

          {/* File Upload */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Upload Resume</h3>
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-browning-red bg-red-50'
                  : 'border-gray-300 hover:border-browning-red hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto mb-3 text-gray-400" size={32} />
              <p className="text-gray-600 mb-2">
                Drag and drop your resume here, or{' '}
                <label className="text-browning-red hover:underline cursor-pointer">
                  browse
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                </label>
              </p>
              <p className="text-gray-400 text-sm">
                PDF, DOC, DOCX, TXT (max 5 files)
              </p>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="text-gray-400" size={18} />
                      <span className="text-sm text-gray-700 truncate max-w-[200px]">{file.name}</span>
                      <span className="text-xs text-gray-400">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-browning-red hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
