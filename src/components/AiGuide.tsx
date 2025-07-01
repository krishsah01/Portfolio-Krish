import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const AiGuide = forwardRef<HTMLElement>((_props, ref) => {
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
          
          <main className="text-center">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-indigo-900/50 rounded-xl p-6">
              <h2 className="text-3xl font-bold mb-8 text-white">AI Image Generation Guide</h2>
              <p className="text-indigo-300 mb-4">
                Comprehensive comparison guide for FLUX vs SDXL AI image generation models.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-fuchsia-400 mb-2">FLUX.1</h3>
                  <ul className="text-sm space-y-1">
                    <li>🏆 Superior prompt adherence</li>
                    <li>🏆 Excellent text generation</li>
                    <li>⚡ Slower generation speed</li>
                    <li>📈 8B parameters</li>
                  </ul>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">SDXL</h3>
                  <ul className="text-sm space-y-1">
                    <li>🚀 Fast generation speed</li>
                    <li>🎨 Vast LoRA ecosystem</li>
                    <li>💫 Superior artistic styles</li>
                    <li>🔧 Mature tooling</li>
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </motion.div>
      </div>
    </section>
  );
});

AiGuide.displayName = 'AiGuide';

export default AiGuide;
