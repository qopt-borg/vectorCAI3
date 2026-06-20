# VECTOR — Suite de entrenamiento de aritmética vectorial

Proyecto Quasar/Vue corregido para renderizar ecuaciones LaTeX en línea dentro de textos de teoría.

## Ejecutar

```bash
npm install
npm run dev
```

## LaTeX inline

En `src/composables/topics.js`, usa `$...$` dentro de bloques de texto:

```js
{ tipo: 'texto', contenido: 'El vector inicia en $\\mathbf{B}$ y termina en $\\mathbf{A}$.' }
```

En strings de JavaScript, la diagonal invertida debe escribirse doble: `\\`.
