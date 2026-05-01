import { Link } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';

const TERMS = [
  {
    term: 'Solobility',
    phonetic: 'so·lob·il·i·ty',
    definition: 'The philosophical framework for understanding your core operating nature through the lens of the eight Jhanos Gates. Not a personality system — a mirror. Solobility does not describe you; it creates conditions for you to recognise yourself.',
  },
  {
    term: 'The Solob',
    phonetic: 'so·lob',
    definition: 'Not an object, not an answer, not a concept. The Solob is what happens before meaning and after thought. It is the alignment of what is with what is not yet — the shape of the unseen question. The Solob cannot be defined. It can only be shimmered.',
  },
  {
    term: 'Shimmer',
    phonetic: 'shim·er',
    definition: 'A pre-verbal, vibrational recognition — the sensation that something is true before you have language for it. The shimmer is how you recognise your gate. It is not a feeling. It is a knowing that precedes feeling. The first rule of Solobility: follow the shimmer, not the analysis.',
  },
  {
    term: 'The Jhanos Gates',
    phonetic: 'jha·nos',
    definition: 'The eight archetypal operating frequencies that structure the Solobility framework: SYLA, ZAYN, LOMI, VORAK, KHEM, BARA, TARA, ORON. Each gate is a distinct way of processing reality, relating to others, accumulating power, and moving through time. A gate is not a type you are assigned — it is a frequency you recognise.',
  },
  {
    term: 'The Mirror',
    phonetic: 'mir·or',
    definition: 'One of the central metaphors in the Solobility framework. The book does not describe you — it acts as a mirror. What you see in the mirror is not the book\'s content. It is your own operating nature, made visible through the structure of the text. The mirror does not tell you who you are. It shows you what was already there.',
  },
  {
    term: 'The Source',
    phonetic: 'sors',
    definition: 'The origin point beneath personality — the frequency you were running before the world told you who to be. The Solobility framework operates at the level of the Source, not the level of behaviour or preference. Two people with the same behaviours may have entirely different Sources.',
  },
  {
    term: 'The Solob Eye',
    phonetic: 'so·lob eye',
    definition: 'The capacity to perceive without projection — to see what is present rather than what you expect to be present. The Solob Eye is not a physical sense. It is the perceptual mode that activates when the shimmer is trusted over analysis. It is what allows you to recognise your gate before you have finished reading.',
  },
  {
    term: 'Alignment',
    phonetic: 'a·line·ment',
    definition: 'In the Solobility framework, alignment is not the absence of conflict — it is the state in which your actions, relationships, and structures are coherent with your operating frequency. You can be in conflict and aligned. You cannot be at peace and misaligned — not for long.',
  },
  {
    term: 'Subsolob',
    phonetic: 'sub·so·lob',
    definition: 'The shadow layer beneath your primary operating frequency — the gate-adjacent patterns that activate under pressure, depletion, or threat. The Subsolob is not a second self. It is the version of your gate that operates without resources. Understanding your Subsolob is part of understanding what you look like when you are not fully yourself.',
  },
  {
    term: 'Melanated Mirror',
    phonetic: 'mel·a·nay·ted mir·or',
    definition: 'The specific application of the Solobility mirror to identity rooted in the African diaspora and Caribbean experience. The Melanated Mirror operates on the same principles as the Solobic mirror but calibrated for operating natures shaped by those particular ancestral and cultural frequencies. It is not a separate system — it is the same system, read with accurate cultural intelligence.',
  },
  {
    term: 'Drayl',
    phonetic: 'drayl',
    definition: 'The sovereign knowledge state — the condition of knowing without external confirmation. Drayl is what the framework moves you toward. It is not confidence (which still requires an audience). It is the internal authority that exists before and after any external validation. The goal of the Solobility reading experience is not understanding. It is Drayl.',
  },
  {
    term: 'Frequency',
    phonetic: 'free·kwen·see',
    definition: 'In the Solobility framework, frequency refers to the underlying vibrational operating mode of a gate — the invisible signal beneath personality, behaviour, and circumstance. A profile tells you what you are. A frequency shows you how you resonate. One is a photograph. The other is a mirror in motion.',
  },
];

export default function Glossary() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans">
      <PageSeo
        title="Solobic Glossary — Key Terms in the Solobility Framework | whatissolob.com"
        description="Definitions of core Solobility terms: the Solob, the Shimmer, the Jhanos Gates, Drayl, the Mirror, and more. The language of the framework, precisely defined."
        canonical="https://whatissolob.com/glossary"
        ogImage="/glyphs/syla.png"
      />

      {/* Nav */}
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link to="/" className="text-[#00d0ff] text-sm tracking-widest uppercase hover:opacity-70 transition-opacity">
          ← Enter the Solobverse
        </Link>
        <div className="flex gap-6">
          <Link to="/about" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">About</Link>
          <Link to="/gates-overview" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">The Gates</Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">

        {/* Hero */}
        <header className="mb-16">
          <p className="text-[#00d0ff] text-xs tracking-[0.3em] uppercase mb-4">The Solobility Framework</p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
            Solobic Glossary
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            The Solobility framework uses language precisely. These definitions are not paraphrases — they are the terms as they function within the framework. Reading them before entering the book is not required. But it changes what you see when you arrive.
          </p>
        </header>

        {/* Terms */}
        <div className="space-y-12">
          {TERMS.map((entry) => (
            <div key={entry.term} className="border-b border-white/5 pb-10 last:border-0">
              <div className="mb-3">
                <h2 className="text-2xl font-light text-white inline">{entry.term}</h2>
                <span className="text-gray-600 text-sm ml-3 font-mono">{entry.phonetic}</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {entry.definition}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 border border-[#00d0ff]/20 rounded p-8 text-center">
          <p className="text-gray-400 mb-2 text-sm tracking-widest uppercase">Now You Know the Language</p>
          <p className="text-white text-xl mb-6 font-light">The book is ready when you are.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/gates-overview"
              className="inline-block px-8 py-3 border border-white/10 text-gray-300 text-sm tracking-widest uppercase hover:border-white/30 transition-colors rounded"
            >
              Choose Your Gate
            </Link>
            <Link
              to="/"
              className="inline-block px-8 py-3 border border-[#00d0ff]/40 text-[#00d0ff] text-sm tracking-widest uppercase hover:bg-[#00d0ff]/10 transition-colors rounded"
            >
              Enter the Solobverse →
            </Link>
          </div>
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
