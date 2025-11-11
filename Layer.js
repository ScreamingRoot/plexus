/**
 * Class for managing canvas layer
 */
class Layer {

  /**
   * Creates a new canvas layer
   * @param {HTMLElement} [container=document.body] - Container for canvas
   */
  constructor( container = document.body ) {

    this.canvas = document.createElement( 'canvas' )
    this.context = this.canvas.getContext( '2d' )

    container.appendChild( this.canvas )

    addEventListener( 'resize', () => this.fitToContainer() )
    this.fitToContainer()

  }

  /**
   * Fits canvas size to container size
   */
  fitToContainer() {

    this.w = this.canvas.width = this.canvas.offsetWidth
    this.h = this.canvas.height = this.canvas.offsetHeight

  }

}
