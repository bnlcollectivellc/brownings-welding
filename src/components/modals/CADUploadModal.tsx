'use client';

import { useState, useCallback } from 'react';
import { X, Upload, ArrowLeft, FileText, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface CADUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

const ACCEPTED_FILES = ['.ai', '.dxf', '.dwg', '.eps', '.stp', '.step'];

export default function CADUploadModal({ isOpen, onClose }: CADUploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');

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
    const files = Array.from(e.dataTransfer.files).slice(0, 10);
    setUploadedFiles(prev => [...prev, ...files].slice(0, 10));
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).slice(0, 10) : [];
    setUploadedFiles(prev => [...prev, ...files].slice(0, 10));
  }, []);

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    setUploadedFiles([]);
    setUploadStatus('idle');
    onClose();
  };

  const handleContinue = async () => {
    setUploadStatus('uploading');

    try {
      // Simulate file processing - replace with actual API
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 90% success rate for demo
          if (Math.random() > 0.1) {
            resolve(true);
          } else {
            reject(new Error('Upload failed'));
          }
        }, 1500);
      });

      console.log('Files to process:', uploadedFiles);
      setUploadStatus('success');
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
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
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-bold text-gray-900">Upload CAD File</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success State */}
          {uploadStatus === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Files Uploaded!</h3>
              <p className="text-gray-600 mb-6">
                Your CAD files have been uploaded successfully. We&apos;ll process them and get back to you with pricing shortly.
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
          {uploadStatus === 'error' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Failed</h3>
              <p className="text-gray-600 mb-6">
                Sorry, we couldn&apos;t upload your files. Please try again later or contact us directly.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setUploadStatus('idle')}
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

          {/* Upload Form (idle or uploading) */}
          {(uploadStatus === 'idle' || uploadStatus === 'uploading') && (
            <>
              {/* Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-browning-red bg-browning-red/5'
                    : 'border-gray-300 hover:border-browning-red'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop up to 10 files here
                </p>
                <p className="text-gray-500 mb-4">or</p>
                <label className="inline-block cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept={ACCEPTED_FILES.join(',')}
                    onChange={handleFileSelect}
                  />
                  <span className="bg-browning-red hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors inline-block">
                    BROWSE FILES
                  </span>
                </label>
                <p className="text-gray-400 mt-4 text-sm">
                  {ACCEPTED_FILES.join('  ')}
                </p>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} selected
                  </p>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                          <FileText size={18} className="text-gray-500" />
                        </div>
                        <div>
                          <p className="text-gray-700 text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                          <p className="text-gray-400 text-xs">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        disabled={uploadStatus === 'uploading'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Security Notice */}
              <p className="text-center text-gray-500 text-xs mt-6">
                Your design is safe! Any design uploaded is secure, and you retain 100% of the intellectual property.
              </p>
            </>
          )}
        </div>

        {/* Footer - hide on success/error */}
        {(uploadStatus === 'idle' || uploadStatus === 'uploading') && (
          <div className="border-t border-gray-200 px-6 py-4 flex justify-between">
            <button
              onClick={handleClose}
              disabled={uploadStatus === 'uploading'}
              className="px-4 py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              disabled={uploadedFiles.length === 0 || uploadStatus === 'uploading'}
              className="px-6 py-2 bg-browning-red hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              {uploadStatus === 'uploading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                'Continue to Pricing'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
