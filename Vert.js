/**
 * Class representing a vertex in the graph
 */
class Vert {

  /**
   * Creates a new vertex
   * @param {CanvasRenderingContext2D} context - Canvas context for rendering
   * @param {number} w - Width of the area
   * @param {number} h - Height of the area
   */
  constructor( context, w, h ) {

    this.ctx = context
    this.w = w
    this.h = h

    // position
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.angle = Math.random() * Math.PI * 2
    this.speed = .1 + Math.random() * .1
    this.velocityX = Math.cos(this.angle) * this.speed
    this.velocityY = Math.sin(this.angle) * this.speed

    // draw
    this.pi2 = Math.PI * 2
    this.color = `orange`
    this.radius = 3

  }

  /**
   * Updates the vertex position
   * @param {number} deltaTime - Time elapsed since the last frame in milliseconds
   * @param {Object} [options=this] - Options for update
   */
  update( deltaTime, { speed, x, y, w, h } = this ) {

    this.w = this.ctx.canvas.width
    this.h = this.ctx.canvas.height

    this.x += this.velocityX * deltaTime
    this.y += this.velocityY * deltaTime

    if ( this.x < 0 && this.velocityX < 0 || this.x > this.w && this.velocityX > 0 ) {
      this.velocityX *= -1
    }
    if ( this.y < 0 && this.velocityY < 0 || this.y > this.h && this.velocityY > 0 ) {
      this.velocityY *= -1
    }

  }

  /**
   * Renders the vertex on canvas
   * @param {Object} [options=this] - Options for rendering
   * @param {CanvasRenderingContext2D} options.ctx - Canvas context
   * @param {number} options.x - X coordinate
   * @param {number} options.y - Y coordinate
   * @param {number} options.radius - Vertex radius
   * @param {number} options.pi2 - 2 * Math.PI
   * @param {string} options.color - Vertex color
   */
  render( { ctx, x, y, radius, pi2, color } = this ) {

    ctx.fillStyle = color

    ctx.beginPath()
    ctx.arc( x, y, radius, 0, pi2 )
    ctx.fill()

  }

}
