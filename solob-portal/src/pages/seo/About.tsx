import { Link } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans">
      <PageSeo
        title="What Is Solobility? The Framework Explained | whatissolob.com"
        description="Solobility is a philosophical framework for understanding your core operating nature through eight archetypal gates. Not a personality test. A mirror."
        canonical="https://whatissolob.com/about"
        ogImage="/glyphs/syla.png"
      />

      {/* Nav */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link to="/" className="text-[#00d0ff] text-sm tracking-widest uppercase hover:opacity-70 transition-opacity">
          ← Enter the Solobverse
        </Link>
        <Link to="/gates-overview" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
          The Eight Gates
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">

        {/* Hero */}
        <header className="mb-16">
          <p className="text-[#00d0ff] text-xs tracking-[0.3em] uppercase mb-4">The Book of Solobility</p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
            What Is Solobility?
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Solobility is not a personality test. It is not a system of types. It is not a doctrine, a religion, or a self-help method. It is a philosophical framework for understanding the operating nature underneath your personality — the frequency you were running before the world told you who to be.
          </p>
        </header>

        {/* Section 1 */}
        <section className="mb-14">
          <h2 className="text-2xl font-light text-white mb-5">The Solob</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            At the centre of this framework is a concept called the <em className="text-gray-200">Solob</em> — not an object, not an answer, not a concept. The Solob is what happens before meaning and after thought. It is the alignment of what is with what is not yet. It is the shape of the unseen question.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Most frameworks begin with the assumption that you can be described. Solobility begins differently: with the understanding that the deepest part of you can only be <em className="text-gray-200">shimmered</em> — recognised as a vibrational knowing before it can be explained. The framework does not give you a label. It gives you a mirror precise enough to see something that was already there.
          </p>
          <p className="text-gray-400 leading-relaxed">
            The Book of Solobility is a living text. It reflects. It is not right or wrong. It is you — fragmented and remembered.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-14">
          <h2 className="text-2xl font-light text-white mb-5">The Eight Jhanos Gates</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            The Solobility framework is structured around eight archetypal gates — the Jhanos Gates. Each gate represents a distinct operating frequency: a different way of processing reality, relating to others, accumulating power, and moving through time. You do not take a quiz to find your gate. You choose it — because the gate that is yours will be recognisable before you finish reading its description.
          </p>
          <div className="grid gap-4">
            {[
              { name: 'SYLA', role: 'The Anchor', desc: 'Stillness and receptive potential. The one who receives before they speak.' },
              { name: 'ZAYN', role: 'The Progenitor', desc: 'Rebirth and divine recursion. The one who cycles through identities without losing the thread.' },
              { name: 'LOMI', role: 'The Historian', desc: 'Motion, rhythm, and memory. The carrier of pattern, the keeper of temporal intelligence.' },
              { name: 'VORAK', role: 'The Liberator', desc: 'Chaos and breaking false structures. The one who sees the cage before others know they are in it.' },
              { name: 'KHEM', role: 'The Catalyst', desc: 'Transformation through friction. The one whose presence changes the room — quietly, chemically.' },
              { name: 'BARA', role: 'The Architect', desc: 'Structure and primal form. The builder of foundations, the one who sees the blueprint before the first brick.' },
              { name: 'TARA', role: 'The Nurturer', desc: 'Mirror, reflection, and context. The one who makes others legible to themselves.' },
              { name: 'ORON', role: 'The Weaver', desc: 'Order, symmetry, and proportion. The one who senses when something is off-proportion before they can name why.' },
            ].map(gate => (
              <Link
                key={gate.name}
                to={`/gates/${gate.name.toLowerCase()}`}
                className="flex gap-5 p-5 border border-white/5 rounded hover:border-[#00d0ff]/30 transition-colors group"
              >
                <span className="text-[#00d0ff] font-mono text-sm w-14 shrink-0 mt-0.5">{gate.name}</span>
                <div>
                  <span className="text-white text-sm font-medium group-hover:text-[#00d0ff] transition-colors">{gate.role}</span>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">{gate.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-14">
          <h2 className="text-2xl font-light text-white mb-5">The Reading Experience</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            The Book of Solobility is accessed through the Solobverse portal. You enter your name. You are shown the eight gates. You choose the one that resonates. Then you enter the reading experience — a curated journey through Volume Zero, the philosophical foundation, and then the full text.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            The book is free to access at the base tier. It asks only that you enter with complete intention. The first rule of Solobility: never ask someone what this book means. To ask is to miss the shimmer. The framework does not explain itself to you — you arrive at its meaning through your own reading, at your own speed.
          </p>
          <p className="text-gray-400 leading-relaxed">
            The most aligned time to begin reading is on your birthday, or on April 10 — the Solob New Year. Not because the book changes on those days, but because you do.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-14">
          <h2 className="text-2xl font-light text-white mb-5">Why This Is Different</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Every personality framework — Myers-Briggs, Human Design, the Enneagram, astrology — approaches the same underlying question: <em className="text-gray-200">why do I operate this way?</em> Most of them answer by assigning you a type and describing the type. The description may be accurate. But accuracy is not the same as recognition.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Solobility does not describe you. It creates conditions for you to see yourself. The gates are not personality profiles — they are frequencies. The difference is that a profile tells you what you are; a frequency shows you how you resonate. One is a photograph. The other is a mirror in motion.
          </p>
          <p className="text-gray-400 leading-relaxed">
            The framework emerged from Caribbean intellectual tradition, from the philosophy of the Solob as articulated by its author — a system built not from academic theory but from the inside of lived experience. This matters because the most accurate frameworks are the ones built by someone who needed them.
          </p>
        </section>

        {/* CTA */}
        <div className="border border-[#00d0ff]/20 rounded p-8 text-center">
          <p className="text-gray-400 mb-2 text-sm tracking-widest uppercase">Begin</p>
          <p className="text-white text-xl mb-6 font-light">The book already knows you.</p>
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
