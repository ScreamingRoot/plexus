/**
 * Class representing an edge in the graph
 */
class Edge {

  /**
   * Creates a new edge
   * @param {Object} layer - Layer object
   * @param {CanvasRenderingContext2D} layer.context - Canvas context for rendering
   * @param {number} layer.w - Canvas width
   * @param {number} layer.h - Canvas height
   * @param {Vert} a - First vertex
   * @param {Vert} b - Second vertex
   */
  constructor( { context, w, h }, a, b ) {

    this.ctx = context
    this.a = a
    this.b = b
    this.alpha = 0
    this.maxLenght = Math.max( w, h ) / 5

  }

  /**
   * Updates edge transparency based on distance between vertices
   * @param {Object} [options=this] - Options for update
   * @param {Vert} options.a - First vertex
   * @param {Vert} options.b - Second vertex
   * @param {number} options.maxLenght - Maximum edge length
   */
  update( { a, b, maxLenght } = this ) {

    this.alpha = 1 - Math.hypot( a.x - b.x, a.y - b.y ) / maxLenght

  }

  /**
   * Renders the edge on canvas
   * @param {Object} [options=this] - Options for rendering
   * @param {CanvasRenderingContext2D} options.ctx - Canvas context
   * @param {Vert} options.a - First vertex
   * @param {Vert} options.b - Second vertex
   * @param {number} options.alpha - Edge transparency
   */
  render( { ctx, a, b, alpha } = this ) {

    if ( alpha > 0 ) {
      ctx.lineWidth = alpha + 1
      ctx.strokeStyle = `hsla( ${ 360 }, 100%, 50%, ${ alpha } )`

      ctx.beginPath()
      ctx.moveTo( a.x, a.y )
      ctx.lineTo( b.x, b.y )
      ctx.stroke()
    }

  }
}
