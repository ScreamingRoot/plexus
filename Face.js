/**
 * Class representing a face (triangle) in the graph
 */
class Face {

  /**
   * Creates a new face
   * @param {CanvasRenderingContext2D} context - Canvas context for rendering
   * @param {Edge} a - First edge
   * @param {Edge} b - Second edge
   * @param {Edge} c - Third edge
   */
  constructor( context, a, b, c ) {

    this.ctx = context
    this.a = a
    this.b = b
    this.c = c
    this.alpha = 0

  }

  /**
   * Updates face transparency based on edges transparency
   * @param {Object} [options=this] - Options for update
   * @param {Edge} options.a - First edge
   * @param {Edge} options.b - Second edge
   * @param {Edge} options.c - Third edge
   */
  update( { a, b, c } = this ) {

    this.alpha = ( a.alpha + b.alpha + c.alpha ) / 9

  }

  /**
   * Renders the face on canvas
   * @param {Object} [options=this] - Options for rendering
   * @param {CanvasRenderingContext2D} options.ctx - Canvas context
   * @param {Edge} options.a - First edge
   * @param {Edge} options.b - Second edge
   * @param {Edge} options.c - Third edge
   * @param {number} options.alpha - Face transparency
   */
  render( { ctx, a, b, c, alpha } = this ) {

    if ( alpha > 0 ) {
      ctx.fillStyle = `hsla( ${ 0 }, 100%, 50%, ${ alpha } )`

      ctx.beginPath()
      ctx.moveTo( a.a.x, a.a.y )
      ctx.lineTo( a.b.x, a.b.y )
      ctx.lineTo( b.b.x, b.b.y )
      ctx.closePath()
      ctx.fill()
    }

  }

}
