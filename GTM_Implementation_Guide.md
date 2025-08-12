# 📊 Guia de Implementação - Google Tag Manager
## Miastenia Gravis - Tracking de KPIs

### 📋 Visão Geral

Este guia apresenta como configurar o Google Tag Manager para capturar os eventos personalizados do site Miastenia Gravis. O sistema de tracking foca em 4 KPIs principais:

1. **Scroll Tracking & Engajamento de Conteúdo**
2. **Interações com CTAs e Links**
3. **Engajamento com Vídeos**
4. **Jornada do Usuário**

---

## 🎯 Eventos Disponíveis no DataLayer

### **1. Scroll & Seções**

#### `scroll_milestone`
**Quando dispara:** A cada marco de scroll atingido
```javascript
{
  event: 'scroll_milestone',
  scroll_percentage: 50,
  scroll_depth: '50%',
  timestamp: 1704067200000,
  page_title: 'Miastenia Gravis - A tempestade vai e a vida volta',
  page_url: 'https://materiais.programafazbem.com.br/miastenia-gravis'
}
```

#### `section_viewed`
**Quando dispara:** Quando uma seção fica 30% visível na tela
```javascript
{
  event: 'section_viewed',
  section_id: 'entenda-a-miastenia-gravis',
  section_name: 'Entenda a Miastenia Gravis',
  section_order: 4,
  sections_viewed_count: 3,
  time_to_section: 45000,
  intersection_ratio: 0.65
}
```

### **2. CTAs & Links**

#### `cta_click`
**Quando dispara:** Clique em CTAs principais
```javascript
{
  event: 'cta_click',
  cta_name: 'CTA Hero - Saiba Mais',
  cta_url: '#miastenia-gravis',
  cta_position: {
    top: 500,
    left: 100,
    viewport_top: 200,
    viewport_left: 100
  },
  time_on_page: 15000
}
```

#### `association_link_click`
**Quando dispara:** Clique em links de associações
```javascript
{
  event: 'association_link_click',
  association_name: 'Link Associação ABRAMI',
  association_url: 'https://www.abrami.org.br/old/',
  time_on_page: 120000
}
```

#### `menu_navigation` & `menu_interaction`
**Quando dispara:** Navegação e interação com menu
```javascript
// Navegação
{
  event: 'menu_navigation',
  menu_item: 'Sintomas da Miastenia Gravis',
  menu_target: '#sintomas-da-miastenia-gravis',
  menu_position: 4,
  time_on_page: 30000
}

// Interação
{
  event: 'menu_interaction',
  action: 'open_menu', // ou 'close_menu'
  time_on_page: 25000
}
```

### **3. Vídeos**

#### `video_in_view`
**Quando dispara:** Vídeo fica visível (apenas 1x)
```javascript
// Vídeo Hero
{
  event: 'video_in_view',
  video_type: 'youtube',
  video_title: 'Miastenia Gravis - A tempestade vai e a vida volta',
  video_id: '67MXay-B9VU',
  time_on_page: 5000
}

// Vídeo da Rita
{
  event: 'video_in_view',
  video_type: 'youtube',
  video_title: 'Como é a vida com Miastenia?',
  video_id: '67MXay-B9VU',
  time_on_page: 60000
}
```

#### `video_play_youtube`
**Quando dispara:** Clique no botão play do YouTube
```javascript
// Vídeo Hero
{
  event: 'video_play_youtube',
  video_title: 'Miastenia Gravis - A tempestade vai e a vida volta',
  video_id: '67MXay-B9VU',
  custom_event: true
}

// Vídeo da Rita
{
  event: 'video_play_youtube',
  video_title: 'Como é a vida com Miastenia?',
  video_id: '67MXay-B9VU',
  custom_event: true
}
```

### **4. Jornada do Usuário**

#### `user_journey_complete`
**Quando dispara:** Usuário sai da página
```javascript
{
  event: 'user_journey_complete',
  total_sections_viewed: 6,
  journey_sequence: '1 → 2 → 4 → 5 → 8 → 10',
  journey_pattern: 'mixed', // 'linear', 'mixed', 'exploratory'
  total_time: 180000,
  scroll_completion: 75
}
```

---

## ⚙️ Configuração no Google Tag Manager

### **Passo 1: Variáveis**

Crie as seguintes variáveis do tipo **Data Layer Variable**:

#### **Variáveis de Scroll**
- `DLV - Scroll Percentage` → `scroll_percentage`
- `DLV - Scroll Depth` → `scroll_depth`

#### **Variáveis de Seção**
- `DLV - Section ID` → `section_id`
- `DLV - Section Name` → `section_name`
- `DLV - Section Order` → `section_order`
- `DLV - Sections Viewed Count` → `sections_viewed_count`
- `DLV - Time to Section` → `time_to_section`

#### **Variáveis de CTA**
- `DLV - CTA Name` → `cta_name`
- `DLV - CTA URL` → `cta_url`
- `DLV - Association Name` → `association_name`
- `DLV - Association URL` → `association_url`

#### **Variáveis de Menu**
- `DLV - Menu Item` → `menu_item`
- `DLV - Menu Target` → `menu_target`
- `DLV - Menu Action` → `action`

#### **Variáveis de Vídeo**
- `DLV - Video Type` → `video_type`
- `DLV - Video Title` → `video_title`
- `DLV - Video ID` → `video_id`

#### **Variáveis de Jornada**
- `DLV - Journey Sequence` → `journey_sequence`
- `DLV - Journey Pattern` → `journey_pattern`
- `DLV - Total Sections Viewed` → `total_sections_viewed`
- `DLV - Total Time` → `total_time`

#### **Variáveis Globais**
- `DLV - Time on Page` → `time_on_page`
- `DLV - Page Title` → `page_title`
- `DLV - Page URL` → `page_url`

### **Passo 2: Triggers**

#### **Triggers de Scroll**
1. **Trigger Name:** `CE - Scroll Milestone`
   - **Trigger Type:** Custom Event
   - **Event Name:** `scroll_milestone`

2. **Trigger Name:** `CE - Section Viewed`
   - **Trigger Type:** Custom Event
   - **Event Name:** `section_viewed`

#### **Triggers de CTA**
3. **Trigger Name:** `CE - CTA Click`
   - **Trigger Type:** Custom Event
   - **Event Name:** `cta_click`

4. **Trigger Name:** `CE - Association Link Click`
   - **Trigger Type:** Custom Event
   - **Event Name:** `association_link_click`

#### **Triggers de Menu**
5. **Trigger Name:** `CE - Menu Navigation`
   - **Trigger Type:** Custom Event
   - **Event Name:** `menu_navigation`

6. **Trigger Name:** `CE - Menu Interaction`
   - **Trigger Type:** Custom Event
   - **Event Name:** `menu_interaction`

#### **Triggers de Vídeo**
7. **Trigger Name:** `CE - Video in View`
   - **Trigger Type:** Custom Event
   - **Event Name:** `video_in_view`

8. **Trigger Name:** `CE - Video Play YouTube`
   - **Trigger Type:** Custom Event
   - **Event Name:** `video_play_youtube`

#### **Triggers de Jornada**
9. **Trigger Name:** `CE - User Journey Complete`
   - **Trigger Type:** Custom Event
   - **Event Name:** `user_journey_complete`

### **Passo 3: Tags GA4**

#### **1. Scroll Tracking**
- **Tag Name:** `GA4 - Scroll Milestone`
- **Tag Type:** Google Analytics: GA4 Event
- **Event Name:** `scroll_milestone`
- **Event Parameters:**
  - `scroll_percentage` → `{{DLV - Scroll Percentage}}`
  - `scroll_depth` → `{{DLV - Scroll Depth}}`
  - `time_on_page` → `{{DLV - Time on Page}}`
- **Trigger:** `CE - Scroll Milestone`

#### **2. Section Engagement**
- **Tag Name:** `GA4 - Section Viewed`
- **Tag Type:** Google Analytics: GA4 Event
- **Event Name:** `section_viewed`
- **Event Parameters:**
  - `section_name` → `{{DLV - Section Name}}`
  - `section_order` → `{{DLV - Section Order}}`
  - `sections_viewed_count` → `{{DLV - Sections Viewed Count}}`
  - `time_to_section` → `{{DLV - Time to Section}}`
- **Trigger:** `CE - Section Viewed`

#### **3. CTA Performance**
- **Tag Name:** `GA4 - CTA Click`
- **Tag Type:** Google Analytics: GA4 Event
- **Event Name:** `cta_click`
- **Event Parameters:**
  - `cta_name` → `{{DLV - CTA Name}}`
  - `cta_url` → `{{DLV - CTA URL}}`
  - `time_on_page` → `{{DLV - Time on Page}}`
- **Trigger:** `CE - CTA Click`

#### **4. Association Interest**
- **Tag Name:** `GA4 - Association Link Click`
- **Tag Type:** Google Analytics: GA4 Event
- **Event Name:** `association_click`
- **Event Parameters:**
  - `association_name` → `{{DLV - Association Name}}`
  - `association_url` → `{{DLV - Association URL}}`
  - `time_on_page` → `{{DLV - Time on Page}}`
- **Trigger:** `CE - Association Link Click`

#### **5. Menu Usage**
- **Tag Name:** `GA4 - Menu Navigation`
- **Tag Type:** Google Analytics: GA4 Event
- **Event Name:** `menu_navigation`
- **Event Parameters:**
  - `menu_item` → `{{DLV - Menu Item}}`
  - `menu_target` → `{{DLV - Menu Target}}`
- **Trigger:** `CE - Menu Navigation`

#### **6. Video Engagement**
- **Tag Name:** `GA4 - Video Play YouTube`
- **Tag Type:** Google Analytics: GA4 Event
- **Event Name:** `video_play`
- **Event Parameters:**
  - `video_title` → `{{DLV - Video Title}}`
  - `video_id` → `{{DLV - Video ID}}`
  - `video_type` → `{{DLV - Video Type}}`
- **Trigger:** `CE - Video Play YouTube`

#### **7. User Journey**
- **Tag Name:** `GA4 - User Journey Complete`
- **Tag Type:** Google Analytics: GA4 Event
- **Event Name:** `user_journey_complete`
- **Event Parameters:**
  - `journey_sequence` → `{{DLV - Journey Sequence}}`
  - `journey_pattern` → `{{DLV - Journey Pattern}}`
  - `total_sections_viewed` → `{{DLV - Total Sections Viewed}}`
  - `total_time` → `{{DLV - Total Time}}`
- **Trigger:** `CE - User Journey Complete`

---

## 📈 Relatórios e Insights

### **1. Engajamento de Conteúdo**
- **Métrica:** Seções mais visualizadas
- **Dimensão:** `section_name`
- **Insight:** Qual conteúdo gera mais interesse

### **2. Performance de CTAs**
- **Métrica:** Taxa de clique por CTA
- **Dimensão:** `cta_name`
- **Insight:** Quais CTAs convertem melhor

### **3. Scroll Behavior**
- **Métrica:** Distribuição de scroll depth
- **Dimensão:** `scroll_percentage`
- **Insight:** Onde usuários param de ler

### **4. Padrões de Navegação**
- **Métrica:** Tipos de jornada
- **Dimensão:** `journey_pattern`
- **Insight:** Como usuários navegam

### **5. Video Performance**
- **Métrica:** View-to-Play Rate
- **Cálculo:** `video_play` / `video_in_view`
- **Insight:** Efetividade do conteúdo em vídeo

---

## 🚀 Próximos Passos

1. **Configure as variáveis** no GTM conforme listado
2. **Crie os triggers** para cada evento
3. **Configure as tags GA4** com os parâmetros
4. **Teste em Preview Mode** antes de publicar
5. **Publique a versão** após validação
6. **Configure relatórios** no GA4 para análise

---

## 🔍 Validação e Testes

### **Checklist de Testes:**
- [ ] Scroll milestones disparando corretamente
- [ ] Seções sendo trackadas ao ficarem visíveis
- [ ] CTAs registrando cliques
- [ ] Menu navigation funcionando
- [ ] Vídeo Hero events disparando (video_in_view e video_play_youtube)
- [ ] Vídeo Rita events disparando (video_in_view e video_play_youtube)
- [ ] Journey complete no page exit
- [ ] Todos os parâmetros chegando no GA4

### **Ferramentas de Debug:**
- **GTM Preview Mode:** Verificar triggers e tags
- **GA4 DebugView:** Confirmar eventos chegando
- **Console do Browser:** Logs do dataLayer
- **GTM Assistant:** Extensão para Chrome

---

## 📞 Suporte

Para dúvidas sobre implementação:
1. Verifique se o script `dataLayer.js` está carregando
2. Confirme se os elementos HTML têm os IDs corretos
3. Teste em diferentes dispositivos e navegadores
4. Use o Preview Mode do GTM para debug

---
