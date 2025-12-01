const { useState, useEffect, useRef } = React;

// Lucide Icon Components (simplified for browser)
const Icon = ({ name, className = "w-6 h-6" }) => {
  const icons = {
    Flame: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
      </svg>
    ),
    Droplets: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
      </svg>
    ),
    Mountain: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
      </svg>
    ),
    Wind: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
      </svg>
    ),
    Sparkles: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        <path d="M5 3v4"/>
        <path d="M19 17v4"/>
        <path d="M3 5h4"/>
        <path d="M17 19h4"/>
      </svg>
    ),
    BookOpen: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    X: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
      </svg>
    ),
    Lock: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    MessageCircle: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
      </svg>
    ),
    Feather: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" x2="2" y1="8" y2="22"/><line x1="17.5" x2="9" y1="15" y2="15"/>
      </svg>
    ),
    Fingerprint: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"/><path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2"/>
      </svg>
    ),
    History: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>
      </svg>
    ),
    Send: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
      </svg>
    ),
    Copy: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
      </svg>
    ),
    Check: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    )
  };
  
  return icons[name] || null;
};

// --- DATA: The 30-Day Alchemical Journey ---
const affirmationData = [
  // MOVEMENT I: IGNIS (The Spark of Vision)
  {
    day: 1,
    element: "Ignis",
    title: "The Myth of Noise",
    mantra: "I possess the intelligence to silence the chaos. My mind is a sanctuary of clarity.",
    quote: "Only through silence can the true frequency be heard.",
    insight: "We breathe noise as we breathe oxygen. Combustion without containment destroys the crucible. Begin by listening.",
    iconName: "Flame"
  },
  {
    day: 2,
    element: "Ignis",
    title: "The First Law",
    mantra: "I am beautiful not for what I add, but for what I release. I align with my truth.",
    quote: "Power grows not through addition, but through subtraction.",
    insight: "Influence does not reward the loud; it rewards the aligned. To amplify our influence, we must remove what weakens the pattern.",
    iconName: "Flame"
  },
  {
    day: 3,
    element: "Ignis",
    title: "The Alchemist's Constraint",
    mantra: "My presence is powerful. I build structures of integrity that stand the test of time.",
    quote: "Presence functions only at proximity.",
    insight: "We do not 'market' in the modern sense. We build resonant architectures—messages whose internal proportions allow them to replicate integrity across time.",
    iconName: "Flame"
  },
  {
    day: 4,
    element: "Ignis",
    title: "Anatomy of Signal",
    mantra: "My true self shines when I strip away the unnecessary. I am pure signal.",
    quote: "Clarity is the purity of the tone.",
    insight: "Every unnecessary ornamentation increases entropy. We purge adjectives like impurities in ore until the essence of meaning shines.",
    iconName: "Flame"
  },
  {
    day: 5,
    element: "Ignis",
    title: "The Geometry of Beauty",
    mantra: "I am designed with divine proportion. My nature is harmony.",
    quote: "Harmony is the architecture of truth.",
    insight: "The ancients encoded proportion into temples and lyres. When our compositions reflect natural proportion, the nervous system recognizes home.",
    iconName: "Flame"
  },
  {
    day: 6,
    element: "Ignis",
    title: "Algorithmic Thinking",
    mantra: "My wisdom is concise and profound. I reveal universes in simple acts.",
    quote: "Compression, done rightly, is not reduction but revelation.",
    insight: "The shortest equation that can reproduce the universe of a message becomes the philosopher's stone of communication.",
    iconName: "Flame"
  },
  {
    day: 7,
    element: "Ignis",
    title: "Designing with Tension",
    mantra: "I embrace the unknown. My curiosity is the bloom of my intelligence.",
    quote: "Curiosity blooms at the edge of comfort.",
    insight: "We design messages as oscillations, not statements. Every unanswered question is a string left vibrating.",
    iconName: "Flame"
  },
  // MOVEMENT II: AQUA (The Flow of Narrative)
  {
    day: 8,
    element: "Aqua",
    title: "The Empathy Circuit",
    mantra: "My heart is an ocean of understanding. I move others by being moved.",
    quote: "To move another mind is to ripple the ocean.",
    insight: "Empathy is not sentiment; it is physics made intimate. A smile seen becomes a smile felt.",
    iconName: "Droplets"
  },
  {
    day: 9,
    element: "Aqua",
    title: "Entrainment",
    mantra: "My rhythm is calm and strong. I bring harmony to every room I enter.",
    quote: "Presence is not projected, but transmitted through rhythm.",
    insight: "When two nervous systems meet, the stronger rhythm gradually entrains the weaker. Energy does not dominate; it harmonizes.",
    iconName: "Droplets"
  },
  {
    day: 10,
    element: "Aqua",
    title: "Content as Solvent",
    mantra: "I am like water—soft, yielding, yet capable of shaping the hardest stone.",
    quote: "Water does not batter stone; it embraces and erodes it.",
    insight: "To overcome resistance, we do not force entry; we dissolve. Influence at scale must become liquid.",
    iconName: "Droplets"
  },
  {
    day: 11,
    element: "Aqua",
    title: "Diagnostic Flow",
    mantra: "I see myself clearly. I have the courage to reflect on who I am.",
    quote: "Resistance cannot survive reflection.",
    insight: "A diagnostic message does not sell—it reveals. It shows the audience to themselves, then offers the path forward.",
    iconName: "Droplets"
  },
  {
    day: 12,
    element: "Aqua",
    title: "The Water Teaches",
    mantra: "I trust the flow of my life. I consent to be moved by beauty.",
    quote: "Empathy is both compass and current.",
    insight: "It tells us where to flow and provides the energy to get there. To practice empathy is to consent to be moved.",
    iconName: "Droplets"
  },
  {
    day: 13,
    element: "Aqua",
    title: "Quiet Technology",
    mantra: "My true power lies in my calm. I am an artist of peace.",
    quote: "The future of communication is the art of calming.",
    insight: "In a world of noise, influence will no longer be the art of convincing—it will be the art of calming.",
    iconName: "Droplets"
  },
  {
    day: 14,
    element: "Aqua",
    title: "The Story Current",
    mantra: "My life is a beautiful story. I ride the tides of emotion with grace.",
    quote: "Emotion is the tide; meaning rides upon it.",
    insight: "Information unaccompanied by emotion evaporates. To teach without story is to shout across wind.",
    iconName: "Droplets"
  },
  // MOVEMENT III: TERRA (The Infrastructure of Trust)
  {
    day: 15,
    element: "Terra",
    title: "Standing Waves",
    mantra: "I build my life on rituals of self-love. I am consistent and true.",
    quote: "Resonance becomes permanence through ritual.",
    insight: "A ritual, when repeated in phase with human nature, becomes cultural infrastructure.",
    iconName: "Mountain"
  },
  {
    day: 16,
    element: "Terra",
    title: "Foundations",
    mantra: "I am built to last. My worth is a cathedral that stands for centuries.",
    quote: "To build for a day is ambition. To build for centuries is faith.",
    insight: "We trust continuity more than completion. The brand that endures becomes a cathedral of trust.",
    iconName: "Mountain"
  },
  {
    day: 17,
    element: "Terra",
    title: "Rhythm of Retention",
    mantra: "I honor my need for rest. In silence, I strengthen my memory of self.",
    quote: "Repetition is the metronome of remembrance.",
    insight: "Just as fields need seasons of rest, the mind needs intervals between exposures. Silence does half the work.",
    iconName: "Mountain"
  },
  {
    day: 18,
    element: "Terra",
    title: "Antifragility",
    mantra: "I grow stronger through challenge. I am the phoenix.",
    quote: "Antifragile systems feed upon volatility.",
    insight: "The phoenix is not metaphor—it is an operating manual. We design for stress rather than comfort.",
    iconName: "Mountain"
  },
  {
    day: 19,
    element: "Terra",
    title: "Via Negativa",
    mantra: "I am a masterpiece revealed by what I let go. I am clarity.",
    quote: "What remains after the unnecessary is carved away is the sculpture.",
    insight: "Endurance is not accumulation but clarity. Eliminate fragility rather than chase perfection.",
    iconName: "Mountain"
  },
  {
    day: 20,
    element: "Terra",
    title: "Crisis as Opportunity",
    mantra: "My integrity shines brightest in the dark. I am purified by fire.",
    quote: "Stress reveals integrity by shining through.",
    insight: "Fire is not always destruction; sometimes it is purification. Cathedrals have burned and been rebuilt stronger.",
    iconName: "Mountain"
  },
  {
    day: 21,
    element: "Terra",
    title: "Cathedral Thinking",
    mantra: "I serve a purpose greater than myself. I am a steward of the future.",
    quote: "We surrender ownership to stewardship.",
    insight: "The mason who shapes one stone must trust that the unseen future will align it with others into arch and spire.",
    iconName: "Mountain"
  },
  // MOVEMENT IV: AER (The Atmosphere of Meaning)
  {
    day: 22,
    element: "Aer",
    title: "Language as Climate",
    mantra: "My words create the weather of my world. I speak kindness.",
    quote: "We do not merely speak language; we breathe it.",
    insight: "Words are filters that determine which frequencies of reality pass through awareness. To speak is to climate-engineer consciousness.",
    iconName: "Wind"
  },
  {
    day: 23,
    element: "Aer",
    title: "The Horizon",
    mantra: "I do not need to be loud to be significant. I am the horizon.",
    quote: "The horizon defines the visible by vanishing within it.",
    insight: "The closer a design approaches perfection, the less attention it demands. It becomes background frequency.",
    iconName: "Wind"
  },
  {
    day: 24,
    element: "Aer",
    title: "Invisible Design",
    mantra: "My influence is effortless. I guide without forcing.",
    quote: "Invisibility is not erasure; it is transcendence of ego.",
    insight: "The alchemist of invisibility removes seams until only purpose remains. We measure success by forgetting.",
    iconName: "Wind"
  },
  {
    day: 25,
    element: "Aer",
    title: "The Collective Chord",
    mantra: "I am part of a greater song. My voice adds harmony to the whole.",
    quote: "When many voices align, silence itself begins to sing.",
    insight: "Dissonance condenses into consonance. A scattered multitude becomes one organism breathing in rhythm.",
    iconName: "Wind"
  },
  {
    day: 26,
    element: "Aer",
    title: "Tone Spectrum",
    mantra: "I master my emotional temperature. I am warm, fluid, and alive.",
    quote: "Tone is thermal energy in communication.",
    insight: "Too much energy, and relationships evaporate; too little, and they freeze. Maintain the conversation in liquid phase.",
    iconName: "Wind"
  },
  {
    day: 27,
    element: "Aer",
    title: "The Vanishing Architect",
    mantra: "I create space for others to thrive. My love is an open sky.",
    quote: "When the frame is perfect, the picture becomes the world.",
    insight: "The highest influence is invisible—when coordination becomes instinct, when systems hum in harmony without conductor.",
    iconName: "Wind"
  },
  {
    day: 28,
    element: "Aer",
    title: "Stewardship",
    mantra: "I care for what is entrusted to me. I am a guardian of grace.",
    quote: "Influence matures into stewardship, then into atmosphere.",
    insight: "What began as command ends as care. The hands that once built now simply steady what already stands.",
    iconName: "Wind"
  },
  // THE RETURN TO STILL WATER
  {
    day: 29,
    element: "Aether",
    title: "The Last Reflection",
    mantra: "I am complete. I need add nothing to be whole.",
    quote: "The work is complete. The silence is perfect.",
    insight: "We keep the world in tune by learning when to stop playing. The forge has cooled. The cathedral breathes.",
    iconName: "Sparkles"
  },
  {
    day: 30,
    element: "Aether",
    title: "Resonance",
    mantra: "I am resonance. I endure.",
    quote: "Resonance endures.",
    insight: "To resonate is to be remembered not by name, but by harmony. A whisper of still water beneath the noise.",
    iconName: "Sparkles"
  }
];

// --- LOGIC: The Resonance Engine ("AI") ---
const elementTone = {
  Ignis: {
    prefix: "Ignis •",
    frames: [
      "Direct your heat with kindness.",
      "Let discipline be the crucible for your fire.",
      "Contain the flame; make it useful.",
    ],
  },
  Aqua: {
    prefix: "Aqua •",
    frames: [
      "Allow this to move through you without resistance.",
      "Breathe slow; soften the edges and flow.",
      "Gentleness is stronger than force.",
    ],
  },
  Terra: {
    prefix: "Terra •",
    frames: [
      "Return to structure, routine, and basics.",
      "Stand firm; small rituals build cathedrals.",
      "Stability invites clarity.",
    ],
  },
  Aer: {
    prefix: "Aer •",
    frames: [
      "Change your language; adjust your climate.",
      "Speak softly and your world softens.",
      "Let your tone be the wind that carries meaning.",
    ],
  },
  Aether: {
    prefix: "Aether •",
    frames: [
      "Listen for the subtle harmony beneath events.",
      "Trust the invisible architecture holding you.",
      "You are part of a larger resonance.",
    ],
  },
};

const keywordBuckets = [
  {
    keys: ['tired','exhausted','burnout','drained','sleepy','fatigue'],
    messages: [
      "Your fatigue is wisdom asking for rest. Cooling the forge preserves the metal.",
      "Pause is not failure; it is fuel. Honor the need to recover.",
      "Slow down. Depth grows in silence and sleep.",
    ],
  },
  {
    keys: ['anxious','scared','fear','worry','nervous','panic','overwhelmed'],
    messages: [
      "Anxiety is energy without a container. Shape it with breath and simple actions.",
      "Name one thing you control right now; do that gently.",
      "Bring attention to your breath. Rhythm turns chaos into music.",
    ],
  },
  {
    keys: ['sad','cry','hurt','pain','grief','lonely','down'],
    messages: [
      "Let the feeling flow. Water cleans the channel; you deepen, not break.",
      "Grief is love with nowhere to go—give it a quiet room and time.",
      "Hold yourself with tenderness. Depth is forming within you.",
    ],
  },
  {
    keys: ['happy','joy','excited','great','love','good','grateful'],
    messages: [
      "Amplify this standing wave by sharing it with one person today.",
      "Anchor joy in a small ritual so it returns.",
      "Let gratitude tune your instrument for the day.",
    ],
  },
  {
    keys: ['confused','lost','stuck','unsure','doubt','fog','uncertain'],
    messages: [
      "Fog asks you to walk slower. Trust your inner compass; sight will follow.",
      "Choose the next kind micro-step—not the whole map.",
      "Clarity grows from movement. Begin with one simple action.",
    ],
  },
  {
    keys: ['angry','mad','frustrated','hate','furious','irritated'],
    messages: [
      "Channel the heat into useful work. Fire without form only burns.",
      "Transmute frustration into focus—pick one task and finish it.",
      "Direct the flame toward creation, not destruction.",
    ],
  },
];

// Deterministic pick to avoid repeating the exact same line every time
const pickBySeed = (arr, seed) => arr[seed % arr.length];

const generateResonanceResponse = (text, context) => {
  const t = (text || '').toLowerCase();
  const element = context?.element || 'Aether';
  const day = context?.day || 1;

  // Find matching bucket
  const bucket = keywordBuckets.find(b => b.keys.some(k => t.includes(k)));
  const baseMsg = bucket
    ? pickBySeed(bucket.messages, day)
    : pickBySeed([
        "Your signal has been received. Keep refining your frequency; the noise will fall away.",
        "You are aligned more than you think. Stay gentle and consistent.",
        "Small honest steps create lasting resonance. Begin now.",
      ], day);

  const tone = elementTone[element] || elementTone.Aether;
  const toneMsg = pickBySeed(tone.frames, day);

  return `${tone.prefix} ${baseMsg} ${toneMsg}`;
};

// --- COMPONENTS ---

// 1. Burning Text Animation Component
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

// 2. Glass Card Component
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
    <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:animate-shine pointer-events-none" />
    {children}
  </div>
);

// 3. Journal Modal Component
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
      const response = generateResonanceResponse(entry, { element: affirmationData.find(d => d.day === day)?.element, day });
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
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#050515]/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg h-[85vh] flex flex-col" style={{animation: 'fadeIn 0.3s ease-in'}}>
        <GlassCard className="flex-1 flex flex-col !bg-[#0a0b1e]/80 !border-white/10 p-0 overflow-hidden shadow-2xl">
          
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#050515]/50">
            <div className="flex items-center space-x-2">
              <Icon name="Feather" className="w-4 h-4 text-white/70" />
              <span className="text-white font-serif tracking-wide text-sm">The Echo</span>
            </div>
            <button onClick={onClose}>
              <Icon name="X" className="w-5 h-5 text-white/50 hover:text-white" />
            </button>
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

                {/* AI Bubble */}
                <div className="flex flex-col items-start space-y-1 w-full">
                   <div className="flex items-center justify-between w-[95%]">
                      <span className="text-[10px] uppercase tracking-widest text-orange-200/50 ml-1 flex items-center gap-1">
                          <Icon name="Flame" className="w-3 h-3 text-orange-400" /> Ignis Response
                      </span>
                      <button 
                          onClick={() => handleCopy(currentResponse)}
                          className="text-white/30 hover:text-white/80 transition-colors flex items-center space-x-1"
                      >
                          <Icon name={isCopied ? "Check" : "Copy"} className={`w-3 h-3 ${isCopied ? 'text-green-400' : ''}`} />
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
                     <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                     <div className="w-2 h-2 rounded-full bg-orange-300 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
               </div>
            )}

            {/* Input Area */}
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
                    <span>Transmit</span> <Icon name="Send" className="w-3 h-3" />
                 </button>
              </div>
            )}

            {/* History */}
            {history.length > 0 && (
              <div className="pt-8 border-t border-white/5 mt-8">
                <div className="flex items-center space-x-2 mb-6 text-white/40 justify-center">
                  <Icon name="History" className="w-3 h-3" />
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
    </div>
  );
};

// 4. Pavlovian Trigger Button
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
        <div className="w-full py-4 text-center">
           <p className="text-[#FFD700] text-xs tracking-[0.3em] uppercase drop-shadow-md">Resonance Achieved</p>
        </div>
     );
  }

  return (
    <div className="mt-8 relative w-full h-16 group select-none">
      <div className="absolute inset-0 bg-black/40 rounded-xl border border-white/5" />
      
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FDB931] rounded-xl transition-all duration-75 ease-linear opacity-80"
        style={{ width: `${progress}%` }}
      />

      <button 
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onTouchStart={startPress}
        onTouchEnd={endPress}
        className="absolute inset-0 w-full h-full flex items-center justify-center space-x-3 active:scale-95 transition-transform"
      >
        <Icon name="Fingerprint" className={`${progress > 0 ? 'text-black animate-pulse' : 'text-white/70'}`} />
        <span className={`font-medium tracking-wide text-sm ${progress > 50 ? 'text-black' : 'text-white/90'}`}>
           {progress > 0 ? "Aligning Frequency..." : "Hold to Resonate"}
        </span>
      </button>
    </div>
  );
};

// --- MAIN APP ---
function ResonanceApp() {
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
      
      {/* Background Animated Blobs */}
      <div className={`absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full blur-[150px] animate-pulse pointer-events-none ${getGlowColor(todayData?.element)}`} style={{animationDuration: '4s'}} />
      <div className={`absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full blur-[150px] animate-pulse pointer-events-none ${getGlowColor(todayData?.element)}`} style={{animationDuration: '4s', animationDelay: '1s'}} />

      {/* Main Layout Container */}
      <div className="relative z-10 max-w-lg mx-auto min-h-screen flex flex-col p-6 pb-24">
        
        {/* Header */}
        <header className="flex justify-between items-center py-6 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" className="text-[#FFD700] w-5 h-5" style={{filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.5))'}} />
            <h1 className="text-white font-serif text-xl tracking-wider">RESONANCE</h1>
          </div>
          <div className="flex items-center space-x-3">
             <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-indigo-200/70 backdrop-blur-md">
               Day {currentDay}
             </div>
          </div>
        </header>

        {/* Main Experience Area */}
        <div className="flex-1 flex flex-col justify-center" style={{perspective: '1000px'}}>
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
                  <Icon name={todayData?.iconName} className="w-6 h-6" />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/40">{todayData?.element}</p>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col justify-center py-6 text-center">
               
               {/* Pre-reveal */}
               {!isRevealed && (
                  <div>
                     <h2 className="text-3xl text-indigo-100 font-serif mb-4 opacity-70 blur-[1px]">{todayData?.title}</h2>
                     <p className="text-indigo-200/60 text-sm font-light leading-relaxed max-w-xs mx-auto">
                        Focus your intention. Breathe deeply. <br/>Unlock the frequency of this day.
                     </p>
                  </div>
               )}

               {/* Post-reveal */}
               {isRevealed && (
                  <div className="space-y-6">
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
                  <div className="mt-4">
                     <button 
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-[#FFD700]/20 hover:brightness-110 transition-all"
                        onClick={() => setIsJournalOpen(true)}
                     >
                        <Icon name="BookOpen" className="w-4 h-4" />
                        <span>Insight & Reflection</span>
                        <Icon name="MessageCircle" className="w-4 h-4" />
                     </button>
                  </div>
               )}
            </div>

          </GlassCard>
        </div>

        {/* Bottom Navigation */}
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
                {data.day > unlockedDay ? <Icon name="Lock" className="w-3 h-3" /> : data.day}
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
    </div>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ResonanceApp />);