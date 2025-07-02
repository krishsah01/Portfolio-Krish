import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import ChatbotWidget from './ChatbotWidget';

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
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-700/50">
                  <td className="py-4 font-medium">{row.feature}</td>
                  <td className={`py-4 ${row.fluxClass || 'text-white'}`}>{row.flux}</td>
                  <td className={`py-4 ${row.sdxlClass || 'text-white'}`}>{row.sdxl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </motion.section>
  );
};

const HardwarePerformanceEstimator = ({ selectedGpu, setSelectedGpu }: { 
  selectedGpu: string; 
  setSelectedGpu: (gpu: string) => void; 
}) => {
  const gpuData = [
    { name: "NVIDIA RTX 4090 (24GB)", flux: "4.8", sdxl: "1.2", rating: "Excellent" },
    { name: "NVIDIA RTX 4080 (16GB)", flux: "6.2", sdxl: "1.8", rating: "Very Good" },
    { name: "NVIDIA RTX 4070 Ti (12GB)", flux: "8.5", sdxl: "2.4", rating: "Good" },
    { name: "NVIDIA RTX 4070 (12GB)", flux: "10.1", sdxl: "2.8", rating: "Good" },
    { name: "NVIDIA RTX 3080 (10GB)", flux: "12.3", sdxl: "3.2", rating: "Fair" },
    { name: "NVIDIA RTX 3070 (8GB)", flux: "15.8", sdxl: "4.1", rating: "Limited" },
  ];

  const currentGpu = gpuData.find(gpu => gpu.name === selectedGpu);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      id="hardware"
    >
      <SectionTitle>Hardware Performance Estimator</SectionTitle>
      <div className="grid md:grid-cols-2 gap-8">
        <GlassCard>
          <h3 className="text-xl font-bold mb-4 text-indigo-300">Select Your GPU</h3>
          <select 
            value={selectedGpu} 
            onChange={(e) => setSelectedGpu(e.target.value)}
            className="w-full p-3 bg-slate-900 border border-indigo-700 rounded-lg text-white"
          >
            {gpuData.map((gpu) => (
              <option key={gpu.name} value={gpu.name}>{gpu.name}</option>
            ))}
          </select>
        </GlassCard>
        
        {currentGpu && (
          <GlassCard>
            <h3 className="text-xl font-bold mb-4 text-indigo-300">Performance Estimate</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>FLUX.1 (512×512):</span>
                <span className="text-fuchsia-400 font-bold">{currentGpu.flux}s</span>
              </div>
              <div className="flex justify-between">
                <span>SDXL (1024×1024):</span>
                <span className="text-green-400 font-bold">{currentGpu.sdxl}s</span>
              </div>
              <div className="flex justify-between">
                <span>Overall Rating:</span>
                <span className="text-cyan-400 font-bold">{currentGpu.rating}</span>
              </div>
            </div>
          </GlassCard>
        )}
      </div>
    </motion.section>
  );
};

const AiPoweredTools = () => {
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
      transition={{ duration: 0.6, delay: 0.4 }}
      id="tools"
    >
      <SectionTitle>AI-Powered Tools & Interfaces</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, idx) => (
          <GlassCard key={idx} className="text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 text-indigo-300">{tool.name}</h3>
            <p className="text-sm mb-4">{tool.desc}</p>
            <ul className="space-y-1 mb-4">
              {tool.pros.map((pro, i) => (
                <li key={i} className="text-green-400 text-sm">✓ {pro}</li>
              ))}
            </ul>
            <a 
              href={tool.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 text-sm underline"
            >
              Learn More →
            </a>
          </GlassCard>
        ))}
      </div>
    </motion.section>
  );
};

const WorkflowDecisionTree = () => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.6 }}
    id="decision-tree"
  >
    <SectionTitle>Workflow Decision Tree</SectionTitle>
    <GlassCard>
      <div className="max-w-2xl mx-auto">
        <FlowNode className="bg-indigo-600 text-white">
          <strong>What's your primary use case?</strong>
        </FlowNode>
        <ArrowDown />
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <FlowNode className="bg-fuchsia-600 text-white">
              <strong>Text-Heavy Images</strong><br />
              (Signs, logos, documents)
            </FlowNode>
            <ArrowDown />
            <FlowNode className="bg-green-600 text-white">
              ✅ <strong>Choose FLUX.1</strong><br />
              Superior text generation
            </FlowNode>
          </div>
          
          <div>
            <FlowNode className="bg-cyan-600 text-white">
              <strong>Artistic Images</strong><br />
              (Portraits, landscapes, art)
            </FlowNode>
            <ArrowDown />
            <FlowNode className="bg-green-600 text-white">
              ✅ <strong>Choose SDXL</strong><br />
              Better LoRA ecosystem
            </FlowNode>
          </div>
        </div>
      </div>
    </GlassCard>
  </motion.section>
);

const RecommendedWorkflows = () => {
  const workflows = [
    {
      title: "FLUX.1 Professional Workflow",
      model: "FLUX.1-dev",
      steps: ["Use ComfyUI for workflow control", "Enable fp8 quantization", "Set 20-25 inference steps", "Use CFG scale 1.0"],
      useCase: "High-quality images with text"
    },
    {
      title: "SDXL Speed Workflow", 
      model: "SDXL-Lightning",
      steps: ["Use Automatic1111 WebUI", "Enable xFormers optimization", "Set 4-8 inference steps", "Use DPM++ 2M Karras"],
      useCase: "Fast artistic generation"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.8 }}
      id="workflows"
    >
      <SectionTitle>Recommended Workflows</SectionTitle>
      <div className="grid md:grid-cols-2 gap-8">
        {workflows.map((workflow, idx) => (
          <GlassCard key={idx}>
            <h3 className="text-xl font-bold mb-2 text-indigo-300">{workflow.title}</h3>
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
                <li key={i} className="text-sm flex items-start">
                  <span className="text-fuchsia-400 mr-2">▸</span>
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

const FooterSection = () => (
  <footer className="text-center py-8 mt-16 border-t border-indigo-900/50">
    <p className="text-indigo-300">
      Built for AI artists and developers pushing the boundaries of image generation.
    </p>
  </footer>
);

const AiGuide = forwardRef<HTMLElement>((_props, ref) => {
  const [selectedGpu, setSelectedGpu] = useState("NVIDIA RTX 4090 (24GB)");

  return (
    <section ref={ref} className="bg-[#10101A] text-[#E0E0FF] font-sans antialiased min-h-screen" id="ai-guide">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <header className="text-center my-12">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
              FLUX <span className="text-fuchsia-500">vs</span> SDXL
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-indigo-300">
              The Ultimate Guide to High-Quality Image Generation on Consumer Hardware
            </p>
          </header>
          
          <main className="space-y-16">
            <ComparisonTable />
            <HardwarePerformanceEstimator selectedGpu={selectedGpu} setSelectedGpu={setSelectedGpu} />
            <AiPoweredTools />
            <WorkflowDecisionTree />
            <RecommendedWorkflows />
            <ToolkitSection />
          </main>
        </motion.div>
      </div>
      <FooterSection />
      <ChatbotWidget />
    </section>
  );
});

AiGuide.displayName = 'AiGuide';

export default AiGuide;
