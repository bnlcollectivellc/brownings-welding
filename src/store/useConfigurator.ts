import { create } from 'zustand';
import materialsData from '@/data/materials.json';
import servicesData from '@/data/services.json';
import finishesData from '@/data/finishes.json';
import templatesData from '@/data/templates.json';

// Types
export type ConfiguratorStep = 'entry' | 'template' | 'dimensions' | 'material' | 'services' | 'finish' | 'review';
export type EntryPath = 'upload' | 'builder' | 'design' | 'quote';
export type ViewMode = 'list' | 'tile';

export interface Thickness {
  gauge: string;
  inches: number;
  mm: number;
  pricePerSqIn: number;
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  thicknesses: Thickness[];
}

export interface MaterialCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
}

export interface SelectedMaterial {
  categoryId: string;
  subcategoryId: string;
  thickness: Thickness;
}

export interface TemplateParameter {
  id: string;
  value: number | string | boolean;
}

export interface SelectedTemplate {
  id: string;
  name: string;
  parameters: TemplateParameter[];
}

export interface SelectedService {
  id: string;
  options?: Record<string, string | number | boolean>;
  quantity?: number;
}

export interface SelectedFinish {
  id: string;
  colorId?: string;
  optionId?: string;
}

export interface PartDimensions {
  width: number;
  height: number;
  area: number;
  perimeter: number;
}

export interface PriceBreakdown {
  materialCost: number;
  cuttingCost: number;
  servicesCost: number;
  finishCost: number;
  subtotal: number;
  volumeDiscount: number;
  total: number;
  unitPrice: number;
}

interface ConfiguratorState {
  // Navigation
  isOpen: boolean;
  currentStep: ConfiguratorStep;
  entryPath: EntryPath | null;

  // Material View
  materialViewMode: ViewMode;

  // Selections
  selectedMaterial: SelectedMaterial | null;
  selectedTemplate: SelectedTemplate | null;
  selectedServices: SelectedService[];
  selectedFinish: SelectedFinish | null;

  // Part Info
  partDimensions: PartDimensions | null;
  quantity: number;

  // Uploaded File
  uploadedFile: File | null;
  uploadedFilePreview: string | null;

  // Pricing
  priceBreakdown: PriceBreakdown | null;

  // Data
  materials: MaterialCategory[];
  services: typeof servicesData.services;
  finishes: typeof finishesData.finishes;
  templates: typeof templatesData.templates;
  volumeDiscounts: typeof materialsData.volumeDiscounts;

  // Actions
  openConfigurator: (path: EntryPath) => void;
  closeConfigurator: () => void;
  setStep: (step: ConfiguratorStep) => void;
  nextStep: () => void;
  prevStep: () => void;

  setMaterialViewMode: (mode: ViewMode) => void;
  setSelectedMaterial: (material: SelectedMaterial | null) => void;
  setSelectedTemplate: (template: SelectedTemplate | null) => void;
  updateTemplateParameter: (parameterId: string, value: number | string | boolean) => void;

  addService: (service: SelectedService) => void;
  removeService: (serviceId: string) => void;
  updateService: (serviceId: string, options: Record<string, string | number | boolean>) => void;

  setSelectedFinish: (finish: SelectedFinish | null) => void;

  setQuantity: (qty: number) => void;
  setPartDimensions: (dimensions: PartDimensions) => void;

  setUploadedFile: (file: File | null, preview: string | null) => void;

  calculatePrice: () => void;
  reset: () => void;
}

const STEP_ORDER: ConfiguratorStep[] = ['entry', 'template', 'dimensions', 'material', 'services', 'finish', 'review'];

const getStepOrderForPath = (path: EntryPath): ConfiguratorStep[] => {
  switch (path) {
    case 'builder':
      return ['entry', 'template', 'dimensions', 'material', 'services', 'finish', 'review'];
    case 'upload':
      return ['entry', 'material', 'services', 'finish', 'review'];
    case 'design':
    case 'quote':
      return ['entry', 'review'];
    default:
      return STEP_ORDER;
  }
};

export const useConfigurator = create<ConfiguratorState>((set, get) => ({
  // Initial state
  isOpen: false,
  currentStep: 'entry',
  entryPath: null,

  materialViewMode: 'list',

  selectedMaterial: null,
  selectedTemplate: null,
  selectedServices: [],
  selectedFinish: null,

  partDimensions: null,
  quantity: 1,

  uploadedFile: null,
  uploadedFilePreview: null,

  priceBreakdown: null,

  // Load data
  materials: materialsData.categories as MaterialCategory[],
  services: servicesData.services,
  finishes: finishesData.finishes,
  templates: templatesData.templates,
  volumeDiscounts: materialsData.volumeDiscounts,

  // Actions
  openConfigurator: (path) => {
    const steps = getStepOrderForPath(path);
    set({
      isOpen: true,
      entryPath: path,
      currentStep: steps[1] || 'template', // Skip 'entry' step, go to first real step
    });
  },

  closeConfigurator: () => {
    set({ isOpen: false });
  },

  setStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep, entryPath } = get();
    if (!entryPath) return;

    const steps = getStepOrderForPath(entryPath);
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      set({ currentStep: steps[currentIndex + 1] });
    }
  },

  prevStep: () => {
    const { currentStep, entryPath } = get();
    if (!entryPath) return;

    const steps = getStepOrderForPath(entryPath);
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 1) { // Don't go back to 'entry'
      set({ currentStep: steps[currentIndex - 1] });
    }
  },

  setMaterialViewMode: (mode) => set({ materialViewMode: mode }),

  setSelectedMaterial: (material) => {
    set({ selectedMaterial: material });
    get().calculatePrice();
  },

  setSelectedTemplate: (template) => set({ selectedTemplate: template }),

  updateTemplateParameter: (parameterId, value) => {
    const { selectedTemplate } = get();
    if (!selectedTemplate) return;

    const updatedParams = selectedTemplate.parameters.map(p =>
      p.id === parameterId ? { ...p, value } : p
    );

    set({
      selectedTemplate: {
        ...selectedTemplate,
        parameters: updatedParams,
      },
    });
  },

  addService: (service) => {
    const { selectedServices } = get();
    if (!selectedServices.find(s => s.id === service.id)) {
      set({ selectedServices: [...selectedServices, service] });
      get().calculatePrice();
    }
  },

  removeService: (serviceId) => {
    const { selectedServices } = get();
    set({ selectedServices: selectedServices.filter(s => s.id !== serviceId) });
    get().calculatePrice();
  },

  updateService: (serviceId, options) => {
    const { selectedServices } = get();
    set({
      selectedServices: selectedServices.map(s =>
        s.id === serviceId ? { ...s, options: { ...s.options, ...options } } : s
      ),
    });
    get().calculatePrice();
  },

  setSelectedFinish: (finish) => {
    set({ selectedFinish: finish });
    get().calculatePrice();
  },

  setQuantity: (qty) => {
    set({ quantity: Math.max(1, qty) });
    get().calculatePrice();
  },

  setPartDimensions: (dimensions) => {
    set({ partDimensions: dimensions });
    get().calculatePrice();
  },

  setUploadedFile: (file, preview) => {
    set({ uploadedFile: file, uploadedFilePreview: preview });
  },

  calculatePrice: () => {
    const { selectedMaterial, partDimensions, selectedServices, selectedFinish, quantity, volumeDiscounts, services, finishes } = get();

    if (!selectedMaterial || !partDimensions) {
      set({ priceBreakdown: null });
      return;
    }

    // Material cost
    const materialCost = partDimensions.area * selectedMaterial.thickness.pricePerSqIn;

    // Cutting cost (based on perimeter, simplified)
    const cuttingCost = partDimensions.perimeter * 0.02;

    // Services cost
    let servicesCost = 0;
    selectedServices.forEach(selected => {
      const service = services.find(s => s.id === selected.id);
      if (service) {
        servicesCost += service.basePrice || 0;
        if (service.pricePerSqIn && partDimensions) {
          servicesCost += service.pricePerSqIn * partDimensions.area;
        }
      }
    });

    // Finish cost
    let finishMultiplier = 1;
    let finishUpcharge = 0;
    if (selectedFinish) {
      const finish = finishes.find(f => f.id === selectedFinish.id);
      if (finish) {
        finishMultiplier = finish.priceMultiplier;
        if (selectedFinish.colorId && finish.colors) {
          const color = finish.colors.find(c => c.id === selectedFinish.colorId);
          if (color) finishUpcharge = color.upcharge;
        }
      }
    }

    const baseCost = materialCost + cuttingCost + servicesCost;
    const finishCost = (baseCost * (finishMultiplier - 1)) + finishUpcharge;
    const subtotal = baseCost + finishCost;

    // Volume discount
    const discountTier = volumeDiscounts.find(d =>
      quantity >= d.minQty && (d.maxQty === null || quantity <= d.maxQty)
    );
    const discountRate = discountTier?.discount || 0;
    const volumeDiscount = subtotal * quantity * discountRate;

    const total = (subtotal * quantity) - volumeDiscount;
    const unitPrice = total / quantity;

    set({
      priceBreakdown: {
        materialCost,
        cuttingCost,
        servicesCost,
        finishCost,
        subtotal,
        volumeDiscount,
        total,
        unitPrice,
      },
    });
  },

  reset: () => {
    set({
      currentStep: 'entry',
      entryPath: null,
      selectedMaterial: null,
      selectedTemplate: null,
      selectedServices: [],
      selectedFinish: null,
      partDimensions: null,
      quantity: 1,
      uploadedFile: null,
      uploadedFilePreview: null,
      priceBreakdown: null,
    });
  },
}));
