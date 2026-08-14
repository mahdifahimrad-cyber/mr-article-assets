/* mrc build: 2026-08-13 22:27 */
(() => {
  'use strict';
  window.__mrcBuild = '2026-08-13 22:27';
  function detectLang(el) {
    const override = (el.getAttribute('locale-lang') || '').toLowerCase();
    if (override === 'fa' || override === 'en') return override;
    const html = document.documentElement;
    if ((html.lang || '').toLowerCase().startsWith('fa')) return 'fa';
    if (html.dir === 'rtl') return 'fa';
    return 'en';
  }
  const langTargets = new Set();
  const trackLang = (el) => langTargets.add(el);
  const untrackLang = (el) => langTargets.delete(el);
  new MutationObserver(() => {
    langTargets.forEach((el) => el.setLang(detectLang(el)));
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
  {
      const STRINGS = {
        en: { pageTitle: 'Financial Tools' },
        fa: { pageTitle: 'ابزارهای مالی' }
      };
      function asksSomething(el) {
        if (!el) return false;
        const parts = el.querySelectorAll('[data-lang]');
        const texts = parts.length ? [...parts].map((p) => p.textContent) : [el.textContent];
        return texts.some((t) => /[?؟]\s*$/.test((t || '').trim()));
      }
      const HOST_PAGE_TITLE_SELECTOR = 'section.bg-navy-950';
      const SLUG_ATTR = 'data-mrc-slug';
      const HEADER_TITLE_CLASS = 'mrc-header__title';
      const DEBUG_VARS = {
        offsetTop: { cssVar: '--mrc-offset-top', unit: 'px' },
        contentWidth: { cssVar: '--mrc-content-width', unit: 'px' },
        shellPadding: { cssVar: '--mrc-shell-padding', unit: 'px' }
      };
      const template = document.createElement('template');
      template.innerHTML = `
    <style>
      :host {
        --mrc-color-primary: #126b99;
        --mrc-color-primary-dark: #0a1628;
        --mrc-color-background: #faf7f0;
        --mrc-color-surface: #ffffff;
        --mrc-color-surface-soft: #f4f0e6;
        --mrc-color-text: #0a1628;
        --mrc-color-text-muted: #5b6473;
        --mrc-color-border: #ebe4d4;
        --mrc-body-surface: #fdfbf6;
        --mrc-card-surface: #ffffff;
        --mrc-body-overlap: 56px;
        --mrc-body-inset: 56px;
        --mrc-header-height-pad: 64px;
        --mrc-header-title-measure: 26ch;
        --mrc-shell-bg-mid: #f7f2e4;
        --mrc-shell-bg-end: #efe7d6;
        --mrc-header-fg: #ffffff;
        --mrc-header-bg-mid: #0f2a44;
        --mrc-header-bg-end: #126b99;
        --mrc-header-edge: rgba(201, 162, 39, 0.28);
        --mrc-header-glow: rgba(255, 255, 255, 0.16);
        --mrc-header-line: rgba(255, 255, 255, 0.13);
        --mrc-header-grid: rgba(255, 255, 255, 0.05);
        --mrc-header-dot:  rgba(255, 255, 255, 0.16);
        --mrc-header-ring-weight: 1px;
        --mrc-header-grid-gap: 46px;
        --mrc-header-dot-gap: 46px;
        --mrc-radius-sm: 8px;
        --mrc-radius-md: 14px;
        --mrc-radius-lg: 20px;
        --mrc-shadow-sm: 0 4px 14px rgba(0, 0, 0, 0.06);
        --mrc-shadow-md: 0 12px 30px rgba(0, 0, 0, 0.09);
        --mrc-space-1: 4px;
        --mrc-space-2: 8px;
        --mrc-space-3: 12px;
        --mrc-space-4: 16px;
        --mrc-space-5: 20px;
        --mrc-space-6: 24px;
        --mrc-offset-top: -18px;
        --mrc-content-width: 1180px;
        --mrc-shell-padding: 8px;
        --mrc-container-mobile-gap: -6px;
        --mrc-container-mobile-overflow: calc(var(--mrc-shell-padding) - var(--mrc-container-mobile-gap));
        display: block;
        width: auto;
        max-width: none;
        margin-inline: calc(50% - 50vw);
        overflow-x: clip;
        font-family: var(--mrc-font-family, inherit);
        color: var(--mrc-color-text);
        background: transparent;
        line-height: 1.5;
      }
      * { box-sizing: border-box; }
      .mrc-shell {
        margin-block-start: var(--mrc-offset-top);
        min-height: 100vh;
        background: linear-gradient(180deg, var(--mrc-color-background) 0%, var(--mrc-shell-bg-mid) 46%, var(--mrc-shell-bg-end) 100%);
        padding: var(--mrc-shell-padding);
      }
      .mrc-container {
        width: min(100%, var(--mrc-content-width));
        margin-inline: auto;
        padding-inline: var(--mrc-space-5);
      }
      @media (max-width: 767px) {
        .mrc-container {
          padding-inline: var(--mrc-space-4);
          width: calc(100% + 2 * var(--mrc-container-mobile-overflow));
          margin-inline: calc(-1 * var(--mrc-container-mobile-overflow));
        }
        :host {
          --mrc-body-overlap: 26px;
          --mrc-body-inset: 10px;
        }
      }
      .mrc-header {
        position: relative;
        overflow: hidden;
        isolation: isolate;
        padding: var(--mrc-header-height-pad) var(--mrc-space-5)
                 calc(var(--mrc-header-height-pad) + var(--mrc-body-overlap));
        border-radius: var(--mrc-radius-md);
        color: var(--mrc-header-fg);
        background: linear-gradient(105deg, var(--mrc-color-primary-dark) 0%, var(--mrc-header-bg-mid) 52%, var(--mrc-header-bg-end) 100%);
        box-shadow: var(--mrc-shadow-md);
        border: 1px solid var(--mrc-header-edge);
        text-align: start;
      }
      .mrc-header::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(130% 100% at 10% -15%, var(--mrc-header-glow), transparent 62%),
          radial-gradient(circle at 12% 18%, transparent calc(84px - var(--mrc-header-ring-weight)),
            var(--mrc-header-line) calc(84px - var(--mrc-header-ring-weight)) 84px, transparent 84px),
          radial-gradient(circle at 34% 86%, transparent calc(120px - var(--mrc-header-ring-weight)),
            var(--mrc-header-line) calc(120px - var(--mrc-header-ring-weight)) 120px, transparent 120px),
          radial-gradient(circle at 68% 8%, transparent calc(56px - var(--mrc-header-ring-weight)),
            var(--mrc-header-line) calc(56px - var(--mrc-header-ring-weight)) 56px, transparent 56px),
          radial-gradient(circle at 88% 74%, transparent calc(150px - var(--mrc-header-ring-weight)),
            var(--mrc-header-line) calc(150px - var(--mrc-header-ring-weight)) 150px, transparent 150px),
          radial-gradient(circle at 52% 52%, transparent calc(38px - var(--mrc-header-ring-weight)),
            var(--mrc-header-line) calc(38px - var(--mrc-header-ring-weight)) 38px, transparent 38px),
          radial-gradient(circle, var(--mrc-header-dot) 0 1px, transparent 1px),
          repeating-linear-gradient(38deg, transparent 0 calc(var(--mrc-header-grid-gap) - 1px),
            var(--mrc-header-grid) calc(var(--mrc-header-grid-gap) - 1px) var(--mrc-header-grid-gap)),
          repeating-linear-gradient(-38deg, transparent 0 calc(var(--mrc-header-grid-gap) - 1px),
            var(--mrc-header-grid) calc(var(--mrc-header-grid-gap) - 1px) var(--mrc-header-grid-gap));
        background-size:
          auto,
          auto, auto, auto, auto, auto,
          var(--mrc-header-dot-gap) var(--mrc-header-dot-gap),
          auto, auto;
      }
      :host([dir="rtl"]) .mrc-header::before { transform: scaleX(-1); }
      @media (min-width: 768px) {
        .mrc-header {
          min-height: calc(100svh - var(--mrc-header-tail, 582px));
          display: grid;
          align-content: center;
        }
      }
      :host([show-header="false"]) .mrc-header { display: none; }
      .mrc-header__title {
        position: relative;
        margin: 0;
        max-width: var(--mrc-header-title-measure);
        font-size: clamp(1.6rem, 4vw, 2.6rem);
        line-height: 1.34;
      }
      .mrc-intro {
        position: relative;
        margin-top: calc(-1 * var(--mrc-body-overlap));
        margin-inline: var(--mrc-body-inset);
        padding: var(--mrc-space-5);
        border: 1px solid var(--mrc-color-border);
        border-radius: var(--mrc-radius-lg);
        background: var(--mrc-card-surface);
        box-shadow: var(--mrc-shadow-md);
        color: var(--mrc-color-text);
        text-align: start;
      }
      .mrc-intro[hidden] { display: none; }
      @media (min-width: 768px) {
        .mrc-intro { padding: calc(var(--mrc-space-5) + var(--mrc-body-padding-desktop-extra)); }
      }
      .mrc-body-row {
        display: block;
        margin-top: calc(-1 * var(--mrc-body-overlap));
      }
      .mrc-side { display: contents; }
      ::slotted(*) { scroll-margin-top: 90px; }
      .mrc-body {
        min-height: 1600px;
        padding: var(--mrc-space-5);
        border: 1px solid var(--mrc-color-border);
        border-radius: var(--mrc-radius-lg);
        background: var(--mrc-body-surface);
        color: var(--mrc-color-text);
        font-size: 0.95rem;
        text-align: start;
      }
      @media (min-width: 768px) {
        :host { --mrc-body-padding-desktop-extra: 20px; }
        .mrc-body { padding: calc(var(--mrc-space-5) + var(--mrc-body-padding-desktop-extra)); }
      }
      .mrc-debug {
        display: none;
        margin-top: var(--mrc-space-3);
        padding: var(--mrc-space-3);
        border: 1px dashed var(--mrc-color-primary);
        border-radius: var(--mrc-radius-sm);
        background: var(--mrc-color-surface-soft);
        color: var(--mrc-color-text-muted);
        font-size: 0.72rem;
        direction: ltr;
        text-align: start;
      }
      :host([debug]) .mrc-debug { display: block; }
      .mrc-debug code { color: var(--mrc-color-primary-dark); font-weight: 700; }
      .mrc-debug-row {
        display: flex;
        align-items: center;
        gap: var(--mrc-space-2);
        margin-top: var(--mrc-space-2);
      }
      .mrc-debug-row:first-child { margin-top: 0; }
      .mrc-debug-row input[type="range"] { flex: 1 1 auto; accent-color: var(--mrc-color-primary); }
      .mrc-debug-row output {
        flex: 0 0 auto;
        min-width: 56px;
        text-align: end;
        font-weight: 700;
        color: var(--mrc-color-primary-dark);
      }
    </style>
    <div class="mrc-shell">
      <div class="mrc-container">
        <!-- header: uses the slotted title if the page provides one -->
        <header class="mrc-header">
          <h1 class="mrc-header__title"><slot name="title"></slot></h1>
        </header>
        <!-- the lead: its own card, riding up over the header. Hidden by the
             script below when the article slots nothing into it. -->
        <div class="mrc-intro" data-role="intro" hidden><slot name="intro"></slot></div>
        <!-- page content, projected from the light DOM -->
        <!-- side column (a table of contents) beside the page content. The row
             stays a plain block until something is actually slotted in, so a
             page without one is laid out exactly as before. -->
        <div class="mrc-body-row">
          <!-- the contents sits inset with the lead, not at the article's width -->
          <div class="mrc-side"><slot name="side"></slot></div>
          <div class="mrc-body"><slot></slot></div>
        </div>
        <!-- layout debug sliders -->
        <div class="mrc-debug">
          <div class="mrc-debug-row"><span>detected language: <code data-value="langCheck"></code></span></div>
          <div class="mrc-debug-row"><label for="mrc-offset-top">top offset (<code>--mrc-offset-top</code>)</label></div>
          <div class="mrc-debug-row"><input id="mrc-offset-top" type="range" min="-160" max="160" step="4" data-slider="offsetTop"> <output data-value="offsetTop"></output></div>
          <div class="mrc-debug-row"><label for="mrc-content-width">center width (<code>--mrc-content-width</code>)</label></div>
          <div class="mrc-debug-row"><input id="mrc-content-width" type="range" min="600" max="1600" step="20" data-slider="contentWidth"> <output data-value="contentWidth"></output></div>
          <div class="mrc-debug-row"><label for="mrc-shell-padding">shell padding (<code>--mrc-shell-padding</code>)</label></div>
          <div class="mrc-debug-row"><input id="mrc-shell-padding" type="range" min="0" max="60" step="4" data-slider="shellPadding"> <output data-value="shellPadding"></output></div>
        </div>
        <!-- edge-aligned extras (CTA bar): laid out inside the container so they
             can measure its exact edges, but take up no vertical space -->
        <slot name="edge"></slot>
      </div>
    </div>`;
      const READ_CARDS = 'mrc-info-card, mrc-faq, mrc-related, mrc-reference-card, mrc-disclaimer-card';
      const READ_INSIDE_A_CARD = `:not(:is(${READ_CARDS}, mrc-table, mrc-choice-card) *)`;
      const READ_REGIONS = [':scope > [slot="intro"]', ':scope .mrc-page'];
      const READ_PROSE_SELECTOR = READ_REGIONS
        .map((r) => `${r} :is(p, li)${READ_INSIDE_A_CARD}, ${r} :is(${READ_CARDS})`)
        .join(', ');
      const READ_WINDOW_LINES = 5;
      const READ_FRONTIER_PCT = 42;
      const READ_TRIM_TOP_PX = 92;
      const READ_INDEX_MARGIN_SCREENS = 1;
      const READ_HIGHLIGHT_NAME = 'mrc-read';
      const READ_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
      class MrcShell extends HTMLElement {
        #ready = false;
        #parked = [];
        #lang = 'en';
        #titleSlot = null;
        #titleFallback = null;
        #readWatch = null;
        #readPointer = null;
        #readBand = null;
        #readInk = null;
        #readLines = null;
        #readIndexFrom = 0;
        #readIndexTo = 0;
        #readOnScroll = null;
        #readResize = null;
        #readPlaced = '';
        #readScan = 0;
        connectedCallback() {
          if (!this.#ready) {
            this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
            this.#titleSlot = this.shadowRoot.querySelector('slot[name="title"]');
            this.#titleSlot.addEventListener('slotchange', () => {
              this.#adoptSlottedHeading();
              this.setLang(this.#lang);
            });
            this.#adoptSlottedHeading();
            const intro = this.shadowRoot.querySelector('[data-role="intro"]');
            const introSlot = intro.querySelector('slot');
            const syncIntro = () => {
              intro.hidden = !introSlot.assignedNodes().some((n) =>
                n.nodeType === 1 || (n.textContent || '').trim() !== '');
            };
            introSlot.addEventListener('slotchange', syncIntro);
            syncIntro();
            this.#bindDebug();
            this.#applyBleed();
            this.#lockHorizontalScroll();
            this.#hidePageTitle();
            this.#ready = true;
          }
          trackLang(this);
          this.#bindReadingFocus();
          this.setLang(detectLang(this));
        }
        disconnectedCallback() {
          untrackLang(this);
          this.#stopReadingZone();
          if (this.#readWatch) { this.#readWatch.disconnect(); this.#readWatch = null; }
        }
        setLang(next) {
          const lang = next === 'fa' ? 'fa' : 'en';
          this.#lang = lang;
          this.lang = lang;
          this.dir = lang === 'fa' ? 'rtl' : 'ltr';
          this.#parkOtherLanguage(lang);
          const hasSlotted = this.#titleSlot && this.#titleSlot.assignedNodes({ flatten: true }).length > 0;
          if (!hasSlotted) {
            if (!this.#titleFallback) {
              this.#titleFallback = document.createElement('span');
              this.#titleSlot.parentNode.appendChild(this.#titleFallback);
            }
            this.#titleFallback.textContent = STRINGS[lang].pageTitle;
          } else if (this.#titleFallback) {
            this.#titleFallback.remove();
            this.#titleFallback = null;
          }
          this.#syncLead();
          const check = this.shadowRoot.querySelector('[data-value="langCheck"]');
          if (check) check.textContent = `${lang} / dir=${this.dir}`;
        }
        #parkOtherLanguage(lang) {
          if (this.hasAttribute('keep-both-languages')) return;
          this.#parked.forEach(({ mark, node }) => mark.replaceWith(node));
          this.#parked.length = 0;
          this.querySelectorAll('[data-lang]').forEach((el) => {
            if (el.getAttribute('data-lang') === lang) return;
            if (el.getAttribute('data-lang') === 'en') {
              const parent = el.parentElement;
              if (parent && !parent.hasAttribute(SLUG_ATTR)) {
                parent.setAttribute(SLUG_ATTR, el.textContent.trim());
              }
            }
            const mark = document.createComment('mrc-lang');
            el.replaceWith(mark);
            this.#parked.push({ mark, node: el });
          });
        }
        #syncLead() {
          const forced = (this.getAttribute('lead') || '').toLowerCase();
          const title = this.#titleSlot && this.#titleSlot.assignedElements
            ? this.#titleSlot.assignedElements()[0]
            : null;
          const lead = forced || (asksSomething(title) ? 'answer' : 'plain');
          if (lead === 'plain') this.removeAttribute('data-mrc-lead');
          else this.setAttribute('data-mrc-lead', lead);
        }
        #applyBleed() {
          Object.assign(this.style, {
            display: 'block',
            width: 'auto',
            maxWidth: 'none',
            marginInline: 'calc(50% - 50vw)',
            overflowX: 'clip'
          });
        }
        #lockHorizontalScroll() {
          if (document.getElementById('mrc-lock-horizontal-scroll')) return;
          const style = document.createElement('style');
          style.id = 'mrc-lock-horizontal-scroll';
          style.textContent = 'html, body { overflow-x: clip; overscroll-behavior-x: none; }';
          document.head.appendChild(style);
        }
        #adoptSlottedHeading() {
          const box = this.shadowRoot.querySelector('.' + HEADER_TITLE_CLASS);
          if (!box || box.tagName !== 'H1') return;
          const brought = this.#titleSlot.assignedElements()
            .some((el) => el.tagName === 'H1');
          if (!brought) return;
          const plain = document.createElement('div');
          plain.className = box.className;
          while (box.firstChild) plain.appendChild(box.firstChild);
          box.replaceWith(plain);
          this.#titleSlot = plain.querySelector('slot[name="title"]');
        }
        #hidePageTitle() {
          if (!this.hasAttribute('hide-page-title')) return;
          if (document.getElementById('mrc-hide-page-title-style')) return;
          const style = document.createElement('style');
          style.id = 'mrc-hide-page-title-style';
          style.textContent = `${HOST_PAGE_TITLE_SELECTOR}:has(+ mrc-shell, + * mrc-shell) { display: none !important; }`;
          document.head.appendChild(style);
        }
        #bindReadingFocus() {
          if (!window.matchMedia || !('IntersectionObserver' in window)) return;
          if (!this.#readPointer) {
            this.#readPointer = matchMedia(READ_POINTER_QUERY);
            this.#readPointer.addEventListener('change', () => this.#chooseReadRoute());
          }
          this.#chooseReadRoute();
        }
        #chooseReadRoute() {
          if (!this.isConnected || this.#readPointer.matches) this.#stopReadingZone();
          else this.#startReadingZone();
        }
        #startReadingZone() {
          if (this.#readBand) return;
          const article = this.querySelector('.mrc-page');
          if (!article) return;
          this.#readBand = document.createElement('div');
          this.#readBand.className = 'mrc-read-band';
          this.#readBand.setAttribute('aria-hidden', 'true');
          article.appendChild(this.#readBand);
          if (window.CSS && CSS.highlights && typeof Highlight === 'function') {
            this.#readInk = new Highlight();
            CSS.highlights.set(READ_HIGHLIGHT_NAME, this.#readInk);
          }
          this.#readOnScroll = () => {
            if (this.#readScan) return;
            this.#readScan = requestAnimationFrame(() => {
              this.#readScan = 0;
              this.#drawWindow();
            });
          };
          addEventListener('scroll', this.#readOnScroll, { passive: true });
          this.#readResize = new ResizeObserver(() => { this.#readLines = null; this.#readPlaced = ''; this.#readOnScroll(); });
          this.#readResize.observe(article);
          this.#readWatch = new MutationObserver(() => {
            if (this.#readBand && this.#readBand.parentElement !== article) article.appendChild(this.#readBand);
            this.#readLines = null;
            this.#readOnScroll();
          });
          this.#readWatch.observe(article, { childList: true });
          this.#drawWindow();
        }
        #stopReadingZone() {
          if (this.#readScan) { cancelAnimationFrame(this.#readScan); this.#readScan = 0; }
          if (this.#readOnScroll) { removeEventListener('scroll', this.#readOnScroll); this.#readOnScroll = null; }
          if (this.#readResize) { this.#readResize.disconnect(); this.#readResize = null; }
          if (this.#readWatch) { this.#readWatch.disconnect(); this.#readWatch = null; }
          if (this.#readBand) { this.#readBand.remove(); this.#readBand = null; }
          if (this.#readInk && window.CSS && CSS.highlights) {
            CSS.highlights.delete(READ_HIGHLIGHT_NAME);
            this.#readInk = null;
          }
          this.#readLines = null;
        }
        #indexLines() {
          const blocks = [...this.querySelectorAll(READ_PROSE_SELECTOR)];
          const margin = innerHeight * READ_INDEX_MARGIN_SCREENS;
          const from = scrollY - margin;
          const to = scrollY + innerHeight + margin;
          const lines = [];
          blocks.forEach((block) => {
            const box = block.getBoundingClientRect();
            const top = box.top + scrollY;
            if (box.height === 0 || top + box.height < from || top > to) return;
            this.#linesOf(block).forEach((line) => lines.push(line));
          });
          lines.sort((a, b) => a.top - b.top || a.bottom - b.bottom);
          this.#readLines = lines;
          this.#readIndexFrom = from;
          this.#readIndexTo = to;
        }
        #linesOf(block) {
          const chars = [];
          const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
          while (walker.nextNode()) {
            const node = walker.currentNode;
            if (!node.data.length) continue;
            const parent = node.parentElement;
            if (!parent || !parent.getClientRects().length) continue;
            chars.push({ node, at: chars.length ? chars[chars.length - 1].end : 0, end: 0 });
            const last = chars[chars.length - 1];
            last.end = last.at + node.data.length;
          }
          if (!chars.length) return [];
          const total = chars[chars.length - 1].end;
          const place = (i) => {
            for (let k = 0; k < chars.length; k += 1) {
              if (i <= chars[k].end) return { node: chars[k].node, offset: i - chars[k].at };
            }
            const tail = chars[chars.length - 1];
            return { node: tail.node, offset: tail.node.data.length };
          };
          const css = getComputedStyle(block);
          const declared = parseFloat(css.lineHeight);
          const pitch = Number.isFinite(declared) ? declared : parseFloat(css.fontSize) * 1.2;
          const whole = document.createRange();
          const head = place(0);
          const tail = place(total);
          whole.setStart(head.node, head.offset);
          whole.setEnd(tail.node, tail.offset);
          const rects = [];
          [...whole.getClientRects()]
            .filter((r) => r.height > 0 && r.width > 0)
            .forEach((r) => {
              const open = rects[rects.length - 1];
              if (open && Math.abs(r.top - open.top) <= 2) {
                open.top = Math.min(open.top, r.top);
                open.bottom = Math.max(open.bottom, r.bottom);
                open.left = Math.min(open.left, r.left);
                open.right = Math.max(open.right, r.right);
                return;
              }
              rects.push({ top: r.top, bottom: r.bottom, left: r.left, right: r.right });
            });
          if (!rects.length) return [];
          const probe = document.createRange();
          const topAt = (i) => {
            const a = place(i);
            const b = place(Math.min(i + 1, total));
            probe.setStart(a.node, a.offset);
            probe.setEnd(b.node, b.offset);
            const r = probe.getBoundingClientRect();
            return r.height ? r.top : null;
          };
          const firstAt = (y, lo, hi) => {
            while (lo < hi) {
              const mid = (lo + hi) >> 1;
              const t = topAt(mid);
              if (t === null || t < y - 1) lo = mid + 1; else hi = mid;
            }
            return lo;
          };
          const lines = [];
          let start = 0;
          rects.forEach((rect, i) => {
            const next = i + 1 < rects.length ? firstAt(rects[i + 1].top, start + 1, total) : total;
            const a = place(start);
            const b = place(next);
            const range = document.createRange();
            range.setStart(a.node, a.offset);
            range.setEnd(b.node, b.offset);
            lines.push({
              top: rect.top + scrollY,
              bottom: rect.bottom + scrollY,
              left: rect.left,
              right: rect.right,
              pitch,
              range
            });
            start = next;
          });
          return lines;
        }
        #drawWindow() {
          if (!this.#readBand) return;
          if (!this.#readLines
            || scrollY < this.#readIndexFrom + innerHeight * 0.5
            || scrollY + innerHeight > this.#readIndexTo - innerHeight * 0.5) this.#indexLines();
          const lines = this.#readLines;
          if (!lines.length) return this.#hideWindow();
          const foot = innerHeight * READ_FRONTIER_PCT / 100;
          const head = Math.max(READ_TRIM_TOP_PX, foot - this.#readPitch() * READ_WINDOW_LINES);
          this.#placeRule(head, foot);
          const from = scrollY + head;
          const to = scrollY + foot;
          const spans = [];
          lines.forEach((line) => {
            const overlap = Math.min(line.bottom, to) - Math.max(line.top, from);
            if (overlap > (line.bottom - line.top) * 0.5) spans.push(line.range);
          });
          const onScreen = lines.some((line) => line.bottom > scrollY && line.top < scrollY + innerHeight);
          if (!onScreen) return this.#hideWindow();
          this.#readBand.dataset.mrcRead = 'on';
          if (!this.#readInk) return;
          this.#readInk.clear();
          spans.forEach((range) => this.#readInk.add(range));
        }
        #readPitch() {
          const lines = this.#readLines;
          if (!lines || !lines.length) return 30;
          const seen = new Map();
          lines.forEach((l) => seen.set(l.pitch, (seen.get(l.pitch) || 0) + 1));
          let best = 30;
          let most = 0;
          seen.forEach((n, pitch) => { if (n > most) { most = n; best = pitch; } });
          return best;
        }
        #placeRule(head, foot) {
          const article = this.querySelector('.mrc-page');
          if (!article) return;
          const box = article.getBoundingClientRect();
          const rtl = getComputedStyle(article).direction === 'rtl';
          const gap = parseFloat(getComputedStyle(article).getPropertyValue('--mrc-read-rule-gap')) || 10;
          const edge = Math.max(2, Math.round((rtl ? innerWidth - box.right : box.left) - gap));
          const key = `${Math.round(head)}:${Math.round(foot)}:${edge}`;
          if (key === this.#readPlaced) return;
          this.#readPlaced = key;
          this.#readBand.style.top = Math.round(head) + 'px';
          this.#readBand.style.height = Math.round(foot - head) + 'px';
          this.#readBand.style.insetInlineStart = edge + 'px';
        }
        #hideWindow() {
          if (this.#readBand) delete this.#readBand.dataset.mrcRead;
          if (this.#readInk) this.#readInk.clear();
        }
        #bindDebug() {
          Object.keys(DEBUG_VARS).forEach((key) => {
            const { cssVar, unit } = DEBUG_VARS[key];
            const slider = this.shadowRoot.querySelector(`[data-slider="${key}"]`);
            const output = this.shadowRoot.querySelector(`[data-value="${key}"]`);
            if (!slider || !output) return;
            const current = parseFloat(getComputedStyle(this).getPropertyValue(cssVar)) || 0;
            slider.value = String(current);
            output.textContent = current + unit;
            slider.addEventListener('input', () => {
              this.style.setProperty(cssVar, slider.value + unit);
              output.textContent = slider.value + unit;
            });
          });
        }
      }
      if (!customElements.get('mrc-shell')) customElements.define('mrc-shell', MrcShell);
  }
  {
      const STRINGS = {
        en: {
          example: 'Example', tip: 'Tip', warning: 'Attention',
          note: 'Note', conclusion: 'Conclusion', definition: 'Definition',
          takeaways: 'Key Takeaways'
        },
        fa: {
          example: 'مثال', tip: 'نکته کاربردی', warning: 'توجه',
          note: 'یادداشت', conclusion: 'نتیجه‌گیری', definition: 'تعریف',
          takeaways: 'نکات کلیدی'
        }
      };
      const ICONS = {
        example: '<polyline points="8 6 3 12 8 18"/><polyline points="16 6 21 12 16 18"/>',
        tip: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.5.4.9 1.1.9 1.7v.5h5.4v-.5c0-.6.4-1.3.9-1.7A6 6 0 0 0 12 3Z"/>',
        warning: '<path d="M12 3 2 20h20L12 3Z"/><line x1="12" y1="10" x2="12" y2="14"/><line x1="12" y1="17" x2="12" y2="17.01"/>',
        note: '<circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="12" y1="8" x2="12" y2="8.01"/>',
        conclusion: '<path d="m5 12 5 5 9-10"/>',
        takeaways: '<path d="m3 7 2 2 3.5-3.5"/><path d="m3 15 2 2 3.5-3.5"/><line x1="12" y1="7" x2="21" y2="7"/><line x1="12" y1="15" x2="21" y2="15"/>',
        definition: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 0 4 23.5v-18Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 1 2.5 2.5v-18Z"/>'
      };
      const TYPES = Object.keys(ICONS);
      const template = document.createElement('template');
      template.innerHTML = `
    <style>
      :host {
        --mrc-callout-radius: var(--mrc-radius-md, 14px);
        --mrc-callout-icon-size: 32px;
        --mrc-callout-example-accent: #126b99;  --mrc-callout-example-tint: #eaf3f8;
        --mrc-callout-tip-accent: #14875f;      --mrc-callout-tip-tint: #e9f6f0;
        --mrc-callout-warning-accent: #b7791f;  --mrc-callout-warning-tint: #fbf1de;
        --mrc-callout-note-accent: #5b6b7a;     --mrc-callout-note-tint: #f1f3f5;
        --mrc-callout-conclusion-accent: #7c4a9e; --mrc-callout-conclusion-tint: #f5eef9;
        --mrc-callout-definition-tint: #e6f5f5;
        --mrc-callout-definition-accent: #0e8f95;
        --mrc-callout-takeaways-accent: #2c4a7c; --mrc-callout-takeaways-tint: #eaeef7;
        --mrc-accent: var(--mrc-callout-note-accent);
        --mrc-tint: var(--mrc-callout-note-tint);
        --mrc-card-accent: var(--mrc-accent);
        --mrc-card-gap: 28px;
        display: block;
        margin-top: var(--mrc-card-gap);
      }
      :host([type="example"])    { --mrc-accent: var(--mrc-callout-example-accent);    --mrc-tint: var(--mrc-callout-example-tint); }
      :host([type="tip"])        { --mrc-accent: var(--mrc-callout-tip-accent);        --mrc-tint: var(--mrc-callout-tip-tint); }
      :host([type="warning"])    { --mrc-accent: var(--mrc-callout-warning-accent);    --mrc-tint: var(--mrc-callout-warning-tint); }
      :host([type="note"])       { --mrc-accent: var(--mrc-callout-note-accent);       --mrc-tint: var(--mrc-callout-note-tint); }
      :host([type="conclusion"]) { --mrc-accent: var(--mrc-callout-conclusion-accent); --mrc-tint: var(--mrc-callout-conclusion-tint); }
      :host([type="definition"]) { --mrc-accent: var(--mrc-callout-definition-accent); --mrc-tint: var(--mrc-callout-definition-tint); }
      :host([type="takeaways"])  { --mrc-accent: var(--mrc-callout-takeaways-accent);  --mrc-tint: var(--mrc-callout-takeaways-tint); }
      * { box-sizing: border-box; }
      .mrc-callout {
        display: flex;
        align-items: flex-start;
        gap: var(--mrc-space-3, 12px);
        padding: var(--mrc-space-4, 16px);
        border-radius: var(--mrc-callout-radius);
        border-inline-start: 4px solid var(--mrc-accent);
        background: var(--mrc-tint);
        box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06));
        text-align: start;
      }
      .mrc-callout__icon {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-block-start: calc(-1 * var(--mrc-callout-icon-lift, 6px));
        width: var(--mrc-callout-icon-size);
        height: var(--mrc-callout-icon-size);
        border-radius: 50%;
        background: var(--mrc-accent);
        color: #fff;
      }
      .mrc-callout__icon svg { width: 18px; height: 18px; }
      :host([icon="none"]) .mrc-callout__icon { display: none; }
      .mrc-callout__body { min-width: 0; }
      .mrc-callout__label {
        margin: 0 0 var(--mrc-space-1, 4px);
        color: var(--mrc-accent);
        font-size: var(--mrc-callout-label-size, 0.85rem);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .mrc-callout__label:empty { display: none; }
      :host .mrc-callout {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: start;
        column-gap: var(--mrc-space-3, 12px);
        row-gap: 0;
      }
      :host .mrc-callout__body { display: contents; }
      .mrc-callout__titleline { width: fit-content; max-width: 100%; }
      :host .mrc-callout__label { margin-block-end: 0; }
      ::slotted([slot="heading"]) { margin: 0; min-width: 0; }
      .mrc-callout__rule { display: none; }
      :host([data-mrc-heading]) .mrc-callout__rule {
        display: block;
        width: 100%;
        height: 3px;
        margin-block-start: var(--mrc-card-rule-gap, 3px);
        margin-block-end: var(--mrc-card-rule-space, 8px);
        border-radius: 2px;
        background: linear-gradient(to right,
          var(--mrc-accent),
          color-mix(in srgb, var(--mrc-accent) 25%, transparent));
      }
      :host([dir="rtl"][data-mrc-heading]) .mrc-callout__rule {
        background: linear-gradient(to left,
          var(--mrc-accent),
          color-mix(in srgb, var(--mrc-accent) 25%, transparent));
      }
      :host .mrc-callout__text { grid-column: 1 / -1; }
      :host .mrc-callout__icon {
        margin-block-start: calc((var(--mrc-card-heading-size, 1.5rem) * var(--mrc-card-heading-leading, 1.2)
                                  - var(--mrc-card-heading-size, 1.5rem) * 1.25) / 2);
        width: var(--mrc-callout-mark-size, calc(var(--mrc-card-heading-size, 1.5rem) * 1.25));
        height: var(--mrc-callout-mark-size, calc(var(--mrc-card-heading-size, 1.5rem) * 1.25));
        align-self: start;
      }
      :host .mrc-callout__icon svg { width: calc(var(--mrc-card-heading-size, 1.5rem) * 0.62); height: calc(var(--mrc-card-heading-size, 1.5rem) * 0.62); }
      :host .mrc-callout__label {
        width: fit-content;
        max-width: 100%;
        margin-block-end: var(--mrc-space-3, 12px);
        color: var(--mrc-accent);
        font-size: var(--mrc-callout-conclusion-title, 1.35rem);
        font-weight: 800;
        letter-spacing: normal;
        text-transform: none;
        line-height: 1.3;
      }
      :host .mrc-callout__label:not(:empty)::after {
        content: "";
        display: block;
        width: 100%;
        height: 3px;
        margin-block-start: var(--mrc-space-2, 8px);
        border-radius: 2px;
        background: linear-gradient(to right,
          var(--mrc-accent),
          color-mix(in srgb, var(--mrc-accent) 25%, transparent));
      }
      :host([dir="rtl"]) .mrc-callout__label:not(:empty)::after {
        background: linear-gradient(to left,
          var(--mrc-accent),
          color-mix(in srgb, var(--mrc-accent) 25%, transparent));
      }
      .mrc-callout__text {
        margin: 0;
        font-size: 0.92rem;
        color: var(--mrc-color-text, #1d2d3d);
      }
      @media (max-width: 767px) {
        :host { --mrc-callout-icon-size: 28px; }
        .mrc-callout { padding: var(--mrc-space-3, 12px); }
        .mrc-callout__text { font-size: 0.88rem; }
      }
      @media (min-width: 768px) {
        .mrc-callout { padding: var(--mrc-space-5, 20px); }
      }
      :host([data-mrc-read="on"]) .mrc-callout {
        box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06)),
                    inset 0 0 0 100vmax var(--mrc-read-focus-wash, transparent);
      }
      @media (hover: hover) and (pointer: fine) {
        :host(:hover) .mrc-callout {
          box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06)),
                      inset 0 0 0 100vmax var(--mrc-read-focus-wash, transparent);
        }
      }
    </style>
    <div class="mrc-callout">
      <span class="mrc-callout__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>
      </span>
      <div class="mrc-callout__body">
        <p class="mrc-callout__label"></p>
        <!-- A title the article writes itself, standing where the automatic label
             would. The takeaways card names itself with a real heading — the
             contents needs an entry for it — and with label="" there is nothing
             for the mark to sit beside unless the heading comes here. -->
        <!-- The heading and the rule under it in ONE box, and the box is only as
             wide as the words. The rule is 100% of whatever holds it, so beside
             the heading it took the whole column and ran far past the title;
             inside a fit-content box it is the title's own width. -->
        <div class="mrc-callout__titleline">
          <slot name="heading"></slot>
        <!-- The rule under a slotted heading, drawn by the CARD.
             The card cannot put it on the heading itself: that heading is light-DOM
             content and ::slotted() reaches the element but not its pseudo-elements,
             so an ::after on it is out of reach from in here. A real element beside
             the slot is the only way, and it is only shown when a heading is
             actually slotted (data-mrc-heading, set in script — trap ۸).
             Inside the system mrc.css draws the same rule on the heading and this
             one stands down, so nothing is drawn twice. Standalone there is no
             mrc.css, and without this the takeaways card in this file's own demo
             had no rule at all while every other card had one — reported 13 Aug. -->
          <span class="mrc-callout__rule" aria-hidden="true"></span>
        </div>
        <div class="mrc-callout__text"><slot></slot></div>
      </div>
    </div>`;
      class MrcInfoCard extends HTMLElement {
        static observedAttributes = ['type', 'label'];
        #ready = false;
        connectedCallback() {
          if (!this.#ready) {
            this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
            const heading = this.shadowRoot.querySelector('slot[name="heading"]');
            const syncHeading = () => {
              this.toggleAttribute('data-mrc-heading', heading.assignedElements().length > 0);
            };
            heading.addEventListener('slotchange', syncHeading);
            syncHeading();
            this.#ready = true;
          }
          trackLang(this);
          this.setLang(detectLang(this));
        }
        disconnectedCallback() { untrackLang(this); }
        attributeChangedCallback() {
          if (this.#ready) this.setLang(detectLang(this));
        }
        setLang(next) {
          const lang = next === 'fa' ? 'fa' : 'en';
          this.lang = lang;
          this.dir = lang === 'fa' ? 'rtl' : 'ltr';
          const type = TYPES.includes(this.getAttribute('type')) ? this.getAttribute('type') : 'note';
          this.shadowRoot.querySelector('svg').innerHTML = ICONS[type];
          const given = this.getAttribute('label');
          this.shadowRoot.querySelector('.mrc-callout__label').textContent =
            given === null ? STRINGS[lang][type] : given;
        }
      }
      if (!customElements.get('mrc-info-card')) customElements.define('mrc-info-card', MrcInfoCard);
  }
  {
      const STRINGS = {
        en: { label: 'Sources' },
        fa: { label: 'منابع' }
      };
      const THEME = `
        --mrc-reference-accent: #a35d3d;
        --mrc-card-accent: #a35d3d;
        --mrc-reference-tint: #f6ece6;
      `;
      const cardTemplate = document.createElement('template');
      cardTemplate.innerHTML = `
    <style>
      :host {
        ${THEME}
        --mrc-card-gap: 28px;
        display: block;
        margin-top: var(--mrc-card-gap);
      }
      * { box-sizing: border-box; }
      .mrc-callout {
        border-radius: var(--mrc-radius-md, 14px);
        border-inline-start: 4px solid var(--mrc-reference-accent);
        background: var(--mrc-reference-tint);
        box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06));
        text-align: start;
      }
      .mrc-callout__trigger {
        display: flex;
        align-items: center;
        width: 100%;
        gap: var(--mrc-space-3, 12px);
        padding: var(--mrc-space-4, 16px);
        background: none;
        border: 0;
        margin: 0;
        font: inherit;
        color: inherit;
        text-align: start;
        cursor: pointer;
      }
      .mrc-callout__trigger:focus-visible {
        outline: 2px solid var(--mrc-reference-accent);
        outline-offset: -2px;
        border-radius: var(--mrc-radius-md, 14px);
      }
      .mrc-callout__icon {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--mrc-reference-accent);
        color: #fff;
      }
      .mrc-callout__icon svg { width: 18px; height: 18px; }
      :host([data-mrc-heading]) .mrc-callout__label { display: none; }
      :host([data-mrc-heading]) .mrc-callout__icon {
        align-self: flex-start;
        width: calc(var(--mrc-card-heading-size, 1.5rem) * 1.25);
        height: calc(var(--mrc-card-heading-size, 1.5rem) * 1.25);
      }
      :host([data-mrc-heading]) .mrc-callout__icon svg { width: calc(var(--mrc-card-heading-size, 1.5rem) * 0.62); height: calc(var(--mrc-card-heading-size, 1.5rem) * 0.62); }
      ::slotted([slot="heading"]) {
        margin: 0;
        min-width: 0;
        text-align: start;
      }
      .mrc-callout__titleline {
        min-width: 0;
        flex: 0 1 auto;
      }
      .mrc-callout__rule { display: none; }
      :host([data-mrc-heading]) .mrc-callout__rule {
        display: block;
        width: 100%;
        height: 3px;
        margin-block-start: var(--mrc-card-rule-gap, 3px);
        margin-block-end: var(--mrc-card-rule-space, 8px);
        border-radius: 2px;
        background: linear-gradient(to right,
          var(--mrc-reference-accent),
          color-mix(in srgb, var(--mrc-reference-accent) 25%, transparent));
      }
      :host([dir="rtl"][data-mrc-heading]) .mrc-callout__rule {
        background: linear-gradient(to left,
          var(--mrc-reference-accent),
          color-mix(in srgb, var(--mrc-reference-accent) 25%, transparent));
      }
      .mrc-callout__label {
        margin: 0;
        color: var(--mrc-reference-accent);
        font-size: var(--mrc-reference-label-size, 1rem);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .mrc-callout__chevron {
        display: flex;
        flex: 0 0 auto;
        margin-inline-start: auto;
        color: var(--mrc-reference-accent);
      }
      .mrc-callout__chevron svg {
        width: 16px;
        height: 16px;
        transition: transform 0.25s ease;
      }
      :host([open]) .mrc-callout__chevron svg { transform: rotate(180deg); }
      .mrc-callout__collapse {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.3s ease;
      }
      :host([open]) .mrc-callout__collapse { grid-template-rows: 1fr; }
      .mrc-callout__collapse-inner { overflow: hidden; min-height: 0; }
      .mrc-reference-list {
        display: flex;
        flex-direction: column;
        padding: var(--mrc-space-2, 8px) var(--mrc-space-4, 16px) var(--mrc-space-4, 16px);
        border-top: 1px solid var(--mrc-reference-header-divider, color-mix(in srgb, var(--mrc-reference-accent) 30%, transparent));
      }
      @media (max-width: 767px) {
        .mrc-callout__trigger { padding: var(--mrc-space-3, 12px); }
        .mrc-reference-list { padding: var(--mrc-space-2, 8px) var(--mrc-space-3, 12px) var(--mrc-space-3, 12px); }
      }
      @media (min-width: 768px) {
        .mrc-callout__trigger { padding: var(--mrc-card-head-inset, 16px); }
      }
      .mrc-callout__trigger[aria-expanded="true"] { padding-block-end: 0; }
      .mrc-reference-list { padding-block-start: 0; }
      @media (min-width: 768px) {
        .mrc-reference-list { padding: var(--mrc-space-2, 8px) var(--mrc-space-5, 20px) var(--mrc-space-5, 20px); }
      }
      :host([data-mrc-read="on"]) .mrc-callout {
        box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06)),
                    inset 0 0 0 100vmax var(--mrc-read-focus-wash, transparent);
      }
      @media (hover: hover) and (pointer: fine) {
        :host(:hover) .mrc-callout {
          box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06)),
                      inset 0 0 0 100vmax var(--mrc-read-focus-wash, transparent);
        }
      }
    </style>
    <div class="mrc-callout">
      <button type="button" class="mrc-callout__trigger" aria-expanded="false" aria-controls="panel">
        <span class="mrc-callout__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6"/><path d="M9 13h6M9 17h6"/></svg>
        </span>
        <p class="mrc-callout__label"></p>
        <!-- The article's own heading, on the row that opens the card and beside
             its icon — asked for on 13 Aug. A slot inside a button is valid on
             both sides: slotted content is not a DOM descendant of the button, so
             the h2 stays a legal child of the card in the light DOM.
             NAMED, or it lands in the collapsed panel and is invisible until the
             card is opened. -->
        <span class="mrc-callout__titleline">
          <slot name="heading"></slot>
          <!-- the card draws this rule itself: ::slotted() reaches the heading
               but not its pseudo-elements, and standalone there is no mrc.css to
               draw one at all — where it was found missing (13 Aug) -->
          <span class="mrc-callout__rule" aria-hidden="true"></span>
        </span>
        <span class="mrc-callout__chevron" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </button>
      <div class="mrc-callout__collapse" id="panel">
        <div class="mrc-callout__collapse-inner" inert>
          <div class="mrc-reference-list"><slot></slot></div>
        </div>
      </div>
    </div>`;
      class MrcReferenceCard extends HTMLElement {
        static observedAttributes = ['open', 'label'];
        #ready = false;
        #trigger = null;
        connectedCallback() {
          if (!this.#ready) {
            this.attachShadow({ mode: 'open' }).appendChild(cardTemplate.content.cloneNode(true));
            this.#trigger = this.shadowRoot.querySelector('.mrc-callout__trigger');
            this.#trigger.addEventListener('click', () => this.toggle());
            this.shadowRoot.querySelector('slot:not([name])')
              .addEventListener('slotchange', () => this.#number());
            const heading = this.shadowRoot.querySelector('slot[name="heading"]');
            const syncHeading = () => {
              this.toggleAttribute('data-mrc-heading', heading.assignedElements().length > 0);
            };
            heading.addEventListener('slotchange', syncHeading);
            syncHeading();
            this.#ready = true;
          }
          trackLang(this);
          this.setLang(detectLang(this));
        }
        disconnectedCallback() { untrackLang(this); }
        attributeChangedCallback() {
          if (!this.#ready) return;
          this.#syncExpanded();
          this.setLang(detectLang(this));
        }
        toggle(force) {
          const next = force === undefined ? !this.hasAttribute('open') : Boolean(force);
          this.toggleAttribute('open', next);
        }
        setLang(next) {
          const lang = next === 'fa' ? 'fa' : 'en';
          this.lang = lang;
          this.dir = lang === 'fa' ? 'rtl' : 'ltr';
          this.shadowRoot.querySelector('.mrc-callout__label').textContent =
            this.getAttribute('label') || STRINGS[lang].label;
          this.#syncExpanded();
          this.#number();
        }
        #syncExpanded() {
          const open = this.hasAttribute('open');
          this.#trigger.setAttribute('aria-expanded', String(open));
          this.shadowRoot.querySelector('.mrc-callout__collapse-inner').toggleAttribute('inert', !open);
        }
        #number() {
          const items = this.querySelectorAll(':scope > mrc-reference-item');
          items.forEach((item, i) => item.setIndex(i + 1));
        }
      }
      const itemTemplate = document.createElement('template');
      itemTemplate.innerHTML = `
    <style>
      :host {
        ${THEME}
        display: block;
      }
      * { box-sizing: border-box; }
      .mrc-reference__link {
        display: flex;
        align-items: flex-start;
        gap: var(--mrc-space-2, 8px);
        padding-block: var(--mrc-space-2, 8px);
        min-height: var(--mrc-reference-row-min, 44px);
        box-sizing: border-box;
        padding-inline-start: var(--mrc-reference-row-indent, 20px);
        border-top: 1px solid var(--mrc-reference-divider, rgba(0, 0, 0, 0.12));
        text-decoration: none;
        color: inherit;
        cursor: pointer;
      }
      :host(:first-of-type) .mrc-reference__link { border-top: 0; padding-top: 0; }
      :host(:last-of-type) .mrc-reference__link { padding-bottom: 0; }
      .mrc-reference__link:focus-visible {
        outline: 2px solid var(--mrc-reference-accent);
        outline-offset: 2px;
      }
      .mrc-reference__index {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--mrc-reference-tint);
        color: var(--mrc-reference-accent);
        font-size: 0.68rem;
        font-weight: 700;
      }
      .mrc-reference__text {
        flex: 1 1 auto;
        font-size: var(--mrc-reference-text-size, 0.85rem);
        color: var(--mrc-color-text-muted, #627487);
        transition: font-weight 0.15s ease, color 0.15s ease;
      }
      .mrc-reference__link:hover .mrc-reference__text {
        font-weight: 700;
        color: var(--mrc-color-text, #1d2d3d);
      }
      .mrc-reference__icon {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        margin-inline-start: auto;
        color: var(--mrc-reference-accent);
        opacity: 0.6;
        transition: opacity 0.15s ease;
      }
      .mrc-reference__icon svg { width: 14px; height: 14px; }
      .mrc-reference__link:hover .mrc-reference__icon { opacity: 1; }
    </style>
    <a class="mrc-reference__link" target="_blank" rel="noopener noreferrer">
      <span class="mrc-reference__index"></span>
      <span class="mrc-reference__text"><slot></slot></span>
      <span class="mrc-reference__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>
      </span>
    </a>`;
      class MrcReferenceItem extends HTMLElement {
        static observedAttributes = ['href'];
        #ready = false;
        connectedCallback() {
          if (!this.#ready) {
            this.attachShadow({ mode: 'open' }).appendChild(itemTemplate.content.cloneNode(true));
            this.#ready = true;
          }
          this.#syncHref();
        }
        attributeChangedCallback() {
          if (this.#ready) this.#syncHref();
        }
        setIndex(n) {
          if (!this.#ready) return;
          this.shadowRoot.querySelector('.mrc-reference__index').textContent = String(n);
        }
        #syncHref() {
          this.shadowRoot.querySelector('a').href = this.getAttribute('href') || '#';
        }
      }
      if (!customElements.get('mrc-reference-item')) customElements.define('mrc-reference-item', MrcReferenceItem);
      if (!customElements.get('mrc-reference-card')) customElements.define('mrc-reference-card', MrcReferenceCard);
  }
  {
      const SITE_ORIGIN = 'https://mehdirad.ca';
      const SITE_PAGES = {
        privacy: '/pages/privacy-policy',
        terms: '/pages/terms',
        disclaimer: '/disclaimer'
      };
      const STRINGS = {
        en: {
          label: 'Disclaimer',
          body: [
            { p: ['This article is provided ', { b: 'for educational and informational purposes only' }, ' and should not be considered financial, investment, insurance, tax, or legal advice.'] },
            { p: ['We make every effort to ensure that the content on this website is prepared using ', { b: 'official, reliable, and up-to-date sources' }, ', and we regularly review and update our articles whenever possible. However, laws, regulations, financial and insurance products, rates, company policies, and other relevant information may change over time. Therefore, we cannot guarantee that all information will always remain current or free from change.'] },
            { ul: [
              'Verify the information using official sources.',
              'Review the references provided with the article, where available.',
              'If no references are listed, consult the official website of the relevant government agency, regulator, or organization.',
              'Seek advice from a qualified professional who can assess your individual circumstances before taking action.'
            ] },
            { p: ['The purpose of this website is to provide educational content and help improve financial and insurance literacy. Any decisions or actions taken based on the information provided on this website are the sole responsibility of the reader. The content published here is not a substitute for professional advice or official sources.'] },
            { p: ['Please read the ', { a: 'Privacy Policy', to: 'privacy' }, ', ', { a: 'Terms of Use', to: 'terms' }, ', and ', { a: 'Disclaimer', to: 'disclaimer' }, ' carefully. Failure to read these documents does not relieve you of your responsibilities or obligations, nor does it limit or waive the rights and legal protections of this Website or its owner.'] }
          ]
        },
        fa: {
          label: 'سلب مسئولیت',
          body: [
            { p: ['این مقاله صرفاً با هدف ', { b: 'آموزش، افزایش آگاهی و ارائه اطلاعات عمومی' }, ' تهیه شده است و نباید به‌عنوان مشاوره مالی، سرمایه‌گذاری، بیمه‌ای، مالیاتی یا حقوقی تلقی شود.'] },
            { p: ['تمام تلاش ما این است که محتوای این وب‌سایت با استفاده از ', { b: 'منابع رسمی، معتبر و تا حد امکان به‌روز' }, ' تهیه شده و به‌صورت دوره‌ای بازبینی و به‌روزرسانی شود. با این حال، قوانین، مقررات، محصولات، نرخ‌ها، شرایط شرکت‌ها و سایر اطلاعات ممکن است در هر زمان تغییر کنند. به همین دلیل، نمی‌توان تضمین کرد که تمامی مطالب در هر لحظه کاملاً به‌روز یا بدون تغییر باشند.'] },
            { ul: [
              'اطلاعات را با منابع رسمی بررسی و تأیید کنید.',
              'در صورت درج منابع در این مقاله، مستقیماً به همان منابع مراجعه نمایید.',
              'اگر منبعی ذکر نشده است، اطلاعات را از وب‌سایت رسمی سازمان یا شرکت مربوطه بررسی کنید.',
              'برای دریافت راهکار متناسب با شرایط شخصی خود، حتماً با یک مشاور یا متخصص واجد شرایط مشورت نمایید.'
            ] },
            { p: ['هدف این وب‌سایت، کمک به افزایش دانش مالی و بیمه‌ای و ارائه محتوای آموزشی است. مسئولیت تصمیم‌گیری و هرگونه اقدام بر اساس اطلاعات این وب‌سایت بر عهده کاربر است و این مطالب جایگزین مشاوره تخصصی یا منابع رسمی نخواهند بود.'] },
            { p: ['بخش سیاست ', { a: 'حریم خصوصی', to: 'privacy' }, ' و ', { a: 'شرایط استفاده', to: 'terms' }, ' و ', { a: 'سلب مسئولیت', to: 'disclaimer' }, ' را بطور کامل مطالعه کنید عدم مطالعه این بخش ها مسولیت شما در قبال خودتان، سایت و صاحب سایت را از بین نخواهد برد.'] }
          ]
        }
      };
      function renderBody(target, blocks, lang) {
        target.textContent = '';
        blocks.forEach((block) => {
          if (block.ul) {
            const list = document.createElement('ul');
            block.ul.forEach((text) => {
              const item = document.createElement('li');
              item.textContent = text;
              list.appendChild(item);
            });
            target.appendChild(list);
            return;
          }
          const para = document.createElement('p');
          block.p.forEach((part) => {
            if (typeof part === 'string') { para.appendChild(document.createTextNode(part)); return; }
            if (part.b) {
              const strong = document.createElement('strong');
              strong.textContent = part.b;
              para.appendChild(strong);
              return;
            }
            const link = document.createElement('a');
            link.textContent = part.a;
            link.href = SITE_ORIGIN + '/' + lang + SITE_PAGES[part.to];
            para.appendChild(link);
          });
          target.appendChild(para);
        });
      }
      const template = document.createElement('template');
      template.innerHTML = `
    <style>
      :host {
        --mrc-disclaimer-accent: #c62828;
        --mrc-card-accent: #c62828;
        --mrc-disclaimer-tint: #fdeaea;
        --mrc-disclaimer-size: 1rem;
        --mrc-disclaimer-label-size: 0.85rem;
        --mrc-card-gap: 28px;
        display: block;
        margin-top: var(--mrc-card-gap);
      }
      * { box-sizing: border-box; }
      .mrc-callout {
        border-radius: var(--mrc-radius-md, 14px);
        border-inline-start: 4px solid var(--mrc-disclaimer-accent);
        background: var(--mrc-disclaimer-tint);
        box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06));
        text-align: start;
      }
      .mrc-callout__trigger {
        display: flex;
        align-items: center;
        width: 100%;
        gap: var(--mrc-space-3, 12px);
        padding: var(--mrc-space-4, 16px);
        background: none;
        border: 0;
        margin: 0;
        font: inherit;
        color: inherit;
        text-align: start;
        cursor: pointer;
      }
      .mrc-callout__trigger:focus-visible {
        outline: 2px solid var(--mrc-disclaimer-accent);
        outline-offset: -2px;
        border-radius: var(--mrc-radius-md, 14px);
      }
      .mrc-callout__icon {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--mrc-disclaimer-accent);
        color: #fff;
      }
      .mrc-callout__icon svg { width: 18px; height: 18px; }
      :host([data-mrc-heading]) .mrc-callout__label { display: none; }
      :host([data-mrc-heading]) .mrc-callout__icon {
        align-self: flex-start;
        width: calc(var(--mrc-card-heading-size, 1.5rem) * 1.25);
        height: calc(var(--mrc-card-heading-size, 1.5rem) * 1.25);
      }
      :host([data-mrc-heading]) .mrc-callout__icon svg { width: calc(var(--mrc-card-heading-size, 1.5rem) * 0.62); height: calc(var(--mrc-card-heading-size, 1.5rem) * 0.62); }
      ::slotted([slot="heading"]) {
        margin: 0;
        min-width: 0;
        text-align: start;
      }
      .mrc-callout__titleline {
        min-width: 0;
        flex: 0 1 auto;
      }
      .mrc-callout__rule { display: none; }
      :host([data-mrc-heading]) .mrc-callout__rule {
        display: block;
        width: 100%;
        height: 3px;
        margin-block-start: var(--mrc-card-rule-gap, 3px);
        margin-block-end: var(--mrc-card-rule-space, 8px);
        border-radius: 2px;
        background: linear-gradient(to right,
          var(--mrc-disclaimer-accent),
          color-mix(in srgb, var(--mrc-disclaimer-accent) 25%, transparent));
      }
      :host([dir="rtl"][data-mrc-heading]) .mrc-callout__rule {
        background: linear-gradient(to left,
          var(--mrc-disclaimer-accent),
          color-mix(in srgb, var(--mrc-disclaimer-accent) 25%, transparent));
      }
      .mrc-callout__label {
        margin: 0;
        color: var(--mrc-disclaimer-accent);
        font-size: var(--mrc-disclaimer-label-size, 0.85rem);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .mrc-callout__chevron {
        display: flex;
        flex: 0 0 auto;
        margin-inline-start: auto;
        color: var(--mrc-disclaimer-accent);
      }
      .mrc-callout__chevron svg {
        width: 16px;
        height: 16px;
        transition: transform 0.25s ease;
      }
      :host([open]) .mrc-callout__chevron svg { transform: rotate(180deg); }
      .mrc-callout__collapse {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.3s ease;
      }
      :host([open]) .mrc-callout__collapse { grid-template-rows: 1fr; }
      .mrc-callout__collapse-inner { overflow: hidden; min-height: 0; }
      .mrc-callout__text {
        padding: var(--mrc-space-2, 8px) var(--mrc-space-4, 16px) var(--mrc-space-4, 16px);
        font-size: var(--mrc-disclaimer-size, 1rem);
        line-height: 1.7;
        color: var(--mrc-disclaimer-text, #4a5561);
        border-top: 1px solid var(--mrc-disclaimer-header-divider, color-mix(in srgb, var(--mrc-disclaimer-accent) 30%, transparent));
      }
      .mrc-callout__standard p { margin: 0 0 var(--mrc-space-3, 12px); }
      .mrc-callout__standard > :last-child { margin-bottom: 0; }
      .mrc-callout__standard ul {
        margin: 0 0 var(--mrc-space-3, 12px);
        padding-inline-start: 1.3em;
      }
      .mrc-callout__standard li { margin-block-end: var(--mrc-space-1, 4px); }
      .mrc-callout__standard li:last-child { margin-block-end: 0; }
      .mrc-callout__standard a {
        color: var(--mrc-disclaimer-accent);
        text-underline-offset: 2px;
      }
      .mrc-callout__standard a:focus-visible {
        outline: 2px solid var(--mrc-disclaimer-accent);
        outline-offset: 2px;
      }
      @media (max-width: 767px) {
        .mrc-callout__trigger { padding: var(--mrc-space-3, 12px); }
        .mrc-callout__text { padding: var(--mrc-space-2, 8px) var(--mrc-space-3, 12px) var(--mrc-space-3, 12px); }
      }
      @media (min-width: 768px) {
        .mrc-callout__trigger { padding: var(--mrc-card-head-inset, 16px); }
        .mrc-callout__text { padding: var(--mrc-space-2, 8px) var(--mrc-space-5, 20px) var(--mrc-space-5, 20px); }
      }
      .mrc-callout__trigger[aria-expanded="true"] { padding-block-end: 0; }
      .mrc-callout__text {
        padding-inline-start: calc(
          var(--mrc-space-4, 16px) + var(--mrc-disclaimer-body-indent, 30px));
        padding-block-start: 0;
      }
      :host([data-mrc-read="on"]) .mrc-callout {
        box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06)),
                    inset 0 0 0 100vmax var(--mrc-read-focus-wash, transparent);
      }
      @media (hover: hover) and (pointer: fine) {
        :host(:hover) .mrc-callout {
          box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06)),
                      inset 0 0 0 100vmax var(--mrc-read-focus-wash, transparent);
        }
      }
    </style>
    <div class="mrc-callout">
      <button type="button" class="mrc-callout__trigger" aria-expanded="false" aria-controls="panel">
        <span class="mrc-callout__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 3 7v6c0 4.4 3.8 7.6 9 8.9 5.2-1.3 9-4.5 9-8.9V7l-9-4Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="16" x2="12" y2="16.01"/></svg>
        </span>
        <p class="mrc-callout__label"></p>
        <!-- The article's own heading for this card, on the row that opens it and
             beside its icon rather than above the row — asked for on 13 Aug.
             A slot inside a button is valid on both sides of the boundary, and
             that is not a technicality: slotted content is NOT a DOM descendant of
             the button, so the h2 stays a child of the card in the light DOM where
             it is perfectly legal, and the button's own content model only ever
             sees a <slot>.
             NAMED, which is the whole point. Put in the default slot the heading
             landed inside the collapsed panel — invisible until the card was
             opened — and counted as body content, which switched the standard
             wording off and emptied the card. Reported twice on 13 Aug. -->
        <!-- The heading and the rule under it in one box only as wide as the
             words: a rule is 100% of whatever holds it, so on the row itself it
             would run the whole way to the chevron. The card draws this rule
             rather than leaving it to mrc.css, because ::slotted() reaches the
             heading but not its pseudo-elements — and because standalone there is
             no mrc.css at all, which is where it was found missing (13 Aug). -->
        <span class="mrc-callout__titleline">
          <slot name="heading"></slot>
          <span class="mrc-callout__rule" aria-hidden="true"></span>
        </span>
        <span class="mrc-callout__chevron" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </button>
      <div class="mrc-callout__collapse" id="panel">
        <div class="mrc-callout__collapse-inner" inert>
          <!-- The standard wording sits BESIDE the slot, not inside it as fallback
               content. A slot's fallback only shows when nothing at all is
               assigned, and the newline between an empty pair of tags is a text
               node that counts as assigned — so written across two lines, the way
               anyone writes it, the card came out blank. Deciding in JS on trimmed
               text has no such blind spot. -->
          <div class="mrc-callout__text"><div class="mrc-callout__standard" hidden></div><slot></slot></div>
        </div>
      </div>
    </div>`;
      class MrcDisclaimerCard extends HTMLElement {
        static observedAttributes = ['open', 'label'];
        #ready = false;
        #trigger = null;
        connectedCallback() {
          if (!this.#ready) {
            this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
            this.#trigger = this.shadowRoot.querySelector('.mrc-callout__trigger');
            this.#trigger.addEventListener('click', () => this.toggle());
            this.shadowRoot.querySelector('slot:not([name])')
              .addEventListener('slotchange', () => this.setLang(detectLang(this)));
            const heading = this.shadowRoot.querySelector('slot[name="heading"]');
            const syncHeading = () => {
              this.toggleAttribute('data-mrc-heading', heading.assignedElements().length > 0);
            };
            heading.addEventListener('slotchange', syncHeading);
            syncHeading();
            this.#ready = true;
          }
          trackLang(this);
          this.setLang(detectLang(this));
        }
        disconnectedCallback() { untrackLang(this); }
        attributeChangedCallback() {
          if (this.#ready) this.setLang(detectLang(this));
        }
        toggle(force) {
          const next = force === undefined ? !this.hasAttribute('open') : Boolean(force);
          this.toggleAttribute('open', next);
        }
        setLang(next) {
          const lang = next === 'fa' ? 'fa' : 'en';
          this.lang = lang;
          this.dir = lang === 'fa' ? 'rtl' : 'ltr';
          this.shadowRoot.querySelector('.mrc-callout__label').textContent =
            this.getAttribute('label') || STRINGS[lang].label;
          const standard = this.shadowRoot.querySelector('.mrc-callout__standard');
          renderBody(standard, STRINGS[lang].body, lang);
          const ownBody = this.shadowRoot.querySelector('slot:not([name])')
            .assignedNodes()
            .map((n) => n.textContent || '')
            .join('')
            .trim();
          standard.hidden = ownBody !== '';
          const open = this.hasAttribute('open');
          this.#trigger.setAttribute('aria-expanded', String(open));
          this.shadowRoot.querySelector('.mrc-callout__collapse-inner').toggleAttribute('inert', !open);
        }
      }
      if (!customElements.get('mrc-disclaimer-card')) customElements.define('mrc-disclaimer-card', MrcDisclaimerCard);
  }
  {
      const listTemplate = document.createElement('template');
      listTemplate.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        margin-top: var(--mrc-space-6, 24px);
        --mrc-faq-divider: #cfdbe5;
        --mrc-card-accent: var(--mrc-color-primary, #126b99);
      }
      .mrc-faq-head {
        display: flex;
        align-items: flex-start;
        gap: var(--mrc-space-3, 12px);
        padding: var(--mrc-faq-head-inset, 16px) var(--mrc-faq-head-inset, 16px) 0;
      }
      .mrc-faq-head[hidden] { display: none; }
      ::slotted([slot="heading"]) { margin: 0; min-width: 0; }
      .mrc-faq-titleline { min-width: 0; flex: 0 1 auto; }
      .mrc-faq-rule {
        display: block;
        width: 100%;
        height: 3px;
        margin-block-start: var(--mrc-card-rule-gap, 3px);
        margin-block-end: var(--mrc-card-rule-space, 8px);
        border-radius: 2px;
        background: linear-gradient(to right,
          var(--mrc-color-primary, #126b99),
          color-mix(in srgb, var(--mrc-color-primary, #126b99) 25%, transparent));
      }
      :host([dir="rtl"]) .mrc-faq-rule {
        background: linear-gradient(to left,
          var(--mrc-color-primary, #126b99),
          color-mix(in srgb, var(--mrc-color-primary, #126b99) 25%, transparent));
      }
      .mrc-faq-head .mrc-faq-mark { margin-block-start: var(--mrc-faq-mark-drop, 0); }
      .mrc-faq-mark {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--mrc-faq-mark-size, calc(var(--mrc-card-heading-size, 1.5rem) * 1.25));
        height: var(--mrc-faq-mark-size, calc(var(--mrc-card-heading-size, 1.5rem) * 1.25));
        border-radius: 50%;
        background: var(--mrc-color-primary, #126b99);
        color: #fff;
      }
      .mrc-faq-mark svg { width: calc(var(--mrc-card-heading-size, 1.5rem) * 0.62); height: calc(var(--mrc-card-heading-size, 1.5rem) * 0.62); }
      .mrc-faq-list {
        border: 1px solid var(--mrc-faq-divider);
        border-radius: var(--mrc-radius-md, 14px);
        background: var(--mrc-color-surface, #fff);
        box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06));
        overflow: hidden;
      }
    </style>
    <div class="mrc-faq-list">
      <!-- The card's mark and the article's name for it, on one line above the
           questions. A NAMED slot: in the default one the heading would be just
           another row in the list, with the mark unable to sit beside it. Hidden
           entirely on a page that names the card nothing. -->
      <div class="mrc-faq-head" data-role="head" hidden>
        <span class="mrc-faq-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.2 9.2a3 3 0 0 1 5.6 1.3c0 2-2.8 2.5-2.8 4"/><line x1="12" y1="17.5" x2="12" y2="17.51"/></svg>
        </span>
        <span class="mrc-faq-titleline">
          <slot name="heading"></slot>
          <!-- the card draws the rule itself: ::slotted() reaches the heading but
               not its pseudo-elements, and standalone there is no mrc.css to draw
               one at all — where it was found missing (13 Aug). Inside this box
               its 100% is the title-s own width; on the row it was the whole row.
               No guard needed: the row itself is hidden when nothing is slotted. -->
          <span class="mrc-faq-rule" aria-hidden="true"></span>
        </span>
      </div>
      <slot></slot>
    </div>`;
      class MrcFaq extends HTMLElement {
        #ready = false;
        connectedCallback() {
          if (!this.#ready) {
            this.attachShadow({ mode: 'open' }).appendChild(listTemplate.content.cloneNode(true));
            const head = this.shadowRoot.querySelector('[data-role="head"]');
            const slot = this.shadowRoot.querySelector('slot[name="heading"]');
            const syncHead = () => { head.hidden = slot.assignedElements().length === 0; };
            slot.addEventListener('slotchange', syncHead);
            syncHead();
            this.#ready = true;
          }
          trackLang(this);
          this.setLang(detectLang(this));
        }
        disconnectedCallback() { untrackLang(this); }
        setLang(next) {
          const lang = next === 'fa' ? 'fa' : 'en';
          this.lang = lang;
          this.dir = lang === 'fa' ? 'rtl' : 'ltr';
        }
      }
      const itemTemplate = document.createElement('template');
      itemTemplate.innerHTML = `
    <style>
      :host { display: block; }
      * { box-sizing: border-box; }
      .mrc-faq-item__question {
        display: flex;
        align-items: center;
        width: 100%;
        gap: var(--mrc-space-3, 12px);
        padding: var(--mrc-space-4, 16px);
        background: none;
        border: 0;
        border-top: 1px solid var(--mrc-faq-divider, #cfdbe5);
        margin: 0;
        font: inherit;
        font-weight: 700;
        color: var(--mrc-color-text, #1d2d3d);
        text-align: start;
        cursor: pointer;
      }
      :host(:first-of-type) .mrc-faq-item__question { border-top: 0; }
      .mrc-faq-item__question:hover {
        -webkit-text-stroke: var(--mrc-read-focus-stroke, 0.42px) currentColor;
      }
      .mrc-faq-item__question:hover {
        background: var(--mrc-color-surface-soft, #f1f5f7);
      }
      :host([open]) .mrc-faq-item__question {
        background: color-mix(in srgb, var(--mrc-color-primary, #126b99) 8%, var(--mrc-color-surface, #fff));
        color: var(--mrc-color-primary, #126b99);
      }
      .mrc-faq-item__question:focus-visible {
        outline: 2px solid var(--mrc-color-primary, #126b99);
        outline-offset: -2px;
      }
      .mrc-faq-item__chevron {
        display: flex;
        flex: 0 0 auto;
        margin-inline-start: auto;
        color: var(--mrc-color-primary, #126b99);
      }
      .mrc-faq-item__chevron svg {
        width: 18px;
        height: 18px;
        transition: transform 0.25s ease;
      }
      :host([open]) .mrc-faq-item__chevron svg { transform: rotate(180deg); }
      .mrc-faq-item__panel {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.3s ease;
      }
      :host([open]) .mrc-faq-item__panel { grid-template-rows: 1fr; }
      .mrc-faq-item__panel-inner { overflow: hidden; min-height: 0; }
      .mrc-faq-item__answer {
        padding: var(--mrc-space-3, 12px) var(--mrc-space-4, 16px) var(--mrc-space-4, 16px);
        font-size: 0.92rem;
        color: var(--mrc-color-text-muted, #627487);
      }
      @media (max-width: 767px) {
        .mrc-faq-item__question { padding: var(--mrc-space-3, 12px); }
        .mrc-faq-item__answer {
          padding: var(--mrc-space-2, 8px) var(--mrc-space-3, 12px) var(--mrc-space-3, 12px);
          font-size: 0.88rem;
        }
      }
      @media (min-width: 768px) {
        .mrc-faq-item__question { padding: var(--mrc-space-5, 20px); }
        .mrc-faq-item__answer { padding: var(--mrc-space-4, 16px) var(--mrc-space-5, 20px) var(--mrc-space-5, 20px); }
      }
    </style>
    <button type="button" class="mrc-faq-item__question" aria-expanded="false" aria-controls="panel">
      <span><slot name="question"></slot></span>
      <span class="mrc-faq-item__chevron" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </span>
    </button>
    <div class="mrc-faq-item__panel" id="panel">
      <div class="mrc-faq-item__panel-inner" inert>
        <div class="mrc-faq-item__answer"><slot></slot></div>
      </div>
    </div>`;
      class MrcFaqItem extends HTMLElement {
        static observedAttributes = ['open'];
        #ready = false;
        #trigger = null;
        connectedCallback() {
          if (!this.#ready) {
            this.attachShadow({ mode: 'open' }).appendChild(itemTemplate.content.cloneNode(true));
            this.#trigger = this.shadowRoot.querySelector('.mrc-faq-item__question');
            this.#trigger.addEventListener('click', () => this.toggle());
            this.#ready = true;
          }
          this.#sync();
        }
        attributeChangedCallback() {
          if (this.#ready) this.#sync();
        }
        toggle(force) {
          const next = force === undefined ? !this.hasAttribute('open') : Boolean(force);
          this.toggleAttribute('open', next);
        }
        #sync() {
          const open = this.hasAttribute('open');
          this.#trigger.setAttribute('aria-expanded', String(open));
          this.shadowRoot.querySelector('.mrc-faq-item__panel-inner').toggleAttribute('inert', !open);
        }
      }
      if (!customElements.get('mrc-faq-item')) customElements.define('mrc-faq-item', MrcFaqItem);
      if (!customElements.get('mrc-faq')) customElements.define('mrc-faq', MrcFaq);
  }
  {
      const DEFAULTS = Object.freeze({ locale: 'en-CA', currency: 'CAD' });
      const STRINGS = {
        en: {
          empty: 'No data to display',
          untick: 'Untick to see it as a table',
          closeCard: 'Close card',
          allCards: 'Show all rows as cards',
          rowCard: 'Show this row as a card',
          region: 'Table — scroll sideways with the arrow keys or by dragging'
        },
        fa: {
          empty: 'داده‌ای برای نمایش نیست',
          untick: 'برای دیدن به‌صورت جدول، تیک را بردارید',
          closeCard: 'بستن کارت',
          allCards: 'نمایش همه به‌صورت کارت',
          rowCard: 'نمایش این سطر به‌صورت کارت',
          region: 'جدول — با کلیدهای جهت یا کشیدن، چپ و راست کنید'
        }
      };
      function isEmpty(value) {
        return value === null || value === undefined || value === '';
      }
      function resolveValue(value, lang) {
        if (value && typeof value === 'object' && ('en' in value || 'fa' in value)) return value[lang];
        return value;
      }
      function alignFor(type) {
        return type === 'text' ? 'start' : 'end';
      }
      const template = document.createElement('template');
      template.innerHTML = `
    <style>
      :host {
        display: block;
        margin-top: var(--mrc-space-4, 16px);
        --mrc-table-cell-py: calc(var(--mrc-space-3, 12px) * 1.3);
        --mrc-table-cell-px: var(--mrc-space-4, 16px);
        --mrc-table-line-height: 1.85;
        --mrc-table-num-min: 92px;
        --mrc-table-ctrl-w: 44px;
        --mrc-table-first-max: 33.333vw;
        --mrc-table-fade-size: 52px;
        --mrc-table-fade-color: color-mix(in srgb, #0a1628 42%, transparent);
        --mrc-table-fade-arrow: #c9a227;
        --mrc-table-arrow-h: 11px;
        --mrc-table-arrow-w: 15px;
        --mrc-table-border-color: color-mix(in srgb, #0a1628 16%, var(--mrc-color-border, #d9e5ed));
        --mrc-table-head-bg: #1d3f63;
        --mrc-table-head-fg: #ffffff;
        --mrc-table-head-accent: #c9a227;
        --mrc-result-1-bg: color-mix(in srgb, var(--mrc-table-head-accent) 22%, var(--mrc-color-surface, #fff));
        --mrc-result-1-accent: var(--mrc-table-head-accent);
        --mrc-result-1-fg: var(--mrc-result-1-ink, #5c4a12);
        --mrc-result-2-bg: var(--mrc-table-head-bg);
        --mrc-result-2-accent: var(--mrc-table-head-accent);
        --mrc-result-2-fg: var(--mrc-table-head-fg, #ffffff);
        --mrc-result-2-rule: transparent;
        --mrc-result-2-head-bg: var(--mrc-result-2-head, #8a7433);
      }
      * { box-sizing: border-box; }
      .mrc-table-scroll {
        position: relative;
        border: 1px solid var(--mrc-table-border-color);
        border-radius: var(--mrc-radius-md, 14px);
        background: var(--mrc-color-surface, #fff);
        box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06));
        clip-path: inset(0 round var(--mrc-radius-md, 14px));
      }
      .mrc-table-wrapper {
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-x: contain;
      }
      .mrc-table-wrapper:focus { outline: none; }
      .mrc-table-wrapper:focus-visible {
        outline: 2px solid var(--mrc-table-head-accent);
        outline-offset: -2px;
      }
      .mrc-table-scroll[data-scrolls="true"] .mrc-table-wrapper { cursor: grab; }
      .mrc-table-scroll[data-scrolls="true"] .mrc-table-wrapper.is-dragging {
        cursor: grabbing;
        user-select: none;
      }
      .mrc-table-fade {
        position: absolute;
        z-index: 2;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.18s ease;
        display: flex;
        align-items: flex-start;
        justify-content: center;
      }
      .mrc-table-fade--left,
      .mrc-table-fade--right {
        inset-block: 0;
        width: var(--mrc-table-fade-size);
        padding-block: var(--mrc-arrow-top, 0px) var(--mrc-arrow-bottom, 0px);
      }
      .mrc-table-fade--left {
        left: 0;
        background: linear-gradient(to right, var(--mrc-table-fade-color), transparent);
      }
      .mrc-table-fade--right {
        right: 0;
        background: linear-gradient(to left, var(--mrc-table-fade-color), transparent);
      }
      .mrc-table-fade::after {
        content: "";
        width: 0;
        height: 0;
        position: sticky;
        inset-block-start: calc(50vh - var(--mrc-table-arrow-h));
        filter: drop-shadow(0 1px 2px rgba(10, 22, 40, 0.6));
      }
      .mrc-table-fade--left::after,
      .mrc-table-fade--right::after { border-block: var(--mrc-table-arrow-h) solid transparent; }
      .mrc-table-fade--left::after {
        border-right: var(--mrc-table-arrow-w) solid var(--mrc-table-fade-arrow);
        animation: mrc-nudge-left 1s ease-in-out infinite;
      }
      .mrc-table-fade--right::after {
        border-left: var(--mrc-table-arrow-w) solid var(--mrc-table-fade-arrow);
        animation: mrc-nudge-right 1s ease-in-out infinite;
      }
      @keyframes mrc-nudge-left  { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-4px); } }
      @keyframes mrc-nudge-right { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
      @media (prefers-reduced-motion: reduce) {
        .mrc-table-fade::after { animation: none !important; }
      }
      .mrc-table-scroll[data-fade-left="true"] .mrc-table-fade--left,
      .mrc-table-scroll[data-fade-right="true"] .mrc-table-fade--right { opacity: 1; }
      .mrc-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
        text-align: start;
      }
      .mrc-table th,
      .mrc-table td {
        padding: var(--mrc-table-cell-py) var(--mrc-table-cell-px);
        text-align: start;
        vertical-align: middle;
        line-height: var(--mrc-table-line-height);
      }
      .mrc-table tbody td:not(:first-child) { border-inline-start: 1px solid var(--mrc-color-border, #d9e5ed); }
      .mrc-table thead th:not(:first-child) { border-inline-start: 1px solid rgba(255, 255, 255, 0.15); }
      .mrc-table thead th {
        background: var(--mrc-table-head-bg);
        color: var(--mrc-table-head-fg);
        font-weight: 700;
        border-bottom: 3px solid var(--mrc-table-head-accent);
      }
      .mrc-table tbody td {
        border-bottom: 1px solid var(--mrc-color-border, #d9e5ed);
        color: var(--mrc-color-text, #1d2d3d);
      }
      .mrc-table tbody tr:last-child td { border-bottom: 0; }
      .mrc-table tbody tr:nth-child(even) td {
        background-image: linear-gradient(
          color-mix(in srgb, var(--mrc-color-surface-soft, #f1f5f7) 55%, transparent),
          color-mix(in srgb, var(--mrc-color-surface-soft, #f1f5f7) 55%, transparent));
      }
      .mrc-table tbody tr:hover td {
        background-image: linear-gradient(
          color-mix(in srgb, var(--mrc-color-primary, #126b99) 8%, transparent),
          color-mix(in srgb, var(--mrc-color-primary, #126b99) 8%, transparent));
      }
      .mrc-table tbody tr[data-result="1"] td {
        background: var(--mrc-result-1-bg);
        color: var(--mrc-result-1-fg);
        font-weight: 700;
      }
      .mrc-table tbody tr[data-result="1"] td:first-child { border-inline-start: 4px solid var(--mrc-result-1-accent); }
      .mrc-table tbody tr[data-result="2"] td {
        background: var(--mrc-result-2-bg);
        color: var(--mrc-result-2-fg);
        font-weight: 700;
        border-block-start: 2px solid var(--mrc-result-2-rule);
      }
      .mrc-table tbody tr[data-result="2"] td:first-child { border-inline-start: 4px solid var(--mrc-result-2-accent); }
      .mrc-table [data-align="end"] { text-align: end; font-variant-numeric: tabular-nums; }
      .mrc-table thead th .mrc-th-label {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        overflow: hidden;
        text-wrap: balance;
      }
      .mrc-table thead th[data-align],
      .mrc-table thead th[data-align] .mrc-th-label { text-align: center; }
      .mrc-table th[data-align="end"],
      .mrc-table td[data-align="end"] {
        width: 1%;
        min-width: var(--mrc-table-num-min);
      }
      .mrc-table td[data-align="end"] { white-space: nowrap; }
      .mrc-table td[data-align="start"] { white-space: normal; }
      .mrc-table-empty {
        padding: var(--mrc-space-6, 24px);
        text-align: center;
        color: var(--mrc-color-text-muted, #627487);
        font-size: 0.85rem;
      }
      .mrc-table__check {
        width: var(--mrc-table-ctrl-w);
        min-width: var(--mrc-table-ctrl-w);
        text-align: center;
        white-space: nowrap;
        position: sticky;
        inset-inline-start: 0;
        z-index: 2;
        background: var(--mrc-color-surface, #fff);
      }
      .mrc-table thead th.mrc-table__check { z-index: 3; background: var(--mrc-table-head-bg); }
      .mrc-table [data-first] {
        position: sticky;
        inset-inline-start: var(--mrc-table-ctrl-w);
        z-index: 1;
        background: var(--mrc-color-surface, #fff);
        max-inline-size: var(--mrc-table-first-max);
        font-weight: var(--mrc-table-first-weight, 600);
      }
      .mrc-table thead th[data-first] { z-index: 2; background: var(--mrc-table-head-bg); }
      .mrc-table-scroll[data-ticks="off"] .mrc-table__check { display: none; }
      .mrc-table-scroll[data-ticks="off"] .mrc-table [data-first] { inset-inline-start: 0; }
      .mrc-table__checkbox {
        width: 18px;
        height: 18px;
        accent-color: var(--mrc-table-head-accent);
        cursor: pointer;
        vertical-align: middle;
      }
      @media (max-width: 767px) {
        :host {
          --mrc-table-num-min: 76px;
          --mrc-table-fade-size: 38px;
          --mrc-table-arrow-h: 10px;
          --mrc-table-arrow-w: 13px;
        }
        .mrc-table th,
        .mrc-table td {
          padding: calc(var(--mrc-space-2, 8px) * 1.3) var(--mrc-space-3, 12px);
          font-size: 0.85rem;
        }
        .mrc-table-scroll[data-ticks="on"] .mrc-table__check { position: static; }
        .mrc-table-scroll[data-ticks="on"] .mrc-table [data-first] { inset-inline-start: 0; }
      }
      .mrc-card-list {
        display: grid;
        gap: var(--mrc-space-3, 12px);
        padding: var(--mrc-space-3, 12px);
      }
      .mrc-card-allbar {
        display: flex;
        align-items: center;
        gap: var(--mrc-space-2, 8px);
        font-weight: 600;
        color: var(--mrc-color-text-muted, #627487);
        cursor: pointer;
      }
      .mrc-table tbody tr.mrc-row-card > td {
        padding: 0;
        background: color-mix(in srgb, #0a1628 4%, var(--mrc-color-surface, #fff));
      }
      .mrc-row-card .mrc-card-detail {
        position: sticky;
        inset-inline-start: 0;
        width: var(--mrc-card-w, 100%);
      }
      .mrc-card-detail {
        margin-block: var(--mrc-space-3, 12px);
        margin-inline: 0;
        border: 1px solid var(--mrc-table-border-color);
        border-radius: var(--mrc-radius-md, 14px);
        background: var(--mrc-color-surface, #fff);
        box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06));
        overflow: hidden;
        animation: mrc-card-open 0.22s ease;
      }
      .mrc-card-list .mrc-card-detail { margin: 0; }
      .mrc-card-detail[data-result="1"] {
        border-color: var(--mrc-result-1-accent);
        border-width: 2px;
      }
      .mrc-card-detail[data-result="2"] {
        border-color: var(--mrc-result-2-accent);
        border-width: 3px;
      }
      .mrc-card-detail[data-result="2"] .mrc-card-head {
        background: var(--mrc-result-2-head-bg);
        border-bottom-width: 5px;
      }
      .mrc-card-detail[data-result="2"] .mrc-card-head { border-bottom-width: 5px; }
      .mrc-table-scroll:has(.mrc-card-list) {
        background: transparent;
        border-color: transparent;
        box-shadow: none;
      }
      .mrc-card-head {
        display: flex;
        align-items: center;
        gap: var(--mrc-space-3, 12px);
        padding: var(--mrc-space-3, 12px) var(--mrc-space-4, 16px);
        background: var(--mrc-table-head-bg);
        color: var(--mrc-table-head-fg);
        border-bottom: 3px solid var(--mrc-table-head-accent);
      }
      .mrc-card-title { font-weight: 700; }
      .mrc-card-row {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--mrc-space-4, 16px);
        padding: var(--mrc-space-2, 8px) var(--mrc-space-4, 16px);
        border-bottom: 1px dashed var(--mrc-color-border, #d9e5ed);
      }
      .mrc-card-row:last-child { border-bottom: 0; }
      .mrc-card-row:nth-child(even) {
        background: var(--mrc-card-stripe, rgba(29, 45, 61, 0.05));
      }
      .mrc-card-key {
        color: var(--mrc-card-key-color, var(--mrc-table-head-bg));
        font-weight: 700;
        border-inline-start: 3px solid var(--mrc-table-head-accent);
        padding-inline-start: var(--mrc-space-3, 12px);
        text-align: start;
      }
      .mrc-card-val { font-variant-numeric: tabular-nums; unicode-bidi: isolate; }
      .mrc-card-val[data-align="start"] { text-align: start; }
      .mrc-card-val[data-align="end"] { text-align: end; }
      @keyframes mrc-card-open {
        from { opacity: 0; transform: translateY(-6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .mrc-card-detail { animation: none; }
      }
    </style>
    <div class="mrc-table-scroll">
      <div class="mrc-table-wrapper" tabindex="0" role="region"></div>
      <!-- scroll fade indicators (each shown only when that side has hidden content) -->
      <span class="mrc-table-fade mrc-table-fade--left" aria-hidden="true"></span>
      <span class="mrc-table-fade mrc-table-fade--right" aria-hidden="true"></span>
    </div>`;
      class MrcTable extends HTMLElement {
        #ready = false;
        #box = null;
        #mount = null;
        #columns = [];
        #rows = [];
        #lang = 'en';
        #state = { expanded: new Set(), auto: true, naturalWidth: 0 };
        connectedCallback() {
          if (!this.#ready) {
            this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
            this.#box = this.shadowRoot.querySelector('.mrc-table-scroll');
            this.#mount = this.shadowRoot.querySelector('.mrc-table-wrapper');
            this.#readJson();
            this.#bind();
            this.#ready = true;
          }
          trackLang(this);
          this.setLang(detectLang(this));
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
              this.#readJson();
              this.setLang(this.#lang);
            }, { once: true });
          }
        }
        disconnectedCallback() { untrackLang(this); }
        set data(value) {
          this.#columns = Array.isArray(value?.columns) ? value.columns : [];
          this.#rows = Array.isArray(value?.rows) ? value.rows : [];
          this.#state.expanded.clear();
          this.#state.auto = true;
          if (this.#ready) this.setLang(this.#lang);
        }
        get data() { return { columns: this.#columns, rows: this.#rows }; }
        setLang(next) {
          this.#lang = next === 'fa' ? 'fa' : 'en';
          this.lang = this.#lang;
          this.dir = this.#lang === 'fa' ? 'rtl' : 'ltr';
          this.#mount.setAttribute('aria-label', STRINGS[this.#lang].region);
          this.#render();
          this.#settle();
        }
        #readJson() {
          const node = this.querySelector('script[type="application/json"]');
          if (!node) return;
          try {
            const parsed = JSON.parse(node.textContent);
            this.#columns = Array.isArray(parsed.columns) ? parsed.columns : [];
            this.#rows = Array.isArray(parsed.rows) ? parsed.rows : [];
          } catch (error) {
            console.warn('[mrc-table] the JSON child could not be parsed — rendering the empty state instead.', error);
            this.#columns = [];
            this.#rows = [];
          }
        }
        #visibleColumns() {
          return this.#columns.filter((col) =>
            this.#rows.some((row) => !isEmpty(resolveValue(row[col.key], this.#lang))));
        }
        #format(value, type) {
          if (isEmpty(value)) return '—';
          const locale = this.getAttribute('locale') || DEFAULTS.locale;
          const currency = this.getAttribute('currency') || DEFAULTS.currency;
          if (type === 'currency') {
            return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
          }
          if (type === 'percent') {
            return new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 }).format(value);
          }
          if (type === 'number') {
            return new Intl.NumberFormat(locale).format(value);
          }
          return String(value);
        }
        #buildCard(rowData, rowIndex, cols) {
          const lang = this.#lang;
          const card = document.createElement('div');
          card.className = 'mrc-card-detail';
          card.dir = this.dir;
          if (!isEmpty(rowData.result)) card.dataset.result = String(rowData.result);
          const head = document.createElement('div');
          head.className = 'mrc-card-head';
          const cb = document.createElement('input');
          cb.type = 'checkbox';
          cb.className = 'mrc-table__checkbox';
          cb.dataset.check = String(rowIndex);
          cb.checked = true;
          cb.setAttribute('aria-label', STRINGS[lang].closeCard);
          const title = document.createElement('span');
          title.className = 'mrc-card-title';
          title.textContent = this.#format(resolveValue(rowData[cols[0].key], lang), cols[0].type);
          head.append(cb, title);
          card.appendChild(head);
          cols.forEach((col) => {
            const line = document.createElement('div');
            line.className = 'mrc-card-row';
            const key = document.createElement('span');
            key.className = 'mrc-card-key';
            key.textContent = col.label[lang];
            const val = document.createElement('span');
            val.className = 'mrc-card-val';
            val.dataset.align = alignFor(col.type);
            val.textContent = this.#format(resolveValue(rowData[col.key], lang), col.type);
            line.append(key, val);
            card.appendChild(line);
          });
          return card;
        }
        #render() {
          const lang = this.#lang;
          const cols = this.#visibleColumns();
          this.#mount.textContent = '';
          if (!cols.length || !this.#rows.length) {
            const empty = document.createElement('div');
            empty.className = 'mrc-table-empty';
            empty.textContent = STRINGS[lang].empty;
            this.#mount.appendChild(empty);
            return;
          }
          if (this.#state.expanded.size === this.#rows.length) {
            const list = document.createElement('div');
            list.className = 'mrc-card-list';
            const barLabel = document.createElement('label');
            barLabel.className = 'mrc-card-allbar';
            const master = document.createElement('input');
            master.type = 'checkbox';
            master.className = 'mrc-table__checkbox';
            master.dataset.checkAll = '';
            master.checked = true;
            const barText = document.createElement('span');
            barText.textContent = STRINGS[lang].untick;
            barLabel.append(master, barText);
            list.appendChild(barLabel);
            this.#rows.forEach((rowData, i) => list.appendChild(this.#buildCard(rowData, i, cols)));
            this.#mount.appendChild(list);
            return;
          }
          const table = document.createElement('table');
          table.className = 'mrc-table';
          table.dir = this.dir;
          const thead = document.createElement('thead');
          const headRow = document.createElement('tr');
          const ctrlTh = document.createElement('th');
          ctrlTh.className = 'mrc-table__check';
          ctrlTh.scope = 'col';
          const allCb = document.createElement('input');
          allCb.type = 'checkbox';
          allCb.className = 'mrc-table__checkbox';
          allCb.dataset.checkAll = '';
          allCb.setAttribute('aria-label', STRINGS[lang].allCards);
          allCb.checked = false;
          allCb.indeterminate = this.#state.expanded.size > 0;
          ctrlTh.appendChild(allCb);
          headRow.appendChild(ctrlTh);
          cols.forEach((col, colIndex) => {
            const th = document.createElement('th');
            th.scope = 'col';
            th.dataset.align = alignFor(col.type);
            if (colIndex === 0) th.dataset.first = '';
            const label = document.createElement('span');
            label.className = 'mrc-th-label';
            label.textContent = col.label[lang];
            th.appendChild(label);
            headRow.appendChild(th);
          });
          thead.appendChild(headRow);
          table.appendChild(thead);
          const tbody = document.createElement('tbody');
          this.#rows.forEach((rowData, rowIndex) => {
            if (this.#state.expanded.has(rowIndex)) {
              const cardTr = document.createElement('tr');
              cardTr.className = 'mrc-row-card';
              const cardTd = document.createElement('td');
              cardTd.colSpan = cols.length + 1;
              cardTd.appendChild(this.#buildCard(rowData, rowIndex, cols));
              cardTr.appendChild(cardTd);
              tbody.appendChild(cardTr);
              return;
            }
            const tr = document.createElement('tr');
            if (!isEmpty(rowData.result)) tr.dataset.result = String(rowData.result);
            const ctrlTd = document.createElement('td');
            ctrlTd.className = 'mrc-table__check';
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.className = 'mrc-table__checkbox';
            cb.dataset.check = String(rowIndex);
            cb.checked = false;
            cb.setAttribute('aria-label', STRINGS[lang].rowCard);
            ctrlTd.appendChild(cb);
            tr.appendChild(ctrlTd);
            cols.forEach((col, colIndex) => {
              const td = document.createElement('td');
              td.dataset.align = alignFor(col.type);
              if (colIndex === 0) td.dataset.first = '';
              td.textContent = this.#format(resolveValue(rowData[col.key], lang), col.type);
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
          });
          table.appendChild(tbody);
          this.#mount.appendChild(table);
          this.#measureNaturalWidth();
          this.#fitHeaders();
          this.#syncCardWidth();
          const scrolls = this.#state.naturalWidth > this.#mount.clientWidth + 1;
          this.#box.dataset.ticks = scrolls ? 'on' : 'off';
          this.#syncArrowRange();
        }
        #fitHeaders() {
          const table = this.#mount.querySelector('.mrc-table');
          if (!table) return;
          table.querySelectorAll('thead th[data-align]').forEach((th) => {
            const label = th.querySelector('.mrc-th-label');
            if (!label) return;
            let guard = 0;
            let width = parseFloat(getComputedStyle(th).minWidth) || 0;
            while (label.scrollHeight > label.clientHeight + 1 && guard < 60) {
              width += 8;
              th.style.minWidth = width + 'px';
              guard++;
            }
          });
        }
        #measureNaturalWidth() {
          if (!this.#mount.querySelector('.mrc-table')) return;
          const prevTicks = this.#box.dataset.ticks;
          this.#box.dataset.ticks = 'off';
          const prevWidth = this.#mount.style.width;
          this.#mount.style.width = '0px';
          this.#state.naturalWidth = this.#mount.scrollWidth;
          this.#mount.style.width = prevWidth;
          if (prevTicks === undefined) delete this.#box.dataset.ticks;
          else this.#box.dataset.ticks = prevTicks;
        }
        #syncCardWidth() {
          this.#box.style.setProperty('--mrc-card-w', this.#mount.clientWidth + 'px');
        }
        #syncArrowRange() {
          const rows = this.#mount.querySelectorAll('.mrc-table tbody tr');
          if (!rows.length) {
            this.#box.style.removeProperty('--mrc-arrow-top');
            this.#box.style.removeProperty('--mrc-arrow-bottom');
            return;
          }
          const boxRect = this.#box.getBoundingClientRect();
          const first = rows[0].getBoundingClientRect();
          const last = rows[rows.length - 1].getBoundingClientRect();
          const top = first.top + first.height / 2 - boxRect.top;
          const bottom = boxRect.bottom - (last.top + last.height / 2);
          this.#box.style.setProperty('--mrc-arrow-top', Math.max(0, top) + 'px');
          this.#box.style.setProperty('--mrc-arrow-bottom', Math.max(0, bottom) + 'px');
        }
        #applyAuto() {
          if (this.#mount.clientWidth === 0) return false;
          if (this.#state.expanded.size === 0) this.#measureNaturalWidth();
          const fits = this.#state.naturalWidth > 0 && this.#state.naturalWidth <= this.#mount.clientWidth + 1;
          if (fits) {
            this.#state.auto = true;
            if (this.#state.expanded.size > 0) { this.#state.expanded.clear(); return true; }
            return false;
          }
          if (this.#state.auto && this.#state.expanded.size !== this.#rows.length) {
            this.#rows.forEach((_, i) => this.#state.expanded.add(i));
            return true;
          }
          return false;
        }
        #settle() {
          const run = () => { if (this.#applyAuto()) this.#render(); };
          run();
          requestAnimationFrame(() => { run(); requestAnimationFrame(run); });
        }
        #bind() {
          this.#mount.addEventListener('change', (event) => {
            const cb = event.target.closest('input[type="checkbox"]');
            if (!cb) return;
            if ('checkAll' in cb.dataset) {
              if (cb.checked) this.#rows.forEach((_, i) => this.#state.expanded.add(i));
              else this.#state.expanded.clear();
            } else if ('check' in cb.dataset) {
              const i = Number(cb.dataset.check);
              if (cb.checked) this.#state.expanded.add(i);
              else this.#state.expanded.delete(i);
            } else {
              return;
            }
            this.#state.auto = false;
            this.#applyAuto();
            this.#render();
          });
          new ResizeObserver(() => { if (this.#applyAuto()) this.#render(); }).observe(this.#mount);
          let dragging = false;
          let dragStartX = 0;
          let dragStartScroll = 0;
          this.#mount.addEventListener('pointerdown', (event) => {
            if (event.pointerType !== 'mouse' || event.button !== 0) return;
            if (this.#mount.scrollWidth <= this.#mount.clientWidth) return;
            if (event.target.closest('input, a, button, label')) return;
            dragging = true;
            dragStartX = event.clientX;
            dragStartScroll = this.#mount.scrollLeft;
            this.#mount.setPointerCapture(event.pointerId);
            this.#mount.classList.add('is-dragging');
          });
          this.#mount.addEventListener('pointermove', (event) => {
            if (!dragging) return;
            this.#mount.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
          });
          const endDrag = (event) => {
            if (!dragging) return;
            dragging = false;
            this.#mount.classList.remove('is-dragging');
            if (this.#mount.hasPointerCapture(event.pointerId)) {
              this.#mount.releasePointerCapture(event.pointerId);
            }
          };
          this.#mount.addEventListener('pointerup', endDrag);
          this.#mount.addEventListener('pointercancel', endDrag);
          this.#mount.addEventListener('scroll', () => this.#updateFades(), { passive: true });
          const fadeObserver = new ResizeObserver(() => this.#updateFades());
          fadeObserver.observe(this.#mount);
          new MutationObserver(() => this.#updateFades()).observe(this.#mount, { childList: true, subtree: true });
        }
        #updateFades() {
          const scroller = this.#mount;
          const isRTL = getComputedStyle(scroller).direction === 'rtl';
          const maxX = scroller.scrollWidth - scroller.clientWidth;
          const sl = scroller.scrollLeft;
          const leftHidden = isRTL ? sl > -maxX + 1 : sl > 1;
          const rightHidden = isRTL ? sl < -1 : sl < maxX - 1;
          const set = (side, on) => {
            if (on) this.#box.setAttribute('data-fade-' + side, 'true');
            else this.#box.removeAttribute('data-fade-' + side);
          };
          this.#box.dataset.scrolls = maxX > 0 ? 'true' : 'false';
          set('left', maxX > 0 && leftHidden);
          set('right', maxX > 0 && rightHidden);
          this.#syncCardWidth();
        }
      }
      if (!customElements.get('mrc-table')) customElements.define('mrc-table', MrcTable);
  }
  {
      const DEFAULT_LEVELS = 'h2';
      const SECTION_CLASS = 'mrc-toc-section';
      const NEXT_CLASS = 'mrc-toc-next';
      const REVEAL_ON_JUMP = 'mrc-reference-card, mrc-disclaimer-card';
      const CLOSE_ON_LEAVE = '[open]';
      const SPY_BAND_BOTTOM = '-72%';
      const SPY_BAND = `-88px 0px ${SPY_BAND_BOTTOM} 0px`;
      const aboveFirstReach = () => {
        const doc = document.documentElement.scrollHeight * 2 + window.innerHeight;
        return `${Math.max(9999, doc)}px 0px ${SPY_BAND_BOTTOM} 0px`;
      };
      const NEXT_BAR_GAP_PX = 7;
      const NEXT_BAR_BLEED_PX = 8;
      const SWAP_OUT_MS = 160;
      const SWAP_IN_MS = 240;
      const SWAP_EASE_OUT = 'cubic-bezier(0.4, 0, 1, 1)';
      const SWAP_EASE_IN = 'cubic-bezier(0.22, 1, 0.36, 1)';
      const FIT_STEPS = 5;
      const FIT_STEP = 0.04;
      const NEXT_LABEL_MIN = 14;
      const OPEN_MS = 360;
      const HEADER_REVEAL_BAND = 0.05;
      const HINT_DELAY_MS = 2000;
      const HINT_MS = 4900;
      const HINT_DIP_END_MS = 3360 + 800;
      const HINT_GAP_MS = 700;
      const RISE_MS = 900;
      const HINT_TIMES = 2;
      const QUIET_MS = 560;
      const TOGGLE_DEBOUNCE_MS = 200;
      const INNER_SCROLL_GRACE_MS = 300;
      const LOAN_SLACK_PX = 6;
      const STRINGS = {
        en: { title: 'Table of contents', open: 'Show table of contents', close: 'Hide table of contents', sections: 'sections', next: 'Next', top: 'Back to top', end: 'End of article' },
        fa: { title: 'فهرست مطالب', open: 'نمایش فهرست مطالب', close: 'بستن فهرست مطالب', sections: 'بخش', next: 'بخش بعدی', top: 'بازگشت به بالا', end: 'پایان مقاله' }
      };
      function headingLabel(heading, lang) {
        const spans = heading.querySelectorAll(`[data-lang="${lang}"]`);
        const text = spans.length
          ? [...spans].map((s) => s.textContent).join(' ')
          : heading.textContent;
        return text.replace(/\s+/g, ' ').trim();
      }
      function settleFolds(el) {
        if (!el.shadowRoot) return;
        el.offsetHeight;
        el.shadowRoot.getAnimations({ subtree: true }).forEach((animation) => {
          try {
            animation.finish();
          } catch (error) {
            console.warn('mrc-toc: a fold in <' + el.tagName.toLowerCase() + '> would not settle before the jump —', error.message);
          }
        });
      }
      function ensureId(heading, index) {
        if (heading.id) return heading.id;
        const kept = heading.getAttribute('data-mrc-slug');
        const stable = heading.querySelector('[data-lang="en"]');
        const slug = (kept || (stable ? stable.textContent : heading.textContent))
          .toLowerCase().trim()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
          .slice(0, 50);
        let id = slug ? `mrc-s-${slug}` : `mrc-s-${index + 1}`;
        if (document.getElementById(id)) id = `${id}-${index + 1}`;
        heading.id = id;
        return id;
      }
      const HEADED_ATTR = 'data-mrc-headed';
      function markHeadedHost(section) {
        for (let el = section.parentElement; el && el !== document.body; el = el.parentElement) {
          if (!el.tagName.startsWith('MRC-')) continue;
          if (el.tagName !== 'MRC-SHELL') el.setAttribute(HEADED_ATTR, '');
          return;
        }
      }
      const template = document.createElement('template');
      template.innerHTML = `
    <style>
      *, *::before, *::after { box-sizing: border-box; }
      :host {
        display: contents;
      }
      :host([data-mrc-animating]) { transition: none; }
      .mrc-toc-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: auto;
        position: sticky;
        top: calc(var(--mrc-toc-sticky-top, 0px) - var(--mrc-site-header-shift, 0px) + var(--mrc-toc-top-gap, 5px));
        transition: top var(--mrc-toc-slide, 0.34s) var(--mrc-toc-ease, cubic-bezier(0.22, 1, 0.36, 1));
        z-index: 30;
        margin-block-start: var(--mrc-card-gap, 28px);
        padding: var(--mrc-space-2, 8px) var(--mrc-space-3, 12px);
        border-radius: var(--mrc-radius-sm, 8px);
        border: 1px solid var(--mrc-toc-bar-edge, rgba(201, 162, 39, 0.7));
        border-block-start: 0;
        border-block-end: 3px solid var(--mrc-toc-bar-accent, #c9a227);
        background: var(--mrc-toc-bar-surface, rgba(255, 253, 247, 0.82));
        backdrop-filter: blur(var(--mrc-toc-bar-blur, 10px)) saturate(1.1);
        -webkit-backdrop-filter: blur(var(--mrc-toc-bar-blur, 10px)) saturate(1.1);
        color: var(--mrc-color-text, #1d2d3d);
        box-shadow: var(--mrc-toc-bar-shadow, 0 1px 2px rgba(16, 24, 40, 0.06), 0 10px 24px rgba(16, 24, 40, 0.16));
        cursor: pointer;
      }
      .mrc-toc-toggle:focus-visible {
        outline: 2px solid var(--mrc-color-primary, #126b99);
        outline-offset: 2px;
      }
      @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
        .mrc-toc-toggle { background: var(--mrc-color-surface, #fff); }
      }
      .mrc-toc-collapse {
        display: grid;
        grid-template-rows: 1fr;
        position: relative;
        z-index: 0;
        transition: grid-template-rows var(--mrc-toc-slide, 0.34s) var(--mrc-toc-ease, cubic-bezier(0.22, 1, 0.36, 1));
      }
      :host([data-mrc-open="false"]) .mrc-toc-collapse { grid-template-rows: 0fr; }
      :host([data-mrc-rebuilding]) .mrc-toc-collapse,
      :host([data-mrc-rebuilding]) .mrc-toc-box { transition: none; }
      :host([data-mrc-open="true"]) .mrc-toc-toggle {
        border-end-start-radius: 0;
        border-end-end-radius: 0;
        border-block-end: 1px solid var(--mrc-toc-bar-edge, rgba(201, 162, 39, 0.7));
      }
      .mrc-toc-box {
        padding: var(--mrc-space-4, 16px);
        border-start-start-radius: 0;
        border-start-end-radius: 0;
        border-end-start-radius: var(--mrc-radius-sm, 8px);
        border-end-end-radius: var(--mrc-radius-sm, 8px);
        border-inline: 1px solid var(--mrc-toc-bar-edge, rgba(201, 162, 39, 0.7));
        border-block-end: 1px solid var(--mrc-toc-bar-edge, rgba(201, 162, 39, 0.7));
        background: var(--mrc-toc-box-surface, #fffdf7);
        box-shadow: var(--mrc-toc-bar-shadow, 0 1px 2px rgba(16, 24, 40, 0.06), 0 10px 24px rgba(16, 24, 40, 0.16));
        max-height: var(--mrc-toc-open-max-height, calc(
          100dvh
          - var(--mrc-toc-sticky-top, 0px)
          - var(--mrc-toc-top-gap, 5px)
          - var(--mrc-toc-bar-block, 52px)
          - var(--mrc-toc-open-bottom-gap, 24px)));
        overflow-y: hidden;
        overscroll-behavior: auto;
      }
      :host([data-mrc-stuck]) .mrc-toc-box { overflow-y: auto; }
      :host([data-mrc-open="false"]) .mrc-toc-box {
        min-height: 0;
        padding-block: 0;
        border-inline-width: 0;
        border-block-end-width: 0;
      }
      .mrc-toc-box__header { display: none; }
      .mrc-toc-box__list {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--mrc-space-2, 8px);
        counter-reset: mrc-toc-counter;
      }
      .mrc-toc-box__item { counter-increment: mrc-toc-counter; }
      @media (min-width: 768px) {
        :host { --mrc-toc-entry-size: 1.125rem; --mrc-toc-title-size: 1.425rem; --mrc-toc-current-size: 1.175rem; }
        .mrc-toc-box__list {
          grid-template-columns: repeat(var(--mrc-toc-columns, 2), minmax(0, 1fr));
          column-gap: var(--mrc-space-3, 12px);
        }
        .mrc-toc-box__item { display: flex; }
        .mrc-toc-box__item > .mrc-toc-box__link { flex: 1 1 auto; }
      }
      .mrc-toc-box__link {
        display: flex;
        align-items: center;
        gap: var(--mrc-space-3, 12px);
        padding: var(--mrc-toc-item-pad-block, 12px) var(--mrc-space-3, 12px);
        border: 1px solid var(--mrc-color-border, #d9e5ed);
        border-radius: var(--mrc-radius-sm, 8px);
        background: var(--mrc-color-surface, #fff);
        box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06));
        color: var(--mrc-color-text, #1d2d3d);
        text-decoration: none;
        font-size: var(--mrc-toc-entry-size, 0.92rem);
        transition: background-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease, border-color 0.15s ease;
      }
      .mrc-toc-box__link > span,
      .mrc-toc-box__link {
        overflow: hidden;
      }
      .mrc-toc-box__label {
        min-height: 1lh;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
        min-width: 0;
      }
      .mrc-toc-box__link::before {
        content: '';
        flex: 0 0 auto;
        box-sizing: border-box;
        width: var(--mrc-toc-dot-size, 18px);
        height: var(--mrc-toc-dot-size, 18px);
        border-radius: 50%;
        background: var(--mrc-toc-badge-bg, color-mix(in srgb, var(--mrc-toc-bar-accent, #c9a227) 18%, var(--mrc-color-surface, #fff)));
        border: var(--mrc-toc-dot-ring, 5px) solid var(--mrc-toc-badge-bg, color-mix(in srgb, var(--mrc-toc-bar-accent, #c9a227) 18%, var(--mrc-color-surface, #fff)));
        box-shadow: inset 0 0 0 99px var(--mrc-toc-dot-fg, var(--mrc-toc-bar-accent, #c9a227));
      }
      .mrc-toc-box__link[data-mrc-key] {
        color: var(--mrc-toc-key-fg, var(--mrc-color-primary-dark, #0a2239));
        font-weight: 600;
      }
      .mrc-toc-box__link:hover {
        background: color-mix(in srgb, var(--mrc-color-primary, #126b99) 5%, var(--mrc-color-surface, #fff));
        border-color: color-mix(in srgb, var(--mrc-color-primary, #126b99) 35%, var(--mrc-color-border, #d9e5ed));
        box-shadow: var(--mrc-shadow-md, 0 12px 30px rgba(0, 0, 0, 0.09));
        transform: translateY(-1px);
      }
      .mrc-toc-box__link:focus-visible {
        outline: 2px solid var(--mrc-color-primary, #126b99);
        outline-offset: 2px;
      }
      .mrc-toc-box__link[aria-current] {
        border-color: var(--mrc-toc-bar-accent, #c9a227);
        background: var(--mrc-toc-current-bg, color-mix(in srgb, var(--mrc-toc-bar-accent, #c9a227) 20%, var(--mrc-color-surface, #fff)));
        border-inline-start-width: 3px;
        padding-inline-start: calc(var(--mrc-space-3, 12px) - 2px);
        font-weight: 700;
      }
      .mrc-toc-box__link[aria-current]::before {
        background: var(--mrc-toc-bar-accent, #c9a227);
        color: var(--mrc-toc-current-badge-fg, #1d2d3d);
      }
      .mrc-toc-box__empty {
        margin: 0;
        color: var(--mrc-color-text-muted, #627487);
        font-size: 0.85rem;
      }
      .mrc-toc-bar {
        display: flex;
        align-items: center;
        gap: var(--mrc-space-2, 8px);
        width: 100%;
        text-align: start;
      }
      .mrc-toc-bar__icon {
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        inline-size: var(--mrc-toc-bar-icon-size, 32px);
        block-size: var(--mrc-toc-bar-icon-size, 32px);
        border-radius: var(--mrc-toc-bar-icon-radius, 9px);
        background: var(--mrc-toc-bar-icon-bg, var(--mrc-toc-bar-accent, #c9a227));
        color: var(--mrc-toc-bar-icon-fg, var(--mrc-color-primary-dark, #0a2239));
      }
      .mrc-toc-bar__icon svg {
        width: var(--mrc-toc-bar-icon-glyph, 18px);
        height: var(--mrc-toc-bar-icon-glyph, 18px);
        stroke-width: var(--mrc-toc-bar-icon-stroke, 3);
      }
      .mrc-toc-bar__text {
        display: flex;
        flex-flow: row wrap;
        align-items: baseline;
        column-gap: var(--mrc-space-2, 8px);
        min-width: 0;
        flex: 1 1 auto;
      }
      .mrc-toc-bar__title {
        font-size: var(--mrc-toc-title-size, 1.15rem);
        font-weight: 700;
        color: var(--mrc-color-text, #1d2d3d);
      }
      .mrc-toc-bar__title::after {
        content: '';
        display: block;
        inline-size: var(--mrc-toc-title-rule-length, 44px);
        block-size: var(--mrc-toc-title-rule-weight, 2px);
        margin-block-start: var(--mrc-space-1, 4px);
        border-radius: 999px;
        background: var(--mrc-toc-title-rule-colour, var(--mrc-toc-bar-accent, #c9a227));
      }
      .mrc-toc-bar__current {
        flex: 1 1 auto;
        min-width: 0;
        font-size: var(--mrc-toc-current-size, 0.9rem);
        font-weight: 400;
        color: var(--mrc-toc-current-fg, var(--mrc-toc-bar-label, #85702f));
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mrc-toc-bar__current:empty { display: none; }
      .mrc-toc-bar__title { flex: 0 0 auto; }
      .mrc-toc-bar__chevron { display: flex; flex: 0 0 auto; color: var(--mrc-toc-bar-accent, #c9a227); }
      .mrc-toc-bar__chevron svg {
        width: 22px;
        height: 22px;
        stroke-width: 2.6;
        transition: transform var(--mrc-toc-slide, 0.34s) var(--mrc-toc-ease, cubic-bezier(0.22, 1, 0.36, 1));
      }
      :host([data-mrc-open="true"]) .mrc-toc-bar__chevron svg { transform: rotate(180deg); }
      .mrc-toc-toggle { overflow: hidden; }
      .mrc-toc-toggle::after {
        content: '';
        position: absolute;
        inset-block: 0;
        inset-inline-start: 0;
        inline-size: 38%;
        background: linear-gradient(105deg,
          transparent 28%,
          var(--mrc-toc-hint-shine, rgba(255, 253, 247, 0.92)) 42%,
          var(--mrc-toc-hint-shade, rgba(138, 116, 51, 0.22)) 50%,
          var(--mrc-toc-hint-shine, rgba(255, 253, 247, 0.92)) 58%,
          transparent 72%);
        opacity: 0;
        pointer-events: none;
      }
      :host([dir="rtl"]) .mrc-toc-toggle::after {
        background: linear-gradient(75deg,
          transparent 28%,
          var(--mrc-toc-hint-shine, rgba(255, 253, 247, 0.92)) 42%,
          var(--mrc-toc-hint-shade, rgba(138, 116, 51, 0.22)) 50%,
          var(--mrc-toc-hint-shine, rgba(255, 253, 247, 0.92)) 58%,
          transparent 72%);
      }
      @keyframes mrc-toc-hint-shine {
        0%   { opacity: 0; transform: translateX(-170%) skewX(-8deg); }
        10%  { opacity: 1; }
        90%  { opacity: 1; }
        100% { opacity: 0; transform: translateX(280%) skewX(-8deg); }
      }
      @keyframes mrc-toc-hint-shine-rtl {
        0%   { opacity: 0; transform: translateX(170%) skewX(8deg); }
        10%  { opacity: 1; }
        90%  { opacity: 1; }
        100% { opacity: 0; transform: translateX(-280%) skewX(8deg); }
      }
      @keyframes mrc-toc-hint-dip {
        0%   { transform: translateY(0) scale(1); }
        15%  { transform: translateY(5px) scale(1.28); }
        35%  { transform: translateY(0) scale(1.2); }
        55%  { transform: translateY(5px) scale(1.28); }
        78%  { transform: translateY(0) scale(1.14); }
        100% { transform: translateY(0) scale(1); }
      }
      :host([data-mrc-hint]) .mrc-toc-toggle::after {
        animation: mrc-toc-hint-shine var(--mrc-toc-shine-ms, 4.7s) ease-in-out 1;
      }
      :host([dir="rtl"][data-mrc-hint]) .mrc-toc-toggle::after {
        animation-name: mrc-toc-hint-shine-rtl;
      }
      :host([data-mrc-hint]) .mrc-toc-bar__chevron svg {
        animation: mrc-toc-hint-dip var(--mrc-toc-dip-ms, 0.8s) ease-in-out var(--mrc-toc-dip-delay, 3.36s) 1;
      }
      @media (prefers-reduced-motion: reduce) {
        :host, .mrc-toc-collapse, .mrc-toc-box__link { transition: none; }
        :host([data-mrc-hint]) .mrc-toc-toggle::after,
        :host([data-mrc-hint]) .mrc-toc-bar__chevron svg { animation: none; }
      }
    </style>
    <button type="button" class="mrc-toc-toggle" aria-expanded="true" aria-controls="panel">
      <!-- the whole contents of the bar: icon, the label with the current section
           under it, and the chevron that turns when the panel opens -->
      <span class="mrc-toc-bar" aria-hidden="true">
        <span class="mrc-toc-bar__icon">
          <!-- Three plain bars, not the dotted list mark that was here: inside a
               filled tile the six-part glyph turned to noise at 18px. The middle
               bar is the short one — one number if that should change. -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="5" y1="7" x2="19" y2="7"/><line x1="5" y1="12" x2="14" y2="12"/><line x1="5" y1="17" x2="19" y2="17"/></svg>
        </span>
        <span class="mrc-toc-bar__text">
          <span class="mrc-toc-bar__title"></span>
          <span class="mrc-toc-bar__current"></span>
        </span>
        <span class="mrc-toc-bar__chevron">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </span>
    </button>
    <div class="mrc-toc-collapse" id="panel">
      <nav class="mrc-toc-box">
        <div class="mrc-toc-box__header">
          <span class="mrc-toc-box__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </span>
          <p class="mrc-toc-box__title"></p>
        </div>
        <ol class="mrc-toc-box__list"></ol>
      </nav>
    </div>`;
      class MrcToc extends HTMLElement {
        static observedAttributes = ['open', 'scope', 'levels'];
        #ready = false;
        #openedOnce = false;
        #signature = null;
        #watcher = null;
        #spy = null;
        #currentId = null;
        #innerScrollAt = 0;
        #quietUntil = 0;
        #lastToggleAt = 0;
        #hintTimer = 0;
        #doneTimer = 0;
        #riseRaf = 0;
        #riseOff = null;
        #docked = false;
        #push = 0;
        #belowWatch = null;
        #stuck = false;
        #stuckWatch = null;
        #panelSeen = false;
        #panelWatch = null;
        #nextBar = null;
        #fromId = null;
        #fromTop = 0;
        #fromAt = -1;
        #spyWants = null;
        #animTimer = 0;
        #vis = null;
        #visible = new Set();
        #firstSpy = null;
        connectedCallback() {
          if (!this.#ready) {
            this.#ready = true;
            this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
            this.#bind();
            this.#watchContent();
          }
          trackLang(this);
          this.setLang(detectLang(this));
          if (!this.#openedOnce) {
            this.#openedOnce = true;
            const wanted = this.hasAttribute('open')
              ? this.getAttribute('open') !== 'false'
              : false;
            this.style.transition = 'none';
            this.setOpen(wanted);
            this.offsetWidth;
            this.style.transition = '';
            if (!wanted) this.#hintOnce();
          }
          this.#watchStuck();
          this.#watchBelow();
          this.#watchPanel();
        }
        #fitLabel(el) {
          if (!el) return;
          el.style.fontSize = '';
          if (el.scrollHeight <= el.clientHeight + 1) return;
          const base = parseFloat(getComputedStyle(el).fontSize);
          if (!base) return;
          for (let step = 1; step <= FIT_STEPS; step += 1) {
            el.style.fontSize = (base * (1 - step * FIT_STEP)).toFixed(2) + 'px';
            if (el.scrollHeight <= el.clientHeight + 1) return;
          }
        }
        #fitNextLabel() {
          const bar = this.#nextBar;
          const label = bar && bar.querySelector('[data-role="label"]');
          if (!label) return;
          bar.style.setProperty('--mrc-toc-next-scale', '1');
          const base = parseFloat(getComputedStyle(label).fontSize);
          const room = label.clientWidth;
          const need = label.scrollWidth;
          if (!base || !room || need <= room + 1) return;
          const wanted = base * (room / need);
          bar.style.setProperty('--mrc-toc-next-scale',
            (Math.max(wanted, NEXT_LABEL_MIN) / base).toFixed(3));
        }
        #fitEntries() {
          this.shadowRoot.querySelectorAll('.mrc-toc-box__label')
            .forEach((el) => this.#fitLabel(el));
        }
        #watchStuck() {
          if (this.#stuckWatch) return;
          const header = this.shadowRoot.querySelector('.mrc-toc-toggle');
          if (!header) return;
          let queued = false;
          const settle = () => {
            queued = false;
            const line = parseFloat(getComputedStyle(header).top) || 0;
            const stuck = header.getBoundingClientRect().top <= line + 1;
            if (stuck === this.#stuck) return;
            this.#stuck = stuck;
            this.toggleAttribute('data-mrc-stuck', stuck);
          };
          this.#stuckWatch = () => { if (!queued) { queued = true; requestAnimationFrame(settle); } };
          addEventListener('scroll', this.#stuckWatch, { passive: true });
          addEventListener('resize', this.#stuckWatch, { passive: true });
          settle();
        }
        #watchPanel() {
          if (this.#panelWatch) this.#panelWatch.disconnect();
          const wrap = this.shadowRoot.querySelector('.mrc-toc-collapse');
          if (!wrap) return;
          this.#panelWatch = new IntersectionObserver((entries) => {
            if (entries[entries.length - 1].isIntersecting) { this.#panelSeen = true; return; }
            if (!this.#panelSeen) return;
            if (this.getAttribute('data-mrc-open') !== 'true') return;
            this.setOpen(false);
          });
          this.#panelWatch.observe(wrap);
        }
        #visualFloorY() {
          const vv = window.visualViewport;
          return vv ? vv.offsetTop + vv.height : innerHeight;
        }
        #pushBar() {
          const bar = this.#nextBar;
          const head = this.shadowRoot.querySelector('.mrc-toc-toggle');
          const wrap = this.shadowRoot.querySelector('.mrc-toc-collapse');
          if (!bar || !head || !wrap) return;
          const barH = bar.offsetHeight;
          const headH = head.offsetHeight;
          if (!barH || !headH) return;
          const lead = Math.round(parseFloat(getComputedStyle(head).marginBlockStart) || 0);
          const floorY = this.#visualFloorY();
          const rest = floorY - NEXT_BAR_GAP_PX - barH;
          const natural = Math.round(wrap.getBoundingClientRect().top - headH);
          const over = (natural + headH) - rest;
          const full = barH + NEXT_BAR_GAP_PX;
          const clear = over > 0 && barH ? over * (full / barH) : 0;
          this.#push = clear;
          bar.style.transform = clear ? 'translateY(' + clear + 'px)' : '';
          const docked = (natural + headH) >= (floorY - NEXT_BAR_GAP_PX);
          if (docked === this.#docked) return;
          this.#docked = docked;
          this.toggleAttribute('data-mrc-docked', docked);
          if (docked) {
            const box = this.#scopeRoot();
            const width = box ? box.getBoundingClientRect() : null;
            this.setOpen(false);
            head.style.transition = 'none';
            head.style.position = 'fixed';
            head.style.marginBlockStart = '0';
            head.style.top = 'auto';
            head.style.bottom = `var(--mrc-toc-next-bottom, ${NEXT_BAR_GAP_PX}px)`;
            head.offsetHeight;
            if (width) {
              head.style.left = Math.round(width.left) + 'px';
              head.style.width = Math.round(width.width) + 'px';
            }
            wrap.style.marginBlockStart = (headH + lead) + 'px';
          } else {
            head.style.transition = 'none';
            head.style.position = '';
            head.style.marginBlockStart = '';
            head.style.top = '';
            head.style.bottom = '';
            head.offsetHeight;
            head.style.transition = '';
            head.style.left = '';
            head.style.width = '';
            wrap.style.marginBlockStart = '';
          }
        }
        #watchBelow() {
          if (this.#belowWatch) return;
          const header = this.shadowRoot.querySelector('.mrc-toc-toggle');
          if (!header) return;
          let queued = false;
          const settle = () => {
            queued = false;
            this.#pushBar();
          };
          this.#belowWatch = () => { if (!queued) { queued = true; requestAnimationFrame(settle); } };
          let touchRaf = 0;
          let touchUntil = 0;
          const sample = () => {
            settle();
            touchRaf = performance.now() < touchUntil ? requestAnimationFrame(sample) : 0;
          };
          const keepSampling = (ms) => {
            touchUntil = performance.now() + ms;
            if (!touchRaf) touchRaf = requestAnimationFrame(sample);
          };
          addEventListener('touchstart', () => keepSampling(20000), { passive: true });
          addEventListener('touchmove', () => keepSampling(20000), { passive: true });
          addEventListener('touchend', () => keepSampling(600), { passive: true });
          addEventListener('touchcancel', () => keepSampling(600), { passive: true });
          addEventListener('scroll', this.#belowWatch, { passive: true });
          addEventListener('resize', this.#belowWatch, { passive: true });
          if (window.visualViewport) {
            visualViewport.addEventListener('resize', this.#belowWatch, { passive: true });
            visualViewport.addEventListener('scroll', this.#belowWatch, { passive: true });
          }
          settle();
        }
        disconnectedCallback() {
          if (this.#nextBar) {
            this.#nextBar.remove();
            this.#nextBar = null;
          }
          if (this.#belowWatch) {
            removeEventListener('scroll', this.#belowWatch);
            removeEventListener('resize', this.#belowWatch);
            if (window.visualViewport) {
              visualViewport.removeEventListener('resize', this.#belowWatch);
              visualViewport.removeEventListener('scroll', this.#belowWatch);
            }
            this.#belowWatch = null;
          }
          if (this.#stuckWatch) {
            removeEventListener('scroll', this.#stuckWatch);
            removeEventListener('resize', this.#stuckWatch);
            this.#stuckWatch = null;
          }
          if (this.#panelWatch) { this.#panelWatch.disconnect(); this.#panelWatch = null; }
          this.#endRise();
          untrackLang(this);
          if (this.#watcher) { this.#watcher.disconnect(); this.#watcher = null; }
          if (this.#spy) { this.#spy.disconnect(); this.#spy = null; }
          if (this.#vis) { this.#vis.disconnect(); this.#vis = null; }
          if (this.#firstSpy) { this.#firstSpy.disconnect(); this.#firstSpy = null; }
        }
        #bindSpy(ids) {
          if (this.#spy) this.#spy.disconnect();
          const targets = ids.map((id) => document.getElementById(id)).filter(Boolean);
          if (!targets.length) return;
          const inBand = new Set();
          this.#spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) inBand.add(entry.target);
              else inBand.delete(entry.target);
            });
            for (let i = ids.length - 1; i >= 0; i -= 1) {
              const el = document.getElementById(ids[i]);
              if (el && inBand.has(el)) { this.#offerCurrent(ids[i]); return; }
            }
          }, { rootMargin: SPY_BAND });
          targets.forEach((t) => this.#spy.observe(t));
          if (this.#firstSpy) this.#firstSpy.disconnect();
          const firstId = ids.find((id) => document.getElementById(id));
          if (firstId) {
            this.#firstSpy = new IntersectionObserver((entries) => {
              const entry = entries[entries.length - 1];
              if (entry.isIntersecting) return;
              const notReachedYet = entry.rootBounds
                ? entry.boundingClientRect.top >= entry.rootBounds.bottom
                : entry.boundingClientRect.top >= 0;
              if (notReachedYet) this.#offerCurrent(firstId);
            }, { rootMargin: aboveFirstReach() });
            this.#firstSpy.observe(document.getElementById(firstId));
          }
          if (this.#vis) this.#vis.disconnect();
          this.#visible.clear();
          const skirt = this.#nextBar
            ? Math.round(this.#nextBar.getBoundingClientRect().height) + NEXT_BAR_GAP_PX
            : 0;
          this.#vis = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              const key = entry.target.firstElementChild && entry.target.firstElementChild.id;
              if (!key) return;
              if (entry.isIntersecting) this.#visible.add(key);
              else this.#visible.delete(key);
            });
            this.#syncNext();
          }, { rootMargin: `0px 0px -${skirt}px 0px` });
          targets.forEach((t) => {
            const section = t.closest('.' + SECTION_CLASS);
            if (section) this.#vis.observe(section);
          });
        }
        #offerCurrent(id) {
          if (this.#fromId) {
            if (Math.abs(scrollY - this.#fromAt) <= LOAN_SLACK_PX) { this.#spyWants = id; return; }
            this.#dropLoan();
          }
          this.#setCurrent(id);
        }
        #dropLoan() {
          this.#fromId = null;
          this.#fromTop = 0;
          this.#fromAt = -1;
          this.#spyWants = null;
        }
        #comeBack() {
          if (!this.#fromId) return false;
          const anchor = document.getElementById(this.#fromId);
          const top = this.#fromTop;
          const moved = Math.abs(scrollY - this.#fromAt) > LOAN_SLACK_PX;
          const wanted = this.#spyWants;
          this.#dropLoan();
          if (moved || !anchor) {
            if (wanted) this.#setCurrent(wanted);
            return false;
          }
          this.#settle();
          scrollTo({ top: Math.max(0, scrollY + anchor.getBoundingClientRect().top - top), behavior: 'auto' });
          return true;
        }
        #riseAndOpen() {
          const head = this.shadowRoot.querySelector('.mrc-toc-toggle');
          const wrap = this.shadowRoot.querySelector('.mrc-toc-collapse');
          if (!head || !wrap) { this.setOpen(true); return; }
          this.#endRise();
          const cs = getComputedStyle(this);
          const token = (name, fallback) => {
            const value = parseFloat(cs.getPropertyValue(name));
            return Number.isFinite(value) ? value : fallback;
          };
          const line = token('--mrc-toc-sticky-top', 0)
                     - token('--mrc-site-header-shift', 0)
                     + token('--mrc-toc-top-gap', 5);
          const natural = wrap.getBoundingClientRect().top - head.getBoundingClientRect().height;
          const from = scrollY;
          const to = Math.max(0, Math.round(from + natural - line));
          const distance = to - from;
          if (Math.abs(distance) < 2) { this.setOpen(true); return; }
          this.#dropLoan();
          document.dispatchEvent(new CustomEvent('mrc-site:header', {
            detail: { quiet: RISE_MS + QUIET_MS }
          }));
          const stop = () => { this.#endRise(); this.setOpen(true); };
          addEventListener('wheel', stop, { passive: true, once: true });
          addEventListener('touchmove', stop, { passive: true, once: true });
          addEventListener('keydown', stop, { once: true });
          this.#riseOff = () => {
            removeEventListener('wheel', stop);
            removeEventListener('touchmove', stop);
            removeEventListener('keydown', stop);
          };
          const started = performance.now();
          const step = () => {
            const p = Math.min(1, (performance.now() - started) / RISE_MS);
            const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
            scrollTo({ top: Math.round(from + distance * eased), behavior: 'auto' });
            if (p < 1) { this.#riseRaf = requestAnimationFrame(step); return; }
            this.#endRise();
            const drift = head.getBoundingClientRect().top - line;
            if (Math.abs(drift) > 1) scrollTo({ top: Math.max(0, scrollY + drift), behavior: 'auto' });
            this.setOpen(true);
          };
          this.#riseRaf = requestAnimationFrame(step);
        }
        #endRise() {
          if (this.#riseRaf) cancelAnimationFrame(this.#riseRaf);
          this.#riseRaf = 0;
          if (this.#riseOff) { this.#riseOff(); this.#riseOff = null; }
        }
        #showCurrentRow() {
          const box = this.shadowRoot.querySelector('.mrc-toc-box');
          const row = this.shadowRoot.querySelector('.mrc-toc-box__link[aria-current]');
          if (!box || !row) return;
          if (box.scrollHeight <= box.clientHeight + 1) return;
          const rb = box.getBoundingClientRect();
          const rr = row.getBoundingClientRect();
          box.scrollTop += (rr.top - rb.top) - (box.clientHeight - rr.height) / 2;
        }
        #setCurrent(id) {
          if (id === this.#currentId) return;
          this.#currentId = id;
          this.#syncBar();
          this.#syncNext();
        }
        #syncBar() {
          const lang = this.lang === 'fa' ? 'fa' : 'en';
          const link = this.#currentId
            ? this.shadowRoot.querySelector(`.mrc-toc-box__link[href="#${CSS.escape(this.#currentId)}"]`)
            : null;
          const where = link ? link.textContent : this.#articleTitle(lang);
          this.shadowRoot.querySelector('.mrc-toc-bar__current').textContent = where;
          this.shadowRoot.querySelectorAll('.mrc-toc-box__link[aria-current]')
            .forEach((a) => a.removeAttribute('aria-current'));
          if (link) link.setAttribute('aria-current', 'location');
        }
        #articleTitle(lang) {
          const root = this.#scopeRoot();
          const title = root && root.querySelector('.mrc-page__title');
          return title ? headingLabel(title, lang) : '';
        }
        #syncNext() {
          const bar = this.#nextBar;
          if (!bar) return;
          const links = [...this.shadowRoot.querySelectorAll('.mrc-toc-box__link')];
          let furthest = links.findIndex((a) => a.getAttribute('href') === '#' + this.#currentId);
          links.forEach((a, i) => {
            if (this.#visible.has(a.getAttribute('href').slice(1))) furthest = Math.max(furthest, i);
          });
          let next = links[furthest + 1];
          const lastLink = links[links.length - 1];
          if (!next && lastLink && this.#currentId !== lastLink.getAttribute('href').slice(1)) {
            next = lastLink;
          }
          const strings = STRINGS[this.lang === 'fa' ? 'fa' : 'en'];
          bar.hidden = false;
          bar.dataset.mode = next ? 'next' : 'top';
          bar.dataset.target = next ? next.getAttribute('href') : '';
          const label = bar.querySelector('[data-role="label"]');
          const words = next ? next.textContent : strings.top;
          if (label.textContent !== words) { label.textContent = words; this.#fitNextLabel(); }
          bar.querySelector('[data-role="hint"]').textContent = next ? strings.next : strings.end;
          bar.dir = this.dir;
        }
        #buildNextBar() {
          const root = this.#scopeRoot();
          if (!root) return;
          const strays = document.querySelectorAll('.' + NEXT_CLASS);
          strays.forEach((el) => { if (el !== this.#nextBar) el.remove(); });
          if (this.#nextBar) {
            if (this.#nextBar.parentElement !== document.body) document.body.appendChild(this.#nextBar);
            return;
          }
          const bar = document.createElement('button');
          bar.type = 'button';
          bar.className = NEXT_CLASS;
          bar.innerHTML = '<span data-role="hint"></span><span data-role="label"></span>';
          bar.addEventListener('click', () => {
            if (bar.dataset.mode === 'top') {
              scrollTo({ top: 0, behavior: 'auto' });
              this.#setCurrent(null);
              return;
            }
            const target = document.querySelector(bar.dataset.target || '');
            if (target) this.jumpTo(target);
          });
          document.body.appendChild(bar);
          this.#nextBar = bar;
          this.#pinBottomBar();
          this.#syncNext();
        }
        #pinBottomBar() {
          const bar = this.#nextBar;
          const root = this.#scopeRoot();
          if (!bar || !root) return;
          const box = root.getBoundingClientRect();
          const style = getComputedStyle(bar);
          const bleed = parseFloat(style.getPropertyValue('--mrc-toc-bar-bleed')) || NEXT_BAR_BLEED_PX;
          const clearance = parseFloat(style.getPropertyValue('--mrc-toc-cta-clearance')) || 0;
          if (!box.width) return;
          const rtl = getComputedStyle(root).direction === 'rtl';
          const startPad = bleed - (rtl ? clearance : 0);
          const endPad = bleed - (rtl ? 0 : clearance);
          bar.style.left = Math.round(box.left - startPad) + 'px';
          bar.style.width = Math.round(box.width + startPad + endPad) + 'px';
          bar.style.right = 'auto';
        }
        jumpTo(target) {
          const section = target.closest('.' + SECTION_CLASS) || target;
          const touched = [];
          const scope = this.#scopeRoot();
          if (scope) {
            scope.querySelectorAll(CLOSE_ON_LEAVE).forEach((panel) => {
              if (section.contains(panel)) return;
              panel.removeAttribute('open');
              touched.push(panel);
            });
          }
          const reveal = this.getAttribute('reveal') || REVEAL_ON_JUMP;
          if (reveal) section.querySelectorAll(reveal).forEach((card) => {
            card.setAttribute('open', '');
            touched.push(card);
          });
          touched.forEach((panel) => settleFolds(panel));
          document.dispatchEvent(new CustomEvent('mrc-site:header', {
            detail: { hide: target.getBoundingClientRect().top > 0 }
          }));
          this.#dropLoan();
          this.setOpen(false);
          this.#settle();
          target.scrollIntoView({ behavior: 'auto', block: 'start' });
          this.#holdBottomBar();
          const id = target.id || (target.querySelector('[id]') || {}).id;
          if (id) this.#setCurrent(id);
        }
        #holdBottomBar() {
          const bar = this.#nextBar;
          if (!bar) return;
          const lift = this.#visualFloorY() - NEXT_BAR_GAP_PX - bar.getBoundingClientRect().bottom;
          if (lift > 1) scrollTo({ top: Math.max(0, scrollY - lift), behavior: 'auto' });
        }
        #watchContent() {
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.#render(), { once: true });
          }
          const root = this.#scopeRoot();
          if (!root) return;
          this.#watcher = new MutationObserver(() => this.#render());
          this.#watcher.observe(root, { childList: true, subtree: true });
        }
        attributeChangedCallback(name) {
          if (!this.#ready) return;
          if (name === 'open') this.setOpen(this.getAttribute('open') !== 'false');
          else this.#render();
        }
        setLang(next) {
          const switched = !!this.lang && this.lang !== next;
          this.lang = next;
          this.dir = next === 'fa' ? 'rtl' : 'ltr';
          this.#render();
          if (switched) this.hintAgain();
        }
        setOpen(open) {
          document.dispatchEvent(new CustomEvent('mrc-site:header', { detail: { quiet: QUIET_MS } }));
          const wrap = this.shadowRoot.querySelector('.mrc-toc-collapse');
          const was = this.getAttribute('data-mrc-open') === 'true';
          const line = wrap ? wrap.getBoundingClientRect().bottom : 0;
          this.setAttribute('data-mrc-open', String(open));
          if (open) this.#panelSeen = !!wrap && line > 0 && line < this.#visualFloorY();
          const lang = this.lang === 'fa' ? 'fa' : 'en';
          const toggle = this.shadowRoot.querySelector('.mrc-toc-toggle');
          toggle.setAttribute('aria-expanded', String(open));
          toggle.setAttribute('aria-label', STRINGS[lang][open ? 'close' : 'open']);
          if (wrap) wrap.inert = !open;
          this.setAttribute('data-mrc-animating', '');
          clearTimeout(this.#animTimer);
          this.#animTimer = setTimeout(() => {
            this.removeAttribute('data-mrc-animating');
            if (open) this.#showCurrentRow();
          }, OPEN_MS);
          this.#quietUntil = performance.now() + QUIET_MS;
          const returned = !open && this.#comeBack();
          if (!returned && !open && was && wrap && line <= 0) {
            this.#settle();
            const drift = wrap.getBoundingClientRect().bottom - line;
            if (Math.abs(drift) > 0.5) scrollTo({ top: Math.max(0, scrollY + drift), behavior: 'auto' });
          }
        }
        #settle() {
          settleFolds(this);
        }
        #scopeRoot() {
          const sel = this.getAttribute('scope');
          if (sel) return document.querySelector(sel) || this.parentElement;
          const parent = this.parentElement;
          if (!parent) return null;
          return parent.querySelector('article') || parent;
        }
        #wrapSections(headings, selector) {
          headings.forEach((heading) => {
            const parent = heading.parentElement;
            if (!parent) return;
            if (parent.classList.contains(SECTION_CLASS)) { markHeadedHost(parent); return; }
            const section = document.createElement('section');
            section.className = SECTION_CLASS;
            const addressed = heading.getAttribute('slot');
            if (addressed) {
              section.setAttribute('slot', addressed);
              heading.removeAttribute('slot');
            }
            parent.insertBefore(section, heading);
            section.appendChild(heading);
            if (!addressed) {
              let node = section.nextSibling;
              while (node) {
                const next = node.nextSibling;
                if (node.nodeType === 1 && node.matches(selector)) break;
                section.appendChild(node);
                node = next;
              }
            }
            markHeadedHost(section);
          });
        }
        #entries(lang) {
          const root = this.#scopeRoot();
          if (!root) return [];
          const levels = (this.getAttribute('levels') || DEFAULT_LEVELS)
            .split(',').map((s) => s.trim()).filter(Boolean).join(',');
          let headings = [];
          try {
            headings = [...root.querySelectorAll(levels)];
          } catch (error) {
            console.warn('mrc-toc: levels="' + levels + '" is not a valid selector —', error.message);
            return [];
          }
          headings = headings
            .filter((h) => !h.closest('mrc-toc'))
            .filter((h) => !h.classList.contains('mrc-page__title'));
          if (document.readyState !== 'loading') this.#wrapSections(headings, levels);
          return headings
            .map((h, i) => ({
              id: ensureId(h, i),
              label: headingLabel(h, lang),
              key: h.hasAttribute('data-mrc-toc-key')
            }))
            .filter((entry) => entry.label);
        }
        #render() {
          const lang = this.lang === 'fa' ? 'fa' : 'en';
          const box = this.shadowRoot.querySelector('.mrc-toc-box');
          box.setAttribute('aria-label', STRINGS[lang].title);
          this.shadowRoot.querySelector('.mrc-toc-box__title').textContent = STRINGS[lang].title;
          this.shadowRoot.querySelector('.mrc-toc-bar__title').textContent = STRINGS[lang].title;
          const list = this.shadowRoot.querySelector('.mrc-toc-box__list');
          const entries = this.#entries(lang);
          this.#buildNextBar();
          const signature = lang + '|' + entries.map((e) => e.id + ':' + e.label + (e.key ? ':key' : '')).join('|');
          if (signature !== this.#signature) {
            this.#signature = signature;
            this.setAttribute('data-mrc-rebuilding', '');
            requestAnimationFrame(() => requestAnimationFrame(() => {
              this.removeAttribute('data-mrc-rebuilding');
            }));
            list.textContent = '';
            entries.forEach((entry) => {
              const li = document.createElement('li');
              li.className = 'mrc-toc-box__item';
              const link = document.createElement('a');
              link.className = 'mrc-toc-box__link';
              link.href = '#' + entry.id;
              if (entry.key) link.dataset.mrcKey = '';
              const label = document.createElement('span');
              label.className = 'mrc-toc-box__label';
              label.textContent = entry.label;
              link.appendChild(label);
              li.appendChild(link);
              list.appendChild(li);
            });
            this.#fitEntries();
            this.#bindSpy(entries.map((e) => e.id));
            const keep = this.#currentId;
            this.#currentId = null;
            if (keep) this.#setCurrent(keep);
            else { this.#syncBar(); this.#syncNext(); }
          }
          this.hidden = entries.length === 0;
          this.setOpen(this.getAttribute('data-mrc-open') !== 'false');
        }
        #bind() {
          this.shadowRoot.querySelector('.mrc-toc-box__list').addEventListener('click', (event) => {
            const link = event.target.closest('.mrc-toc-box__link');
            if (!link) return;
            const target = document.getElementById(link.getAttribute('href').slice(1));
            if (!target) return;
            event.preventDefault();
            this.jumpTo(target);
          });
          this.shadowRoot.querySelector('.mrc-toc-toggle').addEventListener('click', () => {
            const now = performance.now();
            if (now - this.#lastToggleAt < TOGGLE_DEBOUNCE_MS) return;
            this.#lastToggleAt = now;
            if (this.hasAttribute('data-mrc-docked')
                && this.getAttribute('data-mrc-open') !== 'true') {
              this.#riseAndOpen();
              return;
            }
            if (this.hasAttribute('data-mrc-stuck')) {
              if (this.getAttribute('data-mrc-open') === 'true') { this.setOpen(false); return; }
              this.setOpen(true);
              const panel = this.shadowRoot.querySelector('.mrc-toc-box');
              const bar = this.shadowRoot.querySelector('.mrc-toc-toggle');
              if (panel && bar) {
                const line = parseFloat(getComputedStyle(bar).top) || 0;
                const room = line + bar.getBoundingClientRect().height;
                const to = Math.max(0, Math.round(scrollY + panel.getBoundingClientRect().top - room));
                if (Math.abs(to - scrollY) > LOAN_SLACK_PX) {
                  const anchor = this.#currentId && document.getElementById(this.#currentId);
                  if (anchor) {
                    this.#fromId = this.#currentId;
                    this.#fromTop = Math.round(anchor.getBoundingClientRect().top);
                  }
                  scrollTo({ top: to, behavior: 'auto' });
                  this.#fromAt = Math.round(scrollY);
                }
              }
              return;
            }
            this.setOpen(this.getAttribute('data-mrc-open') !== 'true');
          });
          const toggle = this.shadowRoot.querySelector('.mrc-toc-toggle');
          let lastPointer = null;
          toggle.addEventListener('pointermove', (event) => {
            if (event.pointerType === 'touch' || event.pointerType === 'pen') return;
            const moved = !lastPointer
              || event.clientX !== lastPointer.x || event.clientY !== lastPointer.y;
            lastPointer = { x: event.clientX, y: event.clientY };
            if (!moved) return;
            const rect = toggle.getBoundingClientRect();
            if (event.clientY - rect.top > rect.height * HEADER_REVEAL_BAND) return;
            const shift = getComputedStyle(document.documentElement)
              .getPropertyValue('--mrc-site-header-shift').trim();
            if (!shift || parseFloat(shift) === 0) return;
            document.dispatchEvent(new CustomEvent('mrc-site:header', { detail: { hide: false } }));
          }, { passive: true });
          this.#bindDismiss();
        }
        #bindDismiss() {
          addEventListener('resize', () => {
            this.#pinBottomBar();
            this.#fitEntries();
            this.#fitNextLabel();
          }, { passive: true });
          this.shadowRoot.querySelector('.mrc-toc-box').addEventListener('scroll', () => {
            this.#innerScrollAt = performance.now();
          }, { passive: true });
          document.addEventListener('mrc-site:header', () => {
            this.#quietUntil = performance.now() + QUIET_MS;
          });
        }
        hintAgain() {
          if (this.getAttribute('data-mrc-open') === 'true') return;
          this.removeAttribute('data-mrc-hint');
          this.offsetWidth;
          this.setAttribute('data-mrc-hint', '');
          clearTimeout(this.#hintTimer);
          this.#hintTimer = setTimeout(() => this.removeAttribute('data-mrc-hint'), HINT_MS);
          clearTimeout(this.#doneTimer);
          this.#doneTimer = setTimeout(() => {
            document.dispatchEvent(new CustomEvent('mrc-toc:hint-done'));
          }, HINT_DIP_END_MS);
        }
        #hintOnce() {
          let played = 0;
          let lastPlayAt = 0;
          let queued = false;
          let onScreen = false;
          let watch = null;
          let stuckWatch = null;
          const timers = [];
          const later = (fn, ms) => { timers.push(setTimeout(fn, ms)); };
          let arrivalDone = false;
          let stuckDone = false;
          const stop = () => {
            timers.forEach(clearTimeout);
            timers.length = 0;
            this.removeAttribute('data-mrc-hint');
            if (watch) { watch.disconnect(); watch = null; }
            if (stuckWatch) { stuckWatch.disconnect(); stuckWatch = null; }
            removeEventListener('pointerdown', onPointer, true);
            removeEventListener('click', stop, true);
            removeEventListener('keydown', stop, true);
          };
          const onPointer = (event) => { if (event.pointerType === 'mouse') stop(); };
          const play = () => {
            if (this.getAttribute('data-mrc-open') === 'true') { stop(); return; }
            if (played >= HINT_TIMES) return;
            const now = performance.now();
            const early = lastPlayAt + HINT_MS + HINT_GAP_MS - now;
            if (early > 0) {
              if (queued) return;
              queued = true;
              later(() => { queued = false; play(); }, early);
              return;
            }
            lastPlayAt = now;
            this.hintAgain();
            played += 1;
            if (played >= HINT_TIMES) later(stop, HINT_MS);
          };
          addEventListener('pointerdown', onPointer, { passive: true, capture: true });
          addEventListener('click', stop, { passive: true, capture: true });
          addEventListener('keydown', stop, { capture: true });
          const playArrival = () => { if (arrivalDone) return; arrivalDone = true; play(); };
          const playStuck = () => { if (stuckDone) return; stuckDone = true; play(); };
          later(() => { if (onScreen) playArrival(); }, HINT_DELAY_MS);
          let first = true;
          watch = new IntersectionObserver((entries) => {
            onScreen = entries[entries.length - 1].isIntersecting;
            if (first) { first = false; return; }
            if (onScreen) playArrival();
          });
          watch.observe(this.shadowRoot.querySelector('.mrc-toc-toggle'));
          stuckWatch = new MutationObserver(() => {
            if (this.hasAttribute('data-mrc-stuck')) playStuck();
          });
          stuckWatch.observe(this, { attributes: true, attributeFilter: ['data-mrc-stuck'] });
        }
      }
      if (!customElements.get('mrc-toc')) customElements.define('mrc-toc', MrcToc);
      let wasDark = document.documentElement.classList.contains('dark');
      const themeWatch = new MutationObserver(() => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark === wasDark) return;
        wasDark = isDark;
        document.querySelectorAll('mrc-toc').forEach((el) => { if (el.hintAgain) el.hintAgain(); });
      });
      themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }
  {
      const AUTO_CLOSE_MS = 3000;
      const SWIPE_MIN_DISTANCE_PX = 50;
      const SWIPE_MAX_VERTICAL_RATIO = 0.6;
      const MOBILE_BREAKPOINT_PX = 768;
      const WAVE_HANDOVER_MS = 500;
      const WAVE_FIRST_DELAY_MS = 7000;
      const WAVE_TIMES = Infinity;
      const WAVE_INTERVAL_MS = 180000;
      const SHAKE_PEAK_OFFSET_PX = 10;
      const COLOR_WAVE_BUMP_MS = 450;
      const COLOR_WAVE_STAGGER_MS = 80;
      const COLOR_WAVE_TURNAROUND_PAUSE_MS = 150;
      const DRAWER_WAVE_PEAK_SCALE = 0.25;
      const DRAWER_WAVE_BUMP_MS = 450;
      const DRAWER_WAVE_STAGGER_MS = 80;
      const STRINGS = {
        en: {
          whatsapp: 'WhatsApp', telegram: 'Telegram', call: 'Call',
          chat: 'Chat', meeting: 'Book a meeting'
        },
        fa: {
          whatsapp: 'واتساپ', telegram: 'تلگرام', call: 'تماس',
          chat: 'گفتگو', meeting: 'رزرو جلسه'
        }
      };
      const LINKS = {
        whatsapp: 'https://wa.me/16046552335',
        telegram: 'https://t.me/Mehdi_Rad_Ca',
        phone: 'tel:+16046552335',
        meeting: 'https://finance.mehdirad.ca/booking'
      };
      const template = document.createElement('template');
      template.innerHTML = `
    <style>
      :host {
        --mrc-bar-surface-rgb: 255, 255, 255;
        --mrc-bar-whatsapp: #25D366;  --mrc-bar-whatsapp-dark: #1DA851;
        --mrc-bar-telegram: #229ED9;  --mrc-bar-telegram-dark: #1689BE;
        --mrc-bar-call: #123b5d;      --mrc-bar-call-dark: #0b2942;
        --mrc-bar-chat: #b98918;      --mrc-bar-chat-dark: #9a6d0d;
        --mrc-bar-meeting: #7c3aed;   --mrc-bar-meeting-dark: #6425c7;
        --mrc-bar-width: clamp(15px, 4vmin, 20px);
        --mrc-bar-card-height: clamp(33.6px, 9vmin, 44.8px);
        --mrc-bar-card-gap: clamp(4.5px, 1.2vmin, 6px);
        --mrc-bar-container-padding: clamp(4.5px, 1.2vmin, 6px);
        --mrc-bar-inner-radius: 6px;
        --mrc-bar-card-radius: 8px;
        --mrc-bar-btn-size: clamp(33px, 8.8vmin, 44px);
        --mrc-bar-drawer-width: clamp(45px, 12vmin, 60px);
        --mrc-bar-drawer-align: center;
        --mrc-bar-drawer-open-ms: 0.75s;
        --mrc-bar-max-opacity: 0.7;
        --mrc-bar-backing-inset: 3px;
        --mrc-bar-wave-room: 14px;
        --mrc-bar-edge-offset: -40px;
        --mrc-bar-drawer-edge-offset: -78px;
        --mrc-bar-mobile-edge-offset: -30px;
        --mrc-bar-mobile-drawer-edge-offset: -75px;
        display: block;
        height: 0;
      }
      * { box-sizing: border-box; }
      .mrc-bar {
        position: fixed;
        z-index: 40;
        display: flex;
        flex-direction: column;
        gap: var(--mrc-bar-card-gap);
        width: calc(var(--mrc-bar-width) + var(--mrc-bar-container-padding) * 2);
        padding: var(--mrc-bar-container-padding);
        clip-path: inset(0 calc(var(--mrc-bar-wave-room) * -1));
        background-color: transparent;
        border-start-end-radius: var(--mrc-bar-inner-radius);
        border-end-end-radius: var(--mrc-bar-inner-radius);
        cursor: pointer;
        transition: clip-path var(--mrc-bar-drawer-open-ms) ease, background-color var(--mrc-bar-drawer-open-ms) ease;
      }
      .mrc-bar-backing {
        position: fixed;
        z-index: 39;
        width: calc(var(--mrc-bar-width) + var(--mrc-bar-container-padding) * 2 - var(--mrc-bar-backing-inset));
        clip-path: inset(0 0 0 0);
        background-color: rgba(var(--mrc-bar-surface-rgb), var(--mrc-bar-max-opacity));
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        border-start-end-radius: var(--mrc-bar-inner-radius);
        border-end-end-radius: var(--mrc-bar-inner-radius);
        pointer-events: none;
        transition: clip-path var(--mrc-bar-drawer-open-ms) ease, background-color var(--mrc-bar-drawer-open-ms) ease;
      }
      .mrc-bar__segment {
        display: block;
        width: var(--mrc-bar-width);
        height: var(--mrc-bar-card-height);
        border-radius: var(--mrc-bar-card-radius);
        border: 0;
        padding: 0;
        opacity: 1;
        transition: opacity var(--mrc-bar-drawer-open-ms) ease;
      }
      .mrc-bar__segment--whatsapp { background: var(--mrc-bar-whatsapp); }
      .mrc-bar__segment--telegram { background: var(--mrc-bar-telegram); }
      .mrc-bar__segment--call { background: var(--mrc-bar-call); }
      .mrc-bar__segment--chat { background: var(--mrc-bar-chat); }
      .mrc-bar__segment--meeting { background: var(--mrc-bar-meeting); }
      :host([open]) .mrc-bar,
      :host([open]) .mrc-bar-backing {
        clip-path: inset(0 100% 0 0);
        background-color: rgba(var(--mrc-bar-surface-rgb), 0);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0);
        pointer-events: none;
      }
      :host([data-mrc-pin="right"]) .mrc-bar,
      :host([data-mrc-pin="right"]) .mrc-bar-backing,
      :host([data-mrc-pin="right"]) .mrc-open-list {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
        border-start-start-radius: var(--mrc-bar-inner-radius);
        border-end-start-radius: var(--mrc-bar-inner-radius);
      }
      :host([data-mrc-pin="right"][open]) .mrc-bar,
      :host([data-mrc-pin="right"][open]) .mrc-bar-backing {
        clip-path: inset(0 0 0 100%);
      }
      :host([open]) .mrc-bar__segment { opacity: 0; }
      .mrc-open-list {
        position: fixed;
        z-index: 41;
        display: flex;
        flex-direction: column;
        align-items: var(--mrc-bar-drawer-align);
        gap: 6px;
        width: var(--mrc-bar-drawer-width);
        padding: 8px;
        clip-path: inset(0 100% 0 0);
        border-start-end-radius: var(--mrc-bar-inner-radius);
        border-end-end-radius: var(--mrc-bar-inner-radius);
        background-color: rgba(var(--mrc-bar-surface-rgb), 0);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0);
        transition: clip-path var(--mrc-bar-drawer-open-ms) ease, background-color var(--mrc-bar-drawer-open-ms) ease;
      }
      :host([data-mrc-pin="right"]) .mrc-open-list { clip-path: inset(0 0 0 100%); }
      :host([open]) .mrc-open-list {
        clip-path: inset(0 0 0 0);
        background-color: rgba(var(--mrc-bar-surface-rgb), var(--mrc-bar-max-opacity));
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
      }
      .mrc-open-list__btn {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--mrc-bar-btn-size);
        height: var(--mrc-bar-btn-size);
        border: 0;
        border-radius: 50%;
        color: #ffffff;
        text-decoration: none;
        cursor: pointer;
        opacity: 0;
        transition: transform 0.15s ease, opacity var(--mrc-bar-drawer-open-ms) ease;
      }
      :host([open]) .mrc-open-list__btn { opacity: 1; }
      .mrc-open-list__btn:hover { transform: scale(1.06); }
      .mrc-open-list__btn svg {
        width: 20px;
        height: 20px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .mrc-open-list__btn--whatsapp { background: var(--mrc-bar-whatsapp); }
      .mrc-open-list__btn--whatsapp:hover { background: var(--mrc-bar-whatsapp-dark); }
      .mrc-open-list__btn--telegram { background: var(--mrc-bar-telegram); }
      .mrc-open-list__btn--telegram:hover { background: var(--mrc-bar-telegram-dark); }
      .mrc-open-list__btn--call { background: var(--mrc-bar-call); }
      .mrc-open-list__btn--call:hover { background: var(--mrc-bar-call-dark); }
      .mrc-open-list__btn--chat { background: var(--mrc-bar-chat); }
      .mrc-open-list__btn--chat:hover { background: var(--mrc-bar-chat-dark); }
      .mrc-open-list__btn--meeting { background: var(--mrc-bar-meeting); }
      .mrc-open-list__btn--meeting:hover { background: var(--mrc-bar-meeting-dark); }
    </style>
    <div class="mrc-bar-backing" aria-hidden="true"></div>
    <!-- closed state: five decorative colour cards, no links -->
    <div class="mrc-bar" data-bar>
      <span class="mrc-bar__segment mrc-bar__segment--whatsapp"></span>
      <span class="mrc-bar__segment mrc-bar__segment--telegram"></span>
      <span class="mrc-bar__segment mrc-bar__segment--call"></span>
      <span class="mrc-bar__segment mrc-bar__segment--chat"></span>
      <span class="mrc-bar__segment mrc-bar__segment--meeting"></span>
    </div>
    <!-- open state: the real linked buttons -->
    <div class="mrc-open-list">
      <a class="mrc-open-list__btn mrc-open-list__btn--whatsapp" data-link="whatsapp" data-label="whatsapp" target="_blank" rel="noopener noreferrer">
        <!-- The bubble is ONE arc that goes the long way round (large-arc flag), not
             two half-arcs meeting at a seam. The two-arc version drew a chord of
             21.74 between its endpoints while asking for radius 10.6 — a diameter of
             21.2. A chord longer than the diameter cannot be spanned, so the
             renderer silently scales the radii up until it fits and every arc
             degenerates to a semicircle. The result measured 23.67 wide by 23.57
             tall with its top edge at y = -0.72: bigger than its own 24-unit
             viewBox, so the circle came out flattened and clipped on the phone.
             One arc has no chord to overrun. -->
        <svg viewBox="0 0 24 24"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8.5 8.7c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.8c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.3 0 .5.4.8 1.6 2 2.7 2.4.2.1.4.1.5-.1l.6-.6c.2-.2.3-.2.5-.1l1.7.8c.2.1.3.3.3.5 0 .8-.7 1.6-1.5 1.6-2.9 0-6.3-3.3-6.3-6.3 0-.5.1-1 .2-1.5Z"/></svg>
      </a>
      <a class="mrc-open-list__btn mrc-open-list__btn--telegram" data-link="telegram" data-label="telegram" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24"><path d="M21 4 2.7 11.2c-1 .4-1 1.7.1 2l4.6 1.5 1.8 5.6c.2.7 1.1.9 1.6.3l2.6-2.9 4.7 3.5c.7.5 1.7.1 1.9-.7L23 5.4c.2-.9-.7-1.7-1.6-1.4Z"/><path d="m7.4 14.7 9-6.6-7.3 8"/></svg>
      </a>
      <a class="mrc-open-list__btn mrc-open-list__btn--call" data-link="phone" data-label="call">
        <svg viewBox="0 0 24 24"><path d="M5 4h4l1.5 4.5-2.2 1.7a12 12 0 0 0 5.5 5.5l1.7-2.2L20 15v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>
      </a>
      <button type="button" class="mrc-open-list__btn mrc-open-list__btn--chat" data-chat data-label="chat">
        <svg viewBox="0 0 24 24"><path d="M4 4h16v11H8l-4 4Z"/></svg>
      </button>
      <a class="mrc-open-list__btn mrc-open-list__btn--meeting" data-link="meeting" data-label="meeting">
        <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
      </a>
    </div>`;
      const bars = new Set();
      class MrcCtaBar extends HTMLElement {
        #ready = false;
        #bar = null;
        #backing = null;
        #openList = null;
        #closeTimer = null;
        #frame = null;
        #waveRunning = false;
        connectedCallback() {
          if (!this.#ready) {
            this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
            this.#bar = this.shadowRoot.querySelector('.mrc-bar');
            this.#backing = this.shadowRoot.querySelector('.mrc-bar-backing');
            this.#openList = this.shadowRoot.querySelector('.mrc-open-list');
            this.#bind();
            this.#ready = true;
          }
          bars.add(this);
          this.setLang(detectLang(this));
          this.reposition();
          this.#startWave();
        }
        disconnectedCallback() {
          bars.delete(this);
          if (this.#closeTimer) clearTimeout(this.#closeTimer);
        }
        restartWave() {
          if (!this.#waveRunning) this.#startWave();
        }
        setLang(next) {
          const lang = next === 'fa' ? 'fa' : 'en';
          const switched = !!this.lang && this.lang !== lang;
          this.lang = lang;
          this.dir = lang === 'fa' ? 'rtl' : 'ltr';
          if (switched) this.restartWave();
          this.shadowRoot.querySelectorAll('[data-label]').forEach((el) => {
            el.setAttribute('aria-label', STRINGS[lang][el.dataset.label]);
            el.title = STRINGS[lang][el.dataset.label];
          });
          this.shadowRoot.querySelectorAll('[data-link]').forEach((el) => {
            const key = el.dataset.link;
            el.href = this.getAttribute(key) || LINKS[key];
          });
        }
        reposition() {
          if (!this.isConnected || !this.#bar) return;
          const styles = getComputedStyle(this);
          const cardWidth = parseFloat(styles.getPropertyValue('--mrc-bar-width')) || 20;
          const pad = parseFloat(styles.getPropertyValue('--mrc-bar-container-padding')) || 0;
          const drawerWidth = parseFloat(styles.getPropertyValue('--mrc-bar-drawer-width')) || 60;
          this.dataset.mrcPin = this.pinsRight() ? 'right' : 'left';
          this.#pin(this.#bar, cardWidth + pad * 2, '--mrc-bar-edge-offset', '--mrc-bar-mobile-edge-offset', styles);
          this.#pin(this.#openList, drawerWidth, '--mrc-bar-drawer-edge-offset', '--mrc-bar-mobile-drawer-edge-offset', styles);
          this.#backing.style.left = this.#bar.style.left;
          this.#backing.style.right = this.#bar.style.right;
          this.#pinVertical();
        }
        open() {
          this.toggleAttribute('open', true);
          requestAnimationFrame(() => this.#pinVertical());
          this.holdOpen();
          this.#playDrawerWave();
        }
        holdOpen() {
          if (this.#closeTimer) clearTimeout(this.#closeTimer);
          this.#closeTimer = setTimeout(() => this.close(), AUTO_CLOSE_MS);
        }
        close() {
          if (!this.hasAttribute('open')) return;
          this.toggleAttribute('open', false);
          requestAnimationFrame(() => this.#pinVertical());
          if (this.#closeTimer) {
            clearTimeout(this.#closeTimer);
            this.#closeTimer = null;
          }
        }
        #anchorEl(attr) {
          const sel = this.getAttribute(attr);
          if (sel) {
            const found = document.querySelector(sel);
            if (found) return found;
          }
          const slot = this.assignedSlot;
          return (slot ? slot.parentElement : this.parentElement) || document.body;
        }
        #pin(el, elWidth, edgeVar, mobileEdgeVar, styles) {
          const viewportWidth = document.documentElement.clientWidth;
          const rect = this.#anchorEl('anchor').getBoundingClientRect();
          const isMobile = viewportWidth <= MOBILE_BREAKPOINT_PX;
          const offset = parseFloat(styles.getPropertyValue(isMobile ? mobileEdgeVar : edgeVar)) || 0;
          const pinRight = this.pinsRight();
          const raw = pinRight
            ? viewportWidth - rect.right - elWidth - offset
            : rect.left - elWidth - offset;
          const gap = isMobile ? raw : Math.max(0, raw);
          if (pinRight) {
            el.style.right = gap + 'px';
            el.style.left = 'auto';
          } else {
            el.style.left = gap + 'px';
            el.style.right = 'auto';
          }
        }
        pinsRight() {
          return (this.dir === 'rtl') !== (this.getAttribute('side') === 'end');
        }
        #pinVertical() {
          const rect = this.#anchorEl('bounds').getBoundingClientRect();
          const barHeight = this.#bar.offsetHeight;
          let top = (window.innerHeight - barHeight) / 2;
          top = Math.max(rect.top, Math.min(top, rect.bottom - barHeight));
          this.#bar.style.top = top + 'px';
          this.#backing.style.top = top + 'px';
          this.#backing.style.height = barHeight + 'px';
          this.#openList.style.top = (top + barHeight / 2 - this.#openList.offsetHeight / 2) + 'px';
        }
        #bind() {
          this.shadowRoot.addEventListener('mouseenter', () => this.open(), true);
          this.shadowRoot.addEventListener('mousemove', () => {
            if (this.hasAttribute('open')) this.holdOpen();
            else this.open();
          });
          this.shadowRoot.addEventListener('click', (event) => {
            if (event.target.closest('[data-bar]')) this.open();
            if (event.target.closest('[data-chat]')) {
              this.dispatchEvent(new CustomEvent('mrc-cta:chat', {
                bubbles: true, composed: true, cancelable: true
              }));
            }
          });
        }
        scheduleReposition() {
          if (this.#frame) return;
          this.#frame = requestAnimationFrame(() => {
            this.#frame = null;
            this.reposition();
          });
        }
        #startWave() {
          if (this.#waveRunning) return;
          if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
          this.#waveRunning = true;
          const cards = [...this.shadowRoot.querySelectorAll('.mrc-bar__segment')];
          let played = 0;
          let firstTimer = 0;
          let openWatch = null;
          const stop = () => {
            played = WAVE_TIMES;
            this.#waveRunning = false;
            clearTimeout(firstTimer);
            if (openWatch) { openWatch.disconnect(); openWatch = null; }
            document.removeEventListener('mrc-toc:hint-done', onHintDone);
          };
          openWatch = new MutationObserver(() => {
            if (this.hasAttribute('open')) stop();
          });
          openWatch.observe(this, { attributes: true, attributeFilter: ['open'] });
          const onHintDone = () => {
            if (played > 0) return;
            clearTimeout(firstTimer);
            firstTimer = setTimeout(runSweep, WAVE_HANDOVER_MS);
          };
          document.addEventListener('mrc-toc:hint-done', onHintDone);
          const runSweep = () => {
            if (!this.isConnected) { this.#waveRunning = false; return; }
            if (played >= WAVE_TIMES) { this.#waveRunning = false; stop(); return; }
            if (this.hasAttribute('open')) { this.#waveRunning = false; stop(); return; }
            played += 1;
            if (played === 1) document.removeEventListener('mrc-toc:hint-done', onHintDone);
            this.#playColorWave(cards, this.dir === 'rtl' ? 1 : -1, () => {
              setTimeout(runSweep, WAVE_INTERVAL_MS);
            });
          };
          firstTimer = setTimeout(runSweep, WAVE_FIRST_DELAY_MS);
        }
        #playColorWave(elements, direction, onComplete) {
          const start = performance.now();
          const last = elements.length - 1;
          const downDuration = last * COLOR_WAVE_STAGGER_MS + COLOR_WAVE_BUMP_MS;
          const upStart = downDuration + COLOR_WAVE_TURNAROUND_PAUSE_MS;
          const totalMs = upStart + last * COLOR_WAVE_STAGGER_MS + COLOR_WAVE_BUMP_MS;
          const frame = (now) => {
            const elapsed = now - start;
            if (elapsed >= totalMs) {
              elements.forEach((el) => { el.style.transform = 'translateX(0px)'; });
              if (onComplete) onComplete();
              return;
            }
            elements.forEach((el, i) => {
              const down = elapsed - i * COLOR_WAVE_STAGGER_MS;
              const up = elapsed - (upStart + (last - i) * COLOR_WAVE_STAGGER_MS);
              let bump = 0;
              if (down >= 0 && down <= COLOR_WAVE_BUMP_MS) bump = Math.sin((down / COLOR_WAVE_BUMP_MS) * Math.PI);
              if (up >= 0 && up <= COLOR_WAVE_BUMP_MS) bump = Math.sin((up / COLOR_WAVE_BUMP_MS) * Math.PI);
              el.style.transform = `translateX(${bump * SHAKE_PEAK_OFFSET_PX * direction}px)`;
            });
            requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
        }
        #playDrawerWave() {
          const elements = [...this.shadowRoot.querySelectorAll('.mrc-open-list__btn')];
          const start = performance.now();
          const totalMs = DRAWER_WAVE_STAGGER_MS * (elements.length - 1) + DRAWER_WAVE_BUMP_MS;
          const frame = (now) => {
            const elapsed = now - start;
            if (elapsed >= totalMs) {
              elements.forEach((el) => { el.style.transform = 'scale(1)'; });
              return;
            }
            elements.forEach((el, i) => {
              const local = elapsed - i * DRAWER_WAVE_STAGGER_MS;
              if (local < 0 || local > DRAWER_WAVE_BUMP_MS) {
                el.style.transform = 'scale(1)';
                return;
              }
              const bump = Math.sin((local / DRAWER_WAVE_BUMP_MS) * Math.PI * 2);
              el.style.transform = `scale(${1 + bump * DRAWER_WAVE_PEAK_SCALE})`;
            });
            requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
        }
      }
      if (!customElements.get('mrc-cta-bar')) customElements.define('mrc-cta-bar', MrcCtaBar);
      let wasDark = document.documentElement.classList.contains('dark');
      const themeWatch = new MutationObserver(() => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark === wasDark) return;
        wasDark = isDark;
        document.querySelectorAll('mrc-cta-bar').forEach((el) => { if (el.restartWave) el.restartWave(); });
      });
      themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      new MutationObserver(() => {
        bars.forEach((el) => { el.setLang(detectLang(el)); el.reposition(); });
      }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
      new ResizeObserver(() => {
        bars.forEach((el) => el.scheduleReposition());
      }).observe(document.documentElement);
      window.addEventListener('scroll', () => {
        bars.forEach((el) => { el.scheduleReposition(); el.close(); });
      }, { passive: true });
      let startX = null;
      let startY = null;
      window.addEventListener('touchstart', (event) => {
        if (event.touches.length !== 1) return;
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
      }, { passive: true });
      window.addEventListener('touchend', (event) => {
        if (startX === null) return;
        const deltaX = event.changedTouches[0].clientX - startX;
        const deltaY = event.changedTouches[0].clientY - startY;
        startX = null;
        startY = null;
        if (Math.abs(deltaX) < SWIPE_MIN_DISTANCE_PX) return;
        if (Math.abs(deltaY) > Math.abs(deltaX) * SWIPE_MAX_VERTICAL_RATIO) return;
        const swipedRight = deltaX > 0;
        bars.forEach((el) => {
          const rightOpens = !el.pinsRight();
          if (swipedRight === rightOpens) el.open(); else el.close();
        });
      }, { passive: true });
  }
  {
      const STRINGS = {
        en: {
          label: 'The Cost of the Wrong Choice',
          or: 'or',
          why: 'Why it matters',
          takeaway: 'Takeaway'
        },
        fa: {
          label: 'هزینه‌ی انتخاب اشتباه',
          or: 'یا',
          why: 'چرا مهم است',
          takeaway: 'جمع‌بندی'
        }
      };
      const template = document.createElement('template');
      template.innerHTML = `
    <style>
      :host {
        --mrc-choice-accent: var(--mrc-color-primary-dark, #0a2239);
        --mrc-choice-tint: #f4f7fa;
        --mrc-choice-rule: #dbe3ec;
        --mrc-choice-option-surface: var(--mrc-color-surface, #fff);
        --mrc-choice-muted: #5b6b7a;
        --mrc-card-gap: 28px;
        display: block;
        margin-top: var(--mrc-card-gap);
      }
      * { box-sizing: border-box; }
      .mrc-choice {
        border-radius: var(--mrc-radius-md, 14px);
        border-inline-start: 4px solid var(--mrc-choice-accent);
        background: var(--mrc-choice-tint);
        box-shadow: var(--mrc-shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.06));
        padding: var(--mrc-space-4, 16px);
        text-align: start;
      }
      .mrc-choice__label {
        display: flex;
        align-items: flex-start;
        gap: var(--mrc-space-3, 12px);
        margin: 0;
        color: var(--mrc-choice-accent);
        font-size: var(--mrc-card-heading-size, 1.5rem);
        line-height: var(--mrc-card-heading-leading, 1.2);
        font-weight: 800;
        letter-spacing: normal;
        text-transform: none;
      }
      .mrc-choice__label > span[aria-hidden] {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(var(--mrc-card-heading-size, 1.5rem) * var(--mrc-card-heading-leading, 1.2));
      }
      .mrc-choice__titleline { min-width: 0; flex: 0 1 auto; }
      .mrc-choice__rule {
        display: block;
        width: 100%;
        height: 3px;
        margin-block-start: var(--mrc-card-rule-gap, 3px);
        margin-block-end: var(--mrc-card-rule-space, 8px);
        border-radius: 2px;
        background: linear-gradient(to right,
          var(--mrc-choice-accent),
          color-mix(in srgb, var(--mrc-choice-accent) 25%, transparent));
      }
      :host([dir="rtl"]) .mrc-choice__rule {
        background: linear-gradient(to left,
          var(--mrc-choice-accent),
          color-mix(in srgb, var(--mrc-choice-accent) 25%, transparent));
      }
      .mrc-choice__label svg {
        flex: 0 0 auto;
        width: calc(var(--mrc-card-heading-size, 1.5rem) * 1.08);
        height: calc(var(--mrc-card-heading-size, 1.5rem) * 1.08);
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      ::slotted(p) { margin: 0 0 var(--mrc-space-3, 12px) !important; }
      ::slotted(p:last-child) { margin-bottom: 0 !important; }
      .mrc-choice__context {
        color: var(--mrc-color-text, #1d2d3d);
        font-size: 0.95rem;
        line-height: 1.7;
      }
      .mrc-choice__options {
        display: grid;
        gap: var(--mrc-space-3, 12px);
        margin-top: var(--mrc-space-4, 16px);
      }
      @media (min-width: 560px) {
        :host([data-mrc-options="2"]) .mrc-choice__options {
          grid-template-columns: 1fr auto 1fr;
          align-items: stretch;
        }
        :host([data-mrc-many]) .mrc-choice__options {
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
        }
      }
      :host(:not([data-mrc-options="2"])) [data-role="versus"] { display: none; }
      ::slotted(mrc-choice-option) { min-width: 0; }
      :host([data-mrc-options="2"]) ::slotted(mrc-choice-option:first-of-type) { order: -1; }
      :host([data-mrc-options="2"]) [data-role="versus"] { order: 0; }
      :host([data-mrc-options="2"]) ::slotted(mrc-choice-option:last-of-type) { order: 1; }
      .mrc-choice__versus {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-inline: var(--mrc-space-3, 12px);
        color: var(--mrc-choice-muted, #5b6b7a);
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
      .mrc-choice__versus::before {
        content: '';
        position: absolute;
        inset-block: 0;
        inset-inline-start: 50%;
        width: 1px;
        background: var(--mrc-choice-rule);
      }
      .mrc-choice__versus span {
        position: relative;
        padding: 2px var(--mrc-space-2, 8px);
        border-radius: 999px;
        background: var(--mrc-choice-tint);
      }
      :host([tone="invert"]) {
        --mrc-choice-accent: #ffe9b0;
        --mrc-choice-tint: #10233a;
        --mrc-choice-rule: rgba(255, 233, 176, 0.3);
        --mrc-choice-option-surface: transparent;
        --mrc-choice-muted: #eef3f8;
        --mrc-color-text: #eef2f7;
      }
      :host([tone="invert"]) .mrc-choice {
        border-inline-start-width: 0;
        border-top: 3px solid var(--mrc-choice-accent);
        box-shadow: var(--mrc-choice-lift, 0 14px 34px rgba(10, 34, 57, 0.28));
      }
      :host([tone="invert"]) .mrc-choice__takeaway { font-size: 1.05rem; }
      :host([tone="invert"]) ::slotted(*) { color: #eef2f7 !important; }
      :host([tone="invert"]) ::slotted(a) { color: var(--mrc-choice-accent) !important; }
      :host([tone="invert"][hue="atlantic"]) { --mrc-choice-tint: #14608a; }
      :host([tone="invert"][hue="teal"]) { --mrc-choice-tint: #0e6a70; }
      .mrc-choice__strip {
        margin-top: var(--mrc-space-4, 16px);
        padding-top: var(--mrc-space-4, 16px);
        border-top: 1px solid var(--mrc-choice-rule);
      }
      .mrc-choice__strip-label {
        display: block;
        margin-bottom: var(--mrc-space-2, 8px);
        color: var(--mrc-choice-muted, #5b6b7a);
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .mrc-choice__why { color: var(--mrc-color-text, #1d2d3d); font-size: 0.9rem; line-height: 1.7; }
      .mrc-choice__takeaway {
        color: var(--mrc-choice-accent);
        font-size: 0.95rem;
        line-height: 1.7;
        font-weight: 600;
      }
      .mrc-choice__cta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--mrc-space-2, 8px);
        margin-top: var(--mrc-space-4, 16px);
        padding: var(--mrc-space-3, 12px) var(--mrc-space-4, 16px);
        border-radius: var(--mrc-radius-sm, 8px);
        border-inline-start: 3px solid var(--mrc-choice-accent);
        background: var(--mrc-choice-cta-surface, rgba(255, 255, 255, 0.07));
        color: var(--mrc-choice-muted, #5b6b7a);
        font-size: 0.88rem;
        line-height: 1.6;
      }
      .mrc-choice__cta-arrow {
        flex: 0 0 auto;
        margin-inline-start: auto;
        display: flex;
        color: var(--mrc-choice-accent);
        transition: transform 0.15s ease;
      }
      .mrc-choice__cta-arrow svg {
        width: 18px; height: 18px;
        fill: none; stroke: currentColor;
        stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
      }
      :host([dir="rtl"]) .mrc-choice__cta-arrow { transform: scaleX(-1); }
      .mrc-choice__cta:hover .mrc-choice__cta-arrow { transform: translateX(3px); }
      :host([dir="rtl"]) .mrc-choice__cta:hover .mrc-choice__cta-arrow { transform: scaleX(-1) translateX(3px); }
      ::slotted(a) {
        color: var(--mrc-choice-accent) !important;
        font-weight: 700;
        text-underline-offset: 3px;
      }
      ::slotted(a:focus-visible) {
        outline: 2px solid var(--mrc-choice-accent);
        outline-offset: 3px;
        border-radius: 3px;
      }
      @media (prefers-reduced-motion: reduce) {
        .mrc-choice__cta-arrow { transition: none; }
      }
      [hidden] { display: none !important; }
      @media (max-width: 767px) {
        .mrc-choice { padding: var(--mrc-space-4, 16px); }
      }
      @media (min-width: 768px) {
        .mrc-choice { padding: var(--mrc-space-5, 20px); }
      }
    </style>
    <div class="mrc-choice">
      <p class="mrc-choice__label">
        <span aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M12 3v18"/><path d="M5 8h14"/><path d="m5 8-3 6a3 3 0 0 0 6 0Z"/><path d="m19 8-3 6a3 3 0 0 0 6 0Z"/></svg>
        </span>
        <span class="mrc-choice__titleline">
          <span class="mrc-choice__label-text" data-role="label-built-in"></span><span class="mrc-choice__label-own" data-role="label-own"><slot name="label"></slot></span>
          <span class="mrc-choice__rule" aria-hidden="true"></span>
        </span>
      </p>
      <div class="mrc-choice__context"><slot name="context"></slot></div>
      <!-- Options are whatever <mrc-choice-option> children the page writes, in the
           DEFAULT slot: no slot name to remember, and no ceiling on how many. The
           divider belongs to the two-option case and the card hides it otherwise. -->
      <div class="mrc-choice__options" data-role="options">
        <slot></slot>
        <div class="mrc-choice__versus" data-role="versus" aria-hidden="true"><span data-role="or"></span></div>
      </div>
      <div class="mrc-choice__strip" data-role="why-strip">
        <span class="mrc-choice__strip-label" data-role="why-label"></span>
        <div class="mrc-choice__why"><slot name="why"></slot></div>
      </div>
      <div class="mrc-choice__strip" data-role="takeaway-strip">
        <span class="mrc-choice__strip-label" data-role="takeaway-label"></span>
        <div class="mrc-choice__takeaway"><slot name="takeaway"></slot></div>
      </div>
      <div class="mrc-choice__cta" data-role="cta-row">
        <slot name="cta"></slot>
        <span class="mrc-choice__cta-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M5 12h13"/><path d="m12 5 7 7-7 7"/></svg>
        </span>
      </div>
    </div>`;
      const optionTemplate = document.createElement('template');
      optionTemplate.innerHTML = `
    <style>
      :host {
        display: block;
        min-width: 0;
        padding: var(--mrc-space-3, 12px);
        border-radius: var(--mrc-radius-sm, 8px);
        background: var(--mrc-choice-option-surface, #fff);
        border: 1px solid var(--mrc-choice-rule, #dbe3ec);
      }
      :host([data-mrc-bare]) {
        background: var(--mrc-choice-option-fill, rgba(255, 255, 255, 0.06));
        border: 1px solid var(--mrc-choice-option-edge, rgba(255, 255, 255, 0.16));
      }
      * { box-sizing: border-box; }
      .kind {
        display: block;
        margin-bottom: 2px;
        color: var(--mrc-choice-muted, #5b6b7a);
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .name {
        display: block;
        margin-bottom: var(--mrc-space-2, 8px);
        color: var(--mrc-choice-accent, #0a2239);
        font-size: 1rem;
        font-weight: 700;
        overflow-wrap: anywhere;
      }
      :host([data-mrc-bare]) .kind::before {
        content: '';
        display: block;
        width: 24px;
        height: 2px;
        margin-bottom: var(--mrc-space-2, 8px);
        border-radius: 1px;
        background: var(--mrc-choice-accent, #0a2239);
      }
      .text { color: var(--mrc-color-text, #1d2d3d); font-size: 0.88rem; line-height: 1.65; }
      ::slotted(p) { margin: 0 0 var(--mrc-space-2, 8px) !important; }
      ::slotted(p:last-child) { margin-bottom: 0 !important; }
      [hidden] { display: none !important; }
    </style>
    <span class="kind" data-role="kind"><slot name="kind"></slot></span>
    <span class="name" data-role="name"><slot name="name"></slot></span>
    <div class="text"><slot></slot></div>`;
      class MrcChoiceOption extends HTMLElement {
        #ready = false;
        connectedCallback() {
          if (!this.#ready) {
            this.attachShadow({ mode: 'open' }).appendChild(optionTemplate.content.cloneNode(true));
            this.shadowRoot.querySelectorAll('slot[name]').forEach((slot) => {
              slot.addEventListener('slotchange', () => this.#syncRows());
            });
            this.#ready = true;
          }
          this.#syncRows();
          const card = this.closest('mrc-choice-card');
          if (card && card.refreshOptions) card.refreshOptions();
        }
        #syncRows() {
          ['kind', 'name'].forEach((role) => {
            const slot = this.shadowRoot.querySelector('slot[name="' + role + '"]');
            const filled = slot && slot.assignedNodes().some((n) =>
              n.nodeType === 1 || (n.textContent || '').trim() !== '');
            this.shadowRoot.querySelector('[data-role="' + role + '"]').hidden = !filled;
          });
        }
        disconnectedCallback() {
          const card = this.closest('mrc-choice-card');
          if (card && card.refreshOptions) card.refreshOptions();
        }
      }
      if (!customElements.get('mrc-choice-option')) customElements.define('mrc-choice-option', MrcChoiceOption);
      class MrcChoiceCard extends HTMLElement {
        static observedAttributes = ['variant', 'label'];
        #ready = false;
        connectedCallback() {
          if (!this.#ready) {
            this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
            this.shadowRoot.querySelectorAll('slot').forEach((slot) => {
              slot.addEventListener('slotchange', () => this.#syncRows());
            });
            this.#ready = true;
          }
          trackLang(this);
          this.setLang(detectLang(this));
        }
        disconnectedCallback() { untrackLang(this); }
        attributeChangedCallback() {
          if (this.#ready) this.setLang(detectLang(this));
        }
        setLang(next) {
          const lang = next === 'fa' ? 'fa' : 'en';
          this.lang = lang;
          this.dir = lang === 'fa' ? 'rtl' : 'ltr';
          const s = STRINGS[lang];
          const put = (role, text) => { this.shadowRoot.querySelector('[data-role="' + role + '"]').textContent = text; };
          put('label-built-in', s.label);
          put('or', s.or);
          put('why-label', s.why);
          put('takeaway-label', s.takeaway);
          this.refreshOptions();
          this.#syncRows();
        }
        refreshOptions() {
          const options = [...this.querySelectorAll('mrc-choice-option')];
          const count = options.length;
          this.setAttribute('data-mrc-options', String(count));
          this.toggleAttribute('data-mrc-many', count > 2);
          options.forEach((option) => {
            if (option.render) option.render();
            option.toggleAttribute('data-mrc-bare', this.getAttribute('tone') === 'invert');
          });
        }
        #syncRows() {
          const filled = (name) => {
            const slot = this.shadowRoot.querySelector('slot[name="' + name + '"]');
            return !!slot && slot.assignedNodes().some((n) =>
              n.nodeType === 1 || (n.textContent || '').trim() !== '');
          };
          const show = (role, on) => {
            this.shadowRoot.querySelector('[data-role="' + role + '"]').hidden = !on;
          };
          show('options', this.querySelectorAll('mrc-choice-option').length > 0);
          const own = filled('label');
          show('label-own', own);
          show('label-built-in', !own);
          show('why-strip', filled('why'));
          show('takeaway-strip', filled('takeaway'));
          show('cta-row', filled('cta'));
        }
      }
      if (!customElements.get('mrc-choice-card')) customElements.define('mrc-choice-card', MrcChoiceCard);
  }
  {
      const SHOW_COUNT = 6;
      const SAME_TOPIC_OVERLAP = 0.75;
      const MIN_SHARED_TAGS = 2;
      const SITEMAP_TTL_MS = 24 * 60 * 60 * 1000;
      const SITEMAP_CACHE_KEY = 'mrc-related-sitemap';
      const TRAIL_KEY = 'mrc-related-trail';
      const TRAIL_MAX = 12;
      const DISMISS_KEY = 'mrc-related-trail-dismissed';
      const REFRESH_MARGIN = '600px';
      const STRINGS = {
        en: {
          label: 'Related articles',
          all: 'See all articles',
          more: 'More articles',
          backPrev: 'Back to the previous article',
          backFirst: 'Back to the article you started from'
        },
        fa: {
          label: 'مقالات مرتبط',
          all: 'دیدن همه‌ی مقالات',
          more: 'مقالات بیشتر',
          backPrev: 'بازگشت به مقاله‌ی قبلی',
          backFirst: 'بازگشت به مقاله‌ی اصلی'
        }
      };
      const DEFAULT_ALL_HREF = { en: '/en/blog', fa: '/fa/blog' };
      function weigh(posts) {
        const seen = new Map();
        posts.forEach((p) => new Set(p.tags || []).forEach((t) => seen.set(t, (seen.get(t) || 0) + 1)));
        const total = posts.length || 1;
        const weights = new Map();
        seen.forEach((count, tag) => weights.set(tag, Math.log(1 + total / count)));
        return weights;
      }
      const weightOf = (weights, tag) => (weights ? (weights.get(tag) || 1) : 1);
      const sum = (tags, weights) => tags.reduce((n, t) => n + weightOf(weights, t), 0);
      function overlap(a, b, weights) {
        if (!a.length || !b.length) return 0;
        const set = new Set(a);
        const worth = sum(b.filter((t) => set.has(t)), weights);
        return worth / Math.sqrt(sum(a, weights) * sum(b, weights)) || 0;
      }
      const STOP = new Set(['what', 'which', 'should', 'your', 'you', 'the', 'and', 'for',
        'with', 'that', 'this', 'from', 'have', 'does', 'guide', 'explained', 'complete',
        'canada', 'canadian', 'canadians', 'about', 'need', 'know', 'much', 'they', 'their']);
      function titleWords(title) {
        return [...new Set((title || '').toLowerCase().match(/[a-z0-9]+/g) || [])]
          .filter((w) => w.length > 2 && !STOP.has(w));
      }
      const TAG_SHARE = 0.6;
      const TITLE_SHARE = 0.4;
      function sharedCount(a, b) {
        const set = new Set(a);
        return b.filter((t) => set.has(t)).length;
      }
      function rank(article, posts) {
        const sameLang = posts.filter((p) => p.lang === article.lang);
        const tagWeights = weigh(sameLang);
        const wordWeights = weigh(sameLang.map((p) => ({ tags: titleWords(p.title) })));
        const myWords = titleWords(article.title);
        const floor = Math.max(1, Math.min(MIN_SHARED_TAGS, (article.tags || []).length));
        return sameLang
          .filter((p) => p.slug !== article.slug)
          .map((p) => {
            const byTag = overlap(article.tags || [], p.tags || [], tagWeights);
            const byTitle = overlap(myWords, titleWords(p.title), wordWeights);
            return {
              post: p,
              shared: sharedCount(article.tags || [], p.tags || []),
              close: (byTag * TAG_SHARE) + (byTitle * TITLE_SHARE)
            };
          })
          .filter((c) => c.shared >= floor)
          .sort((x, y) => (y.close - x.close) || (y.post.date || '').localeCompare(x.post.date || ''));
      }
      function split(ranked, count) {
        const shown = [];
        const rest = [];
        ranked.forEach((c) => {
          const twin = shown.find((s) => overlap(s.post.tags || [], c.post.tags || []) >= SAME_TOPIC_OVERLAP);
          if (!twin && shown.length < count) shown.push(c);
          else rest.push(c);
        });
        return { shown: shown.map((c) => c.post), rest: rest.map((c) => c.post) };
      }
      function slugWords(slug) {
        return slug.split('-').filter((w) => w.length > 3);
      }
      function titleFromSlug(slug) {
        return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
      const template = document.createElement('template');
      template.innerHTML = `
    <style>
      :host {
        display: block;
        margin-block-start: var(--mrc-card-gap, 28px);
        --mrc-related-accent: var(--mrc-color-gold, #c9a227);
        --mrc-card-accent: var(--mrc-color-gold, #c9a227);
        --mrc-related-surface: var(--mrc-color-surface, #fff);
        --mrc-related-gap: var(--mrc-space-3, 12px);
        --mrc-related-rule: var(--mrc-color-border, rgba(16, 24, 40, 0.1));
      }
      .mrc-related {
        border-radius: var(--mrc-radius-md, 14px);
        border: 1px solid var(--mrc-color-border, rgba(16, 24, 40, 0.1));
        border-block-start: 3px solid var(--mrc-related-accent);
        background: var(--mrc-related-surface);
        padding: var(--mrc-space-4, 16px);
        text-align: start;
      }
      .mrc-related__label {
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--mrc-color-muted, #5b6473);
        margin-block-end: var(--mrc-space-3, 12px);
      }
      :host([label=""]) .mrc-related__label {
        font: inherit;
        letter-spacing: normal;
        text-transform: none;
        color: inherit;
        margin-block-end: 0;
        display: flex;
        align-items: flex-start;
        gap: var(--mrc-space-3, 12px);
      }
      .mrc-related__mark {
        flex: 0 0 auto;
        display: none;
        align-items: center;
        justify-content: center;
        width: var(--mrc-related-mark-size, calc(var(--mrc-card-heading-size, 1.5rem) * 1.25));
        height: var(--mrc-related-mark-size, calc(var(--mrc-card-heading-size, 1.5rem) * 1.25));
        border-radius: 50%;
        background: var(--mrc-related-accent);
        color: #fff;
      }
      :host([label=""]) .mrc-related__mark { display: flex; }
      ::slotted([slot="label"]) { margin: 0; }
      .mrc-related__titleline { min-width: 0; flex: 0 1 auto; }
      .mrc-related__rule { display: none; }
      :host([label=""]) .mrc-related__rule {
        display: block;
        width: 100%;
        max-width: 100%;
        height: 3px;
        margin-block-start: var(--mrc-card-rule-gap, 3px);
        margin-block-end: var(--mrc-card-rule-space, 8px);
        border-radius: 2px;
        background: linear-gradient(to right,
          var(--mrc-related-accent),
          color-mix(in srgb, var(--mrc-related-accent) 25%, transparent));
      }
      :host([dir="rtl"][label=""]) .mrc-related__rule {
        background: linear-gradient(to left,
          var(--mrc-related-accent),
          color-mix(in srgb, var(--mrc-related-accent) 25%, transparent));
      }
      .mrc-related__mark svg { width: calc(var(--mrc-card-heading-size, 1.5rem) * 0.62); height: calc(var(--mrc-card-heading-size, 1.5rem) * 0.62); }
      .mrc-related__list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr;
        column-gap: var(--mrc-space-5, 20px);
      }
      .mrc-related__list > li {
        padding-block: var(--mrc-related-gap);
        border-block-start: 1px solid var(--mrc-related-rule);
      }
      .mrc-related__list > li:first-child { border-block-start: 0; padding-block-start: 0; }
      @media (min-width: 480px) {
        .mrc-related__list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .mrc-related__list > li:nth-child(-n + 2) {
          border-block-start: 0;
          padding-block-start: 0;
        }
      }
      .mrc-related__link {
        display: block;
        color: var(--mrc-color-text, #101828);
        text-decoration: none;
        font-weight: 600;
        line-height: 1.45;
        border-radius: var(--mrc-radius-sm, 8px);
        position: relative;
      }
      .mrc-related__link::before {
        content: "";
        position: absolute;
        inset: calc(var(--mrc-related-touch-reach, 2px) * -1) 0;
        z-index: -1;
      }
      .mrc-related__link:hover {
        color: var(--mrc-related-accent);
        -webkit-text-stroke: var(--mrc-read-focus-stroke, 0.34px) currentColor;
      }
      .mrc-related__link:focus-visible {
        outline: 2px solid var(--mrc-related-accent);
        outline-offset: 3px;
      }
      .mrc-related__date {
        display: block;
        font-size: 0.8rem;
        font-weight: 400;
        color: var(--mrc-color-muted, #5b6473);
      }
      .mrc-related__actions {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--mrc-space-3, 12px);
        margin-block-start: var(--mrc-space-4, 16px);
        padding-block-start: var(--mrc-space-4, 16px);
        border-block-start: 1px solid var(--mrc-color-border, rgba(16, 24, 40, 0.1));
      }
      .mrc-related__action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--mrc-space-2, 8px);
        padding: var(--mrc-space-3, 12px);
        border-radius: var(--mrc-radius-sm, 8px);
        border: 1px solid color-mix(in srgb, var(--mrc-related-accent) 35%, transparent);
        background: color-mix(in srgb, var(--mrc-related-accent) 8%, transparent);
        color: var(--mrc-related-accent);
        font-weight: 700;
        text-align: center;
        text-decoration: none;
        line-height: 1.3;
      }
      .mrc-related__action:hover {
        background: color-mix(in srgb, var(--mrc-related-accent) 14%, transparent);
      }
      .mrc-related__action:focus-visible {
        outline: 2px solid var(--mrc-related-accent);
        outline-offset: 3px;
      }
      .mrc-related__action svg {
        flex: 0 0 auto;
        width: 1em; height: 1em;
        fill: none; stroke: currentColor; stroke-width: 2;
        stroke-linecap: round; stroke-linejoin: round;
      }
      :host([dir="rtl"]) .mrc-related__action svg { transform: scaleX(-1); }
      .mrc-related__more { margin-block-start: var(--mrc-related-gap); }
      .mrc-related__toggle {
        appearance: none;
        display: inline-block;
        background: none;
        border: 0;
        border-block-start: 1px solid var(--mrc-related-rule);
        padding: var(--mrc-related-gap) 0 0;
        font: inherit;
        font-weight: 700;
        color: var(--mrc-color-muted, #5b6473);
        cursor: pointer;
      }
      .mrc-related__toggle:hover { color: var(--mrc-related-accent); }
      .mrc-related__toggle:focus-visible {
        outline: 2px solid var(--mrc-related-accent);
        outline-offset: 3px;
      }
      .mrc-related__fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--mrc-related-slide, 0.3s) ease;
      }
      :host([data-mrc-open="true"]) .mrc-related__fold { grid-template-rows: 1fr; }
      .mrc-related__fold > ol {
        overflow: hidden;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .mrc-related__fold > ol > li:first-child {
        border-block-start: 1px solid var(--mrc-related-rule);
      }
      .mrc-related__trail {
        position: fixed;
        z-index: 45;
        inset-block-start: calc(var(--mrc-site-header-height, 0px) + var(--mrc-related-trail-top, 8px));
        inset-inline: 0;
        margin-inline: auto;
        width: min(var(--mrc-content-width, 720px), calc(100vw - 24px));
        display: flex;
        align-items: center;
        gap: var(--mrc-space-2, 8px);
        padding: var(--mrc-space-2, 8px);
        border-radius: var(--mrc-radius-md, 14px);
        border: 1px solid var(--mrc-related-rule);
        background: var(--mrc-related-surface);
        box-shadow: var(--mrc-shadow-md, 0 10px 30px rgba(16, 24, 40, 0.16));
      }
      .mrc-related__trail[hidden] { display: none; }
      .mrc-related__trail .mrc-related__back:first-of-type { flex: 1 1 auto; }
      .mrc-related__dismiss {
        appearance: none;
        flex: 0 0 auto;
        width: 2rem; height: 2rem;
        border: 0;
        border-radius: 50%;
        background: none;
        color: var(--mrc-color-muted, #5b6473);
        font: inherit;
        font-size: 1.1rem;
        line-height: 1;
        cursor: pointer;
      }
      .mrc-related__dismiss:hover { color: var(--mrc-related-accent); }
      .mrc-related__dismiss:focus-visible {
        outline: 2px solid var(--mrc-related-accent);
        outline-offset: 2px;
      }
      .mrc-related__back {
        appearance: none;
        font: inherit;
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--mrc-color-muted, #5b6473);
        background: none;
        border: 1px solid var(--mrc-related-rule);
        border-radius: var(--mrc-radius-sm, 8px);
        padding: var(--mrc-space-2, 8px) var(--mrc-space-3, 12px);
        cursor: pointer;
        text-align: start;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mrc-related__back:hover {
        color: var(--mrc-related-accent);
        border-color: var(--mrc-related-accent);
      }
      .mrc-related__back:focus-visible {
        outline: 2px solid var(--mrc-related-accent);
        outline-offset: 2px;
      }
      .mrc-related__back[hidden] { display: none; }
      @media (prefers-reduced-motion: reduce) {
        .mrc-related__fold { transition: none; }
      }
    </style>
    <section class="mrc-related">
      <!-- a div rather than a p: with label="" the page slots its own section
           heading in here, and a heading inside a paragraph is the one nesting a
           browser will not keep -->
      <!-- The card's mark, beside the name the article gives it. Hidden when the
           page has not named the card (label="" is how it says it has), because
           an icon on its own beside the small automatic caption is a decoration
           with nothing to introduce. -->
      <div class="mrc-related__label">
        <span class="mrc-related__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M9 7h7M9 11h5"/></svg>
        </span>
        <span class="mrc-related__titleline">
          <!-- the automatic caption lives in its own span: written onto the label
               itself it wiped the mark and this slot with it -->
          <span class="mrc-related__label-text" data-role="label-text"></span>
          <slot name="label"></slot>
          <!-- and the rule under a slotted heading, drawn by the card: standalone
               there is no mrc.css to draw one (13 Aug). Inside this box its 100%
               is the title-s own width; on the row it was the whole row. -->
          <span class="mrc-related__rule" aria-hidden="true"></span>
        </span>
      </div>
      <!-- The way back out of a detour. Above the list, because a reader who
           wants it wants it before being offered somewhere else to go. -->
      <div class="mrc-related__trail" data-role="trail" hidden role="region">
        <button type="button" class="mrc-related__back" data-role="back-first" hidden></button>
        <button type="button" class="mrc-related__back" data-role="back-prev" hidden></button>
        <button type="button" class="mrc-related__dismiss" data-role="dismiss" aria-label="dismiss">×</button>
      </div>
      <ol class="mrc-related__list" data-role="list"></ol>
      <!-- The two ways onward, in a row of their own OUTSIDE the article grid.
           Inside it they would be two more cells, and with an odd number of
           articles the first would fill the gap left on the last row and the second
           would drop to a row by itself — asked for on 12 Aug that they always share
           one row. Their own grid cannot be split by anything above it. -->
      <div class="mrc-related__actions">
        <a class="mrc-related__action" data-role="more" href="#">
          <span data-role="more-text"></span>
        </a>
        <a class="mrc-related__action" data-role="all" href="#">
          <span data-role="all-text"></span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </section>`;
      class MrcRelated extends HTMLElement {
        static observedAttributes = ['slug', 'count', 'all-href', 'locale-lang'];
        #ready = false;
        #posts = [];
        #refreshed = false;
        #watcher = null;
        #el = null;
        connectedCallback() {
          if (!this.#ready) {
            this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
            this.#bind();
            this.#ready = true;
          }
          trackLang(this);
          this.#posts = this.#readIndex();
          this.setLang(detectLang(this));
          this.#watchForRefresh();
        }
        disconnectedCallback() {
          untrackLang(this);
          if (this.#watcher) { this.#watcher.disconnect(); this.#watcher = null; }
        }
        attributeChangedCallback() {
          if (this.#ready) this.setLang(detectLang(this));
        }
        setLang(next) {
          const lang = next === 'fa' ? 'fa' : 'en';
          this.lang = lang;
          this.dir = lang === 'fa' ? 'rtl' : 'ltr';
          this.#render();
        }
        #readIndex() {
          const node = this.querySelector('script[type="application/json"]');
          if (!node) return [];
          try {
            const data = JSON.parse(node.textContent);
            return Array.isArray(data) ? data : (data.posts || []);
          } catch (error) {
            console.warn('mrc-related: the index is not valid JSON, so only the link to all articles is shown.', error);
            return [];
          }
        }
        #render() {
          const lang = this.lang;
          const strings = STRINGS[lang];
          if (!this.querySelector('[slot="label"]')) {
            this.#el.labelText.textContent = strings.label;
          }
          this.#el.all.href = this.getAttribute('all-href') || DEFAULT_ALL_HREF[lang];
          this.#aim(this.#el.all);
          this.#el.allText.textContent = strings.all;
          const slug = this.getAttribute('slug');
          const list = this.#el.list;
          list.textContent = '';
          const me = this.#posts.find((p) => p.slug === slug && p.lang === lang);
          if (!slug || !me) {
            console.warn('mrc-related: "' + slug + '" is not in the index for ' + lang
              + ' — showing only the link to all articles.');
            this.#renderMore([], strings);
            return;
          }
          const cap = parseInt(this.getAttribute('count'), 10) || SHOW_COUNT;
          const ranked = rank(me, this.#posts);
          const picked = split(ranked, cap);
          const shown = picked.shown.length >= cap
            ? picked.shown
            : picked.shown.concat(picked.rest.slice(0, cap - picked.shown.length));
          shown.forEach((post) => list.appendChild(this.#row(post)));
          this.#renderMore(ranked.length - shown.length, strings);
          this.#renderTrail(strings, me);
        }
        #trail() {
          try {
            const raw = sessionStorage.getItem(TRAIL_KEY);
            const list = raw ? JSON.parse(raw) : [];
            return Array.isArray(list) ? list : [];
          } catch (error) {
            console.warn('mrc-related: the trail could not be read, so the way back starts again here.', error);
            return [];
          }
        }
        #writeTrail(list) {
          try {
            const kept = list.length > TRAIL_MAX
              ? [list[0]].concat(list.slice(-(TRAIL_MAX - 1)))
              : list;
            sessionStorage.setItem(TRAIL_KEY, JSON.stringify(kept));
          } catch (error) {
            console.warn('mrc-related: the trail could not be saved, so the way back will not appear.', error);
          }
        }
        #renderTrail(strings, me) {
          const box = this.#el.trail;
          const prevBtn = this.#el.backPrev;
          const firstBtn = this.#el.backFirst;
          let trail = this.#trail();
          if (me && trail.length && trail[0].slug === me.slug && trail[0].lang === me.lang) {
            trail = [];
            this.#writeTrail(trail);
          }
          let dismissed = false;
          try { dismissed = sessionStorage.getItem(DISMISS_KEY) === '1'; }
          catch (error) { console.warn('mrc-related: could not read the dismissed flag; the bar will show.', error); }
          box.hidden = trail.length === 0 || dismissed;
          prevBtn.hidden = trail.length < 2;
          firstBtn.hidden = trail.length === 0;
          if (box.hidden) return;
          const first = trail[0];
          const prev = trail[trail.length - 1];
          firstBtn.textContent = strings.backFirst + ' — ' + first.title;
          firstBtn.title = first.title;
          firstBtn.onclick = () => { this.#writeTrail([]); location.href = first.url; };
          if (trail.length >= 2) {
            prevBtn.textContent = strings.backPrev;
            prevBtn.title = prev.title;
            prevBtn.setAttribute('aria-label', strings.backPrev + ' — ' + prev.title);
            prevBtn.onclick = () => { this.#writeTrail(trail.slice(0, -1)); location.href = prev.url; };
          }
        }
        #remember(me) {
          if (!me) return;
          this.#writeTrail(this.#trail().concat([{
            slug: me.slug, lang: me.lang, title: me.title,
            url: me.url || ('/' + me.lang + '/blog/' + me.slug)
          }]));
        }
        #renderMore(held, strings) {
          const link = this.#el.more;
          link.href = this.#el.all.href;
          this.#aim(link);
          this.#el.moreText.textContent = held > 0
            ? strings.more + ' (' + held + ')'
            : strings.more;
        }
        #row(post) {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.className = 'mrc-related__link';
          a.href = post.url || ('/' + post.lang + '/blog/' + post.slug);
          this.#aim(a);
          a.textContent = post.title || titleFromSlug(post.slug);
          li.appendChild(a);
          if (post.date) {
            const when = document.createElement('span');
            when.className = 'mrc-related__date';
            when.textContent = new Intl.DateTimeFormat(post.lang === 'fa' ? 'fa-IR' : 'en-CA',
              { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(post.date));
            a.appendChild(when);
          }
          return li;
        }
        #aim(a) {
          const target = this.getAttribute('target');
          if (!target) return;
          a.target = target;
          if (target === '_blank') a.rel = 'noopener noreferrer';
        }
        #bind() {
          const root = this.shadowRoot;
          this.#el = {
            label: root.querySelector('.mrc-related__label'),
            labelText: root.querySelector('[data-role="label-text"]'),
            list: root.querySelector('[data-role="list"]'),
            all: root.querySelector('[data-role="all"]'),
            allText: root.querySelector('[data-role="all-text"]'),
            more: root.querySelector('[data-role="more"]'),
            moreText: root.querySelector('[data-role="more-text"]'),
            trail: root.querySelector('[data-role="trail"]'),
            backPrev: root.querySelector('[data-role="back-prev"]'),
            backFirst: root.querySelector('[data-role="back-first"]'),
            dismiss: root.querySelector('[data-role="dismiss"]')
          };
          const labelSlot = root.querySelector('slot[name="label"]');
          const syncCaption = () => {
            this.#el.labelText.hidden = labelSlot.assignedElements().length > 0;
          };
          labelSlot.addEventListener('slotchange', syncCaption);
          syncCaption();
          root.querySelector('.mrc-related').addEventListener('click', (event) => {
            if (!event.target.closest('.mrc-related__link')) return;
            const lang = this.lang;
            this.#remember(this.#posts.find((p) => p.slug === this.getAttribute('slug') && p.lang === lang));
          });
          this.#el.dismiss.addEventListener('click', () => {
            try { sessionStorage.setItem(DISMISS_KEY, '1'); }
            catch (error) { console.warn('mrc-related: could not remember the dismissal.', error); }
            this.#el.trail.hidden = true;
          });
        }
        #watchForRefresh() {
          if (this.#refreshed || !this.getAttribute('slug')) return;
          if (this.getAttribute('sitemap') === '') return;
          if (typeof IntersectionObserver !== 'function') return;
          const spy = new IntersectionObserver((entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            spy.disconnect();
            const run = () => this.#refresh();
            if (typeof requestIdleCallback === 'function') requestIdleCallback(run, { timeout: 3000 });
            else setTimeout(run, 200);
          }, { rootMargin: REFRESH_MARGIN });
          spy.observe(this);
          this.#watcher = spy;
        }
        async #refresh() {
          if (this.#refreshed) return;
          this.#refreshed = true;
          try {
            const slugs = await this.#sitemapSlugs();
            const known = new Set(this.#posts.map((p) => p.lang + '/' + p.slug));
            const lang = this.lang;
            const me = this.#posts.find((p) => p.slug === this.getAttribute('slug') && p.lang === lang);
            if (!me) return;
            const mine = new Set(slugWords(me.slug));
            const added = slugs
              .filter((s) => s.lang === lang && !known.has(s.lang + '/' + s.slug))
              .map((s) => ({ ...s, tags: slugWords(s.slug).filter((w) => mine.has(w)) }))
              .filter((s) => s.tags.length >= MIN_SHARED_TAGS);
            if (!added.length) return;
            this.#posts = this.#posts.concat(added);
            this.#render();
          } catch (error) {
            console.warn('mrc-related: could not refresh from the sitemap; the built-in list stands.', error);
          }
        }
        async #sitemapSlugs() {
          const cached = this.#readCache();
          if (cached) return cached;
          const url = this.getAttribute('sitemap') || '/sitemap.xml';
          const response = await fetch(url, { credentials: 'omit' });
          if (!response.ok) throw new Error('sitemap ' + response.status);
          const xml = new DOMParser().parseFromString(await response.text(), 'application/xml');
          const out = [];
          xml.querySelectorAll('loc').forEach((node) => {
            const match = (node.textContent || '').match(/\/(fa|en)\/blog\/([^/?#]+)\/?$/);
            if (match) out.push({ lang: match[1], slug: match[2] });
          });
          this.#writeCache(out);
          return out;
        }
        #readCache() {
          try {
            const raw = localStorage.getItem(SITEMAP_CACHE_KEY);
            if (!raw) return null;
            const box = JSON.parse(raw);
            if (Date.now() - box.at > SITEMAP_TTL_MS) return null;
            return box.slugs;
          } catch (error) {
            console.warn('mrc-related: the cached sitemap could not be read; fetching it again.', error);
            return null;
          }
        }
        #writeCache(slugs) {
          try {
            localStorage.setItem(SITEMAP_CACHE_KEY, JSON.stringify({ at: Date.now(), slugs }));
          } catch (error) {
            console.warn('mrc-related: the sitemap could not be cached, so it is read once per page.', error);
          }
        }
      }
      if (!customElements.get('mrc-related')) customElements.define('mrc-related', MrcRelated);
  }
  {
      const SITE = {
        header: 'header',
        chat: '.fixed.bottom-4',
        footer: 'footer',
        hook: '.js-open-website-chat'
      };
      const SCROLL_THRESHOLD_PX = 8;
      const HIDE_AFTER_PX = 120;
      const REVEAL_AFTER_PX = 56;
      const HIDE_AFTER_TRAVEL_PX = 48;
      const EDGE_REVEAL_PX = 6;
      const WAIT_TIMEOUT_MS = 10000;
      const CHAT_HOLD_TRAVEL_PX = 40;
      const CHAT_OPEN_GROWTH = 1.6;
      const CHAT_SETTLE_MS = 1000;
      const CHAT_SETTLE_STEP_MS = 100;
      const CHAT_REVEAL_DELAY_MS = 400;
      const CHAT_MIN_PAGE_RATIO = 1.5;
      function whenFound(selectors, run, onGiveUp) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => whenFound(selectors, run, onGiveUp), { once: true });
          return;
        }
        const all = () => selectors.map((s) => document.querySelector(s));
        const ready = () => all().every(Boolean);
        if (ready()) { run(...all()); return; }
        const observer = new MutationObserver(() => {
          if (!ready()) return;
          observer.disconnect();
          clearTimeout(timer);
          run(...all());
        });
        const timer = setTimeout(() => {
          observer.disconnect();
          console.warn('mrc-site: gave up waiting for ' + selectors.join(' and ') + ' — that hook is off for this page.');
          if (onGiveUp) onGiveUp();
        }, WAIT_TIMEOUT_MS);
        observer.observe(document.documentElement, { childList: true, subtree: true });
      }
      function hookSelector(el, name, fallback) {
        if (!el.hasAttribute(name)) return null;
        return el.getAttribute(name) || fallback;
      }
      function bindHeader(selector) {
        whenFound([selector], (found) => {
          const root = document.documentElement;
          let header = found;
          let hidden = false;
          const TRANSITION = 'transform 0.34s cubic-bezier(0.22, 1, 0.36, 1)';
          const dress = (el) => {
            el.style.transition = TRANSITION;
            root.style.setProperty('--mrc-site-header-height', el.offsetHeight + 'px');
          };
          const live = () => {
            if (header && header.isConnected) return header;
            const fresh = document.querySelector(selector);
            if (!fresh) return null;
            header = fresh;
            dress(header);
            hidden = false;
            root.style.setProperty('--mrc-site-header-shift', '0px');
            return header;
          };
          dress(header);
          let lastY = scrollY;
          let quietUntil = 0;
          let upTravel = 0;
          let downTravel = 0;
          const apply = (hide) => {
            const el = live();
            if (!el) return;
            if (hide === hidden) return;
            hidden = hide;
            const shift = el.offsetHeight;
            el.style.transform = hide ? 'translateY(-' + shift + 'px)' : '';
            root.style.setProperty('--mrc-site-header-shift', hide ? shift + 'px' : '0px');
            upTravel = 0;
            downTravel = 0;
          };
          document.addEventListener('mrc-site:header', (event) => {
            const detail = event.detail || {};
            if (typeof detail.quiet === 'number') {
              quietUntil = Math.max(quietUntil, performance.now() + detail.quiet);
            } else {
              apply(Boolean(detail.hide));
            }
            lastY = scrollY;
            upTravel = 0;
            downTravel = 0;
          });
          let lastPointer = null;
          addEventListener('pointermove', (event) => {
            if (event.pointerType === 'touch' || event.pointerType === 'pen') return;
            const moved = !lastPointer
              || event.clientX !== lastPointer.x || event.clientY !== lastPointer.y;
            lastPointer = { x: event.clientX, y: event.clientY };
            if (!moved) return;
            if (!hidden) return;
            if (event.clientY > EDGE_REVEAL_PX) return;
            apply(false);
            lastY = scrollY;
            upTravel = 0;
            downTravel = 0;
          }, { passive: true });
          addEventListener('scroll', () => {
            const y = scrollY;
            if (y <= HIDE_AFTER_PX) {
              apply(false);
              lastY = y;
              upTravel = 0;
              downTravel = 0;
              return;
            }
            if (performance.now() < quietUntil) { lastY = y; upTravel = 0; downTravel = 0; return; }
            const moved = y - lastY;
            if (Math.abs(moved) < SCROLL_THRESHOLD_PX) return;
            lastY = y;
            if (moved > 0) {
              downTravel += moved;
              upTravel = Math.max(0, upTravel - moved);
              if (downTravel >= HIDE_AFTER_TRAVEL_PX && y > HIDE_AFTER_PX) apply(true);
              return;
            }
            upTravel += -moved;
            downTravel = Math.max(0, downTravel + moved);
            if (upTravel >= REVEAL_AFTER_PX || y <= HIDE_AFTER_PX) apply(false);
          }, { passive: true });
        });
      }
      const chatGate = {
        bound: false,
        selector: null,
        footerSelector: null,
        watching: false,
        revealTimer: 0,
        atFooter: false,
        held: false,
        holding: false,
        recheck() {
          if (!this.bound || !this.footerSelector) return;
          const footer = document.querySelector(this.footerSelector);
          if (!footer) return;
          const box = footer.getBoundingClientRect();
          const worthReading = document.documentElement.scrollHeight
            > innerHeight * CHAT_MIN_PAGE_RATIO;
          this.atFooter = worthReading && box.top < innerHeight && box.bottom > 0;
          this.apply();
        },
        paint(on) {
          document.documentElement.toggleAttribute('data-mrc-chat-away', !on);
          const el = document.querySelector(this.selector);
          if (el) el.setAttribute('aria-hidden', on ? 'false' : 'true');
        },
        apply() {
          if (!this.bound) return;
          const on = this.held || this.atFooter;
          clearTimeout(this.revealTimer);
          if (!on || this.held) { this.paint(on); return; }
          this.revealTimer = setTimeout(() => {
            if (this.held || this.atFooter) this.paint(true);
          }, CHAT_REVEAL_DELAY_MS);
        },
        hold() {
          if (!this.bound || this.held) return;
          this.held = true;
          this.apply();
          this.armRelease();
        },
        armRelease() {
          if (this.holding) return;
          this.holding = true;
          const from = scrollY;
          const el = document.querySelector(this.selector);
          const openedFrom = el ? el.getBoundingClientRect() : null;
          let grew = false;
          const release = () => {
            document.removeEventListener('pointerdown', onPress, true);
            removeEventListener('scroll', onScroll);
            if (sizeSpy) sizeSpy.disconnect();
            if (langSpy) langSpy.disconnect();
            this.holding = false;
            this.held = false;
            this.apply();
          };
          const onPress = (event) => {
            if (event.target.closest && event.target.closest(this.selector)) return;
            release();
          };
          const onScroll = () => {
            if (Math.abs(scrollY - from) >= CHAT_HOLD_TRAVEL_PX) release();
          };
          let sizeSpy = null;
          if (el && openedFrom && typeof ResizeObserver === 'function') {
            sizeSpy = new ResizeObserver(() => {
              const now = el.getBoundingClientRect();
              const bigger = now.height > openedFrom.height * CHAT_OPEN_GROWTH
                || now.width > openedFrom.width * CHAT_OPEN_GROWTH;
              if (bigger) { grew = true; return; }
              if (grew) release();
            });
            sizeSpy.observe(el);
          }
          const langSpy = new MutationObserver(release);
          langSpy.observe(document.documentElement, { attributeFilter: ['lang', 'dir'] });
          document.addEventListener('pointerdown', onPress, true);
          addEventListener('scroll', onScroll, { passive: true });
        }
      };
      function bindChatVisibility(chatSel, footerSel) {
        if (!document.getElementById('mrc-site-chat-style')) {
          const sheet = document.createElement('style');
          sheet.id = 'mrc-site-chat-style';
          sheet.textContent =
            chatSel + '{transition:opacity .25s ease}' +
            'html[data-mrc-chat-away] ' + chatSel +
            '{opacity:0!important;pointer-events:none!important;' +
            'animation:none!important;transition:none!important}';
          document.head.appendChild(sheet);
        }
        chatGate.bound = true;
        chatGate.selector = chatSel;
        chatGate.footerSelector = footerSel;
        chatGate.atFooter = false;
        chatGate.apply();
        const giveUp = () => {
          if (document.querySelector(footerSel)) return;
          chatGate.bound = false;
          document.documentElement.removeAttribute('data-mrc-chat-away');
        };
        whenFound([chatSel, footerSel], (chat, footer) => {
          chatGate.bound = true;
          chatGate.atFooter = false;
          chatGate.apply();
          if (!chatGate.watching) {
            chatGate.watching = true;
            let frame = 0;
            const ask = () => {
              if (frame) return;
              frame = requestAnimationFrame(() => { frame = 0; chatGate.recheck(); });
            };
            addEventListener('scroll', ask, { passive: true });
            addEventListener('resize', ask, { passive: true });
            if (typeof ResizeObserver === 'function') {
              new ResizeObserver(ask).observe(document.documentElement);
            }
            const keepFlagOn = new MutationObserver(() => {
              if (!chatGate.bound) return;
              if (chatGate.held || chatGate.atFooter) return;
              if (document.documentElement.hasAttribute('data-mrc-chat-away')) return;
              chatGate.paint(false);
            });
            keepFlagOn.observe(document.documentElement, { attributeFilter: ['data-mrc-chat-away'] });
          }
        }, giveUp);
      }
      function watchLanguageChanges() {
        let last = document.documentElement.lang + '|' + document.documentElement.dir;
        const langSpy = new MutationObserver(() => {
          const now = document.documentElement.lang + '|' + document.documentElement.dir;
          if (now === last) return;
          last = now;
          if (!chatGate.bound) return;
          chatGate.held = false;
          bindChatVisibility(chatGate.selector, chatGate.footerSelector);
          let tries = Math.ceil(CHAT_SETTLE_MS / CHAT_SETTLE_STEP_MS);
          const settle = () => {
            chatGate.recheck();
            if (tries-- > 0) setTimeout(settle, CHAT_SETTLE_STEP_MS);
          };
          requestAnimationFrame(settle);
        });
        langSpy.observe(document.documentElement, { attributeFilter: ['lang', 'dir'] });
      }
      function bindChatOpen(chatSel, hookSel) {
        document.addEventListener('mrc-cta:chat', (event) => {
          queueMicrotask(() => {
            if (event.defaultPrevented) return;
            openSiteChat(event);
          });
        });
        function openSiteChat(event) {
          chatGate.hold();
          const container = event.target && event.target.closest ? event.target.closest('.article-container') : null;
          const hook = (container && container.querySelector(hookSel)) || document.querySelector(hookSel);
          if (hook) { hook.click(); return; }
          const launcher = document.querySelector(chatSel);
          if (launcher) {
            (launcher.querySelector('button') || launcher).click();
            return;
          }
          console.warn('mrc-site: nothing matched "' + hookSel + '" or "' + chatSel + '" — the chat button had nothing to open.');
        }
      }
      const bound = new Set();
      class MrcSite extends HTMLElement {
        connectedCallback() {
          const header = hookSelector(this, 'header', SITE.header);
          if (header && !bound.has('header')) { bound.add('header'); bindHeader(header); }
          const chatAway = hookSelector(this, 'chat-away', SITE.chat);
          if (chatAway && !bound.has('chat-away')) {
            bound.add('chat-away');
            bindChatVisibility(chatAway, this.getAttribute('footer') || SITE.footer);
            watchLanguageChanges();
          }
          const chatOpen = hookSelector(this, 'chat-open', SITE.chat);
          if (chatOpen && !bound.has('chat-open')) {
            bound.add('chat-open');
            bindChatOpen(chatOpen, this.getAttribute('hook') || SITE.hook);
          }
        }
      }
      if (!customElements.get('mrc-site')) customElements.define('mrc-site', MrcSite);
  }
  {
      const CONFIG = {
        scriptId: 'mrc-schema-jsonld',
        types: 'article,faq,breadcrumb',
        publisherUrl: 'https://mehdirad.ca',
        publisherId: 'https://mehdirad.ca/#organization',
        authorId: 'https://mehdirad.ca/#mehdi-rad',
        authorPath: '/about',
        logo: '',
        image: '',
        blogPath: '/blog'
      };
      const STRINGS = {
        en: { home: 'Home', blog: 'Blog', person: 'Mehdi Rad', org: 'Mehdi Rad' },
        fa: { home: 'خانه', blog: 'بلاگ', person: 'مهدی راد', org: 'مهدی راد' }
      };
      function textFor(el, lang, skip) {
        if (!el) return '';
        const marked = [...el.querySelectorAll('[data-lang]')]
          .filter((n) => !skip || !skip.contains(n));
        const source = marked.length ? marked.filter((n) => n.getAttribute('data-lang') === lang) : [el];
        return source
          .filter((n) => !skip || !skip.contains(n))
          .map((n) => n.textContent)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
      }
      function headline(root, lang) {
        const el = root.querySelector('[slot="title"]') || root.querySelector('h1');
        return textFor(el, lang);
      }
      function summary(root, lang) {
        const lead = root.querySelector('[slot="intro"] p') || root.querySelector('.mrc-page p');
        return textFor(lead, lang);
      }
      function questions(root, lang) {
        return [...root.querySelectorAll('mrc-faq-item')].map((item) => {
          const q = item.querySelector('[slot="question"]');
          return { q: textFor(q, lang), a: textFor(item, lang, q) };
        }).filter((pair) => pair.q && pair.a);
      }
      function langPrefix(url) {
        let path = '';
        try { path = new URL(url).pathname; } catch { path = location.pathname; }
        return (path.match(/^\/(en|fa)(?=\/|$)/) || [''])[0];
      }
      function publisherNode(cfg, lang) {
        const node = { '@type': 'Organization', name: cfg.publisher || STRINGS[lang].org };
        if (cfg.publisherId) node['@id'] = cfg.publisherId;
        if (cfg.publisherUrl) node.url = cfg.publisherUrl;
        if (cfg.logo) node.logo = { '@type': 'ImageObject', url: cfg.logo };
        return node;
      }
      function authorNode(cfg, lang, url) {
        const node = { '@type': 'Person', name: cfg.author || STRINGS[lang].person };
        if (cfg.authorId) node['@id'] = cfg.authorId;
        const page = cfg.authorUrl || (cfg.authorPath && cfg.publisherUrl + langPrefix(url) + cfg.authorPath);
        if (page) node.url = page;
        return node;
      }
      function articleNode(root, lang, cfg, url) {
        const title = headline(root, lang);
        if (!title) return null;
        const node = {
          '@type': 'Article',
          headline: title,
          inLanguage: lang,
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          author: authorNode(cfg, lang, url),
          publisher: publisherNode(cfg, lang)
        };
        const description = summary(root, lang);
        if (description) node.description = description;
        if (cfg.published) node.datePublished = cfg.published;
        if (cfg.modified) node.dateModified = cfg.modified;
        if (cfg.image) node.image = cfg.image;
        return node;
      }
      function faqNode(root, lang) {
        const pairs = questions(root, lang);
        if (!pairs.length) return null;
        return {
          '@type': 'FAQPage',
          inLanguage: lang,
          mainEntity: pairs.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a }
          }))
        };
      }
      function breadcrumbNode(root, lang, cfg, url) {
        const title = headline(root, lang);
        if (!title) return null;
        const prefix = langPrefix(url);
        const home = cfg.publisherUrl + prefix;
        const blog = cfg.blogUrl || (home + cfg.blogPath);
        const rung = (position, name, item) => ({ '@type': 'ListItem', position, name, item });
        return {
          '@type': 'BreadcrumbList',
          itemListElement: [
            rung(1, cfg.homeLabel || STRINGS[lang].home, home),
            rung(2, cfg.blogLabel || STRINGS[lang].blog, blog),
            rung(3, title, url)
          ]
        };
      }
      const ARTICLE_TYPES = ['Article', 'BlogPosting', 'NewsArticle', 'TechArticle'];
      const isArticleNode = (n) =>
        [].concat((n && n['@type']) || []).some((t) => ARTICLE_TYPES.includes(t));
      function foreignBlocks(scriptId) {
        return [...document.querySelectorAll('script[type="application/ld+json"]')]
          .filter((el) => el.id !== scriptId)
          .map((el) => {
            try {
              return { el, data: JSON.parse(el.textContent) };
            } catch (error) {
              console.warn('mrc-schema: a JSON-LD block on this page is not valid JSON —', error.message);
              return null;
            }
          })
          .filter(Boolean);
      }
      function findArticleBlock(scriptId) {
        for (const { el, data } of foreignBlocks(scriptId)) {
          const nodes = [].concat(data['@graph'] || data);
          const node = nodes.find(isArticleNode);
          if (node) return { el, data, node };
        }
        return null;
      }
      function completeArticleBlock(found, cfg, lang, url) {
        const { el, data, node } = found;
        const gaps = {
          author: authorNode(cfg, lang, url),
          publisher: publisherNode(cfg, lang),
          mainEntityOfPage: { '@type': 'WebPage', '@id': url }
        };
        const added = Object.keys(gaps).filter((key) => !node[key]);
        if (!added.length) return [];
        added.forEach((key) => { node[key] = gaps[key]; });
        el.textContent = serialise(data);
        return added;
      }
      function serialise(graph) {
        return JSON.stringify(graph, null, 2).replace(/</g, '\\u003c');
      }
      const template = document.createElement('template');
      template.innerHTML = `
    <style>
      :host { display: none !important; }
    </style>`;
      class MrcSchema extends HTMLElement {
        static observedAttributes = ['types', 'published', 'modified', 'image', 'scope',
                                     'force-article', 'complete-article', 'author', 'publisher'];
        #ready = false;
        connectedCallback() {
          if (!this.#ready) {
            this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
            this.#ready = true;
          }
          trackLang(this);
          this.setLang(detectLang(this));
        }
        disconnectedCallback() { untrackLang(this); }
        attributeChangedCallback() {
          if (this.#ready) this.setLang(detectLang(this));
        }
        #root() {
          const sel = this.getAttribute('scope');
          if (sel) {
            const found = document.querySelector(sel);
            if (found) return found;
            console.warn(`mrc-schema: scope="${sel}" matched nothing — reading the document instead`);
          }
          return this.closest('mrc-shell') || document;
        }
        #config() {
          const attr = (name, fallback) => this.getAttribute(name) || fallback;
          return {
            types: attr('types', CONFIG.types).split(',').map((s) => s.trim()).filter(Boolean),
            author: attr('author', ''),
            authorId: attr('author-id', CONFIG.authorId),
            authorUrl: attr('author-url', ''),
            authorPath: CONFIG.authorPath,
            publisher: attr('publisher', ''),
            publisherId: attr('publisher-id', CONFIG.publisherId),
            publisherUrl: attr('publisher-url', CONFIG.publisherUrl),
            logo: attr('logo', CONFIG.logo),
            published: attr('published', ''),
            modified: attr('modified', ''),
            image: attr('image', CONFIG.image),
            homeLabel: attr('home-label', ''),
            blogLabel: attr('blog-label', ''),
            blogUrl: attr('blog-url', ''),
            blogPath: CONFIG.blogPath
          };
        }
        setLang(next) {
          const lang = next === 'fa' ? 'fa' : 'en';
          this.lang = lang;
          const root = this.#root();
          const cfg = this.#config();
          const canonical = document.querySelector('link[rel="canonical"]');
          const url = canonical ? canonical.href : location.href.split('#')[0];
          const theirs = this.getAttribute('force-article') === 'on'
            ? null
            : findArticleBlock(CONFIG.scriptId);
          let completed = [];
          if (theirs && this.getAttribute('complete-article') !== 'off') {
            completed = completeArticleBlock(theirs, cfg, lang, url);
          }
          const builders = {
            article: () => (theirs ? null : articleNode(root, lang, cfg, url)),
            faq: () => faqNode(root, lang),
            breadcrumb: () => breadcrumbNode(root, lang, cfg, url)
          };
          const graph = [];
          const written = [];
          cfg.types.forEach((type) => {
            const build = builders[type];
            if (!build) {
              console.warn(`mrc-schema: types="${type}" is not one of article, faq, breadcrumb — skipped`);
              return;
            }
            const node = build();
            if (node) { graph.push(node); written.push(type); }
          });
          const existing = document.getElementById(CONFIG.scriptId);
          if (!graph.length) {
            if (existing) existing.remove();
            if (!completed.length) {
              console.warn('mrc-schema: found nothing to describe on this page — no data written');
            }
            this.dispatchEvent(new CustomEvent('mrc-schema:written', {
              bubbles: true, detail: { types: [], completed, bytes: 0, lang }
            }));
            return;
          }
          const json = serialise({ '@context': 'https://schema.org', '@graph': graph });
          const el = existing || document.createElement('script');
          el.type = 'application/ld+json';
          el.id = CONFIG.scriptId;
          el.textContent = json;
          if (!existing) document.head.appendChild(el);
          this.dispatchEvent(new CustomEvent('mrc-schema:written', {
            bubbles: true,
            detail: { types: written, completed, bytes: json.length, lang }
          }));
        }
      }
      if (!customElements.get('mrc-schema')) customElements.define('mrc-schema', MrcSchema);
  }
})();
