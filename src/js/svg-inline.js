/**
 * Script para renderizar SVGs inline
 * Substitui tags <img> com classe "svg-inline" pelo conteúdo SVG
 */

function inlineSVG() {
    // Seleciona todas as imagens com a classe "svg-inline"
    const svgImages = document.querySelectorAll('img.svg-inline');
    
    svgImages.forEach(img => {
        const src = img.getAttribute('src');
        
        // Verifica se é um arquivo SVG
        if (src && src.endsWith('.svg')) {
            // Faz a requisição para buscar o conteúdo do SVG
            fetch(src)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro ao carregar SVG: ${response.status}`);
                    }
                    return response.text();
                })
                .then(svgContent => {
                    // Cria um elemento temporário para parsear o SVG
                    const parser = new DOMParser();
                    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
                    const svgElement = svgDoc.querySelector('svg');
                    
                    if (svgElement) {
                        // Preserva atributos da tag img original
                        const imgClasses = img.getAttribute('class');
                        const imgId = img.getAttribute('id');
                        const imgStyle = img.getAttribute('style');
                        const imgWidth = img.getAttribute('width');
                        const imgHeight = img.getAttribute('height');
                        
                        // Aplica os atributos ao SVG
                        if (imgClasses) {
                            svgElement.setAttribute('class', imgClasses);
                        }
                        if (imgId) {
                            svgElement.setAttribute('id', imgId);
                        }
                        if (imgStyle) {
                            svgElement.setAttribute('style', imgStyle);
                        }
                        if (imgWidth) {
                            svgElement.setAttribute('width', imgWidth);
                        }
                        if (imgHeight) {
                            svgElement.setAttribute('height', imgHeight);
                        }
                        
                        // Substitui a tag img pelo SVG
                        img.parentNode.replaceChild(svgElement, img);
                    }
                })
                .catch(error => {
                    console.warn('Erro ao carregar SVG inline:', error);
                });
        }
    });
}

// Executa quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inlineSVG);
} else {
    inlineSVG();
}

// Exporta a função para uso manual se necessário
window.inlineSVG = inlineSVG;
