/**
 * Main class for creating and managing graph animation
 */
class Plexus {

  /**
   * Creates a new Plexus instance
   * @param {HTMLElement} container - Container for canvas
   */
  constructor( container ) {

    this.density = 40000

    this.layer = new Layer( container )
    this.loop = new Loop( this.animate )

    addEventListener( 'resize', () => this.create() )
    this.create()
  }

  /**
   * Creates vertices, edges and faces of the graph
   * @param {Object} [options=this.layer] - Layer options
   * @param {number} options.w - Canvas width
   * @param {number} options.h - Canvas height
   * @param {CanvasRenderingContext2D} options.context - Canvas context
   */
  create( { w, h, context } = this.layer ) {

    this.count = w * h / this.density
    this.verts = []

    for ( let i = 0 ; i < this.count ; ++i ) {
      this.verts.push( new Vert( context, w, h ) )
    }

    this.edges = []
    this.faces = []

    for ( let i = 0 ; i < this.count ; ++i ) {
      const vertA = this.verts[ i ]

      for ( let j = i + 1 ; j < this.count ; ++j ) {
        const vertB = this.verts[ j ]
        const edgeAB = this.getEdge( vertA, vertB )

        for ( let k = j + 1 ; k < this.count ; ++k ) {
          const vertC = this.verts[ k ]
          const edgeBC = this.getEdge( vertB, vertC )
          const edgeCA = this.getEdge( vertC, vertA )

          this.faces.push( new Face( context, edgeAB, edgeBC, edgeCA ) )
        }
      }
    }

  }

  /**
   * Gets or creates an edge between two vertices
   * @param {Vert} a - First vertex
   * @param {Vert} b - Second vertex
   * @returns {Edge} Edge between vertices
   */
  getEdge( a, b ) {

    let edge = this.edges.find( e => e.a == a && e.b == b || e.a == b && e.b == a )

    if ( !edge ) {
      edge = new Edge( this.layer, a, b )
      this.edges.push( edge )
    }

    return edge

  }

  /**
   * Updates all graph elements
   * @param {number} deltaTime - Time elapsed since the last frame in milliseconds
   */
  update(deltaTime) {

    this.verts.forEach( e => e.update(deltaTime) )
    this.edges.forEach( e => e.update() )
    this.faces.forEach( e => e.update() )

  }

  /**
   * Renders all graph elements
   */
  render() {

    this.faces.forEach( e => e.render() )
    this.edges.forEach( e => e.render() )
    this.verts.forEach( e => e.render() )

  }

  /**
   * Main animation loop
   * @param {number} deltaTime - Time elapsed since the last frame in milliseconds
   */
  animate = (deltaTime) => {
    this.layer.context.clearRect( 0, 0, this.layer.w, this.layer.h )

    this.update(deltaTime)
    this.render()

  }

}

onload = () => new Plexus
