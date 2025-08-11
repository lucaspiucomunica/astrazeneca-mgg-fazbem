// Animações do site (Hero)
// - Título com SplitText
// - Parágrafo e botão em sequência
// - Efeito sutil no background (zoom/pan) e parallax no scroll

(function () {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function selectHeroElements() {
    const hero = document.getElementById('hero');
    if (!hero) return null;
    const title = hero.querySelector('h1');
    const paragraph = hero.querySelector('p');
    const button = hero.querySelector('a.btn');
    return { hero, title, paragraph, button };
  }

  function runHeroAnimations() {
    const elements = selectHeroElements();
    if (!elements) return;
    const { hero, title, paragraph, button } = elements;

    if (typeof window.gsap === 'undefined') return;

    if (prefersReducedMotion) {
      // Respeita usuários com preferência por menos movimento
      if (title) title.style.opacity = '1';
      if (paragraph) paragraph.style.opacity = '1';
      if (button) button.style.opacity = '1';
      return;
    }

    // Garante plugins registrados se existirem
    if (window.gsap) {
      if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
      if (window.SplitText) gsap.registerPlugin(SplitText);
      if (window.TextPlugin) gsap.registerPlugin(TextPlugin);
    }

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Estado inicial
    if (title) gsap.set(title, { opacity: 1 });
    if (paragraph) gsap.set(paragraph, { opacity: 0, y: 20 });
    if (button) gsap.set(button, { opacity: 0, y: 12, scale: 0.98 });

    // Background: anima em uma camada dedicada para evitar bordas brancas
    const heroBg = hero.querySelector('.hero-bg');
    if (heroBg) {
      gsap.set(heroBg, { scale: 1.1, transformOrigin: '50% 50%' });
      timeline.to(heroBg, { scale: 1, duration: 2, ease: 'power2.out' }, 0);
    } else {
      // Fallback leve caso a camada não exista
      timeline.fromTo(
        hero,
        { backgroundPosition: '50% 52%' },
        { backgroundPosition: '50% 50%', duration: 1.2, ease: 'power2.out' },
        0
      );
    }

    // Título: SplitText linha/palavra, com queda suave e fade
    if (title && window.SplitText) {
      const split = new SplitText(title, { type: 'lines,words', linesClass: 'split-line' });
      gsap.set(split.words, { yPercent: 120, opacity: 0, rotationX: -20, transformOrigin: '0% 50% -50' });
      timeline.to(
        split.words,
        {
          yPercent: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: { each: 0.03, from: 'start' },
        },
        0.1
      );
    } else if (title) {
      // Fallback sem SplitText
      timeline.fromTo(title, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.1);
    }

    // Parágrafo entra após o título
    if (paragraph) {
      timeline.to(paragraph, { y: 0, opacity: 1, duration: 0.6 }, '>-0.2');
    }

    // Botão com pequeno "pop" ao final
    if (button) {
      timeline.to(button, { y: 0, opacity: 1, scale: 1, duration: 0.5 }, '>-0.8');
    }

    // Parallax removido a pedido: mantemos apenas o zoom-out inicial
  }

  function runMiasteniaAnimations() {
    const section = document.getElementById('miastenia-gravis');
    if (!section) return;

    if (typeof window.gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    const title = section.querySelector('h2');
    const paragraphs = section.querySelectorAll('p');
    const image = section.querySelector('img');

    if (prefersReducedMotion) {
      if (title) title.style.opacity = '1';
      paragraphs.forEach(p => (p.style.opacity = '1'));
      if (image) image.style.opacity = '1';
      return;
    }

    // Estados iniciais antes do scroll
    if (title) gsap.set(title, { y: 24, opacity: 0 });
    if (paragraphs && paragraphs.length) gsap.set(paragraphs, { y: 20, opacity: 0 });
    if (image) gsap.set(image, { x: 24, opacity: 0, scale: 0.98, transformOrigin: '50% 50%' });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none play none',
        once: true,
      },
    });

    if (title) tl.to(title, { y: 0, opacity: 1, duration: 0.6 }, 0);
    if (paragraphs && paragraphs.length) tl.to(paragraphs, { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, '>-0.2');
    if (image) tl.to(image, { x: 0, opacity: 1, scale: 1, duration: 0.7 }, '>-0.1');
  }

  function runDiagnosticoAnimations() {
    const section = document.getElementById('quando-o-diagnostico-chega');
    if (!section) return;

    if (typeof window.gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (window.SplitText) gsap.registerPlugin(SplitText);

    const title = section.querySelector('h2');
    const textBlocks = section.querySelectorAll('p');
    const rays = section.querySelectorAll('img[alt="Raio de luz"]');

    if (prefersReducedMotion) {
      if (title) title.style.opacity = '1';
      textBlocks.forEach((p) => (p.style.opacity = '1'));
      rays.forEach((ray) => (ray.style.opacity = '1'));
      return;
    }

    const leftRay = rays[0];
    const rightRay = rays[1];

    // Estados iniciais
    if (leftRay) gsap.set(leftRay, { opacity: 0, x: -180, y: 140, rotation: -2, transformOrigin: '50% 50%' });
    if (rightRay) gsap.set(rightRay, { opacity: 0, x: 180, y: 140, rotation: 2, transformOrigin: '50% 50%' });
    if (textBlocks && textBlocks.length) gsap.set(textBlocks, { y: 20, opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none play none',
        once: true,
      },
    });

    // Título com SplitText por linhas
    if (title && window.SplitText) {
      const split = new SplitText(title, { type: 'lines', linesClass: 'split-line' });
      gsap.set(split.lines, { yPercent: 120, opacity: 0 });
      tl.to(split.lines, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.15 }, 0);
    } else if (title) {
      tl.fromTo(title, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0);
    }

    // Texto em sequência ao título
    if (textBlocks && textBlocks.length) {
      tl.to(textBlocks, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '>-0.2');
    }

    // Raios de luz surgindo da diagonal conforme o lado
    if (leftRay) tl.to(leftRay, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.9 }, '>-0.3');
    if (rightRay) tl.to(rightRay, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.9 }, '>-0.6');
  }

  function runDiagnosticoMGAnimations() {
    const section = document.getElementById('diagnostico-de-miastenia-gravis');
    if (!section) return;

    if (typeof window.gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // Linhas da grade (2x2)
    const rows = Array.from(section.querySelectorAll('.flex.flex-row.items-stretch.gap-6'));
    const topRow = rows[0] || null;
    const bottomRow = rows[1] || null;

    // Topo: card informativo (esquerda) e card com ilustração (direita)
    const topInfoCard = topRow ? topRow.querySelector('.bg-azul-100.rounded-3xl.p-10') : null;
    const illustrationWrapper = topRow ? topRow.querySelector('.overflow-hidden.rounded-3xl.relative') : null;
    const illustrationImg = illustrationWrapper ? illustrationWrapper.querySelector('img') : null;

    // Base: dois cards azuis
    let bottomCards = [];
    if (bottomRow) {
      bottomCards = Array.from(bottomRow.querySelectorAll('.bg-azul-principal.rounded-3xl.p-8'));
    }

    if (prefersReducedMotion) {
      [topInfoCard, illustrationWrapper, ...bottomCards].forEach((el) => el && (el.style.opacity = '1'));
      if (illustrationImg) illustrationImg.style.transform = 'scale(1)';
      return;
    }

    // Estados iniciais
    if (topInfoCard) gsap.set(topInfoCard, { opacity: 0, y: 16 });
    if (illustrationWrapper) gsap.set(illustrationWrapper, { opacity: 0, y: 16 });
    if (illustrationImg) gsap.set(illustrationImg, { scale: 1.08, transformOrigin: '50% 50%' });
    if (bottomCards.length) gsap.set(bottomCards, { opacity: 0, y: 16 });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none play none',
        once: true,
      },
    });

    // Cards de texto: fade com leve subida e pequeno stagger
    const fadeCards = [topInfoCard, ...bottomCards].filter(Boolean);
    if (fadeCards.length) {
      tl.to(fadeCards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, 0);
    }

    // Ilustração: fade do wrapper + zoom-out na imagem (estilo hero)
    if (illustrationWrapper) tl.to(illustrationWrapper, { opacity: 1, y: 0, duration: 0.8 }, 0);
    if (illustrationImg) tl.to(illustrationImg, { scale: 1, duration: 1.6, ease: 'power2.out' }, 0);
  }

  function runEntendaAnimations() {
    const section = document.getElementById('entenda-a-miastenia-gravis');
    if (!section) return;

    if (typeof window.gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (window.SplitText) gsap.registerPlugin(SplitText);

    // Primeira linha/row da seção
    const firstRow = section.querySelector('.container > .flex');
    if (!firstRow) return;

    const leftCol = firstRow.children && firstRow.children.length > 0 ? firstRow.children[0] : null;
    const rightCol = firstRow.children && firstRow.children.length > 1 ? firstRow.children[1] : null;
    const title = leftCol ? leftCol.querySelector('h2') : null;
    const paragraphs = leftCol ? leftCol.querySelectorAll('p') : [];
    const card = rightCol ? rightCol.querySelector('.bg-rosa-700') : null;

    if (prefersReducedMotion) {
      if (title) title.style.opacity = '1';
      paragraphs && paragraphs.forEach((p) => (p.style.opacity = '1'));
      if (card) card.style.opacity = '1';
      return;
    }

    // Estados iniciais
    if (paragraphs && paragraphs.length) gsap.set(paragraphs, { y: 16, opacity: 0 });
    if (card) gsap.set(card, { x: 24, opacity: 0, scale: 0.98, transformOrigin: '50% 50%' });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: firstRow,
        start: 'top 80%',
        toggleActions: 'play none play none',
        once: true,
      },
    });

    // Título com possível SplitText por linhas (se disponível)
    if (title && window.SplitText) {
      // Evita que a opacidade do elemento pai (h2) esconda as linhas
      gsap.set(title, { opacity: 1 });
      const split = new SplitText(title, { type: 'lines', linesClass: 'split-line' });
      gsap.set(split.lines, { yPercent: 120, opacity: 0 });
      tl.to(split.lines, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0);
    } else if (title) {
      // Define estado inicial apenas no fallback sem SplitText
      gsap.set(title, { y: 24, opacity: 0 });
      tl.to(title, { y: 0, opacity: 1, duration: 0.6 }, 0);
    }

    // Parágrafos entram em sequência
    if (paragraphs && paragraphs.length) {
      tl.to(paragraphs, { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, '>-0.2');
    }

    // Card da direita entra da direita com leve pop
    if (card) {
      tl.to(card, { x: 0, opacity: 1, scale: 1, duration: 0.7 }, '>-0.1');
    }
  }

  function runEntendaNumerosAnimations() {
    const section = document.getElementById('entenda-a-miastenia-gravis');
    if (!section) return;

    if (typeof window.gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (window.SplitText) gsap.registerPlugin(SplitText);
    if (window.TextPlugin) gsap.registerPlugin(TextPlugin);

    // Título: "A Miastenia em números"
    const numerosTitle = section.querySelector('h3');
    if (numerosTitle) {
      // Linha do título (container imediato da linha)
      const titleRow = numerosTitle.closest('.flex');
      // Estados iniciais e animação por linhas
      const tlTitle = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: titleRow || numerosTitle,
          start: 'top 80%',
          toggleActions: 'play none play none',
          once: true,
        },
      });

      if (window.SplitText) {
        gsap.set(numerosTitle, { opacity: 1 });
        const split = new SplitText(numerosTitle, { type: 'lines', linesClass: 'split-line' });
        gsap.set(split.lines, { yPercent: 120, opacity: 0 });
        tlTitle.to(split.lines, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0);
      } else {
        gsap.set(numerosTitle, { y: 24, opacity: 0 });
        tlTitle.to(numerosTitle, { y: 0, opacity: 1, duration: 0.6 }, 0);
      }
    }

    // Linha dos cards (dois colunas)
    const cardsRow = section.querySelectorAll('.flex.items-start.gap-10.mt-8')[0] || null;
    if (!cardsRow) return;

    const leftCol = cardsRow.children && cardsRow.children.length > 0 ? cardsRow.children[0] : null;
    const rightCol = cardsRow.children && cardsRow.children.length > 1 ? cardsRow.children[1] : null;

    if (!leftCol || !rightCol) return;

    // Elementos do primeiro card (12,4 casos...)
    const leftIcon = leftCol.querySelector('.frame-icon');
    const leftTitle = leftCol.querySelector('h4');
    const leftNumberSpan = leftTitle ? leftTitle.querySelector('.text-6xl') : null;
    const leftParagraph = leftCol.querySelector('p');

    // Elementos do segundo card (Acomete principalmente adultos)
    const rightTitle = rightCol.querySelector('h4');
    const rightIcon = rightCol.querySelector('.frame-icon');
    const rightParagraph = rightCol.querySelector('p');
    const rightList = rightCol.querySelector('ul');

    const tlCards = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: cardsRow,
        start: 'top 80%',
        toggleActions: 'play none play none',
        once: true,
      },
    });

    if (prefersReducedMotion) {
      if (leftIcon) gsap.set(leftIcon, { opacity: 1, scale: 1 });
      if (leftTitle) gsap.set(leftTitle, { opacity: 1, y: 0 });
      if (leftParagraph) gsap.set(leftParagraph, { opacity: 1, y: 0 });
      if (rightIcon) gsap.set(rightIcon, { opacity: 1, scale: 1 });
      if (rightTitle) gsap.set(rightTitle, { opacity: 1, y: 0 });
      if (rightParagraph) gsap.set(rightParagraph, { opacity: 1, y: 0 });
      if (rightList) gsap.set(rightList, { opacity: 1, y: 0 });
      // Garante número final
      if (leftNumberSpan) {
        const targetText = (leftNumberSpan.textContent || '12,4').trim();
        leftNumberSpan.textContent = targetText;
      }
      return;
    }

    // Estados iniciais
    if (leftIcon) gsap.set(leftIcon, { opacity: 0, scale: 0.96, transformOrigin: '50% 50%' });
    if (leftTitle) gsap.set(leftTitle, { opacity: 0, y: 12 });
    if (leftParagraph) gsap.set(leftParagraph, { opacity: 0, y: 12 });
    if (rightIcon) gsap.set(rightIcon, { opacity: 0, scale: 0.96, transformOrigin: '50% 50%' });
    if (rightParagraph) gsap.set(rightParagraph, { opacity: 0, y: 12 });
    if (rightList) gsap.set(rightList, { opacity: 0, y: 12 });

    // Passo 1: Ícone com pop sutil
    if (leftIcon) tlCards.to(leftIcon, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }, 0);

    // Passo 2: Título com counter (0 -> valor do span)
    if (leftTitle) {
      tlCards.to(leftTitle, { opacity: 1, y: 0, duration: 0.5 }, '>-0.1');

      if (leftNumberSpan) {
        const targetText = (leftNumberSpan.textContent || '12,4').trim();
        const targetValue = parseFloat(targetText.replace(',', '.')) || 12.4;
        // Reseta texto para 0 antes do counter
        leftNumberSpan.textContent = '0';

        const counter = { value: 0 };
        tlCards.to(counter, {
          value: targetValue,
          duration: 1.2,
          ease: 'power1.out',
          onUpdate: () => {
            // 1 casa decimal e vírgula
            const formatted = counter.value.toFixed(1).replace('.', ',');
            leftNumberSpan.textContent = formatted;
          },
        }, '<');
      }
    }

    // Passo 3: Parágrafo do primeiro card
    if (leftParagraph) {
      tlCards.to(leftParagraph, { opacity: 1, y: 0, duration: 0.5 }, '>-0.1');
    }

    // Segundo card: título por linhas
    if (rightTitle) {
      // Ícone do segundo card antes do título
      if (rightIcon) tlCards.to(rightIcon, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }, '>-0.2');
      if (window.SplitText) {
        gsap.set(rightTitle, { opacity: 1 });
        const splitRight = new SplitText(rightTitle, { type: 'lines', linesClass: 'split-line' });
        gsap.set(splitRight.lines, { yPercent: 120, opacity: 0 });
        tlCards.to(splitRight.lines, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, '>-0.1');
      } else {
        gsap.set(rightTitle, { opacity: 0, y: 16 });
        tlCards.to(rightTitle, { opacity: 1, y: 0, duration: 0.6 }, '>-0.1');
      }
    }

    // Conteúdo do segundo card (opcional: fade simples)
    if (rightParagraph) tlCards.to(rightParagraph, { opacity: 1, y: 0, duration: 0.5 }, '>-0.2');
    if (rightList) tlCards.to(rightList, { opacity: 1, y: 0, duration: 0.5 }, '>-0.35');
  }

  function runComoAgeAnimations() {
    const section = document.getElementById('entenda-a-miastenia-gravis');
    if (!section) return;

    if (typeof window.gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (window.SplitText) gsap.registerPlugin(SplitText);

    // Localiza a linha dos 3 cards (w-1/3) pela estrutura: primeira .flex.items-start.gap-10.mt-8 com 3 filhos
    const candidateRows = Array.from(section.querySelectorAll('.flex.flex-row.items-start.gap-10.mt-8'));
    const cardsRow = candidateRows.find((row) => row.children && row.children.length === 3) || null;
    if (!cardsRow) return;

    // Título está na linha anterior como h3
    const titleRow = cardsRow.previousElementSibling;
    const title = titleRow ? titleRow.querySelector('h3') : null;

    // Animação do título (por linhas quando disponível)
    if (title) {
      const tlTitle = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: titleRow || title,
          start: 'top 80%',
          toggleActions: 'play none play none',
          once: true,
        },
      });

      if (prefersReducedMotion) {
        gsap.set(title, { opacity: 1 });
      } else if (window.SplitText) {
        gsap.set(title, { opacity: 1 });
        const split = new SplitText(title, { type: 'lines', linesClass: 'split-line' });
        gsap.set(split.lines, { yPercent: 120, opacity: 0 });
        tlTitle.to(split.lines, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0);
      } else {
        gsap.set(title, { y: 24, opacity: 0 });
        tlTitle.to(title, { y: 0, opacity: 1, duration: 0.6 }, 0);
      }
    }

    // Colunas
    const col1 = cardsRow.children[0];
    const col2 = cardsRow.children[1];
    const col3 = cardsRow.children[2];

    function getCardParts(columnEl) {
      if (!columnEl) return {};
      const icon = columnEl.querySelector('.frame-icon');
      const text = columnEl.querySelector('p');
      const lineImg = columnEl.querySelector('img[alt="Linha de conexão"]');
      const lineWrapper = lineImg ? lineImg.parentElement : null; // wrapper absoluto
      return { icon, text, lineWrapper };
    }

    const card1 = getCardParts(col1);
    const card2 = getCardParts(col2);
    const card3 = getCardParts(col3);

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: cardsRow,
        start: 'top 80%',
        toggleActions: 'play none play none',
        once: true,
      },
    });

    if (prefersReducedMotion) {
      [card1, card2, card3].forEach(({ icon, text, lineWrapper }) => {
        if (icon) gsap.set(icon, { opacity: 1, scale: 1 });
        if (text) gsap.set(text, { opacity: 1, y: 0 });
        if (lineWrapper) gsap.set(lineWrapper, { opacity: 1, scaleX: 1 });
      });
      return;
    }

    // Estados iniciais
    [card1, card2, card3].forEach(({ icon, text, lineWrapper }) => {
      if (icon) gsap.set(icon, { opacity: 0, scale: 0.96, transformOrigin: '50% 50%' });
      if (text) gsap.set(text, { opacity: 0, y: 12 });
      if (lineWrapper) gsap.set(lineWrapper, { opacity: 1, scaleX: 0, transformOrigin: '0% 50%' });
    });

    // Card 1: ícone -> texto -> linha
    if (card1.icon) tl.to(card1.icon, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }, 0);
    if (card1.text) tl.to(card1.text, { opacity: 1, y: 0, duration: 0.5 }, '>-0.1');
    if (card1.lineWrapper) tl.to(card1.lineWrapper, { scaleX: 1, duration: 0.6 }, '>-0.15');

    // Card 2: ícone -> texto -> linha (começa após linha do card 1)
    if (card2.icon) tl.to(card2.icon, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }, '>-0.05');
    if (card2.text) tl.to(card2.text, { opacity: 1, y: 0, duration: 0.5 }, '>-0.1');
    if (card2.lineWrapper) tl.to(card2.lineWrapper, { scaleX: 1, duration: 0.6 }, '>-0.15');

    // Card 3: ícone -> texto (sem linha)
    if (card3.icon) tl.to(card3.icon, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }, '>-0.05');
    if (card3.text) tl.to(card3.text, { opacity: 1, y: 0, duration: 0.5 }, '>-0.1');
  }

  function runJuncoesAnimations() {
    const section = document.getElementById('entenda-a-miastenia-gravis');
    if (!section) return;

    if (typeof window.gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // Container da linha que compara as junções (wrapper agrupando cards e crédito)
    const compareRow = section.querySelector('.js-junctions-group')
      || section.querySelector('.w-full.bg-rosa-700.rounded-3xl.mt-14');
    if (!compareRow) return;

    if (prefersReducedMotion) {
      gsap.set(compareRow, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(compareRow, { opacity: 0, y: 24 });
    if (window.ScrollTrigger) {
      ScrollTrigger.create({
        trigger: compareRow,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(compareRow, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
        },
        onEnterBack: () => {
          gsap.to(compareRow, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
        },
      });
    } else {
      gsap.to(compareRow, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    }
  }

  function runTiposMiasteniaAnimations() {
    const section = document.getElementById('entenda-a-miastenia-gravis');
    if (!section) return;

    if (typeof window.gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (window.SplitText) gsap.registerPlugin(SplitText);

    // Localiza o título "Tipos de Miastenia"
    const allH3 = Array.from(section.querySelectorAll('h3'));
    const tiposTitle = allH3.find((h) => (h.textContent || '').trim().toLowerCase().startsWith('tipos de miastenia')) || null;
    if (!tiposTitle) return;

    // Anima título
    const tlTitle = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: tiposTitle,
        start: 'top 85%',
        toggleActions: 'play none play none',
        once: true,
      },
    });

    if (prefersReducedMotion) {
      gsap.set(tiposTitle, { opacity: 1, y: 0 });
    } else if (window.SplitText) {
      gsap.set(tiposTitle, { opacity: 1 });
      const split = new SplitText(tiposTitle, { type: 'lines', linesClass: 'split-line' });
      gsap.set(split.lines, { yPercent: 120, opacity: 0 });
      tlTitle.to(split.lines, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0);
    } else {
      gsap.set(tiposTitle, { opacity: 0, y: 24 });
      tlTitle.to(tiposTitle, { opacity: 1, y: 0, duration: 0.6 }, 0);
    }

    // Linha dos dois cards logo após o título
    const cardsRow = tiposTitle.parentElement && tiposTitle.parentElement.parentElement
      ? tiposTitle.parentElement.parentElement.nextElementSibling
      : null;
    if (!cardsRow || !(cardsRow.classList && cardsRow.classList.contains('flex'))) return;

    const leftCol = cardsRow.children && cardsRow.children.length > 0 ? cardsRow.children[0] : null;
    const rightCol = cardsRow.children && cardsRow.children.length > 1 ? cardsRow.children[1] : null;
    if (!leftCol || !rightCol) return;

    // Seletores dos elementos
    const leftIcon = leftCol.querySelector('.frame-icon');
    const leftH4 = leftCol.querySelector('h4');
    const leftParagraph = leftCol.querySelector('p');

    const rightIcon = rightCol.querySelector('.frame-icon');
    const rightH4 = rightCol.querySelector('h4');
    const rightParagraph = rightCol.querySelector('p');

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: cardsRow,
        start: 'top 80%',
        toggleActions: 'play none play none',
        once: true,
      },
    });

    if (prefersReducedMotion) {
      [leftIcon, rightIcon].forEach((el) => el && gsap.set(el, { opacity: 1, scale: 1 }));
      [leftH4, rightH4, leftParagraph, rightParagraph].forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
      return;
    }

    // Estados iniciais
    [leftIcon, rightIcon].forEach((el) => el && gsap.set(el, { opacity: 0, scale: 0.96, transformOrigin: '50% 50%' }));
    [leftParagraph, rightParagraph].forEach((el) => el && gsap.set(el, { opacity: 0, y: 12 }));

    // Animações dos títulos: simples (sem SplitText)
    function animateH4Lines(timeline, h4, position) {
      if (!h4) return;
      gsap.set(h4, { opacity: 0, y: 14 });
      timeline.to(h4, { opacity: 1, y: 0, duration: 0.55 }, position);
    }

    // Ordem: ícone -> título -> parágrafo (esquerda), depois (direita)
    if (leftIcon) tl.to(leftIcon, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }, 0);
    animateH4Lines(tl, leftH4, '>-0.05');
    if (leftParagraph) tl.to(leftParagraph, { opacity: 1, y: 0, duration: 0.5 }, '>-0.1');

    if (rightIcon) tl.to(rightIcon, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }, '>-0.05');
    animateH4Lines(tl, rightH4, '>-0.05');
    if (rightParagraph) tl.to(rightParagraph, { opacity: 1, y: 0, duration: 0.5 }, '>-0.1');
  }

  function runTratamentoAnimations() {
    const section = document.getElementById('tratamento-para-a-miastenia-gravis');
    if (!section) return;

    if (typeof window.gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // Bloco do cabeçalho (título + parágrafo)
    const headerBlock = section.querySelector('.flex.flex-col.items-center.w-full');
    const headerTitle = headerBlock ? headerBlock.querySelector('h2') : null;
    const headerParagraph = headerBlock ? headerBlock.querySelector('p') : null;

    // Linha com duas colunas (cards com imagens de fundo)
    const twoColsRow = headerBlock ? headerBlock.querySelector('.flex.flex-row.items-strecth.w-full.gap-6') : null;
    const twoCols = twoColsRow ? Array.from(twoColsRow.children).slice(0, 2) : [];

    // Linha subsequente (faixa informativa azul)
    const infoStripeRow = section.querySelector('.flex.flex-row.items-center.w-full.mt-6');

    // Grupo "Abordagem" (linha inferior com gap-10)
    const abordagemRow = section.querySelector('.flex.flex-row.items-center.w-full.mt-14.gap-10');
    const abordagemLeftCol = abordagemRow && abordagemRow.children ? abordagemRow.children[0] : null;
    const abordagemRightCol = abordagemRow && abordagemRow.children && abordagemRow.children.length > 1 ? abordagemRow.children[1] : null;
    const abordagemCard = abordagemLeftCol ? abordagemLeftCol.querySelector('.bg-azul-principal.p-8') : null;
    const abordagemNumberSpan = abordagemCard ? abordagemCard.querySelector('.text-6xl') : null;
    const abordagemTitle = abordagemRightCol ? abordagemRightCol.querySelector('h4') : null;
    const abordagemParagraphs = abordagemRightCol ? abordagemRightCol.querySelectorAll('p') : [];

    if (prefersReducedMotion) {
      if (headerTitle) gsap.set(headerTitle, { opacity: 1, y: 0 });
      if (headerParagraph) gsap.set(headerParagraph, { opacity: 1, y: 0 });
      if (twoCols && twoCols.length) gsap.set(twoCols, { opacity: 1, y: 0 });
      if (infoStripeRow) gsap.set(infoStripeRow, { opacity: 1, y: 0 });
      if (abordagemCard) gsap.set(abordagemCard, { opacity: 1, y: 0 });
      if (abordagemTitle) gsap.set(abordagemTitle, { opacity: 1, y: 0 });
      if (abordagemParagraphs && abordagemParagraphs.length) gsap.set(abordagemParagraphs, { opacity: 1, y: 0 });
      // Mantém número final
      if (abordagemNumberSpan) {
        const targetText = (abordagemNumberSpan.textContent || '20%').trim();
        abordagemNumberSpan.textContent = targetText;
      }
      return;
    }

    // Estados iniciais (fade + y)
    if (headerTitle) gsap.set(headerTitle, { opacity: 0, y: 24 });
    if (headerParagraph) gsap.set(headerParagraph, { opacity: 0, y: 18 });
    if (twoCols && twoCols.length) gsap.set(twoCols, { opacity: 0, y: 24 });
    if (infoStripeRow) gsap.set(infoStripeRow, { opacity: 0, y: 20 });

    // Timeline principal da parte superior da seção
    const tlTop = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: headerBlock || section,
        start: 'top 80%',
        toggleActions: 'play none play none',
        once: true,
      },
    });

    if (headerTitle) tlTop.to(headerTitle, { opacity: 1, y: 0, duration: 0.6 }, 0);
    if (headerParagraph) tlTop.to(headerParagraph, { opacity: 1, y: 0, duration: 0.5 }, '>-0.2');
    if (twoCols && twoCols.length) tlTop.to(twoCols, { opacity: 1, y: 0, duration: 0.65 }, '>-0.1');
    if (infoStripeRow) tlTop.to(infoStripeRow, { opacity: 1, y: 0, duration: 0.6 }, '+=0.2');

    // Abordagem: primeiro o card (com counter), depois título e parágrafos
    if (abordagemCard) gsap.set(abordagemCard, { opacity: 0, y: 24 });
    if (abordagemTitle) gsap.set(abordagemTitle, { opacity: 0, y: 16 });
    if (abordagemParagraphs && abordagemParagraphs.length) gsap.set(abordagemParagraphs, { opacity: 0, y: 16 });

    const tlAbord = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: abordagemRow || section,
        start: 'top 80%',
        toggleActions: 'play none play none',
        once: true,
      },
    });

    if (abordagemCard) tlAbord.to(abordagemCard, { opacity: 1, y: 0, duration: 0.6 }, 0);

    // Counter do 20%
    if (abordagemNumberSpan) {
      const rawText = (abordagemNumberSpan.textContent || '20%').trim();
      const match = rawText.match(/\d+[\.,]?\d*/);
      const hasPercent = rawText.includes('%');
      const targetValue = match ? parseFloat(match[0].replace(',', '.')) : 20;
      abordagemNumberSpan.textContent = hasPercent ? '0%' : '0';

      const counter = { value: 0 };
      tlAbord.to(counter, {
        value: targetValue,
        duration: 1.2,
        ease: 'power1.out',
        onUpdate: () => {
          const current = Math.round(counter.value);
          abordagemNumberSpan.textContent = hasPercent ? `${current}%` : `${current}`;
        },
      }, '>-0.45');
    }

    if (abordagemTitle) tlAbord.to(abordagemTitle, { opacity: 1, y: 0, duration: 0.55 }, '>-0.1');
    if (abordagemParagraphs && abordagemParagraphs.length) {
      tlAbord.to(abordagemParagraphs, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, '>-0.2');
    }
  }

  function runSintomasAnimations() {
    const section = document.getElementById('sintomas-da-miastenia-gravis');
    if (!section) return;

    if (typeof window.gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // Header superior da seção (título e parágrafos introdutórios)
    const topHeader = section.querySelector('.symptoms-header');
    const headerTitle = topHeader ? topHeader.querySelector('.symptoms-title') : null;
    const headerParagraphs = topHeader ? topHeader.querySelectorAll('.symptoms-subtitle, .symptoms-description') : [];

    // Títulos das áreas do iceberg
    const topIcebergTitle = section.querySelector('.iceberg-section-title .iceberg-title');
    const baseIcebergTitle = section.querySelector('.iceberg-base-title-wrapper .iceberg-title-white');

    // Containers dos icebergs (topo e base)
    const icebergContainers = section.querySelectorAll('.iceberg-container');
    const icebergTopContainer = icebergContainers[0] || null;
    const icebergBaseContainer = icebergContainers[1] || null;

    // Seleciona badges por lado em toda a seção
    const leftBadges = Array.from(section.querySelectorAll('.symptom-badge-left'));
    const rightBadges = Array.from(section.querySelectorAll('.symptom-badge-right'));

    if (prefersReducedMotion) {
      if (headerTitle) gsap.set(headerTitle, { opacity: 1, y: 0 });
      headerParagraphs && headerParagraphs.forEach((p) => gsap.set(p, { opacity: 1, y: 0 }));
      if (topIcebergTitle) gsap.set(topIcebergTitle, { opacity: 1, y: 0 });
      if (baseIcebergTitle) gsap.set(baseIcebergTitle, { opacity: 1, y: 0 });
      leftBadges.forEach((el) => gsap.set(el, { opacity: 1, x: 0, y: 0 }));
      rightBadges.forEach((el) => gsap.set(el, { opacity: 1, x: 0, y: 0 }));
      return;
    }

    // Estados iniciais
    if (headerTitle) gsap.set(headerTitle, { opacity: 0, y: 24 });
    if (headerParagraphs && headerParagraphs.length) gsap.set(headerParagraphs, { opacity: 0, y: 18 });
    if (topIcebergTitle) gsap.set(topIcebergTitle, { opacity: 0, y: 20 });
    if (baseIcebergTitle) gsap.set(baseIcebergTitle, { opacity: 0, y: 20 });

    // Anima título e textos introdutórios
    if (topHeader) {
      const tlHeader = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: topHeader,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
      if (headerTitle) tlHeader.to(headerTitle, { opacity: 1, y: 0, duration: 0.6 }, 0);
      if (headerParagraphs && headerParagraphs.length) {
        tlHeader.to(headerParagraphs, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, '>-0.2');
      }
    }

    // Títulos das áreas do iceberg
    if (topIcebergTitle) {
      gsap.to(topIcebergTitle, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: icebergTopContainer || topIcebergTitle,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }

    if (baseIcebergTitle) {
      gsap.to(baseIcebergTitle, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: icebergBaseContainer || baseIcebergTitle,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }

    // Badges: surgem do lado correspondente conforme entram na tela
    if (leftBadges.length) gsap.set(leftBadges, { opacity: 0, x: -40, y: 6 });
    if (rightBadges.length) gsap.set(rightBadges, { opacity: 0, x: 40, y: 6 });

    if (window.ScrollTrigger && typeof ScrollTrigger.batch === 'function') {
      if (leftBadges.length) {
        ScrollTrigger.batch(leftBadges, {
          interval: 0.12,
          batchMax: 4,
          start: 'top 85%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              stagger: 0.1,
            });
          },
        });
      }

      if (rightBadges.length) {
        ScrollTrigger.batch(rightBadges, {
          interval: 0.12,
          batchMax: 4,
          start: 'top 85%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              stagger: 0.1,
            });
          },
        });
      }
    } else {
      [...leftBadges, ...rightBadges].forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      });
    }

    // Info Cards simplificados: 1º card sobe e depois faz counter; 2º card entra da direita
    const infoCardsContainer = section.querySelector('.info-cards-container');
    if (infoCardsContainer) {
      const infoCards = infoCardsContainer.querySelectorAll('.info-card');
      const firstCard = infoCards && infoCards.length > 0 ? infoCards[0] : null;
      const secondCard = infoCards && infoCards.length > 1 ? infoCards[1] : null;

      // Primeiro card: sobe e inicia counter do número
      if (firstCard) {
        const statsNumberSpan = firstCard.querySelector('.statistics-number');

        if (prefersReducedMotion) {
          gsap.set(firstCard, { opacity: 1, y: 0 });
          // Garante que o número permaneça no valor final do HTML
        } else {
          gsap.set(firstCard, { opacity: 0, y: 24 });
          const tlFirst = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              trigger: firstCard,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          });

          tlFirst.to(firstCard, { opacity: 1, y: 0, duration: 0.6 }, 0);

          if (statsNumberSpan) {
            const rawText = (statsNumberSpan.textContent || '90%').trim();
            const match = rawText.match(/\d+[\.,]?\d*/);
            const hasPercent = rawText.includes('%');
            const targetValue = match ? parseFloat(match[0].replace(',', '.')) : 90;
            statsNumberSpan.textContent = hasPercent ? '0%' : '0';

            const counter = { value: 0 };
            tlFirst.to(
              counter,
              {
                value: targetValue,
                duration: 1.2,
                ease: 'power1.out',
                onUpdate: () => {
                  const current = Math.round(counter.value);
                  statsNumberSpan.textContent = hasPercent ? `${current}%` : `${current}`;
                },
              },
              '>-0.6'
            );
          }
        }
      }

      // Segundo card: entra inteiro da direita para a esquerda
      if (secondCard) {
        if (prefersReducedMotion) {
          gsap.set(secondCard, { opacity: 1, x: 0 });
        } else {
          gsap.set(secondCard, { opacity: 0, x: 40 });
          gsap.to(secondCard, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: secondCard,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          });
        }
      }
    }
  }

  function runComoVidaAnimations() {
    const section = document.getElementById('como-e-a-vida-com-miastenia');
    if (!section) return;

    if (typeof window.gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    const headerBlock = section.querySelector('.flex.flex-col.items-center.w-full');
    const title = headerBlock ? headerBlock.querySelector('h2') : null;
    const paragraph = headerBlock ? headerBlock.querySelector('p') : null;

    const videoWrapper = section.querySelector('.aspect-video');
    const ctaPill = section.querySelector('.inline-flex.flex-row.items-center.justify-center.bg-rosa-50');

    if (prefersReducedMotion) {
      [title, paragraph, videoWrapper, ctaPill].forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
      return;
    }

    if (title) gsap.set(title, { opacity: 0, y: 24 });
    if (paragraph) gsap.set(paragraph, { opacity: 0, y: 18 });
    if (videoWrapper) gsap.set(videoWrapper, { opacity: 0, y: 24 });
    if (ctaPill) gsap.set(ctaPill, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none play none',
        once: true,
      },
    });

    if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.6 }, 0);
    if (paragraph) tl.to(paragraph, { opacity: 1, y: 0, duration: 0.5 }, '>-0.2');
    if (videoWrapper) tl.to(videoWrapper, { opacity: 1, y: 0, duration: 0.65 }, '>-0.1');
    if (ctaPill) tl.to(ctaPill, { opacity: 1, y: 0, duration: 0.6 }, '+=0.2');
  }

  function runViverRaroAnimations() {
    const section = document.getElementById('viver-e-raro');
    if (!section) return;

    if (typeof window.gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // Colunas
    const row = section.querySelector('.w-full.flex.flex-row.items-center.gap-10');
    const leftCol = row && row.children && row.children.length > 0 ? row.children[0] : null;
    const rightCol = row && row.children && row.children.length > 1 ? row.children[1] : null;

    const title = leftCol ? leftCol.querySelector('h2') : null;
    const paragraph = leftCol ? leftCol.querySelector('p') : null;
    const leftButton = leftCol ? leftCol.querySelector('a.btn') : null;

    const videoCard = rightCol ? rightCol.querySelector('.aspect-video') : null;
    const playButton = rightCol ? rightCol.querySelector('.btn.btn-icon') : null;

    if (prefersReducedMotion) {
      [title, paragraph, leftButton, videoCard, playButton].forEach((el) => el && gsap.set(el, { opacity: 1, y: 0, scale: 1 }));
      return;
    }

    if (title) gsap.set(title, { opacity: 0, y: 24 });
    if (paragraph) gsap.set(paragraph, { opacity: 0, y: 18 });
    if (leftButton) gsap.set(leftButton, { opacity: 0, y: 14, scale: 0.98 });
    if (videoCard) gsap.set(videoCard, { opacity: 0, y: 24 });
    if (playButton) gsap.set(playButton, { opacity: 0, scale: 0.9, transformOrigin: '50% 50%' });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none play none',
        once: true,
      },
    });

    if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.6 }, 0);
    if (paragraph) tl.to(paragraph, { opacity: 1, y: 0, duration: 0.5 }, '>-0.2');
    if (leftButton) tl.to(leftButton, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, '>-0.2');
    if (videoCard) tl.to(videoCard, { opacity: 1, y: 0, duration: 0.65 }, '>-0.1');
    if (playButton) tl.to(playButton, { opacity: 1, scale: 1, duration: 0.45 }, '>-0.25');
  }

  function runQuandoJuntosAnimations() {
    const section = document.getElementById('quando-estamos-juntos-a-tempestade-passa');
    if (!section) return;

    if (typeof window.gsap === 'undefined') return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    const block = section.querySelector('.w-full.bg-azul-100.p-10.rounded-3xl');

    if (!block) return;

    if (prefersReducedMotion) {
      gsap.set(block, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(block, { opacity: 0, y: 24 });
    gsap.to(block, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
    });
  }

  // Executa após assets carregarem para evitar jump de layout
  function initAnimations() {
    const runAll = () => {
      runHeroAnimations();
      runMiasteniaAnimations();
      runDiagnosticoAnimations();
      runDiagnosticoMGAnimations();
      runEntendaAnimations();
      runEntendaNumerosAnimations();
      runComoAgeAnimations();
      runJuncoesAnimations();
      runTiposMiasteniaAnimations();
      runTratamentoAnimations();
      runSintomasAnimations();
      runComoVidaAnimations();
      runViverRaroAnimations();
      runQuandoJuntosAnimations();
      if (window.ScrollTrigger && typeof ScrollTrigger.refresh === 'function') {
        // Garante cálculo correto das posições após carregar via âncora
        ScrollTrigger.refresh();
      }
    };

    // Aguarda carregamento de fontes para evitar warning do SplitText e garantir medição correta de linhas
    if (document.fonts && document.fonts.ready && typeof document.fonts.ready.then === 'function') {
      document.fonts.ready.then(runAll).catch(runAll);
    } else {
      runAll();
    }
  }

  if (document.readyState === 'complete') {
    initAnimations();
  } else {
    window.addEventListener('load', initAnimations);
  }
})();