(function () {
        var container = document.currentScript && document.currentScript.parentElement;
        if (!container) return;

        var uaMobile = Boolean(navigator.userAgentData && navigator.userAgentData.mobile);
        var legacyPhone = /Android.+Mobile|iPhone|iPod|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
        var narrowPhoneViewport = window.matchMedia('(max-width: 680px)').matches
            || Math.min(window.innerWidth || 9999, document.documentElement.clientWidth || 9999) <= 680;
        var coarseTouchPhone = narrowPhoneViewport
            && window.matchMedia('(pointer: coarse)').matches
            && (navigator.maxTouchPoints || 0) > 0;
        var isPhone = uaMobile || legacyPhone || coarseTouchPhone;

        container.classList.toggle('article-device-phone', isPhone);
        container.classList.toggle('article-device-nonphone', !isPhone);
        container.classList.remove('article-device-pending');
    })();

(function () {
    const uaMobile = Boolean(navigator.userAgentData && navigator.userAgentData.mobile);
    const legacyPhone = /Android.+Mobile|iPhone|iPod|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent || '');

    function detectPhone() {
        const narrowPhoneViewport = window.matchMedia('(max-width: 680px)').matches
            || Math.min(window.innerWidth || 9999, document.documentElement.clientWidth || 9999) <= 680;
        const coarseTouchPhone = narrowPhoneViewport
            && window.matchMedia('(pointer: coarse)').matches
            && (navigator.maxTouchPoints || 0) > 0;
        return uaMobile || legacyPhone || coarseTouchPhone;
    }

    function getContainers() {
        return Array.from(document.querySelectorAll('.article-container'));
    }

    function applyDeviceMode() {
      const isPhone = detectPhone();

      getContainers().forEach(function (container) {
          container.classList.toggle('article-device-phone', isPhone);
          container.classList.toggle('article-device-nonphone', !isPhone);
          container.classList.remove('article-device-pending');
      });
    }

    function getContainer(element) {
        return element && element.closest ? element.closest('.article-container') : null;
    }

    function getActiveCtaGroup(container) {
        if (!container) return null;
        const groups = [
            container.querySelector('.article-floating-cta-wrapper'),
            container.querySelector('.article-mobile-cta-holder')
        ];
        return groups.find(function (group) {
            if (!group) return false;
            const style = window.getComputedStyle(group);
            const rect = group.getBoundingClientRect();
            return style.display !== 'none' && style.visibility !== 'hidden'
                && rect.width > 20 && rect.height > 20;
        }) || null;
    }

    function getMorphVisual(group) {
        if (!group) return null;
        return group.querySelector('.article-floating-cta, .article-mobile-cta') || group;
    }

    function getMorphCloseButton(group) {
        if (!group) return null;
        return group.querySelector('.article-floating-cta-close, .article-mobile-cta-close');
    }

    function getMorphGeometryFromRects(groupRect, edgeRect) {

        return {
            dx: (edgeRect.left + edgeRect.width / 2) - (groupRect.left + groupRect.width / 2),
            dy: (edgeRect.top + edgeRect.height / 2) - (groupRect.top + groupRect.height / 2),
            scale: Math.max(0.06, Math.min(0.18,
                Math.min(edgeRect.width / groupRect.width, edgeRect.height / groupRect.height)))
        };
    }

    function nextPaint(callback) {
        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(callback);
        });
    }

    function runCtaMorph(group, frames, options) {
        if (!group || typeof group.animate !== 'function') return Promise.resolve();
        const animation = group.animate(frames, options);
        return animation.finished.catch(function () {}).then(function () {
            animation.cancel();
        });
    }

    function runImportantMorph(element, keyframes, options) {
        if (!element) return Promise.resolve();
        const duration = Math.max(1, Number(options && options.duration) || 620);
        const frames = keyframes.map(function (frame, index) {
            return {
                offset: typeof frame.offset === 'number' ? frame.offset : index / Math.max(1, keyframes.length - 1),
                dx: Number(frame.dx) || 0,
                dy: Number(frame.dy) || 0,
                scale: typeof frame.scale === 'number' ? frame.scale : 1,
                opacity: typeof frame.opacity === 'number' ? frame.opacity : 1
            };
        }).sort(function (a, b) { return a.offset - b.offset; });

        function ease(t) {
            return options && options.opening
                ? 1 - Math.pow(1 - t, 3)
                : 1 - Math.pow(1 - t, 3);
        }

        return new Promise(function (resolve) {
            const started = performance.now();
            function tick(now) {
                const raw = Math.min(1, (now - started) / duration);
                const t = ease(raw);
                let a = frames[0], b = frames[frames.length - 1];
                for (let i = 0; i < frames.length - 1; i++) {
                    if (t >= frames[i].offset && t <= frames[i + 1].offset) {
                        a = frames[i]; b = frames[i + 1]; break;
                    }
                }
                const span = Math.max(.0001, b.offset - a.offset);
                const local = Math.max(0, Math.min(1, (t - a.offset) / span));
                const dx = a.dx + (b.dx - a.dx) * local;
                const dy = a.dy + (b.dy - a.dy) * local;
                const scale = a.scale + (b.scale - a.scale) * local;
                const opacity = a.opacity + (b.opacity - a.opacity) * local;
                element.style.setProperty('transform', 'translate3d(' + dx + 'px,' + dy + 'px,0) scale(' + scale + ')', 'important');
                element.style.setProperty('opacity', String(opacity), 'important');
                element.style.setProperty('transform-origin', 'center center', 'important');
                if (raw < 1) requestAnimationFrame(tick);
                else resolve();
            }
            requestAnimationFrame(tick);
        }).finally(function () {
            element.style.removeProperty('transform');
            element.style.removeProperty('opacity');
            element.style.removeProperty('transform-origin');
        });
    }

    function getElementToEdgeGeometry(element, edgeRect) {
        const rect = element.getBoundingClientRect();
        return {
            dx: (edgeRect.left + edgeRect.width / 2) - (rect.left + rect.width / 2),
            dy: (edgeRect.top + edgeRect.height / 2) - (rect.top + rect.height / 2),
            scale: Math.max(0.06, Math.min(0.18,
                Math.min(edgeRect.width / Math.max(1, rect.width), edgeRect.height / Math.max(1, rect.height))))
        };
    }

    function getPackedDesktopPanelGeometry(group, visual, edgeRect) {
        const groupRect = group.getBoundingClientRect();
        const panelRect = visual.getBoundingClientRect();
        const groupCenterX = groupRect.left + groupRect.width / 2;
        const groupCenterY = groupRect.top + groupRect.height / 2;
        const panelCenterX = panelRect.left + panelRect.width / 2;
        const panelCenterY = panelRect.top + panelRect.height / 2;
        const targetCenterX = edgeRect.left + edgeRect.width / 2;
        const targetCenterY = edgeRect.top + edgeRect.height / 2;

        return {
            deltaX: targetCenterX - panelCenterX,
            deltaY: targetCenterY - panelCenterY,
            panelOffsetX: panelCenterX - groupCenterX,
            panelOffsetY: panelCenterY - groupCenterY,

            baseTranslateY: -groupRect.height / 2,
            scale: Math.max(0.06, Math.min(0.18,
                Math.min(edgeRect.width / Math.max(1, panelRect.width), edgeRect.height / Math.max(1, panelRect.height))))
        };
    }

    function getPackedDesktopFrame(geometry, progress, scale, opacity, offset) {
        return {
            dx: geometry.deltaX * progress + geometry.panelOffsetX * (1 - scale),
            dy: geometry.deltaY * progress
                + geometry.panelOffsetY * (1 - scale)
                + geometry.baseTranslateY * (1 - scale),
            scale: scale,
            opacity: opacity,
            offset: offset
        };
    }

    function runPackedDesktopMorph(group, keyframes, options) {
        if (!group) return Promise.resolve();
        const duration = Math.max(1, Number(options && options.duration) || 620);
        const frames = keyframes.map(function (frame, index) {
            return {
                offset: typeof frame.offset === 'number' ? frame.offset : index / Math.max(1, keyframes.length - 1),
                dx: Number(frame.dx) || 0,
                dy: Number(frame.dy) || 0,
                scale: typeof frame.scale === 'number' ? frame.scale : 1,
                opacity: typeof frame.opacity === 'number' ? frame.opacity : 1
            };
        }).sort(function (a, b) { return a.offset - b.offset; });

        function ease(t) { return 1 - Math.pow(1 - t, 3); }

        return new Promise(function (resolve) {
            const started = performance.now();
            function tick(now) {
                const raw = Math.min(1, (now - started) / duration);
                const t = ease(raw);
                let a = frames[0], b = frames[frames.length - 1];
                for (let i = 0; i < frames.length - 1; i++) {
                    if (t >= frames[i].offset && t <= frames[i + 1].offset) {
                        a = frames[i]; b = frames[i + 1]; break;
                    }
                }
                const span = Math.max(.0001, b.offset - a.offset);
                const local = Math.max(0, Math.min(1, (t - a.offset) / span));
                const dx = a.dx + (b.dx - a.dx) * local;
                const dy = a.dy + (b.dy - a.dy) * local;
                const scale = a.scale + (b.scale - a.scale) * local;
                const opacity = a.opacity + (b.opacity - a.opacity) * local;
                group.style.setProperty('translate', dx + 'px ' + dy + 'px', 'important');
                group.style.setProperty('scale', String(scale), 'important');
                group.style.setProperty('opacity', String(opacity), 'important');
                group.style.setProperty('transform-origin', 'center center', 'important');
                if (raw < 1) requestAnimationFrame(tick);
                else resolve();
            }
            requestAnimationFrame(tick);
        }).finally(function () {
            group.style.removeProperty('translate');
            group.style.removeProperty('scale');
            group.style.removeProperty('opacity');
            group.style.removeProperty('transform-origin');
        });
    }

    function hideUniversalCta(container) {
        if (!container || container.classList.contains('cta-morph-running')
            || container.classList.contains('cta-is-hidden')) return;

        const wrapper = container.querySelector('.article-floating-cta-wrapper');
        if (wrapper) wrapper.classList.remove('is-minimized');

        const group = getActiveCtaGroup(container);
        const edge = container.querySelector('.article-cta-edge-tabs');
        if (!group || !edge) {
            container.classList.add('cta-is-hidden');
            return;
        }

        container.classList.add('cta-morph-running');

        nextPaint(function () {
            if (!container.classList.contains('cta-morph-running')) return;

            const visual = getMorphVisual(group);
            const closeButton = getMorphCloseButton(group);
            const edgeRect = edge.getBoundingClientRect();
            const visualGeometry = getElementToEdgeGeometry(visual, edgeRect);
            const closeGeometry = closeButton ? getElementToEdgeGeometry(closeButton, edgeRect) : null;

            const isDesktopPack = container.classList.contains('article-device-nonphone')
                && group.classList.contains('article-floating-cta-wrapper');
            const groupGeometry = isDesktopPack ? getPackedDesktopPanelGeometry(group, visual, edgeRect) : null;
            const contentMorph = isDesktopPack
                ? runPackedDesktopMorph(group, [
                    getPackedDesktopFrame(groupGeometry, 0, 1, 1, 0),
                    getPackedDesktopFrame(groupGeometry, .72, .46, .72, .68),
                    getPackedDesktopFrame(groupGeometry, 1, groupGeometry.scale, 0, 1)
                ], { duration:620 })
                : Promise.all([
                    runImportantMorph(visual, [
                        { dx:0, dy:0, scale:1, opacity:1, offset:0 },
                        { dx:visualGeometry.dx * .72, dy:visualGeometry.dy * .72, scale:.46, opacity:.72, offset:.68 },
                        { dx:visualGeometry.dx, dy:visualGeometry.dy, scale:visualGeometry.scale, opacity:0, offset:1 }
                    ], { duration:620 }),
                    closeButton ? runImportantMorph(closeButton, [
                        { dx:0, dy:0, scale:1, opacity:1, offset:0 },
                        { dx:closeGeometry.dx * .72, dy:closeGeometry.dy * .72, scale:.46, opacity:.72, offset:.68 },
                        { dx:closeGeometry.dx, dy:closeGeometry.dy, scale:closeGeometry.scale, opacity:0, offset:1 }
                    ], { duration:620 }) : Promise.resolve()
                ]);

            const edgeMorph = isDesktopPack
                ? (container.classList.add('cta-morph-edge-active'), runCtaMorph(edge, [
                    { opacity:0, scale:'.86', offset:0 },
                    { opacity:.28, scale:'.94', offset:.46 },
                    { opacity:1, scale:'1', offset:1 }
                ], { duration:620, easing:'ease-out', fill:'both' }))
                : new Promise(function (resolve) {
                    window.setTimeout(function () {
                        container.classList.add('cta-morph-edge-active');
                        runCtaMorph(edge, [
                            { opacity:0, scale:'.86', offset:0 },
                            { opacity:.28, scale:'.94', offset:.46 },
                            { opacity:1, scale:'1', offset:1 }
                        ], { duration:360, easing:'ease-out', fill:'both' }).then(resolve);
                    }, 520);
                });
Promise.all([contentMorph, edgeMorph]).finally(function () {
                container.classList.add('cta-is-hidden');
                container.classList.remove(
                    'cta-morph-running',
                    'cta-morph-edge-active'
                );
            });
        });
    }

    function showUniversalCta(container) {
        if (!container || container.classList.contains('cta-morph-running')
            || !container.classList.contains('cta-is-hidden')) return;

        const wrapper = container.querySelector('.article-floating-cta-wrapper');
        if (wrapper) wrapper.classList.remove('is-minimized');

        const edge = container.querySelector('.article-cta-edge-tabs');
        if (!edge) {
            container.classList.remove('cta-is-hidden');
            return;
        }

        const edgeRect = edge.getBoundingClientRect();
        const desktopOpening = container.classList.contains('article-device-nonphone')
            && wrapper && window.matchMedia('(min-width:1101px)').matches;
        let desktopOpeningGeometry = null;

        if (desktopOpening) {
            container.classList.add('cta-morph-running', 'cta-morph-edge-active',
                'cta-morph-opening', 'cta-desktop-morph-prepared');
            const visual = getMorphVisual(wrapper);
            desktopOpeningGeometry = getPackedDesktopPanelGeometry(wrapper, visual, edgeRect);
            const startFrame = getPackedDesktopFrame(desktopOpeningGeometry, 1, desktopOpeningGeometry.scale, 0, 0);
            wrapper.style.setProperty('translate', startFrame.dx + 'px ' + startFrame.dy + 'px', 'important');
            wrapper.style.setProperty('scale', String(startFrame.scale), 'important');
            wrapper.style.setProperty('opacity', '0', 'important');
            wrapper.style.setProperty('transform-origin', 'center center', 'important');
            container.classList.remove('cta-is-hidden');
        } else {
            container.classList.add('cta-morph-running', 'cta-morph-edge-active', 'cta-morph-opening');

            const mobileGroup = container.querySelector('.article-mobile-cta-holder');
            const mobileVisual = getMorphVisual(mobileGroup);
            const mobileCloseButton = getMorphCloseButton(mobileGroup);

            if (mobileVisual) {
                mobileVisual.style.setProperty('opacity', '0', 'important');
                mobileVisual.style.setProperty('transform-origin', 'center center', 'important');
            }
            if (mobileCloseButton) {
                mobileCloseButton.style.setProperty('opacity', '0', 'important');
                mobileCloseButton.style.setProperty('transform-origin', 'center center', 'important');
            }

            container.classList.remove('cta-is-hidden');
        }

        nextPaint(function () {
            const group = getActiveCtaGroup(container);
            if (!group) {
                container.classList.remove('cta-morph-running', 'cta-morph-edge-active', 'cta-morph-opening', 'cta-desktop-morph-prepared');
                return;
            }

            const visual = getMorphVisual(group);
            const closeButton = getMorphCloseButton(group);

            const visualGeometry = getElementToEdgeGeometry(visual, edgeRect);
            const closeGeometry = closeButton ? getElementToEdgeGeometry(closeButton, edgeRect) : null;

            const isDesktopPack = container.classList.contains('article-device-nonphone')
                && group.classList.contains('article-floating-cta-wrapper');
            const groupGeometry = isDesktopPack
                ? (desktopOpeningGeometry || getPackedDesktopPanelGeometry(group, visual, edgeRect))
                : null;
            const contentMorph = isDesktopPack
                ? runPackedDesktopMorph(group, [

                    getPackedDesktopFrame(groupGeometry, 1, groupGeometry.scale, 0, 0),
                    getPackedDesktopFrame(groupGeometry, .72, .46, .72, .32),
                    getPackedDesktopFrame(groupGeometry, 0, 1, 1, 1)
                ], { duration:620, opening:true })
                : Promise.all([
                    runImportantMorph(visual, [
                        { dx:visualGeometry.dx, dy:visualGeometry.dy, scale:visualGeometry.scale, opacity:0, offset:0 },
                        { dx:visualGeometry.dx, dy:visualGeometry.dy, scale:visualGeometry.scale, opacity:0, offset:.20 },
                        { dx:visualGeometry.dx * .68, dy:visualGeometry.dy * .68, scale:.42, opacity:.78, offset:.47 },
                        { dx:0, dy:0, scale:1.035, opacity:1, offset:.87 },
                        { dx:0, dy:0, scale:1, opacity:1, offset:1 }
                    ], { duration:620, opening:true }),
                    closeButton ? runImportantMorph(closeButton, [
                        { dx:closeGeometry.dx, dy:closeGeometry.dy, scale:closeGeometry.scale, opacity:0, offset:0 },
                        { dx:closeGeometry.dx, dy:closeGeometry.dy, scale:closeGeometry.scale, opacity:0, offset:.20 },
                        { dx:closeGeometry.dx * .68, dy:closeGeometry.dy * .68, scale:.42, opacity:.78, offset:.47 },
                        { dx:0, dy:0, scale:1.035, opacity:1, offset:.87 },
                        { dx:0, dy:0, scale:1, opacity:1, offset:1 }
                    ], { duration:620, opening:true }) : Promise.resolve()
                ]);

            Promise.all([
                contentMorph,
                runCtaMorph(edge, [

                    { opacity:1, scale:'1', offset:0 },
                    { opacity:.28, scale:'.94', offset:.54 },
                    { opacity:0, scale:'.86', offset:1 }
                ], { duration:620, easing:'ease-out', fill:'both' })
            ]).finally(function () {
                container.classList.remove('cta-morph-running', 'cta-morph-edge-active', 'cta-morph-opening', 'cta-desktop-morph-prepared');
            });
        });
    }

    function openWebsiteChat(button) {
        const product = button && button.getAttribute('data-product') || 'Sample Product';
        window.dispatchEvent(new CustomEvent('mehdirad:open-chat', {
            detail: { product: product, intent: 'start-request', source: window.location.href }
        }));
        try {
            if (window.$zoho && window.$zoho.salesiq && window.$zoho.salesiq.floatwindow) {
                window.$zoho.salesiq.floatwindow.visible('show');
            }
        } catch (error) {}
    }

    function findToc(container) {
        return container && container.querySelector('#life-need-ca-table-of-contents, [id$="table-of-contents"]');
    }

    function updateSmartNav() {
        getContainers().forEach(function (container) {
            const toc = findToc(container);
            if (!toc) return;
            const activationOffset = Math.max(80, Math.min(160, window.innerHeight * 0.22));
            const tocIsBelow = toc.getBoundingClientRect().top > activationOffset;

            container.querySelectorAll('.article-smart-nav').forEach(function (nav) {
                nav.classList.remove('is-frozen');
                nav.style.top = '50%';
            });

            container.querySelectorAll('.article-smart-nav-btn').forEach(function (button) {
                const arrow = button.querySelector('.article-smart-nav-arrow');
                if (arrow) arrow.textContent = tocIsBelow ? '↓' : '↑';
                button.setAttribute('aria-label', tocIsBelow
                    ? 'Go down to the table of contents'
                    : 'Go up to the table of contents');
                button.setAttribute('title', tocIsBelow
                    ? 'Table of Contents below'
                    : 'Back to Table of Contents');
            });
        });
    }

    let smartNavFrame = 0;
    function requestSmartNavUpdate() {
        if (smartNavFrame) return;
        smartNavFrame = window.requestAnimationFrame(function () {
            smartNavFrame = 0;
            updateSmartNav();
        });
    }

    const swipeState = new WeakMap();

    document.addEventListener('touchstart', function (event) {
        const holder = event.target.closest('.article-mobile-cta-holder');
        const container = getContainer(holder);
        if (!holder || !container || !container.classList.contains('article-device-phone')) return;
        if (!event.touches || event.touches.length !== 1) return;

        const touch = event.touches[0];
        swipeState.set(container, {
            x: touch.clientX,
            y: touch.clientY,
            time: Date.now()
        });
    }, { passive: true, capture: true });

    document.addEventListener('touchend', function (event) {
        const holder = event.target.closest('.article-mobile-cta-holder');
        const container = getContainer(holder);
        if (!holder || !container || !event.changedTouches || event.changedTouches.length !== 1) return;

        const start = swipeState.get(container);
        swipeState.delete(container);
        if (!start) return;

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - start.x;
        const deltaY = touch.clientY - start.y;
        const elapsed = Date.now() - start.time;

        if (Math.abs(deltaX) >= 45 && Math.abs(deltaX) > Math.abs(deltaY) && elapsed <= 1200) {
            event.preventDefault();
            event.stopPropagation();
            hideUniversalCta(container);
        }
    }, { passive: false, capture: true });

    document.addEventListener('touchcancel', function (event) {
        const holder = event.target.closest('.article-mobile-cta-holder');
        const container = getContainer(holder);
        if (container) swipeState.delete(container);
    }, { passive: true, capture: true });

    document.addEventListener('click', function (event) {
        const closeButton = event.target.closest('.article-floating-cta-close, .article-mobile-cta-close');
        if (closeButton) {
            event.preventDefault();
            event.stopPropagation();
            hideUniversalCta(getContainer(closeButton));
            return;
        }

        const openButton = event.target.closest('.article-floating-cta-compact-open, .article-cta-edge-tabs');
        if (openButton) {
            event.preventDefault();
            event.stopPropagation();
            showUniversalCta(getContainer(openButton));
            return;
        }

        const navButton = event.target.closest('.article-smart-nav-btn');
        if (navButton) {
            const container = getContainer(navButton);
            const toc = findToc(container);
            if (!toc) return;
            event.preventDefault();
            const targetTop = toc.getBoundingClientRect().top
                + (window.pageYOffset || document.documentElement.scrollTop || 0) - 24;
            window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
            return;
        }

        const chatButton = event.target.closest('.article-container .js-open-website-chat');
        if (chatButton) openWebsiteChat(chatButton);
    }, true);

    function initialize() {
        applyDeviceMode();
        getContainers().forEach(function (container) {
            container.classList.remove('cta-is-hidden');
            const wrapper = container.querySelector('.article-floating-cta-wrapper');
            if (wrapper) wrapper.classList.remove('is-minimized');
            container.classList.add('cta-desktop-ready');
        });
        try {
            sessionStorage.removeItem('mehdirad-cta-hidden');
            sessionStorage.removeItem('mehdirad-floating-cta-minimized');
        } catch (error) {}
        requestSmartNavUpdate();
    }

    window.addEventListener('scroll', requestSmartNavUpdate, { passive: true });
    document.addEventListener('scroll', requestSmartNavUpdate, true);
    window.addEventListener('resize', function () {
        applyDeviceMode();
        requestSmartNavUpdate();
    }, { passive: true });
    window.addEventListener('orientationchange', function () {
        applyDeviceMode();
        requestSmartNavUpdate();
    }, { passive: true });

    function bootArticleSystem() {
        initialize();
        window.setTimeout(initialize, 250);
        window.setTimeout(initialize, 1000);
    }

  applyDeviceMode();

  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bootArticleSystem, { once: true });
  } else {
      bootArticleSystem();
  }

  window.addEventListener('pageshow', function () {
      applyDeviceMode();
      window.setTimeout(applyDeviceMode, 100);
  }, { passive: true });

  window.addEventListener('load', function () {
      applyDeviceMode();
  }, { once: true, passive: true });

})();

(function(){
    function updateFittingTables(){
        document.querySelectorAll('.article-container .table-wrapper').forEach(function(wrapper){
            const table = wrapper.querySelector('.responsive-table');
            if (!table) return;
            wrapper.classList.remove('table-fits-without-scroll');
            const available = wrapper.clientWidth;
            const required = table.scrollWidth;
            if (available > 0 && required <= available + 1) {
                wrapper.classList.add('table-fits-without-scroll');
            }
        });
    }
    let frame = 0;
    function schedule(){
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(updateFittingTables);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, {once:true});
    else schedule();
    window.addEventListener('load', schedule, {once:true});
    window.addEventListener('resize', schedule, {passive:true});
    if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(schedule);
        document.querySelectorAll('.article-container .table-wrapper').forEach(function(wrapper){ observer.observe(wrapper); });
    }
})();
/* Table horizontal-scroll edge fade — additive only */
(function () {
    function updateTableFade(wrapper) {
        var table = wrapper.querySelector('.responsive-table');
        if (!table) return;

        var wrapperRect = wrapper.getBoundingClientRect();
        var tableRect = table.getBoundingClientRect();
        var hasOverflow = table.scrollWidth > wrapper.clientWidth + 1;
        var hasMoreLeft = hasOverflow && tableRect.left < wrapperRect.left - 1;
        var hasMoreRight = hasOverflow && tableRect.right > wrapperRect.right + 1;

        wrapper.classList.toggle('article-table-fade-active', hasOverflow);
        wrapper.classList.toggle('article-table-fade-left', hasMoreLeft);
        wrapper.classList.toggle('article-table-fade-right', hasMoreRight);
    }

    function initializeTableFades() {
        document.querySelectorAll('.article-container .table-wrapper').forEach(function (wrapper) {
            if (wrapper.dataset.articleTableFadeReady === 'true') {
                updateTableFade(wrapper);
                return;
            }

            wrapper.dataset.articleTableFadeReady = 'true';
            wrapper.addEventListener('scroll', function () {
                updateTableFade(wrapper);
            }, { passive: true });
            updateTableFade(wrapper);
        });
    }

    var fadeFrame = 0;
    function scheduleTableFadeUpdate() {
        cancelAnimationFrame(fadeFrame);
        fadeFrame = requestAnimationFrame(initializeTableFades);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scheduleTableFadeUpdate, { once: true });
    } else {
        scheduleTableFadeUpdate();
    }

    window.addEventListener('load', scheduleTableFadeUpdate, { once: true });
    window.addEventListener('resize', scheduleTableFadeUpdate, { passive: true });

    if ('ResizeObserver' in window) {
        var tableFadeObserver = new ResizeObserver(scheduleTableFadeUpdate);
        document.querySelectorAll('.article-container .table-wrapper').forEach(function (wrapper) {
            tableFadeObserver.observe(wrapper);
        });
    }
})();

/* Table horizontal-scroll hints above and below the table — additive only */
(function () {
    function createHint(className, arrowClass, text) {
        var hint = document.createElement('div');
        hint.className = className;
        hint.setAttribute('aria-hidden', 'true');

        var label = document.createElement('span');
        label.className = 'article-table-scroll-hint-label';
        label.textContent = text;

        var arrow = document.createElement('span');
        arrow.className = arrowClass + ' article-table-scroll-direction-right';

        var glyph = document.createElement('span');
        glyph.className = 'article-table-scroll-arrow-single';
        glyph.textContent = '→';

        arrow.appendChild(glyph);
        hint.appendChild(label);
        hint.appendChild(arrow);
        return hint;
    }

    function getDirection(wrapper, table, hasMoreLeft, hasMoreRight) {
        var rectLeft = table.getBoundingClientRect().left;
        var previousLeft = Number(wrapper.dataset.articleTablePreviousLeft);
        var direction = wrapper.dataset.articleTableHintDirection;

        if (Number.isFinite(previousLeft)) {
            if (rectLeft < previousLeft - 0.5) direction = 'right';
            if (rectLeft > previousLeft + 0.5) direction = 'left';
        }

        if (!hasMoreLeft && hasMoreRight) direction = 'right';
        if (hasMoreLeft && !hasMoreRight) direction = 'left';
        if (!direction) direction = hasMoreRight ? 'right' : 'left';

        wrapper.dataset.articleTablePreviousLeft = String(rectLeft);
        wrapper.dataset.articleTableHintDirection = direction;
        return direction;
    }

    function setHintState(hint, visible, direction) {
        if (!hint) return;
        var pointsLeft = direction === 'left';
        hint.classList.toggle('article-table-scroll-hint-visible', visible);
        hint.classList.toggle('article-table-scroll-hint-left', pointsLeft);

        var arrow = hint.querySelector('.article-table-scroll-hint-arrow, .article-table-scroll-hint-bottom-arrow');
        if (!arrow) return;

        arrow.classList.toggle('article-table-scroll-direction-left', pointsLeft);
        arrow.classList.toggle('article-table-scroll-direction-right', !pointsLeft);

        var glyph = arrow.querySelector('.article-table-scroll-arrow-single');
        if (glyph) glyph.textContent = pointsLeft ? '←' : '→';
    }

    function prepareWrapper(wrapper) {
        var table = wrapper.querySelector('.responsive-table');
        if (!table) return;

        var container = wrapper.closest('.article-container');
        var isPersian = Boolean(container && (container.getAttribute('dir') === 'rtl' || container.getAttribute('lang') === 'fa'));
        var labelText = isPersian ? 'برای مشاهده ادامه جدول اسکرول کنید' : 'Scroll to see more';

        var top = wrapper.previousElementSibling;
        if (!top || !top.classList.contains('article-table-scroll-hint')) {
            top = createHint('article-table-scroll-hint', 'article-table-scroll-hint-arrow', labelText);
            wrapper.parentNode.insertBefore(top, wrapper);
        }

        var bottom = wrapper.nextElementSibling;
        if (!bottom || !bottom.classList.contains('article-table-scroll-hint-bottom')) {
            bottom = createHint('article-table-scroll-hint-bottom', 'article-table-scroll-hint-bottom-arrow', labelText);
            wrapper.parentNode.insertBefore(bottom, wrapper.nextSibling);
        }

        function update() {
            var hasOverflow = table.scrollWidth > wrapper.clientWidth + 1;
            var wrapperRect = wrapper.getBoundingClientRect();
            var tableRect = table.getBoundingClientRect();
            var hasMoreLeft = hasOverflow && tableRect.left < wrapperRect.left - 1;
            var hasMoreRight = hasOverflow && tableRect.right > wrapperRect.right + 1;
            var direction = getDirection(wrapper, table, hasMoreLeft, hasMoreRight);

            setHintState(top, hasOverflow, direction);
            setHintState(bottom, hasOverflow, direction);
        }

        if (wrapper.dataset.articleTableHintReady !== 'true') {
            wrapper.dataset.articleTableHintReady = 'true';
            wrapper.addEventListener('scroll', update, { passive: true });
        }
        update();
    }

    function initializeHints() {
        document.querySelectorAll('.article-container .table-wrapper').forEach(prepareWrapper);
    }

    var frame = 0;
    function scheduleUpdate() {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(initializeHints);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scheduleUpdate, { once: true });
    } else {
        scheduleUpdate();
    }

    window.addEventListener('load', scheduleUpdate, { once: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    if ('ResizeObserver' in window) {
        var resizeObserver = new ResizeObserver(scheduleUpdate);
        document.querySelectorAll('.article-container .table-wrapper').forEach(function (wrapper) {
            resizeObserver.observe(wrapper);
        });
    }
})();

