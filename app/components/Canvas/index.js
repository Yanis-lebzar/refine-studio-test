import { Transform, Renderer, Camera } from 'ogl'

// import Home from './Home'
// import About from './About'
// import Galerie from './Galerie'
// import Destination from './Destination'

// Index qui s'occupe des différents canvas utilisés dans le site.

// Les commentaires laissés sont des exemples de ce qu'il est possible de faire avec OGL
export default class Canvas {
  constructor ({ template }) {
    this.template = template

    this.x = {
      start: 0,
      distance: 0,
      end: 0
    }

    this.y = {
      start: 0,
      distance: 0,
      end: 0
    }

    this.createRenderer()
    this.createCamera()
    this.createScene()

    // window.addEventListener('popstate', this.handlePageChange.bind(this))
    this.onResize()
    // this.onChangeEnd(template)
  }

  createRenderer () {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true
    })

    this.gl = this.renderer.gl

    document.body.appendChild(this.gl.canvas)
  }

  createCamera () {
    this.camera = new Camera(this.gl)
    this.camera.position.z = 5
  }

  createScene () {
    this.scene = new Transform()
  }

  //   Home
  // createHome () {
  //   this.home = new Home({
  //     gl: this.gl,
  //     scene: this.scene,
  //     sizes: this.sizes,
  //     renderer: this.renderer,
  //     camera: this.camera
  //   })
  // }

  // destroyHome () {
  //   if (!this.home) return

  //   this.home.destroy()
  //   this.home = null
  // }

  //   About

  // createAbout () {
  //   this.about = new About({
  //     gl: this.gl,
  //     sizes: this.sizes,
  //     scene: this.scene,
  //     renderer: this.renderer,
  //     camera: this.camera
  //   })
  // }

  // destroyAbout () {
  //   if (!this.about) return

  //   this.about.destroy()
  //   this.about = null
  // }

  //   Galerie

  // createGalerie (isPreloaded) {
  //   this.galerie = new Galerie({
  //     gl: this.gl,
  //     scene: this.scene,
  //     sizes: this.sizes,
  //     isPreloaded
  //   })
  // }

  // destroyGalerie () {
  //   if (!this.galerie) return

  //   this.galerie.destroy()
  //   this.galerie = null
  // }

  //   Destination

  // handlePageChange () {
  //   const currentUrl = window.location.pathname
  //   if (currentUrl.includes('/voyages/')) {
  //     // Vous pouvez ajuster la logique selon vos besoins
  //     this.destroyDestination()
  //   }
  // }

  // createDestination (isPreloaded) {
  //   this.destination = new Destination({
  //     gl: this.gl,
  //     scene: this.scene,
  //     sizes: this.sizes,
  //     isPreloaded
  //   })
  // }

  // destroyDestination () {
  //   if (!this.destination) return

  //   this.destination.destroy()
  //   this.destination = null
  // }

  // Events
  onPreloaded () {
    this.onChangeEnd(this.template, true)
  }

  onChangeStart (template) {
    // if (this.home) {
    //   this.home.hide()
    // }

    // if (this.about) {
    //   this.about.hide()
    // }

    // if (this.destination) {
    //   this.destination.hide()
    // }

    // if (this.galerie) {
    //   this.galerie.hide()
    // }
  }

  onChangeEnd (template, isPreloaded) {
    // if (template === 'home') {
    //   this.destroyHome()
    //   this.createHome()
    // } else {
    //   this.destroyHome()
    // }

    // if (template === 'about') {
    //   this.destroyAbout()
    //   this.createAbout()
    // } else if (this.about) {
    //   this.destroyAbout()
    // }

    // if (template === 'galerie') {
    //   this.destroyGalerie()
    //   this.createGalerie(isPreloaded)
    // } else if (this.galerie) {
    //   this.destroyGalerie()
    // }

    // if (template === 'destination') {
    //   this.destroyDestination()
    //   this.createDestination(isPreloaded)
    // } else if (this.destination) {
    //   this.destroyDestination()
    // }

    this.template = template
  }

  onResize () {
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    })

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.sizes = { height, width }

    const values = {
      sizes: this.sizes
    }

    // if (this.about) {
    //   this.about.onResize(values)
    // }

    // if (this.galerie) {
    //   this.galerie.onResize(values)
    // }

    // if (this.destination) {
    //   this.destination.onResize(values)
    // }

    // if (this.home) {
    //   this.home.onResize(values)
    // }
  }

  onTouchDown (e) {
    this.isDown = true

    this.x.start = e.touches ? e.touches[0].clientX : e.clientX
    this.y.start = e.touches ? e.touches[0].clientY : e.clientY

    const values = {
      x: this.x,
      y: this.y
    }

    // if (this.about) {
    //   this.about.onTouchDown(values)
    // }

    // if (this.galerie) {
    //   this.galerie.onTouchDown(values)
    // }

    // if (this.home) {
    //   this.home.onTouchDown(values)
    // }
  }

  onTouchMove (e) {
    if (!this.isDown) return

    const x = e.touches ? e.touches[0].clientX : e.clientX
    const y = e.touches ? e.touches[0].clientY : e.clientY
    this.x.end = x
    this.y.end = y
    const values = {
      x: this.x,
      y: this.y
    }

    // if (this.about) {
    //   this.about.onTouchMove(values)
    // }

    // if (this.galerie) {
    //   this.galerie.onTouchMove(values)
    // }

    // if (this.home) {
    //   this.home.onTouchMove(values)
    // }
  }

  onMove (e) {
    if (!this.isDown) return

    const x = e.touches ? e.touches[0].clientX : e.clientX
    const y = e.touches ? e.touches[0].clientY : e.clientY
    this.x.end = x
    this.y.end = y
    const values = {
      x: this.x,
      y: this.y
    }

    // if (this.home) {
    //   this.home.onMove(values)
    // }

    // if (this.about) {
    //   this.about.onMove(values)
    // }
  }

  onTouchUp (e) {
    this.isDown = false

    const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY

    this.x.end = x
    this.y.end = y

    const values = {
      x: this.x,
      y: this.y
    }

    // if (this.about) {
    //   this.about.onTouchUp(values)
    // }

    // if (this.galerie) {
    //   this.galerie.onTouchUp(values)
    // }

    // if (this.home) {
    //   this.home.onTouchUp(values)
    // }
  }

  onWheel (e) {
    // if (this.galerie) {
    //   this.galerie.onWheel(e)
    // }
    // if (this.destination) {
    //   this.destination.onWheel(e)
    // }
  }

  update (scroll, time) {
    // if (this.about) {
    //   this.about.update()
    // }
    // if (this.galerie) {
    //   this.galerie.update(scroll)
    // }

    // if (this.destination) {
    //   this.destination.update(scroll, time)
    // }

    // if (this.home) {
    //   this.home.update(scroll)
    // }
    // if (!this.about) {
    //   this.renderer.render({ scene: this.scene, camera: this.camera })
    // }
  }
}
