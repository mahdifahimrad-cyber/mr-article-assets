/* TEMPLATE V11 — shared bilingual article behavior */
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

          if (!isPhone) return;

          const mobileCta = container.querySelector('.article-mobile-cta');
          const mobileClose = container.querySelector('.article-mobile-cta-close');
          const desktopPanel = container.querySelector('.article-floating-cta-wrapper');
          const yellowButtons = container.querySelectorAll(
              '.article-mobile-cta .article-floating-cta-primary, ' +
              '.article-floating-cta-wrapper .article-floating-cta-primary'
          );

          if (desktopPanel) {
              desktopPanel.style.setProperty('display', 'none', 'important');
          }

          if (mobileClose) {
              mobileClose.style.setProperty('display', 'none', 'important');
          }

          yellowButtons.forEach(function (button) {
              button.style.setProperty('display', 'none', 'important');
              button.style.setProperty('animation', 'none', 'important');
              button.style.setProperty('transform', 'none', 'important');
          });

          if (mobileCta) {
              mobileCta.style.setProperty('display', 'flex', 'important');
              mobileCta.style.setProperty('flex-direction', 'column', 'important');
              mobileCta.style.setProperty('flex-wrap', 'nowrap', 'important');
              mobileCta.style.setProperty('grid-template-columns', 'none', 'important');

              const orderedSelectors = [
                  '.article-floating-cta-book',
                  '.article-floating-cta-chat',
                  '.article-floating-cta-telegram',
                  '.article-floating-cta-website-chat',
                  '.article-floating-cta-call'
              ];

              orderedSelectors.forEach(function (selector, index) {
                  const button = mobileCta.querySelector(selector);
                  if (!button) return;
                  button.style.setProperty('display', 'flex', 'important');
                  button.style.setProperty('visibility', 'visible', 'important');
                  button.style.setProperty('opacity', '1', 'important');
                  button.style.setProperty('order', String(index + 1), 'important');
                  button.style.setProperty('width', '100%', 'important');
                  button.style.setProperty('min-width', '100%', 'important');
                  button.style.setProperty('grid-column', '1 / -1', 'important');
                  button.style.setProperty('float', 'none', 'important');
              });
          }
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
            if (options && options.keepFinalState) return;
            
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

        const desktopDrawer = container.classList.contains('article-device-nonphone')
            && window.matchMedia('(min-width:681px)').matches;
        const mobileDrawer = container.classList.contains('article-device-phone');
        if (desktopDrawer) {
            container.classList.add('cta-is-hidden');
            return;
        }
        if (mobileDrawer) {
            const holder = container.querySelector('.article-mobile-cta-holder');
            const visual = container.querySelector('.article-mobile-cta');
            [holder, visual].forEach(function (element) {
                if (!element) return;
                element.style.removeProperty('translate');
                element.style.removeProperty('scale');
                element.style.removeProperty('transform');
                element.style.removeProperty('opacity');
            });
            container.classList.add('cta-mobile-sliding');
            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () {
                    container.classList.add('cta-is-hidden');
                    window.setTimeout(function () {
                        container.classList.remove('cta-mobile-sliding');
                    }, 520);
                });
            });
            return;
        }

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
            const contentMorph = Promise.all([
                runImportantMorph(visual, [
                    { dx:0, dy:0, scale:1, opacity:1, offset:0 },
                    { dx:visualGeometry.dx * .72, dy:visualGeometry.dy * .72, scale:.46, opacity:.72, offset:.68 },
                    { dx:visualGeometry.dx, dy:visualGeometry.dy, scale:visualGeometry.scale, opacity:0, offset:1 }
                ], { duration:620, keepFinalState:true }),
                closeButton ? runImportantMorph(closeButton, [
                    { dx:0, dy:0, scale:1, opacity:1, offset:0 },
                    { dx:closeGeometry.dx * .72, dy:closeGeometry.dy * .72, scale:.46, opacity:.72, offset:.68 },
                    { dx:closeGeometry.dx, dy:closeGeometry.dy, scale:closeGeometry.scale, opacity:0, offset:1 }
                ], { duration:620, keepFinalState:true }) : Promise.resolve()
            ]);
            const edgeMorph = new Promise(function (resolve) {
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
                [visual, closeButton].forEach(function (element) {
                    if (!element) return;
                    element.style.removeProperty('transform');
                    element.style.removeProperty('opacity');
                    element.style.removeProperty('transform-origin');
                });
                container.classList.remove('cta-morph-running', 'cta-morph-edge-active');
            });
        });
    }

    function showUniversalCta(container) {
        if (!container || container.classList.contains('cta-morph-running')
            || !container.classList.contains('cta-is-hidden')) return;

        const desktopDrawer = container.classList.contains('article-device-nonphone')
            && window.matchMedia('(min-width:681px)').matches;
        const mobileDrawer = container.classList.contains('article-device-phone');
        if (desktopDrawer) {
            container.classList.remove('cta-is-hidden');
            return;
        }
        if (mobileDrawer) {
            const holder = container.querySelector('.article-mobile-cta-holder');
            const visual = container.querySelector('.article-mobile-cta');
            [holder, visual].forEach(function (element) {
                if (!element) return;
                element.style.removeProperty('translate');
                element.style.removeProperty('scale');
                element.style.removeProperty('transform');
                element.style.removeProperty('opacity');
            });
            container.classList.add('cta-mobile-sliding');
            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () {
                    container.classList.remove('cta-is-hidden');
                    window.setTimeout(function () {
                        container.classList.remove('cta-mobile-sliding');
                    }, 520);
                });
            });
            return;
        }

        const wrapper = container.querySelector('.article-floating-cta-wrapper');
        if (wrapper) wrapper.classList.remove('is-minimized');
        const edge = container.querySelector('.article-cta-edge-tabs');
        if (!edge) {
            container.classList.remove('cta-is-hidden');
            return;
        }
        const edgeRect = edge.getBoundingClientRect();
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
        nextPaint(function () {
            const group = getActiveCtaGroup(container);
            if (!group) {
                container.classList.remove('cta-morph-running', 'cta-morph-edge-active', 'cta-morph-opening');
                return;
            }
            const visual = getMorphVisual(group);
            const closeButton = getMorphCloseButton(group);
            const visualGeometry = getElementToEdgeGeometry(visual, edgeRect);
            const closeGeometry = closeButton ? getElementToEdgeGeometry(closeButton, edgeRect) : null;
            const contentMorph = Promise.all([
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
                container.classList.remove('cta-morph-running', 'cta-morph-edge-active', 'cta-morph-opening');
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
                const isPersian = container.getAttribute('lang') === 'fa' || container.getAttribute('dir') === 'rtl';
                button.setAttribute('aria-label', tocIsBelow
                    ? (isPersian ? 'رفتن به فهرست مطالب در پایین صفحه' : 'Go down to the table of contents')
                    : (isPersian ? 'رفتن به فهرست مطالب در بالای صفحه' : 'Go up to the table of contents'));
                button.setAttribute('title', tocIsBelow
                    ? (isPersian ? 'فهرست مطالب در پایین صفحه است' : 'Table of Contents below')
                    : (isPersian ? 'بازگشت به فهرست مطالب' : 'Back to Table of Contents'));
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

    function getPhoneSwipeContainer(target) {
        // Mobile swipe is intentionally page-wide: any horizontal gesture that
        // starts inside the article page controls the mobile CTA drawer.
        let container = getContainer(target);
        if (!container) {
            container = document.querySelector('.article-container.article-device-phone');
        }
        return container && container.classList.contains('article-device-phone') ? container : null;
    }

    document.addEventListener('touchstart', function (event) {
        const container = getPhoneSwipeContainer(event.target);
        if (!container || !event.touches || event.touches.length !== 1) return;

        const touch = event.touches[0];
        swipeState.set(container, {
            x: touch.clientX,
            y: touch.clientY,
            time: Date.now()
        });
    }, { passive: true, capture: true });

    document.addEventListener('touchend', function (event) {
        const container = getPhoneSwipeContainer(event.target);
        if (!container || !event.changedTouches || event.changedTouches.length !== 1) return;

        const start = swipeState.get(container);
        swipeState.delete(container);
        if (!start) return;

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - start.x;
        const deltaY = touch.clientY - start.y;
        const elapsed = Date.now() - start.time;

        if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY) || elapsed > 1200) return;

        const isRtl = container.getAttribute('dir') === 'rtl' || container.getAttribute('lang') === 'fa';
        const shouldOpen = isRtl ? deltaX < 0 : deltaX > 0;
        const shouldClose = isRtl ? deltaX > 0 : deltaX < 0;

        if (shouldOpen && container.classList.contains('cta-is-hidden')) {
            event.preventDefault();
            event.stopPropagation();
            showUniversalCta(container);
        } else if (shouldClose && !container.classList.contains('cta-is-hidden')) {
            event.preventDefault();
            event.stopPropagation();
            hideUniversalCta(container);
        }
    }, { passive: false, capture: true });

    document.addEventListener('touchcancel', function (event) {
        const container = getPhoneSwipeContainer(event.target);
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
            const desktopDrawer = container.classList.contains('article-device-nonphone')
                && window.matchMedia('(min-width:681px)').matches;
            const mobileDrawer = container.classList.contains('article-device-phone');
            container.classList.toggle('cta-is-hidden', desktopDrawer || mobileDrawer);
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

    window.addEventListener('scroll', function () {
        requestSmartNavUpdate();
        getContainers().forEach(function (container) {
            const desktopDrawer = container.classList.contains('article-device-nonphone')
                && window.matchMedia('(min-width:681px)').matches;
            const mobileDrawer = container.classList.contains('article-device-phone');
            if ((desktopDrawer || mobileDrawer) && !container.classList.contains('cta-is-hidden')) {
                hideUniversalCta(container);
            }
        });
    }, { passive: true });
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
    function applyPersianTableDirection(){
        const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
        const latinPattern = /[A-Za-z]/;
        document.querySelectorAll('.article-container[lang="fa"] .responsive-table th, .article-container[lang="fa"] .responsive-table td').forEach(function(cell){
            const text = (cell.textContent || '').replace(/\s+/g, ' ').trim();
            if (arabicPattern.test(text)) {
                cell.setAttribute('dir', 'rtl');
                cell.style.setProperty('text-align', 'right', 'important');
                cell.style.setProperty('unicode-bidi', 'plaintext', 'important');
            } else if (latinPattern.test(text)) {
                cell.setAttribute('dir', 'ltr');
                cell.style.setProperty('text-align', 'left', 'important');
                cell.style.setProperty('unicode-bidi', 'plaintext', 'important');
            } else {
                cell.setAttribute('dir', 'rtl');
                cell.style.setProperty('text-align', 'right', 'important');
                cell.style.setProperty('unicode-bidi', 'plaintext', 'important');
            }
        });
    }

    function updateFittingTables(){
        applyPersianTableDirection();
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
        var innerLeft = wrapperRect.left + wrapper.clientLeft;
        var innerRight = innerLeft + wrapper.clientWidth;
        var tolerance = 2;

        var hasOverflow = wrapper.scrollWidth > wrapper.clientWidth + tolerance;
        var hiddenOnLeft = Math.max(0, innerLeft - tableRect.left);
        var hiddenOnRight = Math.max(0, tableRect.right - innerRight);

        var hasMoreLeft = hasOverflow && hiddenOnLeft > tolerance;
        var hasMoreRight = hasOverflow && hiddenOnRight > tolerance;

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
            var fadeScrollFrame = 0;

            wrapper.addEventListener('scroll', function () {
                cancelAnimationFrame(fadeScrollFrame);
                fadeScrollFrame = requestAnimationFrame(function () {
                    updateTableFade(wrapper);
                });
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
    function createArrow(direction, arrowClass) {
        var arrow = document.createElement('span');
        arrow.className = arrowClass + ' article-table-scroll-side-arrow article-table-scroll-side-' + direction;
        arrow.setAttribute('aria-hidden', 'true');

        var glyph = document.createElement('span');
        glyph.className = 'article-table-scroll-arrow-single';
        glyph.textContent = '→';

        arrow.appendChild(glyph);
        return arrow;
    }

    function createHint(className, arrowClass, text) {
        var hint = document.createElement('div');
        hint.className = className;
        hint.setAttribute('aria-hidden', 'true');

        var leftArrow = createArrow('left', arrowClass);
        var rightArrow = createArrow('right', arrowClass);

        var label = document.createElement('span');
        label.className = 'article-table-scroll-hint-label';
        label.textContent = text;

        hint.appendChild(leftArrow);
        hint.appendChild(label);
        hint.appendChild(rightArrow);
        return hint;
    }

    function setHintState(hint, hasMoreLeft, hasMoreRight) {
        if (!hint) return;

        var visible = hasMoreLeft || hasMoreRight;
        hint.classList.toggle('article-table-scroll-hint-visible', visible);
        hint.classList.toggle('article-table-scroll-hint-both', hasMoreLeft && hasMoreRight);
        hint.classList.toggle('article-table-scroll-hint-left-only', hasMoreLeft && !hasMoreRight);
        hint.classList.toggle('article-table-scroll-hint-right-only', hasMoreRight && !hasMoreLeft);

        var leftArrow = hint.querySelector('.article-table-scroll-side-left');
        var rightArrow = hint.querySelector('.article-table-scroll-side-right');

        if (leftArrow) {
            leftArrow.classList.toggle('article-table-scroll-arrow-visible', hasMoreLeft);
            leftArrow.classList.toggle('article-table-scroll-direction-left', hasMoreLeft);
        }

        if (rightArrow) {
            rightArrow.classList.toggle('article-table-scroll-arrow-visible', hasMoreRight);
            rightArrow.classList.toggle('article-table-scroll-direction-right', hasMoreRight);
        }
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
            var wrapperRect = wrapper.getBoundingClientRect();
            var tableRect = table.getBoundingClientRect();
            var innerLeft = wrapperRect.left + wrapper.clientLeft;
            var innerRight = innerLeft + wrapper.clientWidth;
            var tolerance = 2;

            var hasOverflow = wrapper.scrollWidth > wrapper.clientWidth + tolerance;
            var hasMoreLeft = hasOverflow && Math.max(0, innerLeft - tableRect.left) > tolerance;
            var hasMoreRight = hasOverflow && Math.max(0, tableRect.right - innerRight) > tolerance;

            setHintState(top, hasMoreLeft, hasMoreRight);
            setHintState(bottom, hasMoreLeft, hasMoreRight);
        }

        if (wrapper.dataset.articleTableHintReady !== 'true') {
            wrapper.dataset.articleTableHintReady = 'true';
            var hintScrollFrame = 0;

            wrapper.addEventListener('scroll', function () {
                cancelAnimationFrame(hintScrollFrame);
                hintScrollFrame = requestAnimationFrame(update);
            }, { passive: true });
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
        var hintObserver = new ResizeObserver(scheduleUpdate);
        document.querySelectorAll('.article-container .table-wrapper').forEach(function (wrapper) {
            hintObserver.observe(wrapper);
        });
    }
})();



/* v6 — same-site article links stay in the current tab. */
(function () {
    function normalizeInternalArticleLinks() {
        document.querySelectorAll('.article-container a.article-internal-link, .article-container a.article-related-link').forEach(function (link) {
            try {
                var url = new URL(link.getAttribute('href'), window.location.href);
                if (url.hostname === window.location.hostname || /(^|\.)mehdirad\.ca$/i.test(url.hostname)) {
                    link.removeAttribute('target');
                    link.removeAttribute('rel');
                }
            } catch (error) {
                /* Ignore malformed or non-HTTP links. */
            }
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', normalizeInternalArticleLinks, { once: true });
    } else {
        normalizeInternalArticleLinks();
    }
})();
