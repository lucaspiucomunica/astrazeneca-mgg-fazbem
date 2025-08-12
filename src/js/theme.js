// Menu da landing page: abre no clique do botão e fecha ao selecionar item, rolar a página ou clicar fora
(function () {
  const menuButton = document.getElementById('btn-menu');
  const menuPanel = document.getElementById('menu-panel');
  const menuClose = document.getElementById('btn-menu-close');
  if (!menuButton || !menuPanel) return;

  let isOpen = false;

  // Inicializar estado do menu - garantir que elementos não sejam focalizáveis quando fechado
  function initializeMenuState() {
    const focusableElements = menuPanel.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
      // Salvar tabindex original se existir
      if (el.hasAttribute('tabindex') && el.getAttribute('tabindex') !== '-1') {
        el.setAttribute('data-original-tabindex', el.getAttribute('tabindex'));
      }
      el.setAttribute('tabindex', '-1');
    });
  }

  // Executar inicialização
  initializeMenuState();

  function openMenu() {
    menuPanel.classList.add('is-open');
    menuPanel.setAttribute('aria-hidden', 'false');
    menuPanel.removeAttribute('inert');
    
    // Restaurar tabindex para elementos focalizáveis (fallback para navegadores sem suporte ao inert)
    const focusableElements = menuPanel.querySelectorAll('button, a, input, select, textarea, [tabindex]');
    focusableElements.forEach(el => {
      if (el.hasAttribute('data-original-tabindex')) {
        el.setAttribute('tabindex', el.getAttribute('data-original-tabindex'));
        el.removeAttribute('data-original-tabindex');
      } else {
        el.removeAttribute('tabindex');
      }
    });
    
    menuButton.setAttribute('aria-expanded', 'true');
    isOpen = true;
  }

  function closeMenu() {
    // Remover foco de qualquer elemento dentro do menu antes de fechá-lo
    if (document.activeElement && menuPanel.contains(document.activeElement)) {
      document.activeElement.blur();
      // Retornar foco para o botão do menu
      menuButton.focus();
    }
    
    menuPanel.classList.remove('is-open');
    menuPanel.setAttribute('aria-hidden', 'true');
    menuPanel.setAttribute('inert', '');
    
    // Fallback para navegadores sem suporte ao inert: desabilitar foco manualmente
    const focusableElements = menuPanel.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
      // Salvar tabindex original se existir
      if (el.hasAttribute('tabindex') && el.getAttribute('tabindex') !== '-1') {
        el.setAttribute('data-original-tabindex', el.getAttribute('tabindex'));
      }
      el.setAttribute('tabindex', '-1');
    });
    
    menuButton.setAttribute('aria-expanded', 'false');
    isOpen = false;
  }

  function toggleMenu() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Clique do botão abre/fecha
  menuButton.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Botão de fechar
  if (menuClose) {
    menuClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeMenu();
    });
  }

  // Fechar ao clicar fora
  document.addEventListener('click', function (e) {
    if (!isOpen) return;
    if (menuPanel.contains(e.target) || menuButton.contains(e.target)) return;
    closeMenu();
  });

  // Fechar ao rolar
  window.addEventListener('scroll', function () {
    if (isOpen) closeMenu();
  }, { passive: true });

  // Fechar ao escolher um item e fazer scroll até a âncora suavemente
  menuPanel.addEventListener('click', function (e) {
    const link = e.target.closest('a.menu-item');
    if (!link) return;
    // deixar o comportamento de âncora padrão e fechar o menu
    closeMenu();
  });
})();

// Forçar favicon e meta tags no head
(function () {
  function forceFaviconAndMeta() {
    const head = document.head;
    
    // Remover favicons existentes para evitar duplicatas
    const existingFavicons = head.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"], link[rel="manifest"], meta[name="theme-color"]');
    existingFavicons.forEach(el => el.remove());
    
    // Array com os elementos a serem inseridos
    const faviconElements = [
      {
        tag: 'link',
        attrs: {
          rel: 'icon',
          href: 'https://ik.imagekit.io/agenciapiu/AstraZeneca%20-%20MGg/FazBem/favicon/favicon.svg',
          sizes: 'any'
        }
      },
      {
        tag: 'link',
        attrs: {
          rel: 'icon',
          href: 'https://ik.imagekit.io/agenciapiu/AstraZeneca%20-%20MGg/FazBem/favicon/favicon.svg',
          type: 'image/svg+xml'
        }
      },
      {
        tag: 'link',
        attrs: {
          rel: 'apple-touch-icon',
          href: 'https://ik.imagekit.io/agenciapiu/AstraZeneca%20-%20MGg/FazBem/favicon/apple-touch-icon.png'
        }
      },
      {
        tag: 'link',
        attrs: {
          rel: 'manifest',
          href: 'https://ik.imagekit.io/agenciapiu/AstraZeneca%20-%20MGg/FazBem/favicon/site.webmanifest'
        }
      },
      {
        tag: 'meta',
        attrs: {
          name: 'theme-color',
          content: '#FFFFFF'
        }
      }
    ];
    
    // Criar e inserir os elementos
    faviconElements.forEach(elementData => {
      const element = document.createElement(elementData.tag);
      
      // Adicionar todos os atributos
      Object.keys(elementData.attrs).forEach(attr => {
        element.setAttribute(attr, elementData.attrs[attr]);
      });
      
      // Inserir no head
      head.appendChild(element);
    });
    
    console.log('✅ Favicon e meta tags forçados no head');
  }
  
  // Executar quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceFaviconAndMeta);
  } else {
    forceFaviconAndMeta();
  }
})();

// Header sticky quando o #hero sair da tela (usando classes do Tailwind)
(function () {
  const header = document.getElementById('header');
  const hero = document.getElementById('hero');
  if (!header || !hero) return;

  // Suaviza a transição de cor ao fixar/soltar
  header.classList.add('transition-colors', 'duration-200');

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      // Hero visível: header volta a ser absoluto e remove fundo
      header.classList.add('absolute', 'py-6', 'top-0');
      header.classList.remove('fixed', 'py-4', 'bg-black/20', 'backdrop-blur-lg', 'top-0');
    } else {
      // Hero saiu da tela: header fica fixo e com fundo azul principal
      header.classList.add('fixed', 'py-4', 'bg-black/20', 'backdrop-blur-lg', 'top-0');
      header.classList.remove('absolute', 'py-6', 'top-0');
    }
  }, { threshold: 0 });

  observer.observe(hero);
})();


// Rolagem com offset do header para links âncora
(function () {
  const header = document.getElementById('header');
  const menuPanel = document.getElementById('menu-panel');
  const menuButton = document.getElementById('btn-menu');

  function closeOverlayMenuIfOpen() {
    if (!menuPanel) return;
    if (menuPanel.classList.contains('is-open')) {
      // Remover foco de qualquer elemento dentro do menu antes de fechá-lo
      if (document.activeElement && menuPanel.contains(document.activeElement)) {
        document.activeElement.blur();
        // Retornar foco para o botão do menu se disponível
        if (menuButton) menuButton.focus();
      }
      
      menuPanel.classList.remove('is-open');
      menuPanel.setAttribute('aria-hidden', 'true');
      menuPanel.setAttribute('inert', '');
      
      // Fallback para navegadores sem suporte ao inert: desabilitar foco manualmente
      const focusableElements = menuPanel.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      focusableElements.forEach(el => {
        // Salvar tabindex original se existir
        if (el.hasAttribute('tabindex') && el.getAttribute('tabindex') !== '-1') {
          el.setAttribute('data-original-tabindex', el.getAttribute('tabindex'));
        }
        el.setAttribute('tabindex', '-1');
      });
      
      if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
    }
  }

  function scrollToWithHeaderOffset(targetEl) {
    if (!targetEl) return;
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8; // 8px de respiro
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || hash === '#' || hash.length < 2) return;
    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    closeOverlayMenuIfOpen();
    scrollToWithHeaderOffset(target);
    // Atualiza a URL sem pular bruscamente
    history.pushState(null, '', hash);
  }, { passive: false });

  // Ajusta também quando a página carrega com hash na URL
  window.addEventListener('load', function () {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (!target) return;
    // pequeno atraso para garantir layout estável
    setTimeout(() => scrollToWithHeaderOffset(target), 0);
  });
})();

// Funcionalidade do vídeo Hero - Thumbnail com overlay que vira YouTube embed
(function () {
  const heroThumbnail = document.getElementById('hero-video-thumbnail');
  const heroIframe = document.getElementById('hero-youtube-iframe');

  if (!heroThumbnail || !heroIframe) return;

  // Clique em toda a thumbnail do vídeo hero
  heroThumbnail.addEventListener('click', function (e) {
    e.preventDefault();
    
    // Disparar evento de tracking se disponível
    if (window.miasteniaTracker) {
      window.miasteniaTracker.trackCustomEvent('video_play_youtube', {
        video_title: 'Miastenia Gravis - A tempestade vai e a vida volta',
        video_id: '67MXay-B9VU'
      });
    }

    // Esconder thumbnail
    heroThumbnail.style.display = 'none';
    
    // Configurar e mostrar iframe com autoplay
    heroIframe.src = 'https://www.youtube.com/embed/67MXay-B9VU?autoplay=1';
    heroIframe.style.display = 'block';
    
    console.log('🎥 Hero YouTube video loaded and playing');
  });
})();

// Funcionalidade do vídeo da Rita - Thumbnail com overlay que vira YouTube embed
(function () {
  const ritaThumbnail = document.getElementById('rita-video-thumbnail');
  const ritaIframe = document.getElementById('rita-youtube-iframe');

  if (!ritaThumbnail || !ritaIframe) return;

  // Clique em toda a thumbnail do vídeo da Rita
  ritaThumbnail.addEventListener('click', function (e) {
    e.preventDefault();
    
    // Disparar evento de tracking se disponível
    if (window.miasteniaTracker) {
      window.miasteniaTracker.trackCustomEvent('video_play_youtube', {
        video_title: 'Como é a vida com Miastenia?',
        video_id: '67MXay-B9VU'
      });
    }

    // Esconder thumbnail
    ritaThumbnail.style.display = 'none';
    
    // Configurar e mostrar iframe com autoplay
    ritaIframe.src = 'https://www.youtube.com/embed/67MXay-B9VU?autoplay=1';
    ritaIframe.style.display = 'block';
    
    console.log('🎥 YouTube video loaded and playing');
  });
})();
