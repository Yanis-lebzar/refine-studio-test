import map from 'lodash/map'
import { Plane, Transform } from 'ogl'
// import Destination from './Destination/index.js'
export default class {
  constructor ({ gl, scene, sizes, renderer, camera }) {
    this.gl = gl
    this.sizes = sizes
    this.renderer = renderer
    this.camera = camera

    this.group = new Transform()

    this.createGeometry()
    this.createGalleries()

    this.onResize({
      sizes: this.sizes
    })

    this.group.setParent(scene)

    this.show()
  }

  createGeometry () {
    this.geometry = new Plane(this.gl, { heightSegments: 20, widthSegments: 20 })
  }

  createGalleries () {
    this.galleries = []

    this.destination__slider__container = document.querySelector('.home__destinations__slider')

    // this.destination__slider = new Destination({
    //   element: this.destination__slider__container,
    //   geometry: this.geometry,
    //   gl: this.gl,
    //   scene: this.group,
    //   sizes: this.sizes,
    //   renderer: this.renderer,
    //   camera: this.camera
    // })

    // this.galleries.push(this.destination__slider)
  }

  // Animations
  show () {
    map(this.galleries, (gallery) => gallery.show())
  }

  hide () {
    map(this.galleries, (gallery) => gallery.hide())
  }

  // Events

  onResize (e) {
    map(this.galleries, (gallery) => gallery.onResize(e))
  }

  onTouchDown (e) {
    map(this.galleries, (gallery) => gallery.onTouchDown(e))
  }

  onTouchMove (e) {
    map(this.galleries, (gallery) => gallery.onTouchMove(e))
  }

  onMove (e) {
    map(this.galleries, (gallery) => gallery.onMove(e))
  }

  onTouchUp (e) {
    map(this.galleries, (gallery) => gallery.onTouchUp(e))
  }

  onWheel ({ pixelX, pixelY }) {}

  // Update

  update (scroll) {
    map(this.galleries, (gallery) => {
      gallery.update(scroll)
    })
  }

  // addEventListeners () {
  //   window.addEventListener('touchmove', this.onTouchMove.bind(this))
  // }

  // Destroy
  destroy () {
    map(this.galleries, (gallery) => gallery.destroy())
  }
}
