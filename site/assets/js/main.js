(() => {
  'use strict';

  // WhatsApp profissional (55 = Brasil, 31 = DDD). Trocar aqui atualiza o site todo.
  const WHATSAPP_NUMBER = '5531985061173';
  const DEFAULT_MESSAGE = 'Olá, Jario! Vim pelo site e gostaria de agendar uma avaliação.';

  const whatsappUrl = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  // Links de WhatsApp
  // <a data-whatsapp>                       -> mensagem padrão de agendamento
  // <a data-whatsapp="texto">               -> mensagem personalizada
  // <a data-whatsapp data-treatment="Nome"> -> pergunta sobre um tratamento
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    const { whatsapp, treatment } = link.dataset;
    const message = treatment
      ? `Olá, Jario! Vim pelo site e gostaria de saber mais sobre ${treatment}.`
      : whatsapp || DEFAULT_MESSAGE;

    link.href = whatsappUrl(message);
    link.target = '_blank';
    link.rel = 'noopener';
  });

  // Menu mobile
  const nav = document.getElementById('site-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuIcon = menuToggle?.querySelector('i');

  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menuIcon.className = open ? 'ph ph-x' : 'ph ph-list';
  };

  if (nav && menuToggle) {
    menuToggle.addEventListener('click', () => {
      setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    window.matchMedia('(min-width: 961px)').addEventListener('change', (event) => {
      if (event.matches) setMenu(false);
    });
  }

  // Sombra no cabeçalho depois que a página rola
  const header = document.querySelector('.site-header');
  const sentinel = document.querySelector('.scroll-sentinel');

  if (header && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      header.classList.toggle('is-scrolled', !entry.isIntersecting);
    }).observe(sentinel);
  }

  // Abas de tratamentos
  const tabs = [...document.querySelectorAll('[role="tab"]')];

  const selectTab = (selected, focus = false) => {
    tabs.forEach((tab) => {
      const isSelected = tab === selected;
      tab.setAttribute('aria-selected', String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !isSelected;
    });
    if (focus) selected.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));

    tab.addEventListener('keydown', (event) => {
      const last = tabs.length - 1;
      const targets = {
        ArrowRight: index === last ? 0 : index + 1,
        ArrowLeft: index === 0 ? last : index - 1,
        Home: 0,
        End: last,
      };

      if (event.key in targets) {
        event.preventDefault();
        selectTab(tabs[targets[event.key]], true);
      }
    });
  });

  // Animação de entrada ao rolar
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    // Itens irmãos entram em sequência
    revealItems.forEach((item) => {
      const siblings = [...item.parentElement.children].filter((el) => el.classList.contains('reveal'));
      item.style.setProperty('--reveal-index', siblings.indexOf(item));
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Monograma no lugar da foto, caso a imagem não carregue
  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    const markMissing = () => img.closest('.media-frame')?.classList.add('is-missing');

    if (img.complete && img.naturalWidth === 0) {
      markMissing();
    } else {
      img.addEventListener('error', markMissing, { once: true });
    }
  });

  // Ano atual no rodapé
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
