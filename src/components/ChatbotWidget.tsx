import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [tempApiKey, setTempApiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini-api-key');
    if (storedKey) {
      setApiKey(storedKey);
      setIsKeySet(true);
    }
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Add welcome message when chat opens and API key is set
  useEffect(() => {
    if (isOpen && isKeySet && messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'model',
        text: "👋 Hello! I'm your AI Art Co-pilot. I specialize in enhancing prompts for FLUX and SDXL image generation.\n\nI can help you with:\n• Creating detailed positive prompts\n• Generating negative prompts\n• Suggesting artistic styles\n• Photography and lighting terms\n• Composition techniques\n\nWhat would you like to create today?",
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, isKeySet, messages.length]);

  const handleKeySave = () => {
    if (tempApiKey.trim()) {
      setApiKey(tempApiKey.trim());
      localStorage.setItem('gemini-api-key', tempApiKey.trim());
      setIsKeySet(true);
      setShowKeyInput(false);
      setTempApiKey('');
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || !isKeySet) return;
    
    const userMessage: Message = { 
      role: 'user', 
      text: input.trim(),
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `You are an expert AI Art Co-pilot specializing in FLUX and SDXL image generation. Your role is to help users create exceptional prompts for AI image generation.

CORE CAPABILITIES:
- Enhance basic prompts into detailed, high-quality prompts
- Generate comprehensive negative prompts
- Suggest artistic styles, photography techniques, and rendering styles
- Provide composition and lighting guidance
- Offer prompt templates for specific use cases

RESPONSE FORMAT:
When enhancing prompts, always provide:
1. **Enhanced Positive Prompt**: A detailed, well-structured prompt
2. **Negative Prompt**: Common unwanted elements to exclude
3. **Style Suggestions**: Relevant artistic or photographic styles
4. **Tips**: Brief technical advice for better results

Be concise but comprehensive. Focus on practical, actionable advice that will improve image generation results.`
      });

      const chat = model.startChat({
        history: messages.slice(1).map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        generationConfig: {
          maxOutputTokens: 1500,
          temperature: 0.8,
          topP: 0.95,
        },
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ],
      });

      const result = await chat.sendMessage(input.trim());
      const response = result.response;
      
      const modelMessage: Message = { 
        role: 'model', 
        text: response.text(),
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, modelMessage]);

    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const errorMessage: Message = { 
        role: 'model', 
        text: "⚠️ Sorry, I encountered an error. Please check your API key and try again. If the problem persists, your API key might be invalid or you may have reached rate limits.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const promptTemplates = [
    { name: "Character Design", prompt: "Create a detailed character design for" },
    { name: "Landscape Scene", prompt: "Generate a stunning landscape of" },
    { name: "Architectural Visualization", prompt: "Design an architectural visualization of" },
    { name: "Product Photography", prompt: "Create professional product photography of" },
    { name: "Digital Art", prompt: "Create digital artwork featuring" }
  ];

  const handleTemplateClick = (template: { name: string; prompt: string }) => {
    setInput(template.prompt + " ");
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Toggle AI Art Co-pilot"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] max-w-lg h-[75vh] max-h-[600px] flex flex-col bg-slate-800/90 backdrop-blur-xl border border-indigo-900/50 rounded-2xl shadow-2xl z-40">
          
          {/* Header */}
          <header className="p-4 border-b border-indigo-900/50 flex justify-between items-center bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-bold text-white">AI Art Co-pilot</h3>
            </div>
            <div className="flex items-center gap-2">
              {isKeySet && (
                <button 
                  onClick={() => setShowKeyInput(true)}
                  className="text-indigo-300 hover:text-white text-sm"
                  title="Change API Key"
                >
                  ⚙️
                </button>
              )}
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-indigo-300 hover:text-white text-xl"
              >
                ×
              </button>
            </div>
          </header>
          
          {/* API Key Setup */}
          {(!isKeySet || showKeyInput) ? (
            <div className="p-6 flex flex-col justify-center items-center h-full text-center space-y-4">
              <div className="text-4xl mb-2">🤖</div>
              <h4 className="font-bold text-white mb-2">Enter Your Gemini API Key</h4>
              <p className="text-xs text-indigo-300 mb-4 max-w-sm">
                You need a Google AI Studio API key to use the AI Art Co-pilot. It's free and takes just a minute to get.
              </p>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-fuchsia-400 hover:text-fuchsia-300 underline mb-4"
              >
                Get your free API key here →
              </a>
              <input
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleKeySave()}
                placeholder="Paste your API key here"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400"
              />
              <div className="flex gap-2 w-full">
                <button 
                  onClick={handleKeySave} 
                  disabled={!tempApiKey.trim()}
                  className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-500 disabled:bg-slate-600 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Save Key
                </button>
                {isKeySet && (
                  <button 
                    onClick={() => setShowKeyInput(false)}
                    className="px-4 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Chat Messages */}
              <div 
                ref={chatContainerRef} 
                className="flex-grow p-4 overflow-y-auto space-y-4"
              >
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-br-md' 
                        : 'bg-slate-700/80 text-indigo-100 rounded-bl-md border border-slate-600/50'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-slate-700/80 text-indigo-100 rounded-bl-md border border-slate-600/50">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Template Buttons */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-indigo-300 mb-2">Quick start templates:</p>
                  <div className="flex flex-wrap gap-2">
                    {promptTemplates.map((template, index) => (
                      <button
                        key={index}
                        onClick={() => handleTemplateClick(template)}
                        className="text-xs bg-slate-700/50 hover:bg-slate-600/50 text-indigo-300 px-2 py-1 rounded-full border border-slate-600/50 transition-colors"
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Input Area */}
              <div className="p-4 border-t border-indigo-900/50 bg-slate-900/50 rounded-b-2xl">
                <div className="flex items-end gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Describe what you want to create..."
                    className="flex-grow bg-slate-700 border border-slate-600 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-400 resize-none max-h-24 min-h-[40px]"
                    rows={1}
                  />
                  <button 
                    onClick={handleSendMessage} 
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-600 text-white rounded-xl p-2 transition-all duration-200 transform hover:scale-105 disabled:transform-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-2 text-center">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
