'use client';

import { useState, useCallback } from 'react';
import { X, Upload } from 'lucide-react';

interface CustomQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ACCEPTED_FILES = '.ai, .dxf, .dwg, .eps, .stp, .step';

export default function CustomQuoteModal({ isOpen, onClose }: CustomQuoteModalProps) {
  const [formData, setFormData] = useState({
    material: '',
    thickness: '',
    quantity: '',
    length: '1',
    width: '1',
    unit: 'inches',
    software: '',
    name: '',
    email: '',
    zipCode: '',
    purpose: '',
    comments: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    setFiles(prev => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles(prev => [...prev, ...selectedFiles]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData, files);
    // TODO: Send to Resend API
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">Request Custom Quote</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-gray-600 mb-6">
            Need help with a custom project? No problem! Fill out the form below and we&apos;ll get right back to you.
          </p>

          {/* File Upload Zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center mb-6 transition-colors ${
              isDragging
                ? 'border-browning-red bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                multiple
                accept=".ai,.dxf,.dwg,.eps,.stp,.step"
                onChange={handleFileSelect}
              />
              <div className="bg-browning-charcoal text-white px-6 py-2.5 rounded-lg font-medium inline-flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <Upload size={18} />
                BROWSE FILES
              </div>
            </label>
            <p className="text-gray-500 mt-3 italic">OR</p>
            <p className="text-gray-500 italic">Drag and Drop here</p>
            <p className="text-gray-500 text-sm mt-2">({ACCEPTED_FILES})</p>

            {files.length > 0 && (
              <div className="mt-4 text-left">
                {files.map((file, index) => (
                  <div key={index} className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded inline-block mr-2 mb-2">
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-gray-500 text-sm mb-6">
            If you designed your file in Adobe Illustrator, please send us the .ai file.
          </p>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <select
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
            >
              <option value="">Material</option>
              <option value="aluminum">Aluminum</option>
              <option value="steel">Steel</option>
              <option value="stainless">Stainless Steel</option>
              <option value="copper">Copper</option>
              <option value="brass">Brass</option>
              <option value="other">Other</option>
            </select>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Length</label>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, unit: 'inches' }))}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  formData.unit === 'inches'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 border border-gray-300'
                }`}
              >
                Inches
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, unit: 'millimeters' }))}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  formData.unit === 'millimeters'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 border border-gray-300'
                }`}
              >
                Millimeters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <select
              name="thickness"
              value={formData.thickness}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
            >
              <option value="">Thickness</option>
              <option value="0.030">0.030&quot;</option>
              <option value="0.060">0.060&quot;</option>
              <option value="0.125">0.125&quot;</option>
              <option value="0.250">0.250&quot;</option>
              <option value="0.375">0.375&quot;</option>
              <option value="0.500">0.500&quot;</option>
            </select>

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
            />

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Width</label>
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
              />
            </div>
          </div>

          <select
            name="software"
            value={formData.software}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
          >
            <option value="">Which Software Did You Use?</option>
            <option value="illustrator">Adobe Illustrator</option>
            <option value="autocad">AutoCAD</option>
            <option value="solidworks">SolidWorks</option>
            <option value="fusion360">Fusion 360</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
            />
          </div>

          <input
            type="text"
            name="purpose"
            placeholder="What is this for?"
            value={formData.purpose}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
          />

          <textarea
            name="comments"
            placeholder="Comments"
            value={formData.comments}
            onChange={handleInputChange}
            rows={4}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-700 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red"
          />

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-600 font-medium hover:text-gray-800 transition-colors"
            >
              CLOSE
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gray-400 hover:bg-browning-red text-white font-medium rounded-lg transition-colors"
            >
              REQUEST QUOTE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
