// ─────────────────────────────────────────────────────────────
// topics.js — define los 6 módulos de la app
// Cada topic tiene: metadata, generador de datos, verificador,
// generador de desarrollo paso a paso y teoría en LaTeX.
// ─────────────────────────────────────────────────────────────
import { useVectorMath } from 'src/composables/useVectorMath'
import { useLatex }      from 'src/composables/useLatex'

const { randomVector, vectorNorm, angleBetween, add, diff, dotProduct, crossProduct, round } = useVectorMath()
const { vecLatex, vecExpr } = useLatex()

export const TOPICS = [
  // ── 1. SUMAS ────────────────────────────────────────────────
  {
    id: 'sumas',
    titulo: 'Suma de vectores',
    subtitulo: 'Calcula la suma componente a componente',
    icon: 'mdi-plus',
    enunciado: 'Calcula la suma A + B de los siguientes vectores:',
    tipoRespuesta: 'vector',   // 'vector' | 'scalar'

    teoria: [
      { tipo: 'texto', contenido: 'Dados dos vectores de tres dimensiones:' },
      { tipo: 'latex', contenido: '\\mathbf{A}=A_x\\mathbf{i}+A_y\\mathbf{j}+A_z\\mathbf{k}' },
      { tipo: 'latex', contenido: '\\mathbf{B}=B_x\\mathbf{i}+B_y\\mathbf{j}+B_z\\mathbf{k}' },
      { tipo: 'texto', contenido: 'La suma se calcula componente a componente:' },
      { tipo: 'latex', contenido: '\\mathbf{A}+\\mathbf{B}=(A_x+B_x)\\mathbf{i}+(A_y+B_y)\\mathbf{j}+(A_z+B_z)\\mathbf{k}' },
      { tipo: 'texto', contenido: 'El resultado es un nuevo vector que, geométricamente, satisface la regla del paralelogramo.' }
    ],

    genData() {
      const A = randomVector()
      const B = randomVector()
      return { A, B, res: add(A, B) }
    },

    check(data, vals) {
      const r = data.res
      return vals[0] === r[0] && vals[1] === r[1] && vals[2] === r[2]
    },

    desarrollo(data) {
      const { A, B, res } = data
      return [
        { label: 'Consejos',     valor: ` Identifica el valor numérico de  $A_x$, $A_y$ y $A_z$. También identifica el valor numérico de $B_x$, $B_y$ y $B_z$. Posteriormente; si tiene práctica, debe sustitur estas cantidades en la fórmula $\\mathbf{A}+\\mathbf{B}=(A_x+B_x)\\mathbf{i}+(A_y+B_y)\\mathbf{j}+(A_z+B_z)\\mathbf{k}$. Si está en proceso de aprendizaje, maneje por separado las componentes del vector suma:` },
        { label: 'Componente x',     valor: `(\\mathbf{A}+\\mathbf{B})_x = (${A[0]}) + (${B[0]}) = ${res[0]}` , esLatex: true },
        { label: 'Componente y',     valor: `(\\mathbf{A}+\\mathbf{B})_y = (${A[1]}) + (${B[1]}) = ${res[1]}` , esLatex: true },
        { label: 'Componente z',     valor: `(\\mathbf{A}+\\mathbf{B})_z = (${A[2]}) + (${B[2]}) = ${res[2]}` , esLatex: true },
        { label: 'Resultado',   valor: vecLatex('A+B', res), esLatex: true }
      ]
    }
  },

  // ── 2. RESTAS ───────────────────────────────────────────────
  {
    id: 'restas',
    titulo: 'Resta de vectores',
    subtitulo: 'Calcula la diferencia componente a componente',
    icon: 'mdi-minus',
    enunciado: 'Calcula la resta A − B de los siguientes vectores:',
    tipoRespuesta: 'vector',

    teoria: [
      { tipo: 'texto', contenido: 'Dados dos vectores de tres dimensiones:' },
      { tipo: 'latex', contenido: '\\mathbf{A}=A_x\\mathbf{i}+A_y\\mathbf{j}+A_z\\mathbf{k}' },
      { tipo: 'latex', contenido: '\\mathbf{B}=B_x\\mathbf{i}+B_y\\mathbf{j}+B_z\\mathbf{k}' },
      { tipo: 'texto', contenido: 'La resta se calcula componente a componente:' },
      { tipo: 'latex', contenido: '\\mathbf{A}-\\mathbf{B}=(A_x-B_x)\\mathbf{i}+(A_y-B_y)\\mathbf{j}+(A_z-B_z)\\mathbf{k}' },
      { tipo: 'texto', contenido: 'El resultado es un nuevo vector que conecta los dos extremos de los vectores. El vector resta inicia en la punta de $\\mathbf{B}$ (El vector quetiene el signo negativo) y termina en la punta de $\\mathbf{A}$ (El vector que tiene el signo positivo).' }
    ],

    genData() {
      const A = randomVector()
      const B = randomVector()
      return { A, B, res: diff(A, B) }
    },

    check(data, vals) {
      const r = data.res
      return vals[0] === r[0] && vals[1] === r[1] && vals[2] === r[2]
    },

    desarrollo(data) {
      const { A, B, res } = data
      return [
        { label: 'Fórmula',   valor: 'Identifica el valor numérico de  $A_x$, $A_y$ y $A_z$. También identifica el valor numérico de $B_x$, $B_y$ y $B_z$. Posteriormente; si tiene práctica, debe sustitur estas cantidades en la fórmula $\\mathbf{A}-\\mathbf{B}=(A_x-B_x)\\mathbf{i}+(A_y-B_y)\\mathbf{j}+(A_z-B_z)\\mathbf{k}$. Si está en proceso de aprendizaje, maneje por separado las componentes del vector resta:' },
        { label: 'Componente x',   valor: `(\\mathbf{A}-\\mathbf{B})_x = (${A[0]}) - (${B[0]}) = ${res[0]}` , esLatex: true},
        { label: 'Componente y',   valor: `(\\mathbf{A}-\\mathbf{B})_y = (${A[1]}) - (${B[1]}) = ${res[1]}` , esLatex: true},
        { label: 'Componente z',   valor: `(\\mathbf{A}-\\mathbf{B})_z = (${A[2]}) - (${B[2]}) = ${res[2]}` , esLatex: true},
        { label: 'Resultado', valor: vecLatex('A-B', res), esLatex: true }
      ]
    }
  },

  // ── 3. NORMA ────────────────────────────────────────────────
  {
    id: 'norma',
    titulo: 'Norma de un vector',
    subtitulo: 'Calcula la magnitud — redondea a 2 decimales',
    icon: 'mdi-ruler',
    enunciado: 'Calcula la norma del siguiente vector:',
    tipoRespuesta: 'scalar',

    teoria: [
      { tipo: 'texto', contenido: 'Dado un vector de tres dimensiones:' },
      { tipo: 'latex', contenido: '\\mathbf{A}=A_x\\mathbf{i}+A_y\\mathbf{j}+A_z\\mathbf{k}' },
      { tipo: 'texto', contenido: 'La norma, también llamada módulo, es una magnitud escalar que se calcula mediante la expresión:' },
      { tipo: 'latex', contenido: '\\|\\mathbf{A}\\|=\\sqrt{A_x^2+A_y^2+A_z^2}' },
      { tipo: 'texto', contenido: 'El resultado es un número real no negativo.' }
    ],

    genData() {
      const A = randomVector()
      return { A, res: round(vectorNorm(A), 2) }
    },

    check(data, vals) {
      return Math.abs(vals[0] - data.res) < 0.1
    },

    desarrollo(data) {
      const { A, res } = data
      const s = A[0] ** 2 + A[1] ** 2 + A[2] ** 2
      return [
        { label: 'Consejos',      valor: 'Identifica el valor numérico de  $A_x$, $A_y$ y $A_z$. Posteriormente, debe sustitur estas cantidades en la fórmula $\\|\\mathbf{A}\\|=\\sqrt{A_x^2+A_y^2+A_z^2}$' },
        { label: 'Sustitución directa',  valor: `\\sqrt{(${A[0]})^2+(${A[1]})^2+(${A[2]})^2}` , esLatex: true},
        { label: 'Simplificación',    valor: `\\sqrt{${A[0]**2}+${A[1]**2}+${A[2]**2}}=\\sqrt{${s}}` , esLatex: true},
        { label: 'Resultado',    valor: `\\|\\mathbf{A}\\|=${res}`, esLatex: true }
      ]
    }
  },

  // ── 4. PRODUCTO ESCALAR ─────────────────────────────────────
  {
    id: 'escalar',
    titulo: 'Producto escalar',
    subtitulo: 'Calcula el producto punto A · B',
    icon: 'mdi-circle-small',
    enunciado: 'Calcula el producto escalar de los siguientes vectores:',
    tipoRespuesta: 'scalar',

    teoria: [
      { tipo: 'texto', contenido: 'El producto escalar, también llamado producto punto, toma dos vectores  $\\mathbf{A}$ y $\\mathbf{B}$ y nos retorna un escalar que se calcula mediante la siguiente expresión:' },
      { tipo: 'latex', contenido: '\\mathbf{A}\\cdot\\mathbf{B}=A_xB_x+A_yB_y+A_zB_z.' },
      { tipo: 'texto', contenido: 'De una manera alternativa, el producto punto también puede calcularse de la siguiente manera: '},
      { tipo: 'latex', contenido: '\\mathbf{A}\\cdot\\mathbf{B}= \\|\\mathbf{A}\\| \\|\\mathbf{B}\\| \\cos \\theta.'},
      { tipo: 'texto', contenido: 'El ángulo entre estos dos vectores está representado por $\\theta$. El resultado es un número escalar (no un vector).' },
      { tipo: 'texto', contenido: 'Si $\\mathbf{A}\\cdot\\mathbf{B}=0$ y ambos son no nulos, los vectores son perpendiculares.' }
    ],

    genData() {
      const A = randomVector()
      const B = randomVector()
      return { A, B, res: dotProduct(A, B) }
    },

    check(data, vals) {
      return vals[0] === data.res
    },

    desarrollo(data) {
      const { A, B, res } = data
      return [
        { label: 'Consejos',     valor: 'Identifica el valor numérico de  $A_x$, $A_y$ y $A_z$. También identifica el valor numérico de $B_x$, $B_y$ y $B_z$. Posteriormente, debe sustitur estas cantidades en la fórmula $\\mathbf{A}\\cdot\\mathbf{B}=A_xB_x+A_yB_y+A_zB_z$'},
        { label: 'Sustitución directa', valor: `(${A[0]})(${B[0]})+(${A[1]})(${B[1]})+(${A[2]})(${B[2]})` , esLatex: true },
        { label: 'Simplificación de términos',    valor: `(${A[0]*B[0]})+(${A[1]*B[1]})+(${A[2]*B[2]})` , esLatex: true },
        { label: 'Resultado',   valor: `\\mathbf{A}\\cdot\\mathbf{B}=${res}`, esLatex: true }
      ]
    }
  },

  // ── 5. ÁNGULO ───────────────────────────────────────────────
  {
    id: 'angulo',
    titulo: 'Ángulo entre vectores',
    subtitulo: 'Calcula θ en grados — redondea a 2 decimales',
    icon: 'mdi-angle-acute',
    enunciado: 'Calcula el ángulo entre los siguientes vectores:',
    tipoRespuesta: 'scalar',

    teoria: [
      { tipo: 'texto', contenido: 'El ángulo $\\theta$ entre dos vectores se obtiene a partir del producto escalar. Primero efectuamos el cálculo del coseno ángulo entre los dos vectores mediante la fórmula:' },
      { tipo: 'latex', contenido: '\\cos\\theta=\\dfrac{\\mathbf{A}\\cdot\\mathbf{B}}{\\|\\mathbf{A}\\|\\,\\|\\mathbf{B}\\|}' },
      { tipo: 'texto', contenido: 'Posteriormente, tomamos el coseno inverso:'},
      { tipo: 'latex', contenido: '\\theta=\\arccos\\!\\left(\\dfrac{\\mathbf{A}\\cdot\\mathbf{B}}{\\|\\mathbf{A}\\|\\,\\|\\mathbf{B}\\|}\\right)' },
      { tipo: 'texto', contenido: 'El ángulo θ está en el rango [0°, 180°]. Ingresa tu respuesta en grados.' }
    ],

    genData() {
      let A, B
      do {
        A = randomVector()
        B = randomVector()
      } while (vectorNorm(A) === 0 || vectorNorm(B) === 0)

      const dot  = dotProduct(A, B)
      const nA   = round(vectorNorm(A), 4)
      const nB   = round(vectorNorm(B), 4)
      const ang  = round(angleBetween(A, B), 2)
      return { A, B, dot, nA, nB, res: ang }
    },

    check(data, vals) {
      return Math.abs(vals[0] - data.res) < 0.1
    },

    desarrollo(data) {
      const { A, B, dot, nA, nB, res } = data
      const cosVal = round(dot / (nA * nB), 4)
      return [
        { label: 'Consejos',  valor: 'Efectúa los tres cálculos  por separado, es decir, primero calcula $\\mathbf{A}\\cdot\\mathbf{B}$, $\\|\\mathbf{A}\\|$ y $\\|\\mathbf{B}\\|$. Ahora sustituye en la fórmula $\\cos \\theta=\\dfrac{\\mathbf{A}\\cdot\\mathbf{B}}{\\|\\mathbf{A}\\|\\,\\|\\mathbf{B}\\|}.$ Finalmente, calcula el coseno inverso.' },
        { label: 'El producto punto es',    valor: `\\mathbf{A}\\cdot\\mathbf{B}=${dot}`, esLatex: true },
        { label: 'La norma es',    valor: `\\|\\mathbf{A}\\|=${nA}` , esLatex: true},
        { label: 'La norma es',    valor: `\\|\\mathbf{B}\\|=${nB}` , esLatex: true},
        { label: 'El coseno es',    valor: `\\cos \\theta=\\dfrac{${dot}}{(${nA})(${nB})}=${cosVal}`, esLatex: true },
        { label: 'Resultado',valor: `\\theta=${res}^\\circ`, esLatex: true }
      ]
    }
  },

  // ── 6. PRODUCTO VECTORIAL ───────────────────────────────────
  {
    id: 'vectorial',
    titulo: 'Producto vectorial',
    subtitulo: 'Calcula A × B',
    icon: 'mdi-vector-intersection',
    enunciado: 'Calcula el producto vectorial de los siguientes vectores:',
    tipoRespuesta: 'vector',

    teoria: [
      { tipo: 'texto', contenido: 'El producto vectorial, también llamado producto cruz, entre los vectores $\\mathbf{A}$ y $\\mathbf{B}$ nos proporciona un nuevo vector $\\mathbf{C}=\\mathbf{A}\\times\\mathbf{B}$. Este vector se calcula mediante la fórmula:' },
      { tipo: 'latex', contenido: '\\mathbf{C}=(A_yB_z-A_zB_y)\\mathbf{i}-(A_xB_z-A_zB_x)\\mathbf{j}+(A_xB_y-A_yB_x)\\mathbf{k}' },
      { tipo: 'texto', contenido: 'Adicionalmente, la magnitud del producto cruz puede calcularse mediante la fórmula $\\|\\mathbf{A}\\times\\mathbf{B}\\|= \\|\\mathbf{A}\\| \\|\\mathbf{B}\\| \\sin \\theta$.'},
      { tipo: 'texto', contenido: 'Note que el vector que resulta de esta operación es perpendicular al plano formado por $\\mathbf{A}$ y $\\mathbf{B}$. Además, si $\\mathbf{A}\\times\\mathbf{B}=\\mathbf{0}$, los vectores son paralelos o uno de ellos es nulo.' }
    ],

    genData() {
      const A = randomVector()
      const B = randomVector()
      return { A, B, res: crossProduct(A, B) }
    },

    check(data, vals) {
      const r = data.res
      return vals[0] === r[0] && vals[1] === r[1] && vals[2] === r[2]
    },

    desarrollo(data) {
      const { A, B, res } = data
      return [
        { label: 'Consejos',  valor: 'Identifica el valor numérico de  $A_x$, $A_y$ y $A_z$. También identifica el valor numérico de $B_x$, $B_y$ y $B_z$. Calcula las tres componentes por separado, es decir, calcula $C_x=A_yB_z-A_zB_y$, $C_y=-(A_xB_z-A_zB_x)$ y $C_z=A_xB_y-A_yB_x$'},
        { label: 'Componente x',  valor: `C_x = (${A[1]})\\cdot(${B[2]})-(${A[2]})\\cdot(${B[1]})=${res[0]}` , esLatex: true},
        { label: 'Componente y',  valor: `C_y =-((${A[0]})\\cdot(${B[2]})-(${A[2]})\\cdot(${B[0]}))=${res[1]}` , esLatex: true},
        { label: 'Componente z',  valor: `C_z =(${A[0]})\\cdot(${B[1]})-(${A[1]})\\cdot(${B[0]})=${res[2]}` , esLatex: true},
        { label: 'Resultado',valor: vecLatex('A\\times B', res), esLatex: true }
      ]
    }
  }
]

export function getTopic(id) {
  return TOPICS.find(t => t.id === id)
}
