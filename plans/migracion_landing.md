# Plan de Migración: Landing Page Hofi a Angular

## Objetivo

Migrar la landing page diseñada previamente en un archivo estático HTML (`Landing.html`) a una arquitectura moderna en Angular, asegurando el cumplimiento de las mejores prácticas (Angular v20+, Standalone Components, Signals, `OnPush` change detection) y garantizando que el diseño sea responsive.

---

## 1. Análisis del Diseño Original

- **Responsividad:** Revisando el código de `Landing.html`, el diseño **sí contiene responsividad**, con media queries establecidos para pantallas de `940px`, `880px`, `860px`, `600px` y `520px`. Estos aseguran su correcta visualización en móviles, tablets y escritorio. Se preservarán estas reglas de estilo.
- **Estructura CSS:** **Se definirán TODAS las variables globales y de tema en `src/styles.scss`**. Estas variables se importarán y utilizarán en los archivos `.scss` de cada componente para mantener una alineación perfecta con el diseño. El CSS restante se modularizará por componente.
- **Imágenes:** Se usarán rutas relativas y la directiva `NgOptimizedImage` de Angular para una carga optimizada.

---

## 2. División de Componentes

Se propone la creación de la siguiente estructura de componentes _Standalone_. Cada uno tendrá la estrategia `ChangeDetectionStrategy.OnPush`.

### 2.1 `NavComponent` (`src/app/components/nav/nav.component.ts`)

- **Propósito:** Barra de navegación superior.
- **Funcionalidad:**
  - Contendrá el logo, enlaces ancla y el botón "Descargar".
  - Se añadirá un `@HostListener` o lógica equivalente con signals para manejar el evento `scroll` de la ventana y aplicar la clase `.scrolled` al hacer scroll hacia abajo (como el script al final de `Landing.html`).

### 2.2 `HeroComponent` (`src/app/components/hero/hero.component.ts`)

- **Propósito:** Sección principal (Hero) que incluye el mensaje "Divide los gastos del hogar..." y el mockup del teléfono.
- **Funcionalidad:**
  - Contendrá toda la grilla principal y la interfaz del celular.
  - **Mockup de la App Real:** En lugar del diseño sugerido por Claude para el teléfono, se usará el diseño real de la aplicación. Para ello, se copiará el código HTML y SCSS directamente desde `hofi-app/src/app/features/dashboard/home`, y se reemplazarán los bindings dinámicos por datos falsos estáticos. **Consideración importante:** Dado que el Home real utiliza variables propias de ese proyecto, se deberán hardcodear sus estilos de colores en el SCSS local de este componente. Este hardcodeo debe basarse en el diseño en modo oscuro y aplicar el color verde principal de la app para que se visualice correctamente en la landing.

### 2.3 `FeaturesComponent` (`src/app/components/features/features.component.ts`)

- **Propósito:** Grilla "Bento" de características ("Todo en una app").
- **Funcionalidad:**
  - Se modularizarán las distintas tarjetas de funcionalidades (Captura con IA, Rewind, Balances, Ritmo, Modos de división).
  - Los íconos y SVG se integrarán directamente en el template.

### 2.4 `CtaBandComponent` (`src/app/components/cta-band/cta-band.component.ts`)

- **Propósito:** Banda final de llamado a la acción.
- **Funcionalidad:**
  - Botones hacia Google Play y el indicador "Próximamente" para App Store.

### 2.5 `FooterComponent` (`src/app/components/footer/footer.component.ts`)

- **Propósito:** Pie de página.
- **Funcionalidad:**
  - Enlaces de producto, legales (Privacidad, Términos) y derechos de autor.

---

## 3. Integración en `AppComponent` (`src/app/app.html`)

Una vez creados los componentes, `app.html` quedará limpio y altamente semántico de esta manera:

```html
<app-nav></app-nav>
<main>
  <app-hero></app-hero>
  <app-features></app-features>
  <app-cta-band></app-cta-band>
</main>
<app-footer></app-footer>
```

---

## 4. Buenas Prácticas y Herramientas

Siguiendo las directrices del proyecto:

1. **Instalación:** Si se necesita instalar cualquier dependencia, se ejecutará **exclusivamente con `yarn`** (`yarn add ...`).
2. **Componentes:**
   - 100% Standalone (Sin `standalone: true` explícito si es v20+).
   - Uso de `ChangeDetectionStrategy.OnPush`.
   - Se priorizarán templates inline si el código es pequeño, pero debido al extenso HTML de cada sección, usaremos archivos `.html` y `.scss` separados.
3. **Gestión de estado/lógica:**
   - Uso de `Signals` si fuera necesario tener interactividad (por ejemplo, el menú móvil o el scroll de la navbar).
4. **Optimización e Imágenes:**
   - Incorporar `NgOptimizedImage` para las imágenes estáticas como los logos y mockups.

---

## 5. Estado del Plan

Las directrices han sido actualizadas (Variables en `styles.scss` y uso del código de la app real para el Home dentro del celular).

**A la espera de tu confirmación para dar inicio a la ejecución.**
