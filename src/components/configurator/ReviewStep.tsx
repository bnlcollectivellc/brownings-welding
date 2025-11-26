'use client';

import { Edit2, Check, ShoppingCart } from 'lucide-react';
import { useConfigurator } from '@/store/useConfigurator';

export default function ReviewStep() {
  const {
    selectedTemplate,
    selectedMaterial,
    selectedServices,
    selectedFinish,
    partDimensions,
    priceBreakdown,
    quantity,
    materials,
    services,
    finishes,
    setStep,
    prevStep,
  } = useConfigurator();

  // Get full data objects
  const materialCategory = materials.find(m => m.id === selectedMaterial?.categoryId);
  const materialSubcategory = materialCategory?.subcategories.find(
    s => s.id === selectedMaterial?.subcategoryId
  );
  const finishData = finishes.find(f => f.id === selectedFinish?.id);

  const sections = [
    {
      title: 'Part',
      step: 'template' as const,
      items: selectedTemplate ? [
        { label: 'Template', value: selectedTemplate.name },
        ...(partDimensions ? [
          { label: 'Dimensions', value: `${partDimensions.width.toFixed(2)}" × ${partDimensions.height.toFixed(2)}"` },
          { label: 'Area', value: `${partDimensions.area.toFixed(2)} in²` },
        ] : []),
      ] : [],
    },
    {
      title: 'Material',
      step: 'material' as const,
      items: selectedMaterial ? [
        { label: 'Type', value: `${materialCategory?.name} - ${materialSubcategory?.name}` },
        { label: 'Thickness', value: `${selectedMaterial.thickness.gauge} (${selectedMaterial.thickness.inches}")` },
      ] : [],
    },
    {
      title: 'Services',
      step: 'services' as const,
      items: selectedServices.length > 0
        ? selectedServices.map(s => {
          const service = services.find(svc => svc.id === s.id);
          return { label: service?.name || s.id, value: `+$${service?.basePrice?.toFixed(2) || '0.00'}` };
        })
        : [{ label: 'No additional services', value: '' }],
    },
    {
      title: 'Finish',
      step: 'finish' as const,
      items: selectedFinish ? [
        { label: 'Type', value: finishData?.name || 'None' },
        ...(selectedFinish.colorId && finishData?.colors ? [
          { label: 'Color', value: finishData.colors.find(c => c.id === selectedFinish.colorId)?.name || '' },
        ] : []),
      ] : [{ label: 'No finish', value: 'Raw material' }],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-browning-charcoal">Review Your Order</h2>
        <p className="text-gray-500 text-sm">Confirm your selections before adding to quote</p>
      </div>

      {/* Review Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-browning-charcoal">{section.title}</h3>
              <button
                onClick={() => setStep(section.step)}
                className="text-browning-red hover:text-red-700 text-sm font-medium flex items-center gap-1"
              >
                <Edit2 size={14} />
                Edit
              </button>
            </div>
            <div className="p-4 space-y-2">
              {section.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-browning-charcoal">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      {priceBreakdown && (
        <div className="bg-browning-red/5 border border-browning-red/20 rounded-xl p-6">
          <h3 className="font-semibold text-browning-charcoal mb-4">Price Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Material Cost</span>
              <span>${priceBreakdown.materialCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cutting</span>
              <span>${priceBreakdown.cuttingCost.toFixed(2)}</span>
            </div>
            {priceBreakdown.servicesCost > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Services</span>
                <span>${priceBreakdown.servicesCost.toFixed(2)}</span>
              </div>
            )}
            {priceBreakdown.finishCost > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Finish</span>
                <span>${priceBreakdown.finishCost.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Unit Price</span>
                <span className="font-medium">${priceBreakdown.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity</span>
                <span>× {quantity}</span>
              </div>
            </div>

            {priceBreakdown.volumeDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Volume Discount</span>
                <span>-${priceBreakdown.volumeDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-browning-charcoal">Total</span>
                <span className="text-browning-red">${priceBreakdown.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Checklist */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-medium text-sm text-gray-600 mb-3">Before you proceed:</h4>
        <div className="space-y-2">
          {[
            'I have verified all dimensions are correct',
            'I understand this is an estimate - final price may vary',
            'Lead time is 5-7 business days after order confirmation',
          ].map((item, index) => (
            <label key={index} className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="mt-0.5 rounded border-gray-300" />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button
          onClick={prevStep}
          className="px-6 py-3 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          className="bg-browning-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          <ShoppingCart size={20} />
          Add to Quote
        </button>
      </div>
    </div>
  );
}
