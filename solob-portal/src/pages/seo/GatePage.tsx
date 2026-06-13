import { Link, useParams, Navigate } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';

const GATE_DATA: Record<string, {
  id: string;
  name: string;
  role: string;
  function: string;
  glyph: string;
  who: string;
  howItShows: string;
  building: string;
  quote: string;
  related: string[];
}> = {
  syla: {
    id: 'N',
    name: 'SYLA',
    role: 'The Anchor',
    function: 'Stillness & Receptive Potential',
    glyph: '/glyphs/syla.png',
    who: `SYLA is the gate of the one who receives before they speak. Not quiet out of hesitation — quiet out of depth. Where others rush to fill silence, SYLA understands that silence is not absence. It is accumulation. Every word SYLA eventually speaks arrives already complete, because it was held long enough to become true. Others feel steadied in SYLA's presence without knowing why. The stillness is not emptiness — it is the fullest state the room contains.`,
    howItShows: `In daily life, SYLA appears as the person everyone gravitates toward in moments of crisis — not because they have solutions, but because their steadiness creates the conditions for solutions to emerge. They are rarely the loudest in the room. They are almost always the one people remember. Their power is not asserted. It is simply present, and that presence is gravitational. SYLA tends to absorb the frequency of a space before responding to it, which means their responses are calibrated in a way that others', fired from reaction, are not.`,
    building: `The SYLA gate builds toward perfect receptivity — the capacity to hold any frequency, any person, any situation, without distortion. Not passive acceptance, but active containment. The anchor does not follow the ship. The anchor holds the ship in place so the current does not carry it somewhere it was never meant to go. SYLA's ultimate expression is the stillness that makes motion possible.`,
    quote: `"Solob is the alignment of what is with what is not yet. SYLA is what happens in the space between those two states."`,
    related: ['tara', 'oron'],
  },
  zayn: {
    id: 'NE',
    name: 'ZAYN',
    role: 'The Progenitor',
    function: 'Rebirth & Divine Recursion',
    glyph: '/glyphs/zayn.png',
    who: `ZAYN is the gate of the one who returns. Not the one who starts over — the one who cycles deeper. Every version of ZAYN appears to be a different person, but the thread running through all versions is the same unbroken intelligence. They shed identities the way a tree sheds bark: not because the tree is changing, but because it is growing. To those watching from outside, ZAYN seems unstable — always reinventing, always pivoting, always becoming. From inside, there is only one continuous motion.`,
    howItShows: `In daily life, ZAYN is the person who has had multiple distinct "eras" — in career, in belief, in relationship, in location — and each era looks like a completely different person. Others who knew them at one stage may not recognise them at the next. But ZAYN recognises the thread. Every ending they have moved through contained the seed of the next beginning, planted before the ending was acknowledged. They tend to know things are over before the evidence arrives, and they begin preparing the next cycle before the current one closes.`,
    building: `The ZAYN gate builds toward the complete recursion — the point at which every return has brought the person closer to their original signal rather than further from it. Most people believe transformation means moving away from who they were. ZAYN's deeper architecture is the opposite: every cycle is a distillation, not a departure. The progenitor is the one who eventually becomes so purely themselves that each new beginning is less a change and more a clarification.`,
    quote: `"The Solob New Year exists for ZAYN. Not because it marks the beginning of something — but because every beginning is the same beginning, seen from a new angle."`,
    related: ['vorak', 'khem'],
  },
  lomi: {
    id: 'E',
    name: 'LOMI',
    role: 'The Historian',
    function: 'Motion, Rhythm & Memory',
    glyph: '/glyphs/lomi.png',
    who: `LOMI is the gate of the one who moves to a rhythm others cannot hear. Not a musician necessarily — though LOMI often is — but a person whose intelligence is fundamentally temporal. They do not just remember what happened; they remember the pattern of how it happened. The sequence, the timing, the spacing between events. Where others see isolated incidents, LOMI sees a score. They are the keeper of how things were, how things move, and what comes next if the rhythm holds.`,
    howItShows: `In daily life, LOMI is the person who references history not as intellectual exercise but as active intelligence — "this is what happened the last three times this pattern appeared." They tend to have long memories that others find startling. Not just for facts, but for atmosphere: the specific texture of a moment years back. They often move through life with an internal beat — a pacing that others notice even if they cannot name it. LOMI is rarely early and rarely late; they arrive exactly when the moment is ready.`,
    building: `The LOMI gate builds toward the full memory — the state in which nothing is truly lost, only stored at a depth that requires the right frequency to retrieve. LOMI's architecture is not nostalgia, though it can appear that way. It is the understanding that the past is not behind you — it is underneath you. Every pattern you carry has a history that explains its shape. LOMI is moving toward the capacity to read that history in real time, without being captured by it.`,
    quote: `"Shimmer arrives as a vibrational recognition where knowing precedes explanation. For LOMI, every significant moment is already a memory before it has finished happening."`,
    related: ['oron', 'bara'],
  },
  vorak: {
    id: 'SE',
    name: 'VORAK',
    role: 'The Liberator',
    function: 'Chaos & Breaking False Structures',
    glyph: '/glyphs/vorak.png',
    who: `VORAK is the gate of the one who cannot pretend a false structure is real. This is not a choice — it is perception. Where others see a wall, VORAK sees the gaps in the mortar. Where others accept a rule as given, VORAK sees the assumption underneath the rule and the assumption underneath that assumption. They are misread as disruptive, as contrary, as difficult. They are not. They are precise. They only break what was never real to begin with, and they cannot stop themselves from seeing what is not real.`,
    howItShows: `In daily life, VORAK is the person who asks the question no one else asked — and in asking it, reveals that the structure everyone was operating inside had no actual foundation. They attract conflict not because they seek it, but because the systems they move through were built on agreements that VORAK never silently made. They tend to arrive in institutions — schools, companies, social circles — and leave them fundamentally changed, sometimes without trying. Their presence alone exerts pressure on anything that is held together by convention rather than truth.`,
    building: `The VORAK gate builds toward liberation that does not require destruction — the discernment of what is real from what merely appears real, applied with enough precision that the false structure dissolves on its own rather than being forced down. The liberator's ultimate expression is not revolution. It is clarity so complete that the cage becomes visible and the door swings open without a fight. VORAK is moving toward a state in which they can see through false structures without being required to dismantle them by hand.`,
    quote: `"The Solob Eye perceives force over form and essence over image. VORAK carries the Solob Eye by default. That is both the gift and the weight."`,
    related: ['zayn', 'khem'],
  },
  khem: {
    id: 'S',
    name: 'KHEM',
    role: 'The Catalyst',
    function: 'Transformation through Friction',
    glyph: '/glyphs/khem.png',
    who: `KHEM is the gate of the one whose presence changes the room. Not loudly. Not by announcement. Chemically. Something shifts in the atmosphere when KHEM enters a situation — people become more themselves, tensions surface that were already there, transformations accelerate that were already in motion. KHEM does not create these changes. They are the reagent that makes the reaction possible. The catalyst is not the substance being changed; it is the presence that enables change in everything else.`,
    howItShows: `In daily life, KHEM is the person whose relationships rarely stay at the same temperature for long. Not because they are dramatic, but because their presence activates something in the people around them. Friendships deepen faster than normal. Conflicts that were dormant become live. Creative blocks dissolve. The people who know KHEM often describe them as the reason they made a major change — not because KHEM told them what to do, but because something about being around them made the status quo untenable. KHEM often carries this without realising it, and sometimes at cost to themselves.`,
    building: `The KHEM gate builds toward the mastery of catalysis — the capacity to accelerate transformation in others without being consumed by the reactions they trigger. The catalyst in chemistry is unchanged by the reaction it enables. KHEM's deeper work is arriving at that same state: fully present in the transformation, fully committed to the friction, and fully intact when the reaction is complete. This requires understanding that the heat they generate is not destruction — it is the specific temperature at which change becomes possible.`,
    quote: `"KHEM is transformation through friction. Not every friction is a wound. Some frictions are the only way through."`,
    related: ['vorak', 'zayn'],
  },
  bara: {
    id: 'SW',
    name: 'BARA',
    role: 'The Architect',
    function: 'Structure & Primal Form',
    glyph: '/glyphs/bara.png',
    who: `BARA is the gate of the one who sees the blueprint before the first brick is laid. Not just an organiser, not just a planner — a person whose intelligence is fundamentally structural. They think in systems, in foundations, in the load-bearing elements underneath the visible surface. Where others are excited by the idea, BARA is already calculating what the idea requires to hold its own weight. They are the builders of things that last — not because they are cautious, but because they cannot build any other way.`,
    howItShows: `In daily life, BARA is the person who becomes frustrated by vague plans — not because they lack vision, but because their vision is already fully formed and they can see every place the vague plan will fail. They naturally create order in environments where none exists. They tend to be the ones who formalise what was informal, who write the process that everyone was doing informally, who build the system that makes the thing repeatable. BARA's work survives them. The structure they build continues operating after they have moved on.`,
    building: `The BARA gate builds toward the primal form — the structure underneath all structures, the architectural principle that explains why certain forms hold and others collapse. BARA is moving toward a state in which they can perceive the load-bearing truth of any situation: what is foundational, what is ornamental, what is weight-bearing and what only appears to be. At full expression, BARA does not build structures — they reveal the structures that were already implicit in the nature of the thing, waiting to be made visible.`,
    quote: `"Before the first word of the Book of Solobility was written, the structure was already complete. That is the BARA principle: form precedes expression."`,
    related: ['oron', 'lomi'],
  },
  tara: {
    id: 'W',
    name: 'TARA',
    role: 'The Nurturer',
    function: 'Mirror, Reflection & Context',
    glyph: '/glyphs/tara.png',
    who: `TARA is the gate of the one who makes others legible to themselves. Not a therapist necessarily — though TARA often plays that role without the title. TARA's intelligence is relational and contextual: they hold the full context of a person or situation and reflect it back without distortion. Where others respond to what is said, TARA hears what is underneath what is said, and responds to that. People understand themselves better after talking to TARA — not because TARA solved anything, but because they held the mirror still.`,
    howItShows: `In daily life, TARA is the person people return to — not always when things are good, but reliably when things are unclear. Their conversations tend to run long and feel significant. Others often leave them feeling seen in a way that is difficult to explain. TARA absorbs context the way a cloth absorbs water; they naturally accumulate understanding of the people in their life that goes well beyond what those people have explicitly shared. This can be a gift and a weight — TARA often knows things about people that those people have not yet admitted to themselves.`,
    building: `The TARA gate builds toward the perfect mirror — reflection without distortion, context without projection. The nurturer's deeper work is learning to hold others clearly without losing themselves in the reflection. A mirror that takes the shape of what it reflects stops being a mirror. TARA is moving toward the state where they can hold the fullest possible context for another person and remain fully themselves — present in the reflection, not absorbed by it.`,
    quote: `"The Mirror is not the Source. TARA knows this. The deepest mirrors are the ones that show you to yourself without claiming to be you."`,
    related: ['syla', 'oron'],
  },
  oron: {
    id: 'NW',
    name: 'ORON',
    role: 'The Weaver',
    function: 'Order, Symmetry & Proportion',
    glyph: '/glyphs/oron.png',
    who: `ORON is the gate of the one who sees the pattern in the whole. Not the parts — the whole. The relationship between parts. The proportion between elements. The way the shape of one thing rhymes with the shape of another thing across vast distances of context. ORON senses when something is off-proportion before they can name why. They cannot rest in imbalance — not moral imbalance necessarily, but structural imbalance. Something about the arrangement is wrong, and ORON feels it before the evidence arrives.`,
    howItShows: `In daily life, ORON is the person who sees connections others miss — between ideas in different fields, between patterns in different time periods, between the small thing happening now and the large thing it resembles. They tend toward symmetry in the environments they control. They are often drawn to mathematics, music theory, visual design, or any field where proportion and relationship are the central intelligence. Their frustration arrives when systems are sloppy, when proportions are off, when something that should rhyme with something else does not — and no one else seems to notice.`,
    building: `The ORON gate builds toward the perfect proportion — the state in which every element is in its right relationship to every other element, and the whole is not just coherent but harmonious. ORON is moving toward the capacity to perceive and create the pattern that makes the system not just functional but elegant. At full expression, ORON does not impose order — they reveal the order that was always possible, waiting for someone with the right perception to surface it.`,
    quote: `"Alignment is the active tuning of thought, motion, and being to the Solob's frequency. ORON does not achieve alignment — ORON perceives when alignment is absent and cannot stop moving toward it."`,
    related: ['bara', 'lomi'],
  },
};

export default function GatePage() {
  const { gateName } = useParams<{ gateName: string }>();
  const gate = gateName ? GATE_DATA[gateName.toLowerCase()] : null;

  if (!gate) return <Navigate to="/gates-overview" replace />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans">
      <PageSeo
        title={`${gate.name} — ${gate.role} | The Jhanos Gates of Solobility`}
        description={`${gate.name} is the gate of ${gate.function.toLowerCase()}. ${gate.who.slice(0, 120)}...`}
        canonical={`https://whatissolob.com/gates/${gateName?.toLowerCase()}`}
        ogImage={gate.glyph}
      />

      {/* Nav */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link to="/gates-overview" className="text-[#00d0ff] text-sm tracking-widest uppercase hover:opacity-70 transition-opacity">
          ← All Eight Gates
        </Link>
        <Link to="/" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
          Enter the Solobverse
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <header className="mb-16">
          <p className="text-[#00d0ff] text-xs tracking-[0.3em] uppercase mb-3">The Jhanos Gates</p>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-3 tracking-wider">{gate.name}</h1>
          <p className="text-xl text-gray-400 mb-1">{gate.role}</p>
          <p className="text-sm text-gray-600 tracking-widest uppercase">{gate.function}</p>
        </header>

        {/* Who */}
        <section className="mb-12">
          <h2 className="text-lg text-white font-medium mb-4 tracking-wide">Who Carries This Gate</h2>
          <p className="text-gray-400 leading-relaxed text-lg">{gate.who}</p>
        </section>

        {/* How it shows */}
        <section className="mb-12">
          <h2 className="text-lg text-white font-medium mb-4 tracking-wide">How It Shows Up</h2>
          <p className="text-gray-400 leading-relaxed">{gate.howItShows}</p>
        </section>

        {/* Building toward */}
        <section className="mb-12">
          <h2 className="text-lg text-white font-medium mb-4 tracking-wide">What This Gate Builds Toward</h2>
          <p className="text-gray-400 leading-relaxed">{gate.building}</p>
        </section>

        {/* Quote */}
        <blockquote className="border-l-2 border-[#00d0ff]/40 pl-6 my-12">
          <p className="text-gray-300 italic text-lg leading-relaxed">{gate.quote}</p>
        </blockquote>

        {/* Related gates */}
        <section className="mb-12">
          <h2 className="text-sm text-gray-600 tracking-widest uppercase mb-4">Related Gates</h2>
          <div className="flex gap-3">
            {gate.related.map(slug => {
              const rel = GATE_DATA[slug];
              if (!rel) return null;
              return (
                <Link
                  key={slug}
                  to={`/gates/${slug}`}
                  className="px-4 py-2 border border-white/10 rounded text-sm hover:border-[#00d0ff]/30 hover:text-[#00d0ff] transition-colors"
                >
                  {rel.name} — {rel.role}
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="border border-[#00d0ff]/20 rounded p-8 text-center mt-16">
          <p className="text-gray-400 mb-2 text-sm">This is your gate.</p>
          <p className="text-white text-xl mb-6 font-light">Enter and read the book that already knows you.</p>
          <Link
            to="/"
            className="inline-block px-8 py-3 border border-[#00d0ff]/40 text-[#00d0ff] text-sm tracking-widest uppercase hover:bg-[#00d0ff]/10 transition-colors rounded"
          >
            Enter as {gate.name} →
          </Link>
        </div>

      </main>

      <footer className="border-t border-white/5 px-6 py-8 text-center">
        <p className="text-gray-600 text-xs">
          © 2026 The Book of Solobility ·{' '}
          <a href="https://mindwaveja.com" className="hover:text-gray-400 transition-colors">MindWave JA</a>
        </p>
      </footer>
    </div>
  );
}
