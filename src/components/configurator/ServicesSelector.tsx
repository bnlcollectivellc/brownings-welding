'use client';

import { Check, Plus } from 'lucide-react';
import { useConfigurator } from '@/store/useConfigurator';

export default function ServicesSelector() {
  const {
    services,
    selectedServices,
    addService,
    removeService,
  } = useConfigurator();

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some(s => s.id === serviceId);
  };

  const handleToggleService = (serviceId: string) => {
    if (isServiceSelected(serviceId)) {
      removeService(serviceId);
    } else {
      addService({ id: serviceId });
    }
  };

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-browning-charcoal">Add Services</h2>
        <p className="text-gray-500 text-sm">Select additional services for your part (optional)</p>
      </div>

      {/* Services by Category */}
      <div className="space-y-6">
        {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categoryServices.map((service) => {
                const isSelected = isServiceSelected(service.id);
                const isIncluded = service.included;

                return (
                  <button
                    key={service.id}
                    onClick={() => !isIncluded && handleToggleService(service.id)}
                    disabled={isIncluded}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                      isIncluded
                        ? 'border-green-200 bg-green-50 cursor-default'
                        : isSelected
                          ? 'border-browning-red bg-browning-red/5'
                          : 'border-gray-200 hover:border-browning-red/50'
                    }`}
                  >
                    {/* Selection Indicator */}
                    <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center ${
                      isIncluded
                        ? 'bg-green-500'
                        : isSelected
                          ? 'bg-browning-red'
                          : 'border-2 border-gray-300'
                    }`}>
                      {(isIncluded || isSelected) && <Check size={14} className="text-white" />}
                      {!isIncluded && !isSelected && <Plus size={14} className="text-gray-400" />}
                    </div>

                    <h4 className="font-semibold text-browning-charcoal pr-8">{service.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{service.description}</p>

                    {/* Pricing */}
                    <div className="mt-3 flex items-center gap-2">
                      {isIncluded ? (
                        <span className="text-sm font-medium text-green-600">Included</span>
                      ) : (
                        <>
                          {service.basePrice > 0 && (
                            <span className="text-sm text-browning-red font-medium">
                              +${service.basePrice.toFixed(2)}
                            </span>
                          )}
                          {service.pricePerBend && (
                            <span className="text-xs text-gray-500">
                              + ${service.pricePerBend}/bend
                            </span>
                          )}
                          {service.pricePerSqIn && (
                            <span className="text-xs text-gray-500">
                              + ${service.pricePerSqIn}/in²
                            </span>
                          )}
                          {service.pricePerHole && (
                            <span className="text-xs text-gray-500">
                              + ${service.pricePerHole}/hole
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Services Summary */}
      {selectedServices.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-medium text-sm text-gray-600 mb-2">Selected Services:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedServices.map((selected) => {
              const service = services.find(s => s.id === selected.id);
              return (
                <span
                  key={selected.id}
                  className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1 text-sm"
                >
                  {service?.name}
                  <button
                    onClick={() => removeService(selected.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
