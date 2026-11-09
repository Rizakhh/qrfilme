(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var menuButton = document.querySelector('.menu-toggle');
  var navigation = document.querySelector('#site-nav');

  function closeMenu() {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    navigation.classList.remove('is-open');
  }

  function openMenu() {
    if (!menuButton || !navigation) return;
    navigation.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Fechar menu');
  }

  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      var isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    navigation.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  var fontSettings = document.querySelector('.font-settings');
  var fontSettingsButton = document.querySelector('.font-settings-toggle');
  var fontSettingsPanel = document.querySelector('#font-settings-panel');
  var fontChoice = document.querySelector('[data-font-choice]');
  var fontClose = document.querySelector('[data-font-close]');
  var fontReset = document.querySelector('[data-font-reset]');
  var fontStorageKey = 'qrfilme-display-font';
  var defaultFont = 'impact';
  var fontOptions = {
    'impact': 'Impact, "Arial Black", Arial, sans-serif',
    'arial-black': '"Arial Black", Arial, sans-serif',
    'franklin': '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
    'century': '"Century Gothic", Futura, sans-serif',
    'trebuchet': '"Trebuchet MS", Arial, sans-serif',
    'verdana': 'Verdana, Geneva, sans-serif',
    'tahoma': 'Tahoma, Verdana, sans-serif',
    'segoe': '"Segoe UI", Arial, sans-serif',
    'gill': '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
    'futura': 'Futura, "Century Gothic", sans-serif',
    'avenir': '"Avenir Next", Avenir, "Segoe UI", sans-serif',
    'rockwell': 'Rockwell, "Courier New", serif',
    'cooper': '"Cooper Black", Georgia, serif',
    'georgia': 'Georgia, "Times New Roman", serif',
    'baskerville': 'Baskerville, Georgia, serif',
    'garamond': 'Garamond, Georgia, serif',
    'palatino': 'Palatino, "Palatino Linotype", serif',
    'courier': '"Courier New", Courier, monospace',
    'lucida': '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
    'system': 'system-ui, -apple-system, "Segoe UI", Arial, sans-serif'
  };

  function readSavedFont() {
    try {
      return window.localStorage.getItem(fontStorageKey);
    } catch (error) {
      return null;
    }
  }

  function saveFont(fontKey) {
    try {
      window.localStorage.setItem(fontStorageKey, fontKey);
    } catch (error) {
      return;
    }
  }

  function applyFont(fontKey, shouldSave) {
    var selectedFont = fontOptions[fontKey] ? fontKey : defaultFont;
    document.documentElement.style.setProperty('--display-font', fontOptions[selectedFont]);
    if (fontChoice) fontChoice.value = selectedFont;
    if (shouldSave) saveFont(selectedFont);
  }

  function closeFontSettings() {
    if (!fontSettingsButton || !fontSettingsPanel) return;
    fontSettingsPanel.hidden = true;
    fontSettingsButton.setAttribute('aria-expanded', 'false');
  }

  if (fontSettings && fontSettingsButton && fontSettingsPanel && fontChoice) {
    applyFont(readSavedFont() || defaultFont, false);

    Array.from(fontChoice.options).forEach(function (option) {
      if (fontOptions[option.value]) option.style.fontFamily = fontOptions[option.value];
    });

    fontSettingsButton.addEventListener('click', function () {
      var willOpen = fontSettingsPanel.hidden;
      fontSettingsPanel.hidden = !willOpen;
      fontSettingsButton.setAttribute('aria-expanded', String(willOpen));
      if (willOpen) fontChoice.focus();
    });

    fontChoice.addEventListener('change', function () {
      applyFont(fontChoice.value, true);
    });

    if (fontClose) {
      fontClose.addEventListener('click', function () {
        closeFontSettings();
        fontSettingsButton.focus();
      });
    }

    if (fontReset) {
      fontReset.addEventListener('click', function () {
        applyFont(defaultFont, true);
        fontChoice.focus();
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !fontSettingsPanel.hidden) {
        closeFontSettings();
        fontSettingsButton.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (!fontSettings.contains(event.target)) closeFontSettings();
    });
  }

  var portraitCarousel = document.querySelector('[data-carousel]');

  if (portraitCarousel) {
    var portraitSlides = Array.from(portraitCarousel.querySelectorAll('[data-slide]'));
    var previousPortrait = portraitCarousel.querySelector('[data-carousel-prev]');
    var nextPortrait = portraitCarousel.querySelector('[data-carousel-next]');
    var portraitCurrent = portraitCarousel.querySelector('[data-carousel-current]');
    var portraitIndex = 0;

    function showPortrait(index) {
      if (!portraitSlides.length) return;
      portraitIndex = (index + portraitSlides.length) % portraitSlides.length;
      portraitSlides.forEach(function (slide, slideIndex) {
        var isCurrent = slideIndex === portraitIndex;
        slide.hidden = !isCurrent;
        slide.setAttribute('aria-hidden', String(!isCurrent));
      });
      if (portraitCurrent) portraitCurrent.textContent = String(portraitIndex + 1);
    }

    if (previousPortrait) {
      previousPortrait.addEventListener('click', function () {
        showPortrait(portraitIndex - 1);
      });
    }

    if (nextPortrait) {
      nextPortrait.addEventListener('click', function () {
        showPortrait(portraitIndex + 1);
      });
    }

    portraitCarousel.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') showPortrait(portraitIndex - 1);
      if (event.key === 'ArrowRight') showPortrait(portraitIndex + 1);
    });

    showPortrait(0);
  }

  var shareButton = document.querySelector('#share-button');
  var shareStatus = document.querySelector('#share-status');
  var shareUrl = 'https://linktr.ee/qrfilme';

  function announceShare(message) {
    if (shareStatus) shareStatus.textContent = message;
  }

  function copyWithFallback(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      field.setSelectionRange(0, field.value.length);
      try {
        var copied = document.execCommand('copy');
        document.body.removeChild(field);
        copied ? resolve() : reject(new Error('copy-failed'));
      } catch (error) {
        document.body.removeChild(field);
        reject(error);
      }
    });
  }

  if (shareButton) {
    shareButton.addEventListener('click', function () {
      announceShare('');
      var shareData = {
        title: 'QR FILME',
        text: 'Conheça o QR FILME, o podcast que te ensina a dominar todas as telas.',
        url: shareUrl
      };

      if (navigator.share) {
        navigator.share(shareData).then(function () {
          announceShare('Compartilhamento iniciado.');
        }).catch(function (error) {
          if (error && error.name !== 'AbortError') announceShare('Não foi possível compartilhar agora.');
        });
        return;
      }

      copyWithFallback(shareUrl).then(function () {
        announceShare('Link copiado para a área de transferência.');
      }).catch(function () {
        announceShare('Não foi possível copiar o link. Copie manualmente: ' + shareUrl);
      });
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealItems = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -50px', threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  }
})();
