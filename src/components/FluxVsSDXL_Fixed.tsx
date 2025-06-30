import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- TypeScript Interfaces ---

interface LoRA {
  id: string;
  name: string;
  strength: number;
  type: 'style' | 'character' | 'pose' | 'background' | 'clothing';
  description: string;
  author: string;
  downloadUrl?: string;
}

interface FluxConfig {
  model: string;
  resolution: string;
  steps: number;
  guidance: number;
  loras: LoRA[];
  vae: string;
  upscaler: string | null;
  hardware: 'rx6700xt' | 'm3' | 'rtx4090';
  t5_encoder: string;
  clip_l_encoder: string;
  cfg: number;
  sampler: string;
  scheduler: string;
}

interface SdxlConfig {
  baseModel: string;
  refinerModel: string;
  resolution: string;
  steps: number;
  guidance: number;
  loras: LoRA[];
  vae: string;
  upscaler: string | null;
  hardware: 'rx6700xt' | 'm3' | 'rtx4090';
  end_at_step: number;
  cfg: number;
  sampler: string;
  scheduler: string;
}

interface ModelSearchResult {
  id: string;
  name: string;
  type: 'flux' | 'sdxl' | 'upscaler' | 'vae' | 'embedding';
  description: string;
  author: string;
  downloads: number;
  rating: number;
  fileSize: string;
  tags: string[];
  downloadUrl?: string;
}

interface TimeEstimation {
  baseTime: number; // in seconds
  loraOverhead: number;
  upscalerTime: number;
  totalTime: number;
  breakdown: {
    modelLoading: number;
    inference: number;
    loras: number;
    upscaling: number;
  };
}

// --- Default Configurations ---

const defaultFluxConfig: FluxConfig = {
  model: 'flux-dev-q6k',
  resolution: '1024x1024',
  steps: 20,
  guidance: 3.5,
  loras: [],
  vae: 'ae.sft',
  upscaler: null,
  hardware: 'rx6700xt',
  t5_encoder: 't5xxl_fp16.safetensors',
  clip_l_encoder: 'clip_l.safetensors',
  cfg: 1.0,
  sampler: 'euler',
  scheduler: 'normal'
};

const defaultSdxlConfig: SdxlConfig = {
  baseModel: 'juggernaut-xl-v9',
  refinerModel: 'sdxl-refiner-1.0',
  resolution: '1024x1024',
  steps: 30,
  guidance: 7.5,
  loras: [],
  vae: 'sdxl-vae-fp16-fix',
  upscaler: null,
  hardware: 'rx6700xt',
  end_at_step: 25,
  cfg: 7.5,
  sampler: 'dpmpp_2m',
  scheduler: 'karras'
};

// --- Mock Data (simulating API responses) ---

const mockModels: ModelSearchResult[] = [
  {
    id: 'flux-dev-q6k',
    name: 'FLUX.1 Dev Q6_K',
    type: 'flux',
    description: 'Quantized FLUX model optimized for consumer GPUs',
    author: 'black-forest-labs',
    downloads: 45000,
    rating: 4.8,
    fileSize: '10.2 GB',
    tags: ['quantized', 'gguf', 'consumer-friendly']
  },
  {
    id: 'juggernaut-xl-v9',
    name: 'JuggernautXL v9',
    type: 'sdxl',
    description: 'Photorealistic SDXL base model',
    author: 'RunDiffusion',
    downloads: 125000,
    rating: 4.9,
    fileSize: '6.46 GB',
    tags: ['photorealistic', 'base-model', 'sdxl']
  },
  {
    id: 'realvisxl-v4',
    name: 'RealVisXL V4.0',
    type: 'sdxl',
    description: 'Ultra-realistic photography model',
    author: 'SG161222',
    downloads: 89000,
    rating: 4.7,
    fileSize: '6.46 GB',
    tags: ['realistic', 'photography', 'portraits']
  },
  {
    id: 'esrgan-4x-animesharp',
    name: 'ESRGAN 4x AnimeSharp',
    type: 'upscaler',
    description: 'Specialized upscaler for anime and illustrations',
    author: 'Kim2091',
    downloads: 34000,
    rating: 4.6,
    fileSize: '67.1 MB',
    tags: ['anime', 'illustration', '4x-upscale']
  }
];

const mockLoras: ModelSearchResult[] = [
  {
    id: 'add-detail-xl',
    name: 'add_detail XL',
    type: 'flux',
    description: 'Enhances fine details in generated images',
    author: 'ostris',
    downloads: 67000,
    rating: 4.8,
    fileSize: '143 MB',
    tags: ['detail-enhancement', 'universal', 'quality-boost']
  },
  {
    id: 'film-grain-xl',
    name: 'Film Grain XL',
    type: 'sdxl',
    description: 'Adds realistic film grain texture',
    author: 'ProomptEngineer',
    downloads: 23000,
    rating: 4.5,
    fileSize: '89 MB',
    tags: ['film-grain', 'texture', 'analog']
  },
  {
    id: 'cyberpunk-style',
    name: 'Cyberpunk Edgerunners Style',
    type: 'sdxl',
    description: 'Anime cyberpunk aesthetic',
    author: 'Linaqruf',
    downloads: 45000,
    rating: 4.7,
    fileSize: '112 MB',
    tags: ['cyberpunk', 'anime', 'neon', 'futuristic']
  }
];

const mockUpscalers: ModelSearchResult[] = [
  {
    id: 'real-esrgan-4x',
    name: 'RealESRGAN 4x+',
    type: 'upscaler',
    description: 'General purpose photo upscaler',
    author: 'xinntao',
    downloads: 156000,
    rating: 4.9,
    fileSize: '67.1 MB',
    tags: ['real-photo', '4x-upscale', 'general-purpose']
  },
  {
    id: 'swinir-4x',
    name: 'SwinIR 4x',
    type: 'upscaler',
    description: 'Transformer-based super resolution',
    author: 'JingyunLiang',
    downloads: 78000,
    rating: 4.6,
    fileSize: '45.7 MB',
    tags: ['transformer', 'high-quality', 'slow']
  }
];

// --- Time Estimation Logic ---

const calculateTimeEstimation = (
  modelType: 'flux' | 'sdxl',
  resolution: string,
  steps: number,
  loras: LoRA[],
  upscaler: string | null,
  hardware: 'rx6700xt' | 'm3' | 'rtx4090'
): TimeEstimation => {
  const baseMultipliers = {
    'rx6700xt': { flux: 12, sdxl: 3 },
    'm3': { flux: 18, sdxl: 5 },
    'rtx4090': { flux: 4, sdxl: 1 }
  };

  const resolutionMultipliers: { [key: string]: number } = {
    '512x512': 0.5,
    '768x768': 1.0,
    '1024x1024': 1.5,
    '1536x1536': 2.5
  };

  const baseTime = baseMultipliers[hardware][modelType] * steps * (resolutionMultipliers[resolution] || 1);
  const loraOverhead = loras.length * 0.15 * baseTime; // 15% overhead per LoRA
  const upscalerTime = upscaler ? baseTime * 0.8 : 0; // 80% of base time for upscaling

  const modelLoading = modelType === 'flux' ? 45 : 15;
  const inference = baseTime;
  const lorasTime = loraOverhead;
  const upscaling = upscalerTime;

  return {
    baseTime,
    loraOverhead,
    upscalerTime,
    totalTime: modelLoading + inference + lorasTime + upscaling,
    breakdown: {
      modelLoading,
      inference,
      loras: lorasTime,
      upscaling
    }
  };
};

// --- Utility Components ---

interface ModelSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  type: 'flux' | 'sdxl' | 'upscaler' | 'vae' | 'model';
  placeholder?: string;
  label?: string;
}

const ModelSearchInput: React.FC<ModelSearchInputProps> = ({ value, onChange, type, placeholder, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredModels = React.useMemo(() => {
    const sourceData = type === 'upscaler' ? mockUpscalers : 
                      type === 'flux' || type === 'sdxl' || type === 'model' ? mockModels.filter(m => m.type === 'flux' || m.type === 'sdxl') :
                      mockModels.filter(m => m.type === type);
    
    return sourceData.filter(model => 
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, type]);

  const selectedModel = React.useMemo(() => {
    const allModels = [...mockModels, ...mockUpscalers];
    return allModels.find(m => m.id === value);
  }, [value]);

  return (
    <div className="space-y-1">
      {label && <label className="text-sm text-gray-300">{label}:</label>}
      <div className="relative">
        <div 
          className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded cursor-pointer flex justify-between items-center text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedModel?.name || placeholder || 'Select model...'}</span>
          <span className="text-gray-400">▼</span>
        </div>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
            <input
              type="text"
              className="w-full p-2 bg-gray-700 text-white border-b border-gray-600 focus:outline-none text-sm"
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            {filteredModels.map((model) => (
              <div
                key={model.id}
                className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0"
                onClick={() => {
                  onChange(model.id);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                <div className="font-medium text-white text-sm">{model.name}</div>
                <div className="text-xs text-gray-400">by {model.author}</div>
                <div className="text-xs text-gray-500 mt-1">{model.description}</div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Downloads: {model.downloads.toLocaleString()}</span>
                  <span>Size: {model.fileSize}</span>
                  <span>★ {model.rating}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface LoRAManagerProps {
  loras: LoRA[];
  onChange: (loras: LoRA[]) => void;
}

const LoRAManager: React.FC<LoRAManagerProps> = ({ loras, onChange }) => {
  const [isAdding, setIsAdding] = useState(false);

  const addLoRA = (modelResult: ModelSearchResult) => {
    const newLoRA: LoRA = {
      id: modelResult.id,
      name: modelResult.name,
      strength: 1.0,
      type: 'style', // Default type, could be inferred from tags
      description: modelResult.description,
      author: modelResult.author,
      downloadUrl: modelResult.downloadUrl
    };
    onChange([...loras, newLoRA]);
    setIsAdding(false);
  };

  const removeLoRA = (id: string) => {
    onChange(loras.filter(lora => lora.id !== id));
  };

  const updateLoRAStrength = (id: string, strength: number) => {
    onChange(loras.map(lora => 
      lora.id === id ? { ...lora, strength } : lora
    ));
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-white font-medium">LoRAs ({loras.length})</h4>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Add LoRA
        </button>
      </div>

      {isAdding && (
        <div className="bg-gray-800 p-3 rounded">
          <div className="mb-2 text-sm text-gray-400">Search and add LoRA:</div>
          <ModelSearchInput
            value=""
            onChange={(value) => {
              const model = mockLoras.find(m => m.id === value);
              if (model) addLoRA(model);
            }}
            type="flux"
            placeholder="Search LoRAs..."
          />
        </div>
      )}

      {loras.map((lora) => (
        <div key={lora.id} className="bg-gray-800 p-3 rounded">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-white font-medium">{lora.name}</div>
              <div className="text-xs text-gray-400">by {lora.author}</div>
            </div>
            <button
              onClick={() => removeLoRA(lora.id)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <label className="text-sm text-gray-400">Strength:</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={lora.strength}
              onChange={(e) => updateLoRAStrength(lora.id, parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-white text-sm w-12">{lora.strength.toFixed(1)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

interface TimeEstimationDisplayProps {
  estimation: TimeEstimation;
}

const TimeEstimationDisplay: React.FC<TimeEstimationDisplayProps> = ({ estimation }) => {
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="bg-gray-800 p-4 rounded">
      <h4 className="text-white font-medium mb-3">Time Estimation</h4>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Model Loading:</span>
          <span className="text-white">{formatTime(estimation.breakdown.modelLoading)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Inference:</span>
          <span className="text-white">{formatTime(estimation.breakdown.inference)}</span>
        </div>
        {estimation.breakdown.loras > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">LoRA Overhead:</span>
            <span className="text-white">{formatTime(estimation.breakdown.loras)}</span>
          </div>
        )}
        {estimation.breakdown.upscaling > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Upscaling:</span>
            <span className="text-white">{formatTime(estimation.breakdown.upscaling)}</span>
          </div>
        )}
        <hr className="border-gray-600" />
        <div className="flex justify-between font-medium">
          <span className="text-white">Total Time:</span>
          <span className="text-green-400">{formatTime(estimation.totalTime)}</span>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components for Workflow Diagrams ---

interface EditableWorkflowNodeProps {
  title: string;
  color: string;
  children: React.ReactNode;
}

const EditableWorkflowNode: React.FC<EditableWorkflowNodeProps> = ({ title, color, children }) => {
  return (
    <div className={`bg-gray-800 border-2 ${color} rounded-lg p-4 space-y-3`}>
      <h4 className="font-bold text-white text-center">{title}</h4>
      {children}
    </div>
  );
};

interface EditableNodeFieldProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: 'text' | 'number' | 'select';
  options?: string[];
  min?: string | number;
  max?: string | number;
  step?: string;
  placeholder?: string;
}

const EditableNodeField: React.FC<EditableNodeFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  options, 
  min, 
  max, 
  step,
  placeholder 
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-300">{label}:</label>
      {type === 'select' ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded text-sm"
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded text-sm"
        />
      )}
    </div>
  );
};

const ArrowDown: React.FC = () => (
  <div className="flex justify-center my-2">
    <div className="text-gray-400 text-2xl">↓</div>
  </div>
);

// --- Reusable Components ---

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-slate-800/50 backdrop-blur-xl border border-indigo-900/50 rounded-xl p-6 ${className}`}>
    {children}
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-bold text-center mb-8 text-white">{children}</h2>
);

// --- Workflow Diagram Components ---

interface FluxWorkflowDiagramProps {
  config: FluxConfig;
  setConfig: React.Dispatch<React.SetStateAction<FluxConfig>>;
}

const FluxWorkflowDiagram: React.FC<FluxWorkflowDiagramProps> = ({ config, setConfig }) => {
  const handleChange = (field: keyof FluxConfig) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setConfig((prev: FluxConfig) => ({ ...prev, [field]: value }));
  };
  
  const handleLoRAsChange = (loras: LoRA[]) => {
    setConfig((prev: FluxConfig) => ({ ...prev, loras }));
  };
  
  const handleModelChange = (field: keyof FluxConfig) => (value: string) => {
    setConfig((prev: FluxConfig) => ({ ...prev, [field]: value }));
  };
  
  const timeEstimation = calculateTimeEstimation(
    'flux',
    config.resolution,
    config.steps,
    config.loras,
    config.upscaler,
    config.hardware
  );
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <EditableWorkflowNode title="Load GGUF Model" color="border-fuchsia-500">
          <ModelSearchInput
            label="Model"
            value={config.model}
            onChange={handleModelChange('model')}
            type="model"
          />
        </EditableWorkflowNode>
        <EditableWorkflowNode title="DualCLIPLoader" color="border-fuchsia-500">
          <EditableNodeField label="T5" value={config.t5_encoder} onChange={handleChange('t5_encoder')} />
          <EditableNodeField label="CLIP-L" value={config.clip_l_encoder} onChange={handleChange('clip_l_encoder')} />
        </EditableWorkflowNode>
        <EditableWorkflowNode title="Load VAE" color="border-fuchsia-500">
          <EditableNodeField label="VAE" value={config.vae} onChange={handleChange('vae')} />
        </EditableWorkflowNode>
      </div>
      
      <EditableWorkflowNode title="LoRA & Settings" color="border-purple-500">
        <LoRAManager loras={config.loras} onChange={handleLoRAsChange} />
        <div className="mt-3 space-y-2">
          <EditableNodeField label="Resolution" type="select" options={['512x512', '768x768', '1024x1024', '1152x896', '1344x768', '1536x640']} value={config.resolution} onChange={handleChange('resolution')} />
          <ModelSearchInput
            label="Upscaler (Optional)"
            value={config.upscaler || ''}
            onChange={handleModelChange('upscaler')}
            type="upscaler"
            placeholder="None"
          />
        </div>
      </EditableWorkflowNode>
      
      <ArrowDown />
      <EditableWorkflowNode title="KSampler (GGUF)" color="border-red-500">
        <EditableNodeField label="Steps" type="number" min="1" max="100" value={config.steps} onChange={handleChange('steps')} />
        <EditableNodeField label="CFG" type="number" step="0.1" min="1.0" max="1.0" value={config.cfg} onChange={handleChange('cfg')} />
        <EditableNodeField label="Sampler" type="select" options={['euler', 'dpm_2', 'lms']} value={config.sampler} onChange={handleChange('sampler')} />
        <EditableNodeField label="Scheduler" type="select" options={['normal', 'karras', 'simple']} value={config.scheduler} onChange={handleChange('scheduler')} />
      </EditableWorkflowNode>
      <ArrowDown />
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900/70 border-2 border-green-500 rounded-lg p-3 text-left"><h4 className="font-bold text-sm text-green-500">VAE Decode</h4></div>
        <div className="bg-slate-900/70 border-2 border-green-500 rounded-lg p-3 text-left"><h4 className="font-bold text-sm text-green-500">Save Image</h4></div>
      </div>
      
      <TimeEstimationDisplay estimation={timeEstimation} />
    </div>
  );
};

interface SdxlWorkflowDiagramProps {
  config: SdxlConfig;
  setConfig: React.Dispatch<React.SetStateAction<SdxlConfig>>;
}

const SdxlWorkflowDiagram: React.FC<SdxlWorkflowDiagramProps> = ({ config, setConfig }) => {
  const handleChange = (field: keyof SdxlConfig) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setConfig((prev: SdxlConfig) => ({ ...prev, [field]: value }));
  };
  
  const handleLoRAsChange = (loras: LoRA[]) => {
    setConfig((prev: SdxlConfig) => ({ ...prev, loras }));
  };
  
  const handleModelChange = (field: keyof SdxlConfig) => (value: string) => {
    setConfig((prev: SdxlConfig) => ({ ...prev, [field]: value }));
  };
  
  const timeEstimation = calculateTimeEstimation(
    'sdxl',
    config.resolution,
    config.steps,
    config.loras,
    config.upscaler,
    config.hardware
  );
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <EditableWorkflowNode title="Load Checkpoint (Base)" color="border-cyan-500">
          <ModelSearchInput
            label="Base Model"
            value={config.baseModel}
            onChange={handleModelChange('baseModel')}
            type="model"
          />
        </EditableWorkflowNode>
        <EditableWorkflowNode title="Load Checkpoint (Refiner)" color="border-cyan-500">
          <ModelSearchInput
            label="Refiner Model"
            value={config.refinerModel}
            onChange={handleModelChange('refinerModel')}
            type="model"
          />
        </EditableWorkflowNode>
      </div>
      
      <EditableWorkflowNode title="LoRA & Settings" color="border-purple-500">
        <LoRAManager loras={config.loras} onChange={handleLoRAsChange} />
        <div className="mt-3 space-y-2">
          <EditableNodeField label="Resolution" type="select" options={['512x512', '768x768', '1024x1024', '1152x896', '1344x768', '1536x640']} value={config.resolution} onChange={handleChange('resolution')} />
          <ModelSearchInput
            label="Upscaler (Optional)"
            value={config.upscaler || ''}
            onChange={handleModelChange('upscaler')}
            type="upscaler"
            placeholder="None"
          />
        </div>
      </EditableWorkflowNode>
      
      <ArrowDown />
      <div className="grid grid-cols-2 gap-4">
        <EditableWorkflowNode title="Base Pass KSampler" color="border-red-500">
          <EditableNodeField label="Steps" type="number" min="1" max="100" value={config.steps} onChange={handleChange('steps')} />
          <EditableNodeField label="End At" type="number" min="1" max={config.steps} value={config.end_at_step} onChange={handleChange('end_at_step')} />
          <EditableNodeField label="CFG" type="number" step="0.5" min="1" max="20" value={config.cfg} onChange={handleChange('cfg')} />
        </EditableWorkflowNode>
        <EditableWorkflowNode title="Refiner Pass KSampler" color="border-red-500">
          <EditableNodeField label="Start At" type="number" value={config.end_at_step} onChange={() => {}} />
          <EditableNodeField label="Sampler" type="select" options={['dpmpp_2m', 'euler_ancestral', 'lms']} value={config.sampler} onChange={handleChange('sampler')} />
          <EditableNodeField label="Scheduler" type="select" options={['karras', 'normal', 'sgm_uniform']} value={config.scheduler} onChange={handleChange('scheduler')} />
        </EditableWorkflowNode>
      </div>
      <ArrowDown />
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900/70 border-2 border-green-500 rounded-lg p-3 text-left"><h4 className="font-bold text-sm text-green-500">VAE Decode</h4></div>
        <div className="bg-slate-900/70 border-2 border-green-500 rounded-lg p-3 text-left"><h4 className="font-bold text-sm text-green-500">Save Image</h4></div>
      </div>
      
      <TimeEstimationDisplay estimation={timeEstimation} />
    </div>
  );
};

// --- Section Components ---

const Header: React.FC = () => (
  <header className="text-center my-12">
    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
      FLUX <span className="text-fuchsia-500">vs</span> SDXL
    </h1>
    <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-indigo-300">
      The Ultimate Guide to High-Quality Image Generation on Consumer Hardware
    </p>
  </header>
);

const ComparisonTable: React.FC = () => {
  const comparisonData = [
    { feature: 'Prompt Adherence', flux: '🏆 Superior', sdxl: 'Good', fluxClass: 'text-green-400' },
    { feature: 'Text Generation', flux: '🏆 Excellent', sdxl: 'Poor', fluxClass: 'text-green-400', sdxlClass: 'text-red-400' },
    { feature: 'Anatomy & Poses', flux: '🏆 Excellent', sdxl: 'Inconsistent', fluxClass: 'text-green-400' },
    { feature: 'Generation Speed', flux: 'Slow (4-5x)', sdxl: '🏆 Fast', fluxClass: 'text-amber-400', sdxlClass: 'text-green-400' },
    { feature: 'LoRA Ecosystem', flux: 'Inconsistent', sdxl: '🏆 Vast & Mature', sdxlClass: 'text-green-400' },
    { feature: 'Artistic Style Replication', flux: 'Good', sdxl: '🏆 Superior', sdxlClass: 'text-green-400' },
  ];

  return (
    <section id="comparison">
      <SectionTitle>Head-to-Head: The Verdict</SectionTitle>
      <div className="overflow-x-auto">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-indigo-900/50 rounded-xl p-0 min-w-[700px]">
          <table className="w-full text-left">
            <thead className="border-b border-indigo-900">
              <tr>
                <th className="p-4 text-sm font-semibold uppercase tracking-wider text-indigo-300">Feature</th>
                <th className="p-4 text-center text-sm font-semibold uppercase tracking-wider text-white">FLUX.1</th>
                <th className="p-4 text-center text-sm font-semibold uppercase tracking-wider text-white">SDXL</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index} className="border-b border-indigo-900 last:border-b-0">
                  <td className="p-4 font-semibold">{item.feature}</td>
                  <td className={`p-4 text-center font-bold ${item.fluxClass || ''}`}>{item.flux}</td>
                  <td className={`p-4 text-center font-bold ${item.sdxlClass || ''}`}>{item.sdxl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-center mt-6 text-sm text-indigo-400">
        FLUX's DiT architecture provides unmatched precision for complex prompts, while SDXL's mature LDM architecture offers speed and stylistic versatility.
      </p>
    </section>
  );
};

const HardwareSection: React.FC = () => {
  const vramData = {
    labels: ['Q4_K_M', 'Q5_K_M', 'Q6_K', 'Q8_0', 'Full (FP16)'],
    datasets: [{
      label: 'VRAM Usage (GB)',
      data: [7, 8.5, 10, 12.5, 23],
      backgroundColor: [
        'rgba(16, 185, 129, 0.6)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(245, 158, 11, 0.6)',
        'rgba(239, 68, 68, 0.6)',
        'rgba(192, 132, 252, 0.6)'
      ],
      borderColor: [
        '#10B981',
        '#3B82F6',
        '#F59E0B',
        '#EF4444',
        '#C084FC'
      ],
      borderWidth: 1
    }]
  };

  const vramOptions = {
    indexAxis: 'y' as const,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: 'rgba(132, 119, 219, 0.1)' },
        ticks: { 
          color: '#E0E0FF',
          callback: (value: number | string) => `${value} GB`
        }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#E0E0FF' }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) => {
            const item = tooltipItems[0];
            let label = item.chart.data.labels[item.dataIndex];
            return Array.isArray(label) ? label.join(' ') : label;
          }
        }
      },
      title: {
        display: true,
        text: 'FLUX GGUF Model VRAM Usage vs. Quantization',
        color: '#E0E0FF',
        font: { size: 16, weight: 'bold' as const }
      }
    }
  };

  return (
    <section id="hardware">
      <SectionTitle>Know Your Hardware, Tame The Beast</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="flex flex-col">
          <h3 className="text-2xl font-bold mb-4 text-white">🎮 The AMD Battlestation <span className="text-base font-normal text-indigo-300">(RX 6700 XT 12GB)</span></h3>
          <p className="mb-4 text-indigo-300">With 12GB VRAM, running the full FLUX model is impossible. The solution is quantization using GGUF format, which drastically reduces VRAM usage. This chart shows the trade-off between quality and VRAM footprint.</p>
          <div className="flex-grow mt-4 h-80 md:h-96">
            <Bar data={vramData} options={vramOptions} />
          </div>
          <p className="text-center mt-4 text-xs text-indigo-400">Note: The key to performance is running ComfyUI via WSL2 and ROCm, not Windows DirectML.</p>
        </GlassCard>

        <GlassCard className="flex flex-col">
          <h3 className="text-2xl font-bold mb-4 text-white">💻 The M3 Creative Studio <span className="text-base font-normal text-indigo-300">(MacBook 16GB)</span></h3>
          <p className="mb-6 text-indigo-300">The M3's 16GB Unified Memory can load large models, but its slower memory bandwidth makes it ill-suited for rapid, interactive work. Its strength lies in efficiency and silent operation.</p>
          <div className="text-center flex-grow flex flex-col items-center justify-center bg-slate-900/50 rounded-lg p-6">
            <p className="text-6xl mb-4">🌙</p>
            <h4 className="text-xl font-bold text-white">Your Silent Batch Processor</h4>
            <p className="mt-2 text-indigo-300">Perfect for "fire-and-forget" tasks:</p>
            <ul className="mt-4 text-left space-y-2 text-indigo-300 list-disc list-inside">
              <li>Running hundreds of image variations overnight.</li>
              <li>Training custom LoRA models.</li>
              <li>Generating large-scale upscales or videos.</li>
            </ul>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

const InteractiveWorkflowDesigner: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<'flux' | 'sdxl'>('flux');
  const [fluxConfig, setFluxConfig] = useState<FluxConfig>(defaultFluxConfig);
  const [sdxlConfig, setSdxlConfig] = useState<SdxlConfig>(defaultSdxlConfig);

  const fluxButtonClass = activeWorkflow === 'flux' ? 'bg-fuchsia-500 text-white' : 'bg-slate-700 hover:bg-fuchsia-800';
  const sdxlButtonClass = activeWorkflow === 'sdxl' ? 'bg-cyan-500 text-white' : 'bg-slate-700 hover:bg-cyan-800';

  return (
    <section id="interactive-designer">
      <SectionTitle>Interactive Workflow Designer</SectionTitle>
      <GlassCard>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <div className="flex gap-4">
            <button onClick={() => setActiveWorkflow('flux')} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${fluxButtonClass}`}>
              Precision FLUX Workflow
            </button>
            <button onClick={() => setActiveWorkflow('sdxl')} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${sdxlButtonClass}`}>
              Versatile SDXL Workflow
            </button>
          </div>
          <button 
            onClick={() => activeWorkflow === 'flux' ? setFluxConfig(defaultFluxConfig) : setSdxlConfig(defaultSdxlConfig)}
            className="px-3 py-2 text-xs bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
        <div className="p-4 bg-slate-900/50 rounded-lg">
          {activeWorkflow === 'flux' 
            ? <FluxWorkflowDiagram config={fluxConfig} setConfig={setFluxConfig} />
            : <SdxlWorkflowDiagram config={sdxlConfig} setConfig={setSdxlConfig} />
          }
        </div>
      </GlassCard>
    </section>
  );
};

// Main Page Component
const FluxVsSDXL = React.forwardRef<HTMLElement, {}>((_props, ref) => {
  return (
    <section ref={ref} id="flux-vs-sdxl" className="min-h-screen py-12">
      <div className="bg-[#10101A] text-[#E0E0FF] font-sans antialiased">
        <style>{`
          body { 
            background-color: #10101A; 
            font-family: 'Inter', sans-serif;
          }
        `}</style>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Header />
          <main className="space-y-16">
            <ComparisonTable />
            <HardwareSection />
            <InteractiveWorkflowDesigner />
          </main>
        </div>
      </div>
    </section>
  );
});

FluxVsSDXL.displayName = 'FluxVsSDXL';
export default FluxVsSDXL;
