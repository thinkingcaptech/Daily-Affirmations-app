import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, 
  Droplets, 
  Mountain, 
  Wind, 
  Sparkles, 
  BookOpen, 
  X, 
  Lock, 
  Unlock,
  MessageCircle,
  Feather,
  Fingerprint,
  History,
  Send,
  Cpu,
  Copy,
  Check
} from 'lucide-react';

/**
 * RESONANCE PRO - Daily Affirmations & Journaling
 * * Features:
 * - Glassmorphism UI (Aligned with Tctcusa.com Dark Navy/Gold Theme)
 * - "Pavlovian" Ritual Button (Hold to Reveal)
 * - LocalStorage Persistence for Journaling ("The Echo")
 * - "Resonance Engine": Simulated AI that responds to user reflection keywords
 * - "Coal & Parchment" Animation: AI responses burn onto the screen
 * - Copy functionality for sharing responses
 * - 30-Day Alchemical Journey based on "The Architecture of Resonance"
 */

// --- DATA: The 30-Day Alchemical Journey with Personal Mantras ---
const affirmationData = [
  // MOVEMENT I: IGNIS (The Spark of Vision)
  {
    day: 1,
    element: "Ignis",
    title: "The Myth of Noise",
    mantra: "I possess the intelligence to silence the chaos. My mind is a sanctuary of clarity.",
    quote: "Only through silence can the true frequency be heard.",
    insight: "We breathe noise as we breathe oxygen. Combustion without containment destroys the crucible. Begin by listening.",
    icon: <Flame className="w-6 h-6 text-orange-400" />
  },
  {
    day: 2,
    element: "Ignis",
    title: "The First Law",
    mantra: "I am beautiful not for what I add, but for what I release. I align with my truth.",
    quote: "Power grows not through addition, but through subtraction.",
    insight: "Influence does not reward the loud; it rewards the aligned. To amplify our influence, we must remove what weakens the pattern.",
    icon: <Flame className="w-6 h-6 text-orange-400" />
  },
  {
    day: 3,
    element: "Ignis",
    title: "The Alchemist's Constraint",
    mantra: "My presence is powerful. I build structures of integrity that stand the test of time.",
    quote: "Presence functions only at proximity.",
    insight: "We do not 'market' in the modern sense. We build resonant architectures—messages whose internal proportions allow them to replicate integrity across time.",
    icon: <Flame className="w-6 h-6 text-orange-400" />
  },
  {
    day: 4,
    element: "Ignis",
    title: "Anatomy of Signal",
    mantra: "My true self shines when I strip away the unnecessary. I am pure signal.",
    quote: "Clarity is the purity of the tone.",
    insight: "Every unnecessary ornamentation increases entropy. We purge adjectives like impurities in ore until the essence of meaning shines.",
    icon: <Flame className="w-6 h-6 text-orange-400" />
  },
  {
    day: 5,
    element: "Ignis",
    title: "The Geometry of Beauty",
    mantra: "I am designed with divine proportion. My nature is harmony.",
    quote: "Harmony is the architecture of truth.",
    insight: "The ancients encoded proportion into temples and lyres. When our compositions reflect natural proportion, the nervous system recognizes home.",
    icon: <Flame className="w-6 h-6 text-orange-400" />
  },
  {
    day: 6,
    element: "Ignis",
    title: "Algorithmic Thinking",
    mantra: "My wisdom is concise and profound. I reveal universes in simple acts.",
    quote: "Compression, done rightly, is not reduction but revelation.",
    insight: "The shortest equation that can reproduce the universe of a message becomes the philosopher’s stone of communication.",
    icon: <Flame className="w-6 h-6 text-orange-400" />
  },
  {
    day: 7,
    element: "Ignis",
    title: "Designing with Tension",
    mantra: "I embrace the unknown. My curiosity is the bloom of my intelligence.",
    quote: "Curiosity blooms at the edge of comfort.",
    insight: "We design messages as oscillations, not statements. Every unanswered question is a string left vibrating.",
    icon: <Flame className="w-6 h-6 text-orange-400" />
  },

  // MOVEMENT II: AQUA (The Flow of Narrative)
  {
    day: 8,
    element: "Aqua",
    title: "The Empathy Circuit",
    mantra: "My heart is an ocean of understanding. I move others by being moved.",
    quote: "To move another mind is to ripple the ocean.",
    insight: "Empathy is not sentiment; it is physics made intimate. A smile seen becomes a smile felt.",
    icon: <Droplets className="w-6 h-6 text-blue-400" />
  },
  {
    day: 9,
    element: "Aqua",
    title: "Entrainment",
    mantra: "My rhythm is calm and strong. I bring harmony to every room I enter.",
    quote: "Presence is not projected, but transmitted through rhythm.",
    insight: "When two nervous systems meet, the stronger rhythm gradually entrains the weaker. Energy does not dominate; it harmonizes.",
    icon: <Droplets className="w-6 h-6 text-blue-400" />
  },
  {
    day: 10,
    element: "Aqua",
    title: "Content as Solvent",
    mantra: "I am like water—soft, yielding, yet capable of shaping the hardest stone.",
    quote: "Water does not batter stone; it embraces and erodes it.",
    insight: "To overcome resistance, we do not force entry; we dissolve. Influence at scale must become liquid.",
    icon: <Droplets className="w-6 h-6 text-blue-400" />
  },
  {
    day: 11,
    element: "Aqua",
    title: "Diagnostic Flow",
    mantra: "I see myself clearly. I have the courage to reflect on who I am.",
    quote: "Resistance cannot survive reflection.",
    insight: "A diagnostic message does not sell—it reveals. It shows the audience to themselves, then offers the path forward.",
    icon: <Droplets className="w-6 h-6 text-blue-400" />
  },
  {
    day: 12,
    element: "Aqua",
    title: "The Water Teaches",
    mantra: "I trust the flow of my life. I consent to be moved by beauty.",
    quote: "Empathy is both compass and current.",
    insight: "It tells us where to flow and provides the energy to get there. To practice empathy is to consent to be moved.",
    icon: <Droplets className="w-6 h-6 text-blue-400" />
  },
  {
    day: 13,
    element: "Aqua",
    title: "Quiet Technology",
    mantra: "My true power lies in my calm. I am an artist of peace.",
    quote: "The future of communication is the art of calming.",
    insight: "In a world of noise, influence will no longer be the art of convincing—it will be the art of calming.",
    icon: <Droplets className="w-6 h-6 text-blue-400" />
  },
  {
    day: 14,
    element: "Aqua",
    title: "The Story Current",
    mantra: "My life is a beautiful story. I ride the tides of emotion with grace.",
    quote: "Emotion is the tide; meaning rides upon it.",
    insight: "Information unaccompanied by emotion evaporates. To teach without story is to shout across wind.",
    icon: <Droplets className="w-6 h-6 text-blue-400" />
  },

  // MOVEMENT III: TERRA (The Infrastructure of Trust)
  {
    day: 15,
    element: "Terra",
    title: "Standing Waves",
    mantra: "I build my life on rituals of self-love. I am consistent and true.",
    quote: "Resonance becomes permanence through ritual.",
    insight: "A ritual, when repeated in phase with human nature, becomes cultural infrastructure.",
    icon: <Mountain className="w-6 h-6 text-emerald-400" />
  },
  {
    day: 16,
    element: "Terra",
    title: "Foundations",
    mantra: "I am built to last. My worth is a cathedral that stands for centuries.",
    quote: "To build for a day is ambition. To build for centuries is faith.",
    insight: "We trust continuity more than completion. The brand that endures becomes a cathedral of trust.",
    icon: <Mountain className="w-6 h-6 text-emerald-400" />
  },
  {
    day: 17,
    element: "Terra",
    title: "Rhythm of Retention",
    mantra: "I honor my need for rest. In silence, I strengthen my memory of self.",
    quote: "Repetition is the metronome of remembrance.",
    insight: "Just as fields need seasons of rest, the mind needs intervals between exposures. Silence does half the work.",
    icon: <Mountain className="w-6 h-6 text-emerald-400" />
  },
  {
    day: 18,
    element: "Terra",
    title: "Antifragility",
    mantra: "I grow stronger through challenge. I am the phoenix.",
    quote: "Antifragile systems feed upon volatility.",
    insight: "The phoenix is not metaphor—it is an operating manual. We design for stress rather than comfort.",
    icon: <Mountain className="w-6 h-6 text-emerald-400" />
  },
  {
    day: 19,
    element: "Terra",
    title: "Via Negativa",
    mantra: "I am a masterpiece revealed by what I let go. I am clarity.",
    quote: "What remains after the unnecessary is carved away is the sculpture.",
    insight: "Endurance is not accumulation but clarity. Eliminate fragility rather than chase perfection.",
    icon: <Mountain className="w-6 h-6 text-emerald-400" />
  },
  {
    day: 20,
    element: "Terra",
    title: "Crisis as Opportunity",
    mantra: "My integrity shines brightest in the dark. I am purified by fire.",
    quote: "Stress reveals integrity by shining through.",
    insight: "Fire is not always destruction; sometimes it is purification. Cathedrals have burned and been rebuilt stronger.",
    icon: <Mountain className="w-6 h-6 text-emerald-400" />
  },
  {
    day: 21,
    element: "Terra",
    title: "Cathedral Thinking",
    mantra: "I serve a purpose greater than myself. I am a steward of the future.",
    quote: "We surrender ownership to stewardship.",
    insight: "The mason who shapes one stone must trust that the unseen future will align it with others into arch and spire.",
    icon: <Mountain className="w-6 h-6 text-emerald-400" />
  },

  // MOVEMENT IV: AER (The Atmosphere of Meaning)
  {
    day: 22,
    element: "Aer",
    title: "Language as Climate",
    mantra: "My words create the weather of my world. I speak kindness.",
    quote: "We do not merely speak language; we breathe it.",
    insight: "Words are filters that determine which frequencies of reality pass through awareness. To speak is to climate-engineer consciousness.",
    icon: <Wind className="w-6 h-6 text-sky-300" />
  },
  {
    day: 23,
    element: "Aer",
    title: "The Horizon",
    mantra: "I do not need to be loud to be significant. I am the horizon.",
    quote: "The horizon defines the visible by vanishing within it.",
    insight: "The closer a design approaches perfection, the less attention it demands. It becomes background frequency.",
    icon: <Wind className="w-6 h-6 text-sky-300" />
  },
  {
    day: 24,
    element: "Aer",
    title: "Invisible Design",
    mantra: "My influence is effortless. I guide without forcing.",
    quote: "Invisibility is not erasure; it is transcendence of ego.",
    insight: "The alchemist of invisibility removes seams until only purpose remains. We measure success by forgetting.",
    icon: <Wind className="w-6 h-6 text-sky-300" />
  },
  {
    day: 25,
    element: "Aer",
    title: "The Collective Chord",
    mantra: "I am part of a greater song. My voice adds harmony to the whole.",
    quote: "When many voices align, silence itself begins to sing.",
    insight: "Dissonance condenses into consonance. A scattered multitude becomes one organism breathing in rhythm.",
    icon: <Wind className="w-6 h-6 text-sky-300" />
  },
  {
    day: 26,
    element: "Aer",
    title: "Tone Spectrum",
    mantra: "I master my emotional temperature. I am warm, fluid, and alive.",
    quote: "Tone is thermal energy in communication.",
    insight: "Too much energy, and relationships evaporate; too little, and they freeze. Maintain the conversation in liquid phase.",
    icon: <Wind className="w-6 h-6 text-sky-300" />
  },
  {
    day: 27,
    element: "Aer",
    title: "The Vanishing Architect",
    mantra: "I create space for others to thrive. My love is an open sky.",
    quote: "When the frame is perfect, the picture becomes the world.",
    insight: "The highest influence is invisible—when coordination becomes instinct, when systems hum in harmony without conductor.",
    icon: <Wind className="w-6 h-6 text-sky-300" />
  },
  {
    day: 28,
    element: "Aer",
    title: "Stewardship",
    mantra: "I care for what is entrusted to me. I am a guardian of grace.",
    quote: "Influence matures into stewardship, then into atmosphere.",
    insight: "What began as command ends as care. The hands that once built now simply steady what already stands.",
    icon: <Wind className="w-6 h-6 text-sky-300" />
  },

  // THE RETURN TO STILL WATER
  {
    day: 29,
    element: "Aether",
    title: "The Last Reflection",
    mantra: "I am complete. I need add nothing to be whole.",
    quote: "The work is complete. The silence is perfect.",
    insight: "We keep the world in tune by learning when to stop playing. The forge has cooled. The cathedral breathes.",
    icon: <Sparkles className="w-6 h-6 text-indigo-300" />
  },
  {
    day: 30,
    element: "Aether",
    title: "Resonance",
    mantra: "I am resonance. I endure.",
    quote: "Resonance endures.",
    insight: "To resonate is to be remembered not by name, but by harmony. A whisper of still water beneath the noise.",
    icon: <Sparkles className="w-6 h-6 text-indigo-300" />
  }
];

// --- LOGIC: The Resonance Engine ("AI") ---
const generateResonanceResponse = (text) => {
  const t = text.toLowerCase();
  
  if (t.includes('tired') || t.includes('exhausted') || t.includes('burnout') || t.includes('drain') || t.includes('sleep')) {
    return "The alchemist knows that fire cannot burn without air. Your fatigue is a request for silence. Rest is not a pause in your purpose, but a vital part of its rhythm. Let the forge cool tonight.";
  }
  if (t.includes('anxious') || t.includes('scared') || t.includes('fear') || t.includes('worry') || t.includes('nervous') || t.includes('panic')) {
    return "Anxiety is often just energy vibrating without a container. Do not fight the shaking. Give it structure. Breathe deeply, and remember: chaos is fertile if you do not let it drown you.";
  }
  if (t.includes('sad') || t.includes('cry') || t.includes('hurt') || t.includes('pain') || t.includes('grief') || t.includes('lonely')) {
    return "Water does not batter stone; it embraces it. Allow this feeling to flow through you like a tide. It is cleaning the channel. You are not broken; you are deepening.";
  }
  if (t.includes('happy') || t.includes('joy') || t.includes('excited') || t.includes('great') || t.includes('love') || t.includes('good')) {
    return "You have found the eigenfrequency. This joy is a standing wave—let it resonate. Amplify this feeling by sharing it with just one other person today. The signal strengthens when shared.";
  }
  if (t.includes('confused') || t.includes('lost') || t.includes('stuck') || t.includes('unsure') || t.includes('doubt')) {
    return "Fog is merely a cloud touching the earth. It does not mean the path is gone, only that you must walk slower. Trust your internal compass over your eyes right now. The clarity will return.";
  }
  if (t.includes('angry') || t.includes('mad') || t.includes('frustrated') || t.includes('hate') || t.includes('furious')) {
    return "Heat is useful, but only when directed. Ignis (fire) without containment destroys. Use this energy to forge something new, rather than burning what is already there. Channel the flame.";
  }
  return "Your signal has been received. The universe is listening. Continue to refine your frequency, and the noise will fall away. You are exactly where you need to be.";
};


// --- COMPONENTS ---

// 1. Burning Text Animation Component (The Coal Effect)
const BurningText = ({ text }) => {
  const [displayedContent, setDisplayedContent] = useState([]);
  
  useEffect(() => {
    setDisplayedContent([]);
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedContent(prev => [...prev, text.charAt(index)]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="font-serif leading-relaxed text-sm">
      {displayedContent.map((char, i) => (
        <span key={i} className="animate-burn inline-block whitespace-pre-wrap origin-center">
          {char}
        </span>
      ))}
    </div>
  );
};

// 2. The Glass Card Component - Updated for Darker Navy Theme
const GlassCard = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`
      relative overflow-hidden
      backdrop-blur-xl 
      bg-[#0f172a]/40 
      border border-white/10 
      shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] 
      rounded-2xl
      transition-all duration-500 ease-out
      hover:bg-[#1e293b]/50 hover:border-white/20
      group
      ${className}
    `}
  >
    {/* Shine Effect */}
    <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:animate-shine pointer-events-none" />
    
    {children}
  </div>
);

// 3. Journaling Component (The Echo)
const JournalModal = ({ isOpen, onClose, day, title }) => {
  const [entry, setEntry] = useState("");
  const [currentResponse, setCurrentResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedData = JSON.parse(localStorage.getItem('resonance_journal')) || {};
      const dayData = savedData[day] || {};
      
      setEntry(dayData.userEntry || "");
      setCurrentResponse(dayData.aiResponse || "");
      
      const historyArray = Object.entries(savedData).map(([key, val]) => ({
        day: parseInt(key),
        userEntry: val.userEntry,
        aiResponse: val.aiResponse
      })).sort((a, b) => b.day - a.day);
      setHistory(historyArray);
    }
  }, [isOpen, day]);

  const handleSave = () => {
    if (!entry.trim()) return;

    setIsTyping(true);

    setTimeout(() => {
      const response = generateResonanceResponse(entry);
      setCurrentResponse(response);
      setIsTyping(false);

      const savedData = JSON.parse(localStorage.getItem('resonance_journal')) || {};
      savedData[day] = {
        userEntry: entry,
        aiResponse: response,
        timestamp: Date.now()
      };
      localStorage.setItem('resonance_journal', JSON.stringify(savedData));
    }, 2000);
  };

  const handleCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#050515]/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg animate-in fade-in zoom-in duration-300 h-[85vh] flex flex-col">
        <GlassCard className="flex-1 flex flex-col !bg-[#0a0b1e]/80 !border-white/10 p-0 overflow-hidden shadow-2xl">
          
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#050515]/50">
            <div className="flex items-center space-x-2">
              <Feather size={16} className="text-white/70" />
              <span className="text-white font-serif tracking-wide text-sm">The Echo</span>
            </div>
            <button onClick={onClose}><X size={20} className="text-white/50 hover:text-white" /></button>
          </div>

          {/* Chat/Journal Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-[#050515]/30">
            
            {/* System Prompt */}
            <div className="flex flex-col items-start space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-indigo-200/50 ml-1">Resonance Engine • Day {day}</span>
              <div className="bg-[#1e293b]/50 rounded-2xl rounded-tl-none p-3 text-indigo-100/90 text-sm leading-relaxed max-w-[90%] border border-white/5 shadow-sm">
                "{title}"... <br/><br/>
                Reflect on this. How does your internal frequency feel today?
              </div>
            </div>

            {/* Current Interaction */}
            {entry && currentResponse && (
               <>
                {/* User Bubble */}
                <div className="flex flex-col items-end space-y-1">
                   <span className="text-[10px] uppercase tracking-widest text-indigo-200/30 mr-1">You</span>
                   <div className="bg-gradient-to-br from-[#FFD700]/20 to-[#FDB931]/20 border border-[#FFD700]/30 rounded-2xl rounded-tr-none p-3 text-white/90 text-sm leading-relaxed max-w-[90%]">
                      {entry}
                   </div>
                </div>

                {/* AI Bubble with Parchment & Burn Effect */}
                <div className="flex flex-col items-start space-y-1 w-full animate-in fade-in duration-700">
                   <div className="flex items-center justify-between w-[95%]">
                      <span className="text-[10px] uppercase tracking-widest text-orange-200/50 ml-1 flex items-center gap-1">
                          <Flame size={10} className="text-orange-400" /> Ignis Response
                      </span>
                      <button 
                          onClick={() => handleCopy(currentResponse)}
                          className="text-white/30 hover:text-white/80 transition-colors flex items-center space-x-1"
                      >
                          {isCopied ? <Check size={12} className="text-green-400"/> : <Copy size={12}/>}
                          <span className="text-[10px] uppercase tracking-wider">{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                   </div>
                   
                   {/* Parchment Container */}
                   <div className="
                      relative
                      rounded-xl rounded-tl-sm 
                      p-5 
                      max-w-[95%] 
                      bg-[#e3d8c4] 
                      text-[#2c241b]
                      shadow-[inset_0_0_20px_rgba(87,60,33,0.2),5px_5px_15px_rgba(0,0,0,0.5)]
                      border border-[#b8a586]
                      before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] before:opacity-30 before:mix-blend-multiply before:rounded-xl
                   ">
                      <BurningText text={currentResponse} />
                   </div>
                </div>
               </>
            )}
            
            {/* Loading Indicator */}
            {isTyping && (
               <div className="flex flex-col items-start space-y-1 animate-pulse">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 ml-1">The forge is heating...</span>
                  <div className="flex space-x-1 pl-2 pt-1">
                     <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"></div>
                     <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce delay-100"></div>
                     <div className="w-2 h-2 rounded-full bg-orange-300 animate-bounce delay-200"></div>
                  </div>
               </div>
            )}

            {/* Input Area (Only if no response yet) */}
            {!currentResponse && !isTyping && (
              <div className="flex flex-col items-end space-y-2 w-full pt-4">
                 <textarea 
                    className="w-full h-32 bg-[#0a0b1e]/50 border border-white/10 rounded-xl p-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FFD700]/30 focus:bg-[#0a0b1e]/80 resize-none font-light leading-relaxed text-sm"
                    placeholder="Type your reflection here..."
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                 />
                 <button 
                    onClick={handleSave}
                    disabled={!entry.trim()}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all shadow-lg shadow-[#FFD700]/20"
                 >
                    <span>Transmit</span> <Send size={12} />
                 </button>
              </div>
            )}

            {/* History Divider */}
            {history.length > 0 && (
              <div className="pt-8 border-t border-white/5 mt-8">
                <div className="flex items-center space-x-2 mb-6 text-white/40 justify-center">
                  <History size={12} />
                  <span className="text-[10px] uppercase tracking-[0.2em]">Previous Echoes</span>
                </div>
                <div className="space-y-6">
                  {history.filter(h => h.day !== day && h.userEntry).map((h) => (
                    <div key={h.day} className="space-y-3 opacity-60 hover:opacity-100 transition-opacity">
                      <div className="flex items-center justify-center">
                         <div className="text-[10px] text-white/30 px-2 py-1 rounded-full border border-white/10 bg-white/5">Day {h.day}</div>
                      </div>
                      
                      <div className="flex justify-end">
                         <div className="bg-white/5 rounded-xl rounded-tr-none p-3 text-white/80 text-xs max-w-[85%] border border-white/5">
                            "{h.userEntry}"
                         </div>
                      </div>

                      {h.aiResponse && (
                         <div className="flex justify-start">
                            <div className="bg-[#e3d8c4]/10 rounded-xl rounded-tl-none p-3 text-[#e3d8c4] text-xs italic max-w-[85%] border border-[#e3d8c4]/20 font-serif">
                               {h.aiResponse}
                            </div>
                         </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        
        @keyframes burn {
          0% { 
            opacity: 0; 
            color: #ff4500; 
            text-shadow: 0 0 10px #ff0000, 0 0 20px #ff8800; 
            transform: scale(1.1);
            filter: blur(2px);
          }
          10% { 
            opacity: 1; 
            color: #ffaa00; 
            text-shadow: 0 0 5px #ffcc00; 
            filter: blur(0px);
          }
          40% { 
            color: #8b4513; 
            text-shadow: 0 0 2px #ff4500; 
          }
          100% { 
            color: #2c241b; 
            text-shadow: none; 
            transform: scale(1);
          }
        }
        .animate-burn {
          animation: burn 1.5s forwards ease-out;
        }
      `}</style>
    </div>
  );
};


// 4. Pavlovian Trigger Button - Updated with Gold Color
const ResonanceTrigger = ({ onActivate, isActive }) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (progress >= 100 && !isActive) {
      onActivate();
    }
  }, [progress, isActive, onActivate]);

  const startPress = () => {
    if (isActive) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        return prev + 2; 
      });
    }, 20);
  };

  const endPress = () => {
    if (isActive) return;
    clearInterval(intervalRef.current);
    setProgress(0);
  };

  if (isActive) {
     return (
        <div className="w-full py-4 text-center animate-in fade-in duration-1000">
           <p className="text-[#FFD700] text-xs tracking-[0.3em] uppercase drop-shadow-md">Resonance Achieved</p>
        </div>
     );
  }

  return (
    <div className="mt-8 relative w-full h-16 group select-none">
      {/* Background Track */}
      <div className="absolute inset-0 bg-black/40 rounded-xl border border-white/5" />
      
      {/* Fill Animation - Using Gold Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FDB931] rounded-xl transition-all duration-75 ease-linear opacity-80"
        style={{ width: `${progress}%` }}
      />

      {/* Button Content */}
      <button 
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onTouchStart={startPress}
        onTouchEnd={endPress}
        className="absolute inset-0 w-full h-full flex items-center justify-center space-x-3 active:scale-95 transition-transform"
      >
        <Fingerprint className={`text-white/70 ${progress > 0 ? 'animate-pulse text-black' : ''}`} />
        <span className={`font-medium tracking-wide text-sm ${progress > 50 ? 'text-black' : 'text-white/90'}`}>
           {progress > 0 ? "Aligning Frequency..." : "Hold to Resonate"}
        </span>
      </button>
    </div>
  );
};

// --- MAIN APP ---
export default function ResonanceApp() {
  const [currentDay, setCurrentDay] = useState(1);
  const [unlockedDay, setUnlockedDay] = useState(1);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  
  const todayData = affirmationData.find(d => d.day === currentDay);

  useEffect(() => {
     const savedProgress = localStorage.getItem('resonance_progress');
     if (savedProgress) setUnlockedDay(parseInt(savedProgress));
  }, []);

  const handleUnlock = () => {
     setIsRevealed(true);
     if (currentDay === unlockedDay && unlockedDay < 30) {
        const next = unlockedDay + 1;
        setUnlockedDay(next);
        localStorage.setItem('resonance_progress', next);
     }
  };

  const changeDay = (day) => {
     setCurrentDay(day);
     setIsRevealed(false); 
  };

  // BACKGROUND: Dark Navy Base for All, with Subtle Element Glows
  const getGlowColor = (element) => {
    switch(element) {
      case "Ignis": return "bg-orange-500/10"; 
      case "Aqua": return "bg-blue-500/10"; 
      case "Terra": return "bg-emerald-500/10"; 
      case "Aer": return "bg-sky-500/10"; 
      case "Aether": return "bg-indigo-500/10"; 
      default: return "bg-white/5";
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden transition-colors duration-1000 bg-[#050515] font-sans">
      
      {/* Background Animated Blobs - Now more subtle/darker */}
      <div className={`absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full blur-[150px] animate-pulse-slow pointer-events-none ${getGlowColor(todayData?.element)}`} />
      <div className={`absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full blur-[150px] animate-pulse-slow delay-1000 pointer-events-none ${getGlowColor(todayData?.element)}`} />

      {/* Main Layout Container */}
      <div className="relative z-10 max-w-lg mx-auto min-h-screen flex flex-col p-6 pb-24">
        
        {/* Header */}
        <header className="flex justify-between items-center py-6 mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-[#FFD700] w-5 h-5 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
            <h1 className="text-white font-serif text-xl tracking-wider">RESONANCE</h1>
          </div>
          <div className="flex items-center space-x-3">
             <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-indigo-200/70 backdrop-blur-md">
               Day {currentDay}
             </div>
          </div>
        </header>

        {/* Main Experience Area */}
        <div className="flex-1 flex flex-col justify-center perspective-1000">
          <GlassCard className={`
             p-8 aspect-[4/5] flex flex-col justify-between transform transition-all duration-1000
             ${isRevealed ? 'bg-[#0f172a]/60 border-[#FFD700]/20 shadow-[0_0_50px_rgba(255,215,0,0.1)]' : ''}
          `}>
            
            {/* Top Badge */}
            <div className="flex justify-between items-start">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                  ${isRevealed ? 'bg-gradient-to-br from-[#FFD700] to-[#FDB931] text-black rotate-180 shadow-lg' : 'bg-white/5 text-white/50 border border-white/10'}
                `}>
                  {todayData?.icon}
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/40">{todayData?.element}</p>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col justify-center py-6 text-center">
               
               {/* Pre-reveal: The Question/Concept */}
               {!isRevealed && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                     <h2 className="text-3xl text-indigo-100 font-serif mb-4 opacity-70 blur-[1px]">{todayData?.title}</h2>
                     <p className="text-indigo-200/60 text-sm font-light leading-relaxed max-w-xs mx-auto">
                        Focus your intention. Breathe deeply. <br/>Unlock the frequency of this day.
                     </p>
                  </div>
               )}

               {/* Post-reveal: The Mantra & Wisdom */}
               {isRevealed && (
                  <div className="animate-in zoom-in fade-in duration-1000 space-y-6">
                     <div>
                        <p className="text-xs uppercase tracking-widest text-[#FFD700] mb-3 drop-shadow-sm">Affirmation</p>
                        <h2 className="text-2xl md:text-3xl text-white font-serif leading-tight">
                           "{todayData?.mantra}"
                        </h2>
                     </div>
                     <div className="w-8 h-px bg-[#FFD700]/30 mx-auto" />
                     <p className="text-indigo-100/80 text-sm font-light italic">
                        {todayData?.quote}
                     </p>
                  </div>
               )}
            </div>

            {/* Action Area */}
            <div>
               <ResonanceTrigger isActive={isRevealed} onActivate={handleUnlock} />
               
               {isRevealed && (
                  <div className="mt-4 animate-in slide-in-from-bottom-4 duration-500">
                     <button 
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-[#FFD700]/20 hover:brightness-110 transition-all"
                        onClick={() => setIsJournalOpen(true)}
                     >
                        <div className="flex items-center space-x-2">
                            <BookOpen size={14} />
                            <span>Insight & Reflection</span>
                            <MessageCircle size={14} />
                        </div>
                     </button>
                  </div>
               )}
            </div>

          </GlassCard>
        </div>

        {/* Bottom Navigation / Day Selector */}
        <div className="mt-8 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex space-x-3 px-2">
            {affirmationData.map((data) => (
              <button
                key={data.day}
                onClick={() => data.day <= unlockedDay && changeDay(data.day)}
                className={`
                  relative w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${data.day === currentDay 
                    ? 'bg-gradient-to-br from-[#FFD700] to-[#FDB931] text-black shadow-[0_0_20px_rgba(255,215,0,0.3)] scale-110 z-10' 
                    : data.day > unlockedDay
                       ? 'bg-black/40 text-white/10 cursor-not-allowed border border-white/5'
                       : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/5'}
                `}
              >
                {data.day > unlockedDay ? <Lock size={12} /> : data.day}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Journal Modal */}
      <JournalModal 
        isOpen={isJournalOpen} 
        onClose={() => setIsJournalOpen(false)} 
        day={currentDay}
        title={todayData?.insight}
      />

      {/* Styles */}
      <style>{`
        @keyframes shine {
          0% { left: -100%; opacity: 0; }
          50% { opacity: 0.5; }
          100% { left: 200%; opacity: 0; }
        }
        .animate-shine {
          animation: shine 3s infinite linear;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}