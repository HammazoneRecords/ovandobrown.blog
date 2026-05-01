/**
 * Logic check config — whatissolob.com (solob-portal)
 *
 * Run: node ../playground/2026-04-logic-check/logic-check.js logic-check.config.js
 *   (from the solob-portal/ directory, with the dev server running at port 3000)
 *
 * Or against production: set baseUrl to https://whatissolob.com
 */

export default {
  name: 'whatissolob.com',
  baseUrl: 'http://localhost:3000',

  checks: [

    // ── SEO pages ─────────────────────────────────────────────────────────────

    {
      id: 'home',
      route: '/',
      expect: {
        elements: ['input', 'button'],
      },
    },

    {
      id: 'about',
      route: '/about',
      expect: {
        title: 'What Is Solobility',
        metaDescription: 'philosophical framework',
        h1: 'What Is Solobility',
        elements: ['nav', 'main', 'footer', 'h2'],
      },
    },

    {
      id: 'gates-overview',
      route: '/gates-overview',
      expect: {
        title: 'Eight Jhanos Gates',
        metaDescription: 'archetypal gates',
        h1: 'Eight Jhanos Gates',
        elements: ['nav', 'main', 'a[href="/gates/syla"]', 'a[href="/gates/oron"]'],
      },
    },

    {
      id: 'glossary',
      route: '/glossary',
      expect: {
        title: 'Solobic Glossary',
        metaDescription: 'Solob',
        h1: 'Solobic Glossary',
        elements: ['nav', 'main', 'footer'],
        bodyContains: 'Shimmer',
      },
    },

    // ── Individual gate pages ─────────────────────────────────────────────────

    {
      id: 'gate-syla',
      route: '/gates/syla',
      expect: {
        title: 'SYLA',
        metaDescription: 'stillness',
        h1: 'SYLA',
        elements: ['nav', 'blockquote'],
        bodyContains: 'The Anchor',
      },
    },

    {
      id: 'gate-vorak',
      route: '/gates/vorak',
      expect: {
        title: 'VORAK',
        h1: 'VORAK',
        bodyContains: 'Liberator',
      },
    },

    {
      id: 'gate-oron',
      route: '/gates/oron',
      expect: {
        title: 'ORON',
        h1: 'ORON',
        bodyContains: 'Weaver',
      },
    },

    // ── Unknown gate — should redirect to overview ────────────────────────────

    {
      id: 'gate-unknown-redirects',
      type: 'redirect',
      route: '/gates/notagate',
      expect: {
        redirectsTo: '/gates-overview',
      },
    },

    // ── Protected routes — should redirect when no session ────────────────────

    {
      id: 'protected-gates-redirects',
      type: 'redirect',
      route: '/gates',
      expect: {
        redirectsTo: '/',
      },
    },

    {
      id: 'protected-offering-redirects',
      type: 'redirect',
      route: '/offering',
      expect: {
        redirectsTo: '/',
      },
    },

    // ── API health ────────────────────────────────────────────────────────────

    {
      id: 'api-health',
      type: 'api',
      route: '/api/health',
      expect: {
        status: 200,
        bodyContains: 'ok',
      },
    },

    // ── Sitemap and robots served ─────────────────────────────────────────────

    {
      id: 'sitemap-xml',
      type: 'api',
      route: '/sitemap.xml',
      expect: {
        status: 200,
        bodyContains: 'whatissolob.com',
      },
    },

    {
      id: 'robots-txt',
      type: 'api',
      route: '/robots.txt',
      expect: {
        status: 200,
        bodyContains: 'Sitemap',
      },
    },

  ],
};
