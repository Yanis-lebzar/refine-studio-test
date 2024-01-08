import GSAP from 'gsap'
import { mapEach } from '../utils/DOM.JS'

import each from 'lodash/each'
import map from 'lodash/map'

import Prefix from 'prefix'

import EventEmitter from 'events'
import AutoBind from 'auto-bind'
import AsyncLoad from './AsyncLoad.js'

import Paragraph from '../animations/Paragraph.js'
import Link from 'animations/Link'
import Divider from '../animations/Divider.js'
import Wonder from '../animations/Wonder.js'
import WonderParagraph from '../animations/WonderParagraph.js'

import Lenis from '@studio-freight/lenis'
import Label from '../animations/Label.js'
import WonderVertical from '../animations/WonderVertical.js'
export default class Page extends EventEmitter {
  constructor ({ classes, element, elements, id, isScrollable = true }) {
    super()

    AutoBind(this)

    this.classes = {
      ...classes
    }

    this.selectors = {
      element,
      elements: {
        preloaders: '[data-src]',
        // animationsButtons: '[data-animation="button"]',
        animationsLinks: '[data-animation="link"]',
        // animationsMagnetics: '[data-animation="magnetic"]',
        // animationsParallaxes: '[data-animation="parallax"]',
        // animationsParallaxesY: '[data-animation="parallaxY"]',
        animationsParagraphs: '[data-animation="paragraph"]',
        animationsWonder: '[data-animation="wonder"]',
        animationsWonderVertical: '[data-animation="wonderVertical"]',
        animationsWonderParagraphs: '[data-animation="wonderParagraph"]',

        animationsLabels: '[data-animation="label"]',
        animationsDividers: '[data-animation="divider"]',
        // animationsRotations: '[data-animation="rotation"]',
        // animationsTranslates: '[data-animation="translate"]',

        // footer: '.footer',
        // footerCredits: '.footer__credits',

        ...elements
      }
    }

    this.id = id

    this.isScrollable = isScrollable

    this.transformPrefix = Prefix('transform')

    this.scroll = {
      progress: 0,
      velocity: 0,
      current: 0,
      scroll: 0,
      direction: -1,
      target: 0
    }

    this.smoothScroll()
  }

  create () {
    this.animations = []

    this.element = document.querySelector(this.selectors.element)

    this.elements = {}
    each(this.selectors.elements, (selector, key) => {
      if (selector instanceof window.HTMLElement || selector instanceof window.NodeList) {
        this.elements[key] = selector
      } else if (Array.isArray(selector)) {
        this.elements[key] = selector
      } else {
        this.elements[key] = this.element.querySelectorAll(selector)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = this.element.querySelector(selector)
        }
      }
    })

    this.createAnimations()
    // this.createObserver()
    this.createPreloaders()
  }

  smoothScroll () {
    this.lenis = new Lenis({
      duration: 2.5,

      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      direction: 'vertical', // vertical, horizontal

      gestureDirection: 'vertical', // vertical, horizontal, both

      smooth: true,

      mouseMultiplier: 1,

      smoothTouch: false,

      touchMultiplier: 2,

      infinite: false
    })

    this.lenis.on('scroll', (e) => {
      this.scroll.current = e.actualScroll
      this.scroll.target = e.targetScroll
      this.scroll.scroll = e.scroll
      this.scroll.velocity = e.velocity
      this.scroll.progress = e.progress
      this.scroll.direction = e.direction
    })
  }

  resetScroll () {
    this.lenis.scrollTo(0, {
      immediate: true
    })
  }

  createAnimations () {
    // /**
    //  * Buttons.
    //  */
    // this.animationsButtons = mapEach(this.elements.animationsButtons, (element, index) => {
    //   return new Button({
    //     element
    //   })
    // })

    // this.animations.push(...this.animationsButtons)

    // Paragraphs
    this.animationsParagraphs = mapEach(this.elements.animationsParagraphs, element => {
      return new Paragraph({
        element
      })
    })
    this.animations.push(...this.animationsParagraphs)

    // WonderText
    this.animationsWonder = mapEach(this.elements.animationsWonder, element => {
      return new Wonder({
        element
      })
    })
    this.animations.push(...this.animationsWonder)

    // WonderVerticalText
    this.animationsWonderVertical = mapEach(this.elements.animationsWonderVertical, element => {
      return new WonderVertical({
        element
      })
    })
    this.animations.push(...this.animationsWonderVertical)

    // Wonder Paragraphs
    this.animationsWonderParagraphs = mapEach(this.elements.animationsWonderParagraphs, element => {
      return new WonderParagraph({
        element
      })
    })
    this.animations.push(...this.animationsWonder)

    // Dividers
    this.animationsDividers = mapEach(this.elements.animationsDividers, element => {
      return new Divider({
        element
      })
    })
    this.animations.push(...this.animationsDividers)

    /**
     * Links.
     */
    this.animationsLinks = mapEach(this.elements.animationsLinks, (element, index) => {
      return new Link({
        element
      })
    })
    this.animations.push(...this.animationsLinks)

    /**
     * Labels.
     */
    this.animationsLabels = mapEach(this.elements.animationsLabels, (element, index) => {
      return new Label({
        element
      })
    })
    this.animations.push(...this.animationsLabels)
  }

  /**
   * Observer.
   */
  // createObserver () {
  //   this.observer = new window.ResizeObserver(entries => {
  //       for (const entry of entries) { // eslint-disable-line
  //       window.requestAnimationFrame(_ => {
  //         this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight
  //       })
  //     }
  //   })

  //   this.observer.observe(this.elements.wrapper)
  // }

  createPreloaders () {
    this.preloaders = map(this.elements.preloaders, element => {
      return new AsyncLoad({ element })
    })
  }

  /**
   * Animations.
   */

  set (value) {
    // this.scroll.current = this.scroll.target = this.scroll.last = value

    // this.transform(this.elements.wrapper, this.scroll.current)
  }

  show (animation) {
    this.isVisible = true

    this.addEventListeners()

    GSAP.set(document.documentElement, {
      backgroundColor: this.element.getAttribute('data-background'),
      color: this.element.getAttribute('data-color')
    })

    return Promise.resolve()
  }

  hide () {
    this.isVisible = false

    this.removeEventListeners()

    return Promise.resolve()
  }

  onTouchDown (event) {
    this.isDown = true

    // this.scroll.position = this.scroll.current
    this.start = event.touches ? event.touches[0].clientY : event.clientY
  }

  onTouchMove (event) {
    const y = event.touches ? event.touches[0].clientY : event.clientY
    // const distance = (this.start - y) * 3

    // this.scroll.target = this.scroll.position + distance
  }

  onTouchUp (event) {
    this.isDown = false
  }

  // onWheel (e) {
  //   console.log(e)
  //   this.scroll.target += e.pixelY
  // }

  onTouch () {

  }

  onResize () {
    if (!this.elements.wrapper) return

    window.requestAnimationFrame(_ => {
      each(this.animations, animation => {
        animation.onResize && animation.onResize()
      })
    })
  }

  update (time) {
    this.lenis.raf(time)

    // GSAP.ticker.add(time => {
    //   this.lenis.raf(time * 1000)
    // })

    each(this.animations, animation => {
      animation.update && animation.update(this.scroll)
    })
  }

  addEventListeners () {
    // window.addEventListener('click', this.onTouch)

  }

  removeEventListeners () {
  }

  destroy () {
    this.removeEventListeners()
  }
}
