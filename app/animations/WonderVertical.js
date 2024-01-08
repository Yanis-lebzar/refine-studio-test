import each from 'lodash/each'

import Animation from 'classes/Animation'

import { split } from 'utils/text'
import GSAP from 'gsap'

export default class extends Animation {
  constructor ({ element }) {
    const lines = []

    super({
      element,
      elements: {
        lines
      }
    })

    this.elements.titleSpans = split({
      append: true,
      element: this.element,
      expression: '<br>'
    })

    each(this.elements.titleSpans, element => {
      split({
        append: false,
        element,
        expression: ''
      })
    })
    this.onResize()

    if ('IntersectionObserver' in window) {
      this.animateOut()
    }
  }

  animateIn () {
    super.animateIn()
    this.animateInn = GSAP.timeline({ delay: 0.3 })

    each(this.elements.titleSpans, (line, index) => {
      const letters = line.querySelectorAll('span')

      this.animateInn.fromTo(letters, {
        autoAlpha: 0,
        scale: 1.2,
        x: '-50%'

      }, {
        duration: 1,
        ease: 'power3',
        autoAlpha: 1,
        scale: 1,
        stagger: {
          each: 0.070
        },
        x: '0%'
      })
    })
  }

  animateOut () {
    super.animateOut()

    this.animateOutt = GSAP.timeline({
      delay: 1
    })
  }

  onResize () {

  }
}
