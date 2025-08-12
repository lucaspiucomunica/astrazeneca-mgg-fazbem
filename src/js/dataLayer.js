// DataLayer para Tracking de KPIs - Miastenia Gravis
// Configuração de eventos personalizados para GTM/GA

class MiasteniaTracker {
    constructor() {
        this.scrollThresholds = [25, 50, 75, 90, 100];
        this.scrollTracked = new Set();
        this.sectionsViewed = new Set();
        this.startTime = Date.now();
        this.userJourney = [];
        this.videosViewed = new Set(); // Para controlar vídeos já visualizados
        
        this.init();
    }

    init() {
        this.setupScrollTracking();
        this.setupClickTracking();
        this.setupVideoTracking();
        this.setupSectionVisibility();
        this.setupUserJourney();
    }

    // Função para enviar eventos para o dataLayer
    sendEvent(eventName, parameters = {}) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: eventName,
            timestamp: Date.now(),
            page_title: document.title,
            page_url: window.location.href,
            ...parameters
        });
        
        console.log('📊 Event Sent:', eventName, parameters);
    }

    // 1. SCROLL TRACKING
    setupScrollTracking() {
        let ticking = false;
        
        const trackScroll = () => {
            const scrollPercentage = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            // Track scroll milestones
            this.scrollThresholds.forEach(threshold => {
                if (scrollPercentage >= threshold && !this.scrollTracked.has(threshold)) {
                    this.scrollTracked.add(threshold);
                    this.sendEvent('scroll_milestone', {
                        scroll_percentage: threshold,
                        scroll_depth: `${threshold}%`
                    });
                }
            });

            this.lastScrollTime = Date.now();
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(trackScroll);
                ticking = true;
            }
        });
    }

    // 2. SECTION VISIBILITY TRACKING
    setupSectionVisibility() {
        const sections = [
            { id: 'hero', name: 'Hero - Apresentação', order: 1 },
            { id: 'miastenia-gravis', name: 'Miastenia Gravis - Introdução', order: 2 },
            { id: 'quando-o-diagnostico-chega', name: 'Quando o Diagnóstico Chega', order: 3 },
            { id: 'entenda-a-miastenia-gravis', name: 'Entenda a Miastenia Gravis', order: 4 },
            { id: 'sintomas-da-miastenia-gravis', name: 'Sintomas da Miastenia Gravis', order: 5 },
            { id: 'diagnostico-de-miastenia-gravis', name: 'Diagnóstico de Miastenia Gravis', order: 6 },
            { id: 'tratamento-para-a-miastenia-gravis', name: 'Tratamento para a Miastenia Gravis', order: 7 },
            { id: 'como-e-a-vida-com-miastenia', name: 'Como é a Vida com Miastenia', order: 8 },
            { id: 'viver-e-raro', name: 'Viver é Raro - Série GloboPlay', order: 9 },
            { id: 'quando-estamos-juntos-a-tempestade-passa', name: 'Associações de Apoio', order: 10 }
        ];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Reduzir threshold para seções mais complexas
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const sectionData = sections.find(s => s.id === entry.target.id);
                    if (sectionData && !this.sectionsViewed.has(sectionData.id)) {
                        this.sectionsViewed.add(sectionData.id);
                        
                        // Adicionar à jornada do usuário
                        this.userJourney.push({
                            section: sectionData.name,
                            timestamp: Date.now(),
                            order: sectionData.order
                        });

                        this.sendEvent('section_viewed', {
                            section_id: sectionData.id,
                            section_name: sectionData.name,
                            section_order: sectionData.order,
                            sections_viewed_count: this.sectionsViewed.size,
                            time_to_section: Date.now() - this.startTime,
                            intersection_ratio: Math.round(entry.intersectionRatio * 100) / 100
                        });
                    }
                }
            });
        }, { 
            threshold: [0.1, 0.3, 0.5], // Múltiplos thresholds
            rootMargin: '0px 0px -10% 0px' // Margem para trigger mais cedo
        });

        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });
    }

    // 3. CLICK TRACKING
    setupClickTracking() {
        // CTAs principais - específicos para não conflitar com menu
        const mainCTAs = [
            { selector: '#hero a[href="#miastenia-gravis"]', name: 'CTA Hero - Saiba Mais' }, // Apenas no hero
            { selector: 'a[href*="programafazbem.com.br/historia-miastenia"]', name: 'CTA História Rita' },
            { selector: 'a[href*="globoplay.globo.com"]', name: 'CTA Viver é Raro - Assistir Agora' } // Inclui todos os links do GloboPlay
        ];

        // Links de associações
        const associationLinks = [
            { selector: 'a[href*="abrami.org.br"]', name: 'Link Associação ABRAMI' },
            { selector: 'a[href*="afagbrasil.org.br"]', name: 'Link Associação AFAG' },
            { selector: 'a[href*="casahunter.org.br"]', name: 'Link Casa Hunter' },
            { selector: 'a[href*="instagram.com/ammi_associacao"]', name: 'Link Associação AMMI' }
        ];

        // Menu de navegação
        const menuItems = document.querySelectorAll('.menu-item');
        
        // Track main CTAs
        mainCTAs.forEach(cta => {
            document.addEventListener('click', (e) => {
                if (e.target.closest(cta.selector)) {
                    const link = e.target.closest(cta.selector);
                    this.sendEvent('cta_click', {
                        cta_name: cta.name,
                        cta_url: link.href,
                        cta_position: this.getElementPosition(link),
                        time_on_page: Date.now() - this.startTime
                    });
                }
            });
        });

        // Track association links
        associationLinks.forEach(assoc => {
            document.addEventListener('click', (e) => {
                if (e.target.closest(assoc.selector)) {
                    const link = e.target.closest(assoc.selector);
                    this.sendEvent('association_link_click', {
                        association_name: assoc.name,
                        association_url: link.href,
                        time_on_page: Date.now() - this.startTime
                    });
                }
            });
        });

        // Track menu navigation
        menuItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                const href = item.getAttribute('href');
                const text = item.querySelector('.menu-item-text')?.textContent || 'Menu Item';
                
                this.sendEvent('menu_navigation', {
                    menu_item: text,
                    menu_target: href,
                    menu_position: index + 1,
                    time_on_page: Date.now() - this.startTime
                });
            });
        });

        // Track menu open/close
        const btnMenu = document.getElementById('btn-menu');
        const btnMenuClose = document.getElementById('btn-menu-close');
        
        if (btnMenu) {
            btnMenu.addEventListener('click', () => {
                this.sendEvent('menu_interaction', {
                    action: 'open_menu',
                    time_on_page: Date.now() - this.startTime
                });
            });
        }
        
        if (btnMenuClose) {
            btnMenuClose.addEventListener('click', () => {
                this.sendEvent('menu_interaction', {
                    action: 'close_menu',
                    time_on_page: Date.now() - this.startTime
                });
            });
        }
    }

    // 4. VIDEO TRACKING
    setupVideoTracking() {
        // Vídeo Hero - Track quando thumbnail fica visível
        const heroThumbnail = document.getElementById('hero-video-thumbnail');

        if (heroThumbnail) {
            // Track quando thumbnail fica visível (apenas uma vez)
            const videoId = 'youtube_hero_video';
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.videosViewed.has(videoId)) {
                        this.videosViewed.add(videoId);
                        this.sendEvent('video_in_view', {
                            video_type: 'youtube',
                            video_title: 'Miastenia Gravis - A tempestade vai e a vida volta',
                            video_id: '67MXay-B9VU',
                            time_on_page: Date.now() - this.startTime
                        });
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(heroThumbnail);
        }

        // Vídeo da Rita - Track quando thumbnail fica visível
        const ritaThumbnail = document.getElementById('rita-video-thumbnail');

        if (ritaThumbnail) {
            // Track quando thumbnail fica visível (apenas uma vez)
            const videoId = 'youtube_rita_video';
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.videosViewed.has(videoId)) {
                        this.videosViewed.add(videoId);
                        this.sendEvent('video_in_view', {
                            video_type: 'youtube',
                            video_title: 'Como é a vida com Miastenia?',
                            video_id: '67MXay-B9VU',
                            time_on_page: Date.now() - this.startTime
                        });
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(ritaThumbnail);
        }
    }

    // 5. USER JOURNEY TRACKING
    setupUserJourney() {
        // Track quando usuário sai da página
        window.addEventListener('beforeunload', () => {
            // Analisar jornada do usuário
            const journeyAnalysis = this.analyzeUserJourney();
            
            this.sendEvent('user_journey_complete', {
                total_sections_viewed: this.sectionsViewed.size,
                journey_sequence: journeyAnalysis.sequence,
                journey_pattern: journeyAnalysis.pattern,
                total_time: Date.now() - this.startTime,
                scroll_completion: Math.max(...Array.from(this.scrollTracked).filter(t => typeof t === 'number')) || 0
            });
        });
    }

    // Análise da jornada do usuário
    analyzeUserJourney() {
        // Ordenar por timestamp
        const sortedJourney = this.userJourney.sort((a, b) => a.timestamp - b.timestamp);
        
        // Criar sequência de seções visitadas
        const sequence = sortedJourney.map(item => item.order).join(' → ');
        
        // Determinar padrão de navegação
        let pattern = 'linear'; // padrão linear (1 → 2 → 3...)
        
        if (sortedJourney.length > 1) {
            let isLinear = true;
            for (let i = 1; i < sortedJourney.length; i++) {
                if (sortedJourney[i].order <= sortedJourney[i-1].order) {
                    isLinear = false;
                    break;
                }
            }
            
            if (!isLinear) {
                // Verificar se houve muito jumping (pulos de seção)
                const jumps = sortedJourney.filter((item, index) => {
                    if (index === 0) return false;
                    return Math.abs(item.order - sortedJourney[index-1].order) > 2;
                });
                
                pattern = jumps.length > 2 ? 'exploratory' : 'mixed';
            }
        }
        
        return { sequence, pattern };
    }

    // UTILITY FUNCTIONS
    getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: Math.round(rect.top + window.scrollY),
            left: Math.round(rect.left + window.scrollX),
            viewport_top: Math.round(rect.top),
            viewport_left: Math.round(rect.left)
        };
    }

    // Método público para tracking customizado
    trackCustomEvent(eventName, parameters = {}) {
        this.sendEvent(eventName, {
            custom_event: true,
            ...parameters
        });
    }

    // Método para obter resumo da jornada atual
    getCurrentJourney() {
        return {
            sections_viewed: Array.from(this.sectionsViewed),
            scroll_progress: Math.max(...Array.from(this.scrollTracked).filter(t => typeof t === 'number')) || 0,
            time_on_page: Date.now() - this.startTime,
            journey_sequence: this.userJourney.map(j => j.order).join(' → ')
        };
    }
}

// Initialize tracking when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.miasteniaTracker = new MiasteniaTracker();
    
    // Expose tracker globally for custom events
    window.trackCustomEvent = (eventName, params) => {
        window.miasteniaTracker.trackCustomEvent(eventName, params);
    };
    
    // Expose journey info globally
    window.getCurrentJourney = () => {
        return window.miasteniaTracker.getCurrentJourney();
    };
});

// Initialize dataLayer if not exists
window.dataLayer = window.dataLayer || [];
