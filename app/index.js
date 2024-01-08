import each from 'lodash/each'

import Canvas from './components/Canvas/index.js'
import About from 'pages/About'
import Home from 'pages/Home'

import Preloader from './components/Preloader.js'
import Transition from './components/Transition.js'
import Navigation from './components/Navigation.js'

import normalizeWheel from 'normalize-wheel'
import FullscreenMenu from './components/FullscreenMenu.js'

class App {
  constructor () {
    this.template = window.location.pathname

    this.createContent()
    this.createCanvas()
    // this.createPreloader()
    // this.createTransition()

    // this.createNavigation()
    this.createFullScreenNavigation()

    this.createPages()

    this.addEventListeners()
    this.addLinkListeners()

    this.onResize()

    this.update()
    this.isPreloaded = true
  }

  createNavigation () {
    this.navigation = new Navigation({
      template: this.template
    })
  }

  createFullScreenNavigation () {
    // this.fullscreenMenu = new FullscreenMenu({
    //   template: this.template
    // })
  }

  createPreloader () {
    this.preloader = new Preloader({ canvas: this.canvas })
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  createCanvas () {
    this.canvas = new Canvas({
      template: this.template
    })
  }

  createTransition () {
    this.transition = new Transition()
  }

  createContent () {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages () {
    this.pages = {
      about: new About(),
      home: new Home()
    }

    this.page = this.pages[this.template]
    this.page.create()
  }

  // Events

  onPreloaded () {
    this.onResize()
    this.canvas.onPreloaded(this.template)

    if (this.page) {
      this.page.show()
      this.page.resetScroll()
    }
  }

  onPopState () {
    this.onChange({ url: window.location.pathname, push: false })
  }

  async onChange ({ url, push = true }) {
    const urlTransi = url.replace(window.location.origin, '')
    let color = '#000000'

    if (urlTransi === '/') {
      color = '#F9F1E7'
    } else if (urlTransi === '/voyages') {
      color = '#FCD5D0'
    } else if (urlTransi === '/randonnees') {
      color = '#537664'
    } else if (urlTransi === '/galerie') {
      color = '#F0C663'
    } else if (urlTransi === '/about') {
      color = '#779DAF'
    } else if (urlTransi === '/voyages/madere') {
      color = '#3066BE'
    }

    this.canvas.onChangeStart(this.template, url)
    // await this.transition.show({
    //   color
    // })
    // this.navigation.onChangeStart(this.template)
    const request = await window.fetch(url)

    if (request.status === 200) {
      const html = await request.text()
      const div = document.createElement('div')

      if (push) {
        window.history.pushState({}, '', url)
      }
      div.innerHTML = html

      const divContent = div.querySelector('.content')

      this.template = divContent.getAttribute('data-template')

      await this.page.hide()

      this.content.setAttribute('data-template', this.template)

      // this.homeNavigation.onChange(this.template)

      this.content.innerHTML = divContent.innerHTML
      // this.navigation.onChange(this.template)

      this.canvas.onChangeEnd(this.template)
      // this.navigation.onChangeEnd(this.template)

      this.page = this.pages[this.template]

      this.page.create()

      this.page.resetScroll()

      this.page.show()

      this.onResize()

      // this.transition.hide()
      this.addLinkListeners()
    } else {
      console.log('error : ', request)
    }
  }

  onResize () {
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }
    window.requestAnimationFrame(_ => {
      if (this.canvas && this.canvas.onResize) {
        this.canvas.onResize()
      }
    })
  }

  onTouchDown (e) {
    if (this.canvas && this.canvas.onTouchDown) {
      this.canvas.onTouchDown(e)
    }
  }

  onTouchMove (e) {
    if (this.canvas && this.canvas.onTouchMove) {
      this.canvas.onTouchMove(e)
    }
  }

  onTouchUp (e) {
    if (this.canvas && this.canvas.onTouchUp) {
      this.canvas.onTouchUp(e)
    }
  }

  onMove (e) {
    if (this.canvas && this.canvas.onTouchUp) {
      this.canvas.onTouchUp(e)
    }
  }

  onWheel (e) {
    const normalizedWheel = normalizeWheel(e)

    if (this.canvas && this.canvas.onWheel) {
      this.canvas.onWheel(normalizedWheel)
    }

    if (this.page && this.page.onWheel) {
      this.page.onWheel(normalizedWheel)
    }
  }
  // Loop

  update (time) {
    if (this.page && this.page.update) {
      this.page.update(time)
    }
    if (this.canvas && this.canvas.update) {
      this.canvas.update(this.page.scroll, time)
    }
    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }

  // Listeners

  addEventListeners () {
    window.addEventListener('popstate', this.onPopState.bind(this))

    window.addEventListener('wheel', this.onWheel.bind(this))

    window.addEventListener('mousedown', this.onTouchDown.bind(this))
    window.addEventListener('mousemove', this.onTouchMove.bind(this))

    window.addEventListener('mouseup', this.onTouchUp.bind(this))

    window.addEventListener('touchstart', this.onTouchDown.bind(this), { passive: true })
    window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true })
    window.addEventListener('touchend', this.onTouchUp.bind(this))

    window.addEventListener('resize', this.onResize.bind(this))
  }

  addLinkListeners () {
    const links = document.querySelectorAll('a')

    each(links, link => {
      link.onclick = event => {
        const { href } = link

        // Check if the link is a mailto link
        if (href.startsWith('mailto:')) {
          // It's a mail link, let the browser handle it normally
          return
        }

        // Check if the link is external
        if (href.startsWith('http://') || href.startsWith('https://')) {
          // Check if the link is part of your domain
          if (!href.includes(window.location.hostname)) {
            // It's an external link, let the browser handle it normally
            return
          }
        }

        // event.preventDefault()
        this.onChange({ url: href })
      }
    })
  }
}
export default new App()
