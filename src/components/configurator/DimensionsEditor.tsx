'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useConfigurator } from '@/store/useConfigurator';
import makerjs from 'makerjs';

export default function DimensionsEditor() {
  const {
    selectedTemplate,
    updateTemplateParameter,
    setPartDimensions,
    nextStep,
    prevStep,
  } = useConfigurator();

  const svgContainerRef = useRef<HTMLDivElement>(null);

  // Generate the shape based on template and parameters
  const generateShape = useCallback(() => {
    if (!selectedTemplate) return null;

    const params: Record<string, number | string | boolean> = {};
    selectedTemplate.parameters.forEach(p => {
      params[p.id] = p.value;
    });

    let model: makerjs.IModel | null = null;

    switch (selectedTemplate.id) {
      case 'rectangle': {
        const width = params.width as number || 6;
        const height = params.height as number || 4;
        const radius = params.cornerRadius as number || 0;

        if (radius > 0) {
          model = new makerjs.models.RoundRectangle(width, height, radius);
        } else {
          model = new makerjs.models.Rectangle(width, height);
        }
        break;
      }

      case 'circle': {
        const diameter = params.diameter as number || 4;
        const innerDiameter = params.innerDiameter as number || 0;

        if (innerDiameter > 0) {
          model = new makerjs.models.Ring(diameter / 2, innerDiameter / 2);
        } else {
          model = new makerjs.models.Ellipse(diameter / 2, diameter / 2);
        }
        break;
      }

      case 'triangle': {
        const base = params.base as number || 4;
        const h = params.height as number || 3;

        model = {
          paths: {
            line1: new makerjs.paths.Line([0, 0], [base, 0]),
            line2: new makerjs.paths.Line([base, 0], [base / 2, h]),
            line3: new makerjs.paths.Line([base / 2, h], [0, 0]),
          }
        };
        break;
      }

      case 'mounting-plate': {
        const width = params.width as number || 6;
        const height = params.height as number || 4;
        const radius = params.cornerRadius as number || 0.25;
        const holeDiameter = params.holeDiameter as number || 0.25;
        const holeInset = params.holeInset as number || 0.5;

        const plate = radius > 0
          ? new makerjs.models.RoundRectangle(width, height, radius)
          : new makerjs.models.Rectangle(width, height);

        // Add corner holes
        const holeRadius = holeDiameter / 2;
        const holes: makerjs.IModel = {
          models: {
            hole1: new makerjs.models.Ellipse(holeRadius, holeRadius),
            hole2: new makerjs.models.Ellipse(holeRadius, holeRadius),
            hole3: new makerjs.models.Ellipse(holeRadius, holeRadius),
            hole4: new makerjs.models.Ellipse(holeRadius, holeRadius),
          }
        };

        // Position holes
        holes.models!.hole1.origin = [holeInset, holeInset];
        holes.models!.hole2.origin = [width - holeInset, holeInset];
        holes.models!.hole3.origin = [width - holeInset, height - holeInset];
        holes.models!.hole4.origin = [holeInset, height - holeInset];

        model = {
          models: {
            plate,
            holes,
          }
        };
        break;
      }

      case 'washer': {
        const outerD = params.outerDiameter as number || 1;
        const innerD = params.innerDiameter as number || 0.5;
        model = new makerjs.models.Ring(outerD / 2, innerD / 2);
        break;
      }

      default:
        // Default to a simple rectangle for unimplemented templates
        model = new makerjs.models.Rectangle(6, 4);
    }

    return model;
  }, [selectedTemplate]);

  // Calculate dimensions from the model
  const calculateDimensions = useCallback((model: makerjs.IModel) => {
    const measure = makerjs.measure.modelExtents(model);
    const width = measure.high[0] - measure.low[0];
    const height = measure.high[1] - measure.low[1];
    const area = width * height; // Simplified - actual area calculation would be more complex
    const perimeter = 2 * (width + height); // Simplified

    return { width, height, area, perimeter };
  }, []);

  // Render the SVG
  useEffect(() => {
    if (!svgContainerRef.current || !selectedTemplate) return;

    const model = generateShape();
    if (!model) return;

    // Calculate and update dimensions
    const dimensions = calculateDimensions(model);
    setPartDimensions(dimensions);

    // Generate SVG
    const svg = makerjs.exporter.toSVG(model, {
      stroke: '#E63329',
      strokeWidth: '2',
      fill: 'none',
      viewBox: true,
      svgAttrs: {
        style: 'max-width: 100%; height: auto;'
      }
    });

    svgContainerRef.current.innerHTML = svg;
  }, [selectedTemplate, generateShape, calculateDimensions, setPartDimensions]);

  if (!selectedTemplate) {
    return <div>Please select a template first</div>;
  }

  // Get template definition for parameter metadata
  const templateDef = useConfigurator.getState().templates.find(t => t.id === selectedTemplate.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-browning-charcoal">Customize Dimensions</h2>
        <p className="text-gray-500 text-sm">Adjust the parameters for your {selectedTemplate.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center min-h-[300px]">
          <div ref={svgContainerRef} className="w-full max-w-md" />
        </div>

        {/* Parameters */}
        <div className="space-y-4">
          {selectedTemplate.parameters.map((param) => {
            const paramDef = templateDef?.parameters.find(p => p.id === param.id);

            if (paramDef?.type === 'select' && 'options' in paramDef && paramDef.options) {
              return (
                <div key={param.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {paramDef.name}
                  </label>
                  <select
                    value={param.value as string}
                    onChange={(e) => updateTemplateParameter(param.id, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    {(paramDef.options as string[]).map((opt: string) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              );
            }

            if (paramDef?.type === 'boolean') {
              return (
                <div key={param.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={param.id}
                    checked={param.value as boolean}
                    onChange={(e) => updateTemplateParameter(param.id, e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-browning-red focus:ring-browning-red"
                  />
                  <label htmlFor={param.id} className="text-sm font-medium text-gray-700">
                    {paramDef.name}
                  </label>
                </div>
              );
            }

            // Default: dimension/number input
            return (
              <div key={param.id}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {paramDef?.name || param.id}
                  {paramDef?.unit && <span className="text-gray-400 ml-1">({paramDef.unit})</span>}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    value={param.value as number}
                    onChange={(e) => updateTemplateParameter(param.id, parseFloat(e.target.value))}
                    min={paramDef?.min || 0}
                    max={paramDef?.max || 48}
                    step={paramDef?.step || 0.125}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    value={param.value as number}
                    onChange={(e) => updateTemplateParameter(param.id, parseFloat(e.target.value) || 0)}
                    min={paramDef?.min || 0}
                    max={paramDef?.max || 48}
                    step={paramDef?.step || 0.125}
                    className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-right"
                  />
                </div>
              </div>
            );
          })}
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
          onClick={nextStep}
          className="bg-browning-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Continue to Material
        </button>
      </div>
    </div>
  );
}
