/* =========================================================================
   SAMRIDDHA GANGULY — SITE-WIDE SEARCH, KEYBOARD SHORTCUTS & THEME IRIS
   Drop into repository root as /site-extras.js alongside /search-index.json
   ========================================================================= */
(function () {
  'use strict';

  const DEFAULT_INDEX = [
    {
      title: 'Home — Samriddha Ganguly',
      url: '/',
      section: 'Home',
      summary: 'Quantum condensed matter physics, unconventional superconductivity, topology, and open quantum systems.',
      tags: ['home', 'observatory', 'physics']
    },
    {
      title: 'Research — Layered Superconductors & Topology',
      url: '/research/',
      section: 'Research',
      summary: 'Misfit-layer heterostructures ((PbS)1.13TaS2), 4Hb-TaS2, Lawrence-Doniach models, topological magnons, and CEA Grenoble.',
      tags: ['superconductivity', '4Hb-TaS2', 'PbS', 'CEA Grenoble', 'IISER Bhopal']
    },
    {
      title: 'Decoherence of chiral magnon edge modes in a topological bosonic Chern insulator',
      url: '/publications/',
      section: 'Publications',
      summary: 'Journal of Physics: Condensed Matter, 38, 075801 (2026) — Focus Issue on Topological Physics.',
      tags: ['2026', 'JPCM', 'magnon', 'chirality', 'decoherence', 'topology']
    },
    {
      title: 'Pipeline Leak Identification Using Acoustic Sensing and Deep Learning',
      url: '/publications/',
      section: 'Publications',
      summary: 'IEEE Sensors Letters, 10(1) (2025) — Acoustic sensing and deep learning for pipeline leak severity.',
      tags: ['2025', 'IEEE', 'deep learning', 'acoustic']
    },
    {
      title: 'Curriculum Vitae (CV)',
      url: '/cv/',
      section: 'CV',
      summary: 'BS-MS Physics at IISER Bhopal, research internships, leadership roles, and experimental/computational skills.',
      tags: ['cv', 'education', 'IISER Bhopal', 'skills']
    },
    {
      title: 'Blog & Essays',
      url: '/blog/',
      section: 'Blog',
      summary: 'Essays on condensed matter physics, Yoichiro Nambu and symmetry breaking, and quantum systems.',
      tags: ['blog', 'nambu', 'condensed matter', 'essays']
    },
    {
      title: 'Physics Resources & Library',
      url: '/resources/',
      section: 'Resources',
      summary: 'Curated reference notes, guides, and study material for physics students.',
      tags: ['resources', 'library', 'notes', 'physics']
    },
    {
      title: 'open_board Seminar Series',
      url: '/open_board/',
      section: 'open_board',
      summary: 'Peer-to-peer student knowledge-sharing platform and talk series at IISER Bhopal.',
      tags: ['open_board', 'talks', 'seminars', 'IISER Bhopal']
    },
    {
      title: 'Courses & Academic Record',
      url: '/courses/',
      section: 'Courses',
      summary: 'Graduate and undergraduate coursework in physics and mathematics.',
      tags: ['courses', 'quantum', 'statistical mechanics', 'field theory']
    },
    {
      title: 'Simulations & Visualizers',
      url: '/simulations.html',
      section: 'Simulations',
      summary: 'Interactive browser-based physics visualizers and models.',
      tags: ['simulations', 'interactive', 'models']
    },
    {
      title: 'Gallery',
      url: '/gallery/',
      section: 'Gallery',
      summary: 'Photographs from research visits, conferences, and campus life.',
      tags: ['gallery', 'photos', 'conferences']
    },
    {
      title: 'Reading & Interests',
      url: '/reading/',
      section: 'Reading',
      summary: 'Books on the shelf, literature, and personal curiosities.',
      tags: ['reading', 'books', 'interests']
    },
    {
      title: 'Contact & Correspondence',
      url: '/contact/',
      section: 'Contact',
      summary: 'Academic email (samriddha22@iiserb.ac.in), Google Scholar, GitHub, and LinkedIn.',
      tags: ['contact', 'email', 'scholar', 'github', 'linkedin']
    }
  ];

  const CHORD_ROUTES = {
    h: '/',
    r: '/research/',
    p: '/publications/',
    c: '/cv/',
    b: '/blog/',
    l: '/resources/',
    o: '/contact/'
  };

  const SHORTCUT_LIST = [
    { keys: ['/', '⌘K'], desc: 'Open site search' },
    { keys: ['T'], desc: 'Toggle dark / light theme' },
    { keys: ['G', 'then', 'R'], desc: 'Go to Research' },
    { keys: ['G', 'then', 'P'], desc: 'Go to Publications' },
    { keys: ['G', 'then', 'C'], desc: 'Go to CV' },
    { keys: ['G', 'then', 'B'], desc: 'Go to Blog' },
    { keys: ['G', 'then', 'H'], desc: 'Go to Home' },
    { keys: ['?'], desc: 'Show or hide shortcuts' },
    { keys: ['Esc'], desc: 'Close overlay or panel' }
  ];

  /* -----------------------------------------------------------------------
     1. INJECT STYLES FOR SEARCH MODAL, SHORTCUTS & RADIAL THEME IRIS
     ----------------------------------------------------------------------- */
  function injectStyles() {
    if (document.getElementById('sg-extras-style')) return;
    const style = document.createElement('style');
    style.id = 'sg-extras-style';
    style.textContent = `
      /* Radial iris transition when View Transitions API is supported */
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
      }
      ::view-transition-new(root) {
        animation: sgThemeIris 0.52s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      @keyframes sgThemeIris {
        from { clip-path: circle(0px at var(--sg-tx, 50%) var(--sg-ty, 50%)); }
        to { clip-path: circle(150vmax at var(--sg-tx, 50%) var(--sg-ty, 50%)); }
      }

      /* Fallback sweep overlay for browsers without View Transitions */
      #sg-theme-fallback {
        position: fixed;
        inset: 0;
        z-index: 9998;
        pointer-events: none;
        opacity: 0;
        background: radial-gradient(circle at var(--sg-tx, 50%) var(--sg-ty, 50%), rgba(122, 162, 247, 0.14), transparent 65%);
        transition: opacity 0.38s ease;
      }
      #sg-theme-fallback.is-animating {
        opacity: 1;
      }

      /* Modal Backdrop */
      .sg-modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 2000;
        display: none;
        align-items: flex-start;
        justify-content: center;
        padding: clamp(4.5rem, 10vh, 7rem) 1rem 1.5rem;
        background: rgba(5, 8, 15, 0.62);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }
      .sg-modal-backdrop.is-open {
        display: flex;
      }

      .sg-modal-box {
        width: 100%;
        max-width: 560px;
        max-height: 76dvh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 14px;
        background: var(--bg2, #10151f);
        color: var(--text, #eceff4);
        border: 1px solid var(--border, rgba(122, 162, 247, 0.24));
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
        font-family: var(--sans, 'DM Sans', sans-serif);
      }

      .sg-search-head {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--border, rgba(122, 162, 247, 0.18));
      }

      .sg-search-input {
        flex: 1;
        min-width: 0;
        background: transparent;
        border: none;
        outline: none;
        color: var(--text, #eceff4);
        font-family: var(--sans, 'DM Sans', sans-serif);
        font-size: 0.95rem;
      }
      .sg-search-input::placeholder {
        color: var(--text-dim, #6b7688);
      }

      .sg-kbd {
        font-family: var(--mono, 'DM Mono', monospace);
        font-size: 0.65rem;
        letter-spacing: 0.06em;
        padding: 0.18rem 0.45rem;
        border-radius: 5px;
        border: 1px solid var(--border, rgba(122, 162, 247, 0.24));
        color: var(--text-muted, #9aa5b6);
        background: rgba(122, 162, 247, 0.06);
      }

      .sg-results {
        overflow-y: auto;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }

      .sg-result-item {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        padding: 0.65rem 0.8rem;
        border-radius: 9px;
        text-decoration: none;
        color: inherit;
        border: 1px solid transparent;
        transition: background-color 0.15s ease, border-color 0.15s ease;
      }
      .sg-result-item:hover,
      .sg-result-item.is-selected {
        background: rgba(122, 162, 247, 0.12);
        border-color: var(--border, rgba(122, 162, 247, 0.35));
      }

      .sg-result-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        font-family: var(--mono, 'DM Mono', monospace);
        font-size: 0.62rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--accent, #7aa2f7);
      }

      .sg-result-title {
        font-weight: 500;
        font-size: 0.9rem;
        color: var(--text, #eceff4);
      }

      .sg-result-summary {
        font-size: 0.78rem;
        color: var(--text-muted, #9aa5b6);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .sg-shortcut-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.55rem 0.25rem;
        border-bottom: 1px solid var(--border, rgba(122, 162, 247, 0.12));
        font-size: 0.84rem;
      }
      .sg-shortcut-row:last-child { border-bottom: none; }

      .sg-toast {
        position: fixed;
        bottom: 1.25rem;
        left: 50%;
        transform: translateX(-50%) translateY(12px);
        z-index: 2100;
        padding: 0.45rem 0.9rem;
        border-radius: 9999px;
        font-family: var(--mono, 'DM Mono', monospace);
        font-size: 0.68rem;
        letter-spacing: 0.1em;
        color: var(--text, #eceff4);
        background: var(--bg2, #10151f);
        border: 1px solid var(--border, rgba(122, 162, 247, 0.3));
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.22s ease;
      }
      .sg-toast.is-visible {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      @media (prefers-reduced-motion: reduce) {
        ::view-transition-old(root),
        ::view-transition-new(root),
        #sg-theme-fallback {
          animation: none !important;
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* -----------------------------------------------------------------------
     2. BUILD MODALS & TOAST ELEMENT
     ----------------------------------------------------------------------- */
  let searchBackdrop, searchInput, resultsContainer, shortcutsBackdrop, toastEl;
  let searchIndex = DEFAULT_INDEX.slice();
  let filteredItems = [];
  let selectedIdx = 0;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toastEl.classList.remove('is-visible'), 1500);
  }

  async function loadSearchIndex() {
    try {
      const res = await fetch('/search-index.json', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          searchIndex = data;
        }
      }
    } catch (_) {
      // Keep built-in fallback index when running offline or over file://
    }
  }

  function scoreAndFilter(query) {
    const q = query.trim().toLowerCase();
    if (!q) return searchIndex.slice(0, 8);
    const terms = q.split(/\s+/).filter(Boolean);
    return searchIndex
      .map(item => {
        const hayTitle = (item.title || '').toLowerCase();
        const haySection = (item.section || '').toLowerCase();
        const haySummary = (item.summary || '').toLowerCase();
        const hayTags = (item.tags || []).join(' ').toLowerCase();
        const combined = `${hayTitle} ${haySection} ${haySummary} ${hayTags}`;

        const matchesAll = terms.every(t => combined.includes(t));
        if (!matchesAll) return null;

        let score = 0;
        terms.forEach(t => {
          if (hayTitle.includes(t)) score += 6;
          if (haySection.includes(t)) score += 4;
          if (hayTags.includes(t)) score += 3;
          if (haySummary.includes(t)) score += 1;
        });
        return { item, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(x => x.item);
  }

  function renderResults() {
    filteredItems = scoreAndFilter(searchInput.value);
    selectedIdx = 0;

    if (!filteredItems.length) {
      resultsContainer.innerHTML = `
        <div class="p-4 text-center text-sm" style="color: var(--text-dim, #6b7688);">
          No matching pages, papers, or notes found.
        </div>`;
      return;
    }

    resultsContainer.innerHTML = filteredItems
      .map((item, idx) => `
        <a href="${item.url}" class="sg-result-item ${idx === 0 ? 'is-selected' : ''}" data-idx="${idx}">
          <div class="sg-result-meta">
            <span>${item.section || 'Page'}</span>
            <span>${item.url}</span>
          </div>
          <div class="sg-result-title">${escapeHtml(item.title)}</div>
          <div class="sg-result-summary">${escapeHtml(item.summary || '')}</div>
        </a>
      `)
      .join('');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function setActiveResult(newIdx) {
    if (!filteredItems.length) return;
    selectedIdx = (newIdx + filteredItems.length) % filteredItems.length;
    const nodes = resultsContainer.querySelectorAll('.sg-result-item');
    nodes.forEach((n, i) => {
      const active = i === selectedIdx;
      n.classList.toggle('is-selected', active);
      if (active) n.scrollIntoView({ block: 'nearest' });
    });
  }

  function openSearchModal() {
    closeAllOverlays();
    searchBackdrop.classList.add('is-open');
    renderResults();
    requestAnimationFrame(() => {
      searchInput.focus();
      searchInput.select();
    });
  }

  function toggleShortcutsModal() {
    const willOpen = !shortcutsBackdrop.classList.contains('is-open');
    closeAllOverlays();
    if (willOpen) shortcutsBackdrop.classList.add('is-open');
  }

  function closeAllOverlays() {
    if (searchBackdrop) searchBackdrop.classList.remove('is-open');
    if (shortcutsBackdrop) shortcutsBackdrop.classList.remove('is-open');
  }

  function buildUI() {
    const fallback = document.createElement('div');
    fallback.id = 'sg-theme-fallback';
    document.body.appendChild(fallback);

    searchBackdrop = document.createElement('div');
    searchBackdrop.className = 'sg-modal-backdrop';
    searchBackdrop.setAttribute('role', 'dialog');
    searchBackdrop.setAttribute('aria-modal', 'true');
    searchBackdrop.setAttribute('aria-label', 'Search website');
    searchBackdrop.innerHTML = `
      <div class="sg-modal-box">
        <div class="sg-search-head">
          <span class="sg-kbd">/</span>
          <input id="sg-search-input" class="sg-search-input" type="search" placeholder="Search research, papers, open_board, courses, blog..." autocomplete="off" />
          <button id="sg-search-close" type="button" class="sg-kbd" style="cursor:pointer;">ESC</button>
        </div>
        <div id="sg-search-results" class="sg-results"></div>
      </div>
    `;
    document.body.appendChild(searchBackdrop);

    searchInput = document.getElementById('sg-search-input');
    resultsContainer = document.getElementById('sg-search-results');

    searchInput.addEventListener('input', renderResults);
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveResult(selectedIdx + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveResult(selectedIdx - 1);
      } else if (e.key === 'Enter' && filteredItems[selectedIdx]) {
        e.preventDefault();
        window.location.href = filteredItems[selectedIdx].url;
      }
    });

    document.getElementById('sg-search-close').addEventListener('click', closeAllOverlays);
    searchBackdrop.addEventListener('click', (e) => {
      if (e.target === searchBackdrop) closeAllOverlays();
    });

    shortcutsBackdrop = document.createElement('div');
    shortcutsBackdrop.className = 'sg-modal-backdrop';
    shortcutsBackdrop.setAttribute('role', 'dialog');
    shortcutsBackdrop.setAttribute('aria-modal', 'true');
    shortcutsBackdrop.setAttribute('aria-label', 'Keyboard shortcuts');
    shortcutsBackdrop.innerHTML = `
      <div class="sg-modal-box" style="max-width:440px;">
        <div class="sg-search-head" style="justify-content:space-between;">
          <span style="font-size:0.78rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent,#7aa2f7);font-family:var(--mono,'DM Mono',monospace);">
            Keyboard Shortcuts
          </span>
          <button id="sg-shortcuts-close" type="button" class="sg-kbd" style="cursor:pointer;">ESC</button>
        </div>
        <div class="sg-results">
          ${SHORTCUT_LIST.map(row => `
            <div class="sg-shortcut-row">
              <span style="color:var(--text-muted,#9aa5b6);">${row.desc}</span>
              <span style="display:inline-flex;align-items:center;gap:0.25rem;">
                ${row.keys.map(k => k === 'then'
                  ? `<span style="font-size:0.7rem;color:var(--text-dim,#6b7688);">then</span>`
                  : `<kbd class="sg-kbd">${k}</kbd>`
                ).join('')}
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    document.body.appendChild(shortcutsBackdrop);

    document.getElementById('sg-shortcuts-close').addEventListener('click', closeAllOverlays);
    shortcutsBackdrop.addEventListener('click', (e) => {
      if (e.target === shortcutsBackdrop) closeAllOverlays();
    });

    toastEl = document.createElement('div');
    toastEl.className = 'sg-toast';
    document.body.appendChild(toastEl);
  }

  /* -----------------------------------------------------------------------
     3. RADIAL THEME TRANSITION CONTROLLER
     ----------------------------------------------------------------------- */
  function applyThemeState(nextTheme) {
    document.body.classList.toggle('light', nextTheme === 'light');
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);

    const legacyToggleBtn = document.getElementById('themeBtn');
    if (legacyToggleBtn) {
      legacyToggleBtn.textContent = nextTheme === 'light' ? 'DARK' : 'LIGHT';
    }

    window.dispatchEvent(new CustomEvent('site-theme-changed', { detail: { theme: nextTheme } }));
  }

  window.SGExtras = {
    openSearch: openSearchModal,
    openShortcuts: toggleShortcutsModal,
    toggleTheme: function (event) {
      const isLight = document.body.classList.contains('light') ||
                      document.documentElement.getAttribute('data-theme') === 'light';
      const nextTheme = isLight ? 'dark' : 'light';

      const x = (event && typeof event.clientX === 'number' && event.clientX > 0) ? `${event.clientX}px` : '50%';
      const y = (event && typeof event.clientY === 'number' && event.clientY > 0) ? `${event.clientY}px` : '50%';
      document.documentElement.style.setProperty('--sg-tx', x);
      document.documentElement.style.setProperty('--sg-ty', y);

      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (document.startViewTransition && !reduced) {
        document.startViewTransition(() => applyThemeState(nextTheme));
      } else {
        applyThemeState(nextTheme);
        const fb = document.getElementById('sg-theme-fallback');
        if (fb && !reduced) {
          fb.classList.add('is-animating');
          setTimeout(() => fb.classList.remove('is-animating'), 420);
        }
      }
      showToast(`THEME: ${nextTheme.toUpperCase()}`);
    }
  };

  /* -----------------------------------------------------------------------
     4. GLOBAL KEYBOARD SHORTCUTS
     ----------------------------------------------------------------------- */
  let awaitingChord = false;
  let chordTimeout = null;

  function bindGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
      const active = document.activeElement;
      const tag = active ? active.tagName : '';
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' ||
                       Boolean(active && active.isContentEditable);

      if (e.key === 'Escape') {
        if (
          (searchBackdrop && searchBackdrop.classList.contains('is-open')) ||
          (shortcutsBackdrop && shortcutsBackdrop.classList.contains('is-open'))
        ) {
          e.stopImmediatePropagation();
          closeAllOverlays();
        }
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
        return;
      }

      if (isTyping || e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();

      if (e.key === '/') {
        e.preventDefault();
        openSearchModal();
      } else if (e.key === '?') {
        e.preventDefault();
        toggleShortcutsModal();
      } else if (key === 't') {
        e.preventDefault();
        window.SGExtras.toggleTheme(e);
      } else if (key === 'g') {
        awaitingChord = true;
        clearTimeout(chordTimeout);
        showToast('GO TO: R RESEARCH · P PUBS · C CV · B BLOG · H HOME');
        chordTimeout = setTimeout(() => { awaitingChord = false; }, 1100);
      } else if (awaitingChord) {
        awaitingChord = false;
        clearTimeout(chordTimeout);
        if (CHORD_ROUTES[key]) {
          window.location.href = CHORD_ROUTES[key];
        }
      }
    }, true);
  }

  function init() {
    injectStyles();
    buildUI();
    bindGlobalShortcuts();
    loadSearchIndex();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
