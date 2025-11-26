'use client';

import { useState } from 'react';
import { Square, Circle, Triangle, Grid, Box, Settings, Check, Star, LucideIcon } from 'lucide-react';
import { useConfigurator } from '@/store/useConfigurator';

const iconMap: Record<string, LucideIcon> = {
  square: Square,
  circle: Circle,
  triangle: Triangle,
  grid: Grid,
  box: Box,
  settings: Settings,
  shapes: Square,
  bracket: Grid,
};

export default function TemplateSelector() {
  const { templates, selectedTemplate, setSelectedTemplate, nextStep } = useConfigurator();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(templates.map(t => t.category)));

  // Filter templates
  const filteredTemplates = selectedCategory
    ? templates.filter(t => t.category === selectedCategory)
    : templates;

  // Popular templates
  const popularTemplates = templates.filter(t => t.popular);

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setSelectedTemplate({
      id: template.id,
      name: template.name,
      parameters: template.parameters.map(p => ({
        id: p.id,
        value: p.default,
      })),
    });
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Square;
    return IconComponent;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-browning-charcoal">Select a Template</h2>
        <p className="text-gray-500 text-sm">Choose a starting shape for your part</p>
      </div>

      {/* Popular Templates */}
      {!selectedCategory && (
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
            <Star size={16} className="text-yellow-500" />
            Popular Templates
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popularTemplates.map((template) => {
              const Icon = getIcon(template.icon);
              const isSelected = selectedTemplate?.id === template.id;
              return (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-browning-red bg-browning-red/5'
                      : 'border-gray-200 hover:border-browning-red/50'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-browning-red rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                    <Icon size={24} className="text-browning-charcoal" />
                  </div>
                  <h4 className="font-semibold text-sm text-browning-charcoal">{template.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{template.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Browse by Category</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-browning-red text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-browning-red text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredTemplates.map((template) => {
          const Icon = getIcon(template.icon);
          const isSelected = selectedTemplate?.id === template.id;
          return (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-browning-red bg-browning-red/5'
                  : 'border-gray-200 hover:border-browning-red/50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-browning-red rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                <Icon size={24} className="text-browning-charcoal" />
              </div>
              <h4 className="font-semibold text-sm text-browning-charcoal">{template.name}</h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{template.description}</p>
              {template.bendRequired && (
                <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                  Bend Required
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={nextStep}
          disabled={!selectedTemplate}
          className="bg-browning-red hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Continue to Dimensions
        </button>
      </div>
    </div>
  );
}
