// ─────────────────────────────────────────────────────────────
// useLatex — helpers para generar expresiones LaTeX de vectores
// Equivalente a gui_vector_latex en gui_utils.py
// ─────────────────────────────────────────────────────────────

export function useLatex() {

  /**
   * Construye la expresión LaTeX de un vector 3D.
   * Ejemplo: vecLatex('A', [2, -1, 3]) → '\mathbf{A} = 2\mathbf{i} - \mathbf{j} + 3\mathbf{k}'
   */
  function vecLatex(nombre, v) {
    const unidades = ['\\mathbf{i}', '\\mathbf{j}', '\\mathbf{k}']
    let expr = ''

    v.forEach((val, idx) => {
      if (val === 0) return
      const abs = Math.abs(val)
      const term = abs === 1 ? unidades[idx] : `${abs}${unidades[idx]}`

      if (expr === '') {
        expr = val > 0 ? term : `-${term}`
      } else {
        expr += val > 0 ? ` + ${term}` : ` - ${term}`
      }
    })

    if (expr === '') expr = '\\mathbf{0}'
    return `\\mathbf{${nombre}} = ${expr}`
  }

  /**
   * Versión inline (sin el nombre del vector, solo componentes).
   * Útil para expresiones del desarrollo.
   */
  function vecExpr(v) {
    const unidades = ['\\mathbf{i}', '\\mathbf{j}', '\\mathbf{k}']
    let expr = ''

    v.forEach((val, idx) => {
      if (val === 0) return
      const abs = Math.abs(val)
      const term = abs === 1 ? unidades[idx] : `${abs}${unidades[idx]}`

      if (expr === '') {
        expr = val > 0 ? term : `-${term}`
      } else {
        expr += val > 0 ? ` + ${term}` : ` - ${term}`
      }
    })

    return expr === '' ? '\\mathbf{0}' : expr
  }

  return { vecLatex, vecExpr }
}
