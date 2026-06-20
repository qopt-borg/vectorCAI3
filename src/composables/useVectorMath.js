// ─────────────────────────────────────────────────────────────
// useVectorMath — equivalente JS de mathematical_functions.py
// ─────────────────────────────────────────────────────────────

export function useVectorMath() {

  /** Genera un entero aleatorio en [lo, hi] */
  function randInt(lo, hi) {
    return Math.floor(Math.random() * (hi - lo + 1)) + lo
  }

  /** Genera un vector aleatorio de 3 componentes enteras en [-5, 5] */
  function randomVector(lo = -5, hi = 5) {
    return [randInt(lo, hi), randInt(lo, hi), randInt(lo, hi)]
  }

  /** Norma euclídiana */
  function vectorNorm(a) {
    return Math.sqrt(a[0] ** 2 + a[1] ** 2 + a[2] ** 2)
  }

  /** Ángulo entre dos vectores en grados */
  function angleBetween(a, b) {
    const nA = vectorNorm(a)
    const nB = vectorNorm(b)
    if (nA === 0 || nB === 0) throw new Error('Vector nulo')
    const cos = Math.min(1, Math.max(-1, dotProduct(a, b) / (nA * nB)))
    return (Math.acos(cos) * 180) / Math.PI
  }

  /** Suma de vectores */
  function add(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
  }

  /** Resta de vectores */
  function diff(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
  }

  /** Producto punto */
  function dotProduct(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  }

  /** Producto cruz */
  function crossProduct(a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]
    ]
  }

  /** Redondea a N decimales */
  function round(val, decimals = 2) {
    return Math.round(val * 10 ** decimals) / 10 ** decimals
  }

  return {
    randomVector,
    vectorNorm,
    angleBetween,
    add,
    diff,
    dotProduct,
    crossProduct,
    round
  }
}
