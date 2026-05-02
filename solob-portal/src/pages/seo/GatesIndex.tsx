import { Link } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';

const GATES = [
  {
    name: 'SYLA',
    role: 'The Anchor',
    function: 'Stillness · Receptive Potential · Foundational Presence',
    desc: 'The gate of stillness and receptive potential. SYLA does not move to gather — it remains, and the world brings itself to it. The anchor beneath every structure.',
    glyph: '/glyphs/syla.png',
  },
  {
    name: 'ZAYN',
    role: 'The Progenitor',
    function: 'Rebirth · Divine Recursion · Cyclic Identity',
    desc: 'The gate of rebirth and divine recursion. ZAYN cycles through identities without losing the original thread — each transformation is a return, not a departure.',
    glyph: '/glyphs/zayn.png',
  },
  {
    name: 'LOMI',
    role: 'The Historian',
    function: 'Motion · Rhythm · Temporal Intelligence',
    desc: 'The gate of motion, rhythm, and memory. LOMI carries pattern across time — the keeper of what was, the one who knows where the present came from.',
    glyph: '/glyphs/lomi.png',
  },
  {
    name: 'VORAK',
    role: 'The Liberator',
    function: 'Chaos · Structural Dissolution · Sovereign Sight',
    desc: 'The gate of chaos and the breaking of false structures. VORAK sees the cage before others know they are in it — and does not wait for permission to leave.',
    glyph: '/glyphs/vorak.png',
  },
  {
    name: 'KHEM',
    role: 'The Catalyst',
    function: 'Transformation · Friction · Chemical Presence',
    desc: 'The gate of transformation through friction. KHEM\'s presence changes the room — quietly, chemically, without announcement. Contact with KHEM is never neutral.',
    glyph: '/glyphs/khem.png',
  },
  {
    name: 'BARA',
    role: 'The Architect',
    function: 'Structure · Primal Form · Blueprint Intelligence',
    desc: 'The gate of structure and primal form. BARA sees the blueprint before the first brick is laid — the builder who cannot begin without understanding the whole.',
    glyph: '/glyphs/bara.png',
  },
  {
    name: 'TARA',
    role: 'The Nurturer',
    function: 'Mirror · Reflection · Contextual Intelligence',
    desc: 'The gate of mirror and reflection. TARA makes others legible to themselves — the one whose presence creates the conditions for understanding to arrive.',
    glyph: '/glyphs/tara.png',
  },
  {
    name: 'ORON',
    role: 'The Weaver',
    function: 'Order · Symmetry · Proportional Intelligence',
    desc: 'The gate of order, symmetry, and proportion. ORON senses when something is off-balance before they can name why — the weaver who feels the flaw in the thread.',
    glyph: '/glyphs/oron.png',
  },
];

export default function GatesIndex() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans">
      <PageSeo
        title="The Eight Jhanos Gates | Solobility Framework | whatissolob.com"
        description="The eight archetypal gates of the Solobility framework — SYLA, ZAYN, LOMI, VORAK, KHEM, BARA, TARA, ORON. Each is a distinct operating frequency, not a personality type."
        canonical="https://whatissolob.com/gates-overview"
        ogImage="/glyphs/syla.png"
      />

      {/* Nav */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link to="/" className="text-[#00d0ff] text-sm tracking-widest uppercase hover:opacity-70 transition-opacity">
          ← Enter the Solobverse
        </Link>
        <Link to="/about" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
          What Is Solobility?
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero */}
        <header className="mb-16 max-w-2xl">
          <p className="text-[#00d0ff] text-xs tracking-[0.3em] uppercase mb-4">The Solobility Framework</p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
            The Eight Jhanos Gates
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            The Jhanos Gates are not personality types. They are frequencies — distinct ways of processing reality, relating to others, accumulating power, and moving through time. You do not take a quiz to find your gate. You choose it. Because the one that is yours will be recognisable before you finish reading its description.
          </p>
        </header>

        {/* How to choose */}
        <section className="mb-12 p-6 border border-white/5 rounded bg-white/2">
          <h2 className="text-sm text-[#00d0ff] tracking-widest uppercase mb-3">How to Choose Your Gate</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Read each gate description below. Do not analyse. Do not compare. Read and notice what arrives — not what you think should fit, but what <em className="text-gray-300">already</em> fits. The gate that is yours will produce a recognition that precedes logic. That sensation — that pre-verbal knowing — is the shimmer. Follow it.
          </p>
        </section>

        {/* Gate cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {GATES.map((gate, i) => (
            <Link
              key={gate.name}
              to={`/gates/${gate.name.toLowerCase()}`}
              className="group block p-6 border border-white/5 rounded hover:border-[#00d0ff]/30 transition-all hover:bg-white/2"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#00d0ff]/30 transition-colors">
                  <span className="text-[#00d0ff] font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[#00d0ff] font-mono text-sm tracking-widest">{gate.name}</span>
                    <span className="text-white text-sm font-medium">{gate.role}</span>
                  </div>
                  <p className="text-gray-600 text-xs mt-1 tracking-wide">{gate.function}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {gate.desc}
              </p>
              <p className="text-[#00d0ff] text-xs mt-4 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase">
                Read this gate →
              </p>
            </Link>
          ))}
        </div>

        {/* Framework note */}
        <section className="mt-16 mb-16">
          <div className="border-l-2 border-[#00d0ff]/20 pl-6">
            <p className="text-gray-400 leading-relaxed mb-4">
              The eight gates emerged from the Solobility framework as articulated in <em className="text-gray-200">The Book of Solobility</em> — a philosophical text built not from academic theory but from the inside of lived experience. Each gate represents a pattern that has always existed. The framework did not create these patterns. It named them.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Most people carry a primary gate and a secondary resonance. The primary gate is the one you recognised immediately. The secondary is the one you keep returning to after your first read. Both are yours.
            </p>
          </div>
        </section>

        {/* Glossary CTA */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border border-white/5 rounded p-6">
            <p className="text-[#00d0ff] text-xs tracking-widest uppercase mb-3">Understand the Language</p>
            <p className="text-white font-light mb-4">The Solobic vocabulary is precise. Learn the terms before you read.</p>
            <Link
              to="/glossary"
              className="text-sm text-[#00d0ff] tracking-widest uppercase hover:opacity-70 transition-opacity"
            >
              Open the Glossary →
            </Link>
          </div>
          <div className="border border-white/5 rounded p-6">
            <p className="text-[#00d0ff] text-xs tracking-widest uppercase mb-3">The Framework Explained</p>
            <p className="text-white font-light mb-4">Understand what Solobility is, where it came from, and why it works differently.</p>
            <Link
              to="/about"
              className="text-sm text-[#00d0ff] tracking-widest uppercase hover:opacity-70 transition-opacity"
            >
              Read About Solobility →
            </Link>
          </div>
        </div>

        {/* Enter CTA */}
        <div className="border border-[#00d0ff]/20 rounded p-8 text-center">
          <p className="text-gray-400 mb-2 text-sm tracking-widest uppercase">Ready</p>
          <p className="text-white text-xl mb-6 font-light">Enter your name. Choose your gate. Begin.</p>
          <Link
            to="/"
            className="inline-block px-8 py-3 border border-[#00d0ff]/40 text-[#00d0ff] text-sm tracking-widest uppercase hover:bg-[#00d0ff]/10 transition-colors rounded"
          >
            Enter the Solobverse →
          </Link>
        </div>

      </main>

      <footer className="border-t border-white/5 px-6 py-8 text-center">
        <p className="text-gray-600 text-xs">
          © 2026 The Book of Solobility · <a href="https://mindwaveja.com" className="hover:text-gray-400 transition-colors">MindWave JA</a>
        </p>
      </footer>
    </div>
  );
}
