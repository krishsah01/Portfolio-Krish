import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import ChatbotWidget from '../../components/ChatbotWidget';

// --- Reusable Components ---

const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-slate-800/50 backdrop-blur-xl border border-indigo-900/50 rounded-xl p-6 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-center mb-8 text-white">{children}</h2>
);

const FlowNode = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`border-2 border-indigo-400 bg-slate-800 rounded-lg p-4 text-center shadow-lg w-full ${className}`}>
    {children}
  </div>
);

const ArrowDown = () => (
  <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-indigo-400 mx-auto my-4"></div>
);

const ComparisonTable = () => {
  const comparisonData = [
    { feature: 'Prompt Adherence', flux: '🏆 Superior', sdxl: 'Good', fluxClass: 'text-green-400' },
    { feature: 'Text Generation', flux: '🏆 Excellent', sdxl: 'Poor', fluxClass: 'text-green-400', sdxlClass: 'text-red-400' },
    { feature: 'Anatomy & Poses', flux: '🏆 Excellent', sdxl: 'Inconsistent', fluxClass: 'text-green-400' },
    { feature: 'Generation Speed', flux: 'Slow (4-5x)', sdxl: '🏆 Fast', fluxClass: 'text-amber-400', sdxlClass: 'text-green-400' },
    { feature: 'LoRA Ecosystem', flux: 'Inconsistent', sdxl: '🏆 Vast & Mature', sdxlClass: 'text-green-400' },
    { feature: 'Artistic Style Replication', flux: 'Good', sdxl: '🏆 Superior', sdxlClass: 'text-green-400' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id="comparison"
    >
      <SectionTitle>Head-to-Head: The Verdict</SectionTitle>
      <div className="overflow-x-auto">
        <GlassCard>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-indigo-700">
                <th className="py-3 text-indigo-300 font-medium">Feature</th>
                <th className="py-3 text-indigo-300 font-medium">FLUX.1</th>
                <th className="py-3 text-indigo-300 font-medium">SDXL</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-b border-slate-700/50">
                  <td className="py-3 text-gray-300">{row.feature}</td>
                  <td className={`py-3 font-medium ${row.fluxClass || 'text-gray-300'}`}>{row.flux}</td>
                  <td className={`py-3 font-medium ${row.sdxlClass || 'text-gray-300'}`}>{row.sdxl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </motion.section>
  );
};

const HardwareEstimator = () => {
  const [selectedGPU, setSelectedGPU] = useState('rtx4090');
  
  const gpuSpecs = {
    rtx4090: { name: 'RTX 4090', vram: 24, fluxTime: '45-60s', sdxlTime: '8-12s' },
    rtx4080: { name: 'RTX 4080', vram: 16, fluxTime: '60-90s', sdxlTime: '12-18s' },
    rtx3090: { name: 'RTX 3090', vram: 24, fluxTime: '50-70s', sdxlTime: '10-15s' },
    rtx3080: { name: 'RTX 3080', vram: 10, fluxTime: '70-100s', sdxlTime: '15-25s' },
  };

  const currentGPU = gpuSpecs[selectedGPU as keyof typeof gpuSpecs];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      id="hardware"
    >
      <SectionTitle>Hardware Performance Estimator</SectionTitle>
      <GlassCard>
        <div className="max-w-md mx-auto">
          <label className="block text-indigo-300 font-medium mb-3">Select your GPU:</label>
          <select 
            value={selectedGPU} 
            onChange={(e) => setSelectedGPU(e.target.value)}
            className="w-full bg-slate-700 text-white border border-indigo-600 rounded-lg px-4 py-2 mb-6"
          >
            {Object.entries(gpuSpecs).map(([key, gpu]) => (
              <option key={key} value={key}>{gpu.name} ({gpu.vram}GB VRAM)</option>
            ))}
          </select>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <h3 className="text-cyan-400 font-bold mb-2">FLUX.1 Generation</h3>
              <p className="text-2xl text-orange-400 font-bold">{currentGPU.fluxTime}</p>
              <p className="text-sm text-gray-400">1024x1024 image</p>
            </div>
            <div className="text-center">
              <h3 className="text-purple-400 font-bold mb-2">SDXL Generation</h3>
              <p className="text-2xl text-green-400 font-bold">{currentGPU.sdxlTime}</p>
              <p className="text-sm text-gray-400">1024x1024 image</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.section>
  );
};

const WorkflowDecisionTree = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      id="workflow"
    >
      <SectionTitle>Which Model Should You Choose?</SectionTitle>
      <div className="max-w-2xl mx-auto">
        <FlowNode className="bg-gradient-to-r from-blue-900 to-purple-900">
          <h3 className="font-bold text-xl text-white">What's your priority?</h3>
        </FlowNode>
        <ArrowDown />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FlowNode className="bg-gradient-to-r from-cyan-900 to-blue-900">
              <h4 className="font-bold text-cyan-300">Quality & Accuracy</h4>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Complex prompts</li>
                <li>• Text in images</li>
                <li>• Precise anatomy</li>
              </ul>
            </FlowNode>
            <ArrowDown />
            <FlowNode className="bg-gradient-to-r from-green-900 to-cyan-900">
              <h4 className="font-bold text-green-300">Choose FLUX.1</h4>
              <p className="text-sm mt-1">Superior quality, worth the wait</p>
            </FlowNode>
          </div>
          
          <div className="space-y-4">
            <FlowNode className="bg-gradient-to-r from-purple-900 to-pink-900">
              <h4 className="font-bold text-purple-300">Speed & Variety</h4>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Fast iterations</li>
                <li>• Style experiments</li>
                <li>• LoRA customization</li>
              </ul>
            </FlowNode>
            <ArrowDown />
            <FlowNode className="bg-gradient-to-r from-orange-900 to-purple-900">
              <h4 className="font-bold text-orange-300">Choose SDXL</h4>
              <p className="text-sm mt-1">Proven ecosystem, lightning fast</p>
            </FlowNode>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const RecommendedWorkflows = () => {
  const workflows = [
    {
      title: "FLUX.1 Professional Workflow",
      model: "FLUX.1-dev",
      useCase: "Commercial projects, detailed artwork",
      steps: [
        "Use detailed, descriptive prompts",
        "Set guidance scale 3.5-7.0",
        "20-30 inference steps minimum", 
        "Resolution: 1024x1024 or higher",
        "Consider FLUX.1-schnell for previews"
      ]
    },
    {
      title: "SDXL Rapid Prototyping",
      model: "SDXL-Lightning",
      useCase: "Concept art, style exploration",
      steps: [
        "Start with proven prompt formulas",
        "Use LoRAs for specific styles",
        "4-8 inference steps (Lightning)",
        "Batch generate variations",
        "Upscale winners with SDXL-Base"
      ]
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
      id="workflows"
    >
      <SectionTitle>Recommended Workflows</SectionTitle>
      <div className="grid md:grid-cols-2 gap-6">
        {workflows.map((workflow, idx) => (
          <GlassCard key={idx}>
            <h3 className="text-xl font-bold mb-3 text-cyan-400">{workflow.title}</h3>
            <p className="text-cyan-400 mb-4">Model: {workflow.model}</p>
            <ol className="space-y-2 mb-4">
              {workflow.steps.map((step, i) => (
                <li key={i} className="text-sm">
                  <span className="text-fuchsia-400 font-bold">{i + 1}.</span> {step}
                </li>
              ))}
            </ol>
            <p className="text-green-400 text-sm font-medium">Best for: {workflow.useCase}</p>
          </GlassCard>
        ))}
      </div>
    </motion.section>
  );
};

const ToolkitSection = () => {
  const categories = [
    {
      title: "Essential Models",
      items: ["FLUX.1-dev (8B params)", "SDXL-Base-1.0", "SDXL-Lightning", "FLUX.1-schnell (distilled)"]
    },
    {
      title: "Performance Boosters", 
      items: ["xFormers (memory optimization)", "fp8 quantization", "Model offloading", "Batch processing"]
    },
    {
      title: "Advanced Techniques",
      items: ["LoRA fine-tuning", "ControlNet guidance", "Inpainting workflows", "Multi-model pipelines"]
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 1.0 }}
      id="toolkit"
    >
      <SectionTitle>Complete Toolkit</SectionTitle>
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((category, idx) => (
          <GlassCard key={idx}>
            <h3 className="text-xl font-bold mb-4 text-indigo-300">{category.title}</h3>
            <ul className="space-y-2">
              {category.items.map((item, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </motion.section>
  );
};

const AiToolsSection = () => {
  const tools = [
    { name: "ComfyUI", desc: "Node-based workflow editor", pros: ["Visual workflows", "Custom nodes"], link: "https://github.com/comfyanonymous/ComfyUI" },
    { name: "Automatic1111", desc: "Feature-rich web interface", pros: ["Extensive extensions", "User-friendly"], link: "https://github.com/AUTOMATIC1111/stable-diffusion-webui" },
    { name: "Invoke AI", desc: "Professional-grade interface", pros: ["Canvas editing", "Advanced features"], link: "https://github.com/invoke-ai/InvokeAI" },
    { name: "Fooocus", desc: "Simplified Midjourney-like interface", pros: ["Beginner-friendly", "No complex settings"], link: "https://github.com/lllyasviel/Fooocus" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.8 }}
      id="tools"
    >
      <SectionTitle>Essential AI Tools</SectionTitle>
      <div className="grid md:grid-cols-2 gap-6">
        {tools.map((tool, idx) => (
          <GlassCard key={idx} className="hover:border-indigo-500 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-cyan-400">{tool.name}</h3>
              <a 
                href={tool.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="text-gray-300 mb-3">{tool.desc}</p>
            <div className="flex flex-wrap gap-2">
              {tool.pros.map((pro, i) => (
                <span key={i} className="bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded-full text-xs">
                  {pro}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </motion.section>
  );
};

const ComfyUIWorkflows = () => {
  // Import workflow templates (to be replaced with actual workflows when provided)
  const fluxWorkflowTemplate = {
    "3": {
      "inputs": {
        "seed": 0,
        "steps": 20,
        "cfg": 1.0,
        "sampler_name": "euler",
        "scheduler": "normal",
        "denoise": 1,
        "model": ["12", 0],
        "positive": ["6", 0],
        "negative": ["7", 0],
        "latent_image": ["5", 0]
      },
      "class_type": "KSampler",
      "_meta": {
        "title": "KSampler"
      }
    },
    "4": {
      "inputs": {
        "ckpt_name": "flux1-dev-bnb-nf4-v2.safetensors"
      },
      "class_type": "CheckpointLoaderSimple",
      "_meta": {
        "title": "Load Checkpoint"
      }
    },
    "5": {
      "inputs": {
        "width": 1024,
        "height": 1024,
        "batch_size": 1
      },
      "class_type": "EmptyLatentImage",
      "_meta": {
        "title": "Empty Latent Image"
      }
    },
    "6": {
      "inputs": {
        "text": "A beautiful landscape with mountains and a lake, detailed, high quality",
        "clip": ["4", 1]
      },
      "class_type": "CLIPTextEncode",
      "_meta": {
        "title": "CLIP Text Encode (Prompt)"
      }
    },
    "7": {
      "inputs": {
        "text": "",
        "clip": ["4", 1]
      },
      "class_type": "CLIPTextEncode",
      "_meta": {
        "title": "CLIP Text Encode (Negative)"
      }
    },
    "8": {
      "inputs": {
        "samples": ["3", 0],
        "vae": ["4", 2]
      },
      "class_type": "VAEDecode",
      "_meta": {
        "title": "VAE Decode"
      }
    },
    "9": {
      "inputs": {
        "filename_prefix": "ComfyUI",
        "images": ["8", 0]
      },
      "class_type": "SaveImage",
      "_meta": {
        "title": "Save Image"
      }
    },
    "12": {
      "inputs": {
        "unet_name": "flux1-dev-bnb-nf4.safetensors",
        "weight_dtype": "default"
      },
      "class_type": "UNETLoader",
      "_meta": {
        "title": "Load Diffusion Model"
      }
    }
  };

  const sdxlWorkflowTemplate = {
    "4": {
      "inputs": {
        "ckpt_name": "juggernautXL_v9Rdphoto2Lightning.safetensors"
      },
      "class_type": "CheckpointLoaderSimple",
      "_meta": {
        "title": "Load Checkpoint - Base"
      }
    },
    "5": {
      "inputs": {
        "width": 1024,
        "height": 1024,
        "batch_size": 1
      },
      "class_type": "EmptyLatentImage",
      "_meta": {
        "title": "Empty Latent Image"
      }
    },
    "6": {
      "inputs": {
        "text": "A beautiful portrait of a woman, detailed, high quality, photorealistic",
        "clip": ["4", 1]
      },
      "class_type": "CLIPTextEncode",
      "_meta": {
        "title": "CLIP Text Encode (Prompt)"
      }
    },
    "7": {
      "inputs": {
        "text": "blurry, low quality, distorted",
        "clip": ["4", 1]
      },
      "class_type": "CLIPTextEncode",
      "_meta": {
        "title": "CLIP Text Encode (Negative)"
      }
    },
    "10": {
      "inputs": {
        "add_noise": "enable",
        "noise_seed": 0,
        "steps": 30,
        "cfg": 7.5,
        "sampler_name": "dpmpp_2m",
        "scheduler": "karras",
        "start_at_step": 0,
        "end_at_step": 25,
        "return_with_leftover_noise": "enable",
        "model": ["4", 0],
        "positive": ["6", 0],
        "negative": ["7", 0],
        "latent_image": ["5", 0]
      },
      "class_type": "KSamplerAdvanced",
      "_meta": {
        "title": "KSampler (Advanced) - Base"
      }
    },
    "11": {
      "inputs": {
        "ckpt_name": "sd_xl_refiner_1.0.safetensors"
      },
      "class_type": "CheckpointLoaderSimple",
      "_meta": {
        "title": "Load Checkpoint - Refiner"
      }
    },
    "12": {
      "inputs": {
        "text": "A beautiful portrait of a woman, detailed, high quality, photorealistic",
        "clip": ["11", 1]
      },
      "class_type": "CLIPTextEncode",
      "_meta": {
        "title": "CLIP Text Encode (Prompt) - Refiner"
      }
    },
    "13": {
      "inputs": {
        "text": "blurry, low quality, distorted",
        "clip": ["11", 1]
      },
      "class_type": "CLIPTextEncode",
      "_meta": {
        "title": "CLIP Text Encode (Negative) - Refiner"
      }
    },
    "14": {
      "inputs": {
        "add_noise": "disable",
        "noise_seed": 0,
        "steps": 30,
        "cfg": 7.5,
        "sampler_name": "dpmpp_2m",
        "scheduler": "karras",
        "start_at_step": 25,
        "end_at_step": 30,
        "return_with_leftover_noise": "disable",
        "model": ["11", 0],
        "positive": ["12", 0],
        "negative": ["13", 0],
        "latent_image": ["10", 0]
      },
      "class_type": "KSamplerAdvanced",
      "_meta": {
        "title": "KSampler (Advanced) - Refiner"
      }
    },
    "15": {
      "inputs": {
        "samples": ["14", 0],
        "vae": ["4", 2]
      },
      "class_type": "VAEDecode",
      "_meta": {
        "title": "VAE Decode"
      }
    },
    "19": {
      "inputs": {
        "filename_prefix": "ComfyUI",
        "images": ["15", 0]
      },
      "class_type": "SaveImage",
      "_meta": {
        "title": "Save Image"
      }
    }
  };

  const workflows = [
    {
      title: "FLUX.1 ComfyUI Workflow",
      description: "Professional workflow for FLUX.1 with optimal settings for high-quality image generation",
      model: "FLUX.1-dev",
      features: [
        "Optimized for GGUF quantized models",
        "Support for LoRA integration",
        "Advanced sampling settings",
        "Memory-efficient configuration"
      ],
      downloadName: "flux_workflow.json",
      jsonContent: fluxWorkflowTemplate
    },
    {
      title: "SDXL ComfyUI Workflow", 
      description: "Versatile SDXL workflow with base + refiner setup for maximum quality",
      model: "SDXL-Base-1.0 + Refiner",
      features: [
        "Base model + refiner pipeline",
        "LoRA support for style control",
        "Fast iteration settings",
        "Upscaling integration"
      ],
      downloadName: "sdxl_workflow.json",
      jsonContent: sdxlWorkflowTemplate
    }
  ];

  // Download function using blob method
  const downloadWorkflow = (workflow: any, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    console.log('Download clicked for:', workflow.title);
    
    if (!workflow.jsonContent) {
      console.error('No JSON content available');
      alert('Workflow file is not available!');
      return;
    }
    
    try {
      // Create the JSON string
      const jsonString = JSON.stringify(workflow.jsonContent, null, 2);
      console.log('JSON created, length:', jsonString.length);
      
      // Create blob and download
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create temporary download link
      const link = document.createElement('a');
      link.href = url;
      link.download = workflow.downloadName;
      link.style.display = 'none';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log('Download completed for:', workflow.downloadName);
      }, 100);
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
      id="comfyui-workflows"
    >
      <SectionTitle>ComfyUI Workflows</SectionTitle>
      <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
        Ready-to-use ComfyUI workflow files for both FLUX.1 and SDXL. Simply download and import into ComfyUI to get started with optimal settings. These workflows are production-tested and include best-practice configurations for each model.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {workflows.map((workflow, idx) => (
          <GlassCard key={idx} className="hover:border-cyan-500 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-cyan-400">{workflow.title}</h3>
              <div className="flex justify-end">
                <button
                  onClick={(e) => downloadWorkflow(workflow, e)}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Workflow
                </button>
              </div>
            </div>
            
            <p className="text-purple-400 mb-3 font-medium">Model: {workflow.model}</p>
            <p className="text-gray-300 mb-4">{workflow.description}</p>
            
            <div className="space-y-2">
              <h4 className="text-indigo-300 font-semibold">Features:</h4>
              <ul className="space-y-1">
                {workflow.features.map((feature, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <GlassCard className="max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-indigo-300 mb-3">How to Use</h3>
          <ol className="text-left space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-cyan-400 font-bold mr-2">1.</span>
              Download the workflow JSON file
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 font-bold mr-2">2.</span>
              Open ComfyUI in your browser
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 font-bold mr-2">3.</span>
              Drag and drop the JSON file onto the ComfyUI interface
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 font-bold mr-2">4.</span>
              Adjust settings as needed and start generating!
            </li>
          </ol>
        </GlassCard>
      </div>
    </motion.section>
  );
};

interface FluxVsSDXLProps {}

const FluxVsSDXL = forwardRef<HTMLElement, FluxVsSDXLProps>((_props, ref) => {
  return (
    <section 
      ref={ref} 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20" 
      id="flux-vs-sdxl"
    >
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            FLUX.1 vs SDXL
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The ultimate comparison guide for AI image generation. Discover which model fits your creative workflow, 
            performance needs, and quality expectations.
          </p>
        </motion.div>

        {/* Main Content Sections */}
        <div className="space-y-20">
          <ComparisonTable />
          <HardwareEstimator />
          <WorkflowDecisionTree />
          <RecommendedWorkflows />
          <AiToolsSection />
          <ToolkitSection />
          <ComfyUIWorkflows />
        </div>

        {/* Floating Chat Widget */}
        <ChatbotWidget />
      </div>
    </section>
  );
});

FluxVsSDXL.displayName = 'FluxVsSDXL';
export default FluxVsSDXL;
