import each from 'lodash/each'

import { split } from 'utils/text'
import GSAP from 'gsap'
import autoBind from 'auto-bind'

export default class AnimationTitle {
  constructor ({ elem }) {
    autoBind(this)
    this.element = elem
    console.log('element anim class :', this.element)
    // this.element = element
    this.titleSpans = split({
      append: true,
      element: this.element,
      expression: '<br>'
    })

    each(this.titleSpans, element => {
      split({
        append: false,
        element,
        expression: ''
      })
    })
    this.onResize()
  }

  animateIn () {
    this.animateInn = GSAP.timeline({})

    each(this.titleSpans, (line, index) => {
      const letters = line.querySelectorAll('span')

      this.animateInn.fromTo(letters, {
        autoAlpha: 0,
        scale: 1.7,
        y: '100%'

      }, {
        duration: 1,
        ease: 'power3',
        autoAlpha: 1,
        scale: 1,
        stagger: {
          each: 0.035,
          from: 'edges'
        },
        y: '0%'
      })
    })
  }

  animateOut () {
    this.animateOutt = GSAP.timeline({
      delay: 1
    })

    each(this.titleSpans, (line, index) => {
      const letters = line.querySelectorAll('span')

      // GSAP.set(line, {
      //   autoAlpha: 0,
      //   y: '100%'
      // })

      // GSAP.set(letters, {
      //   autoAlpha: 0,
      //   y: '100%'
      // })
    })
  }

  onResize () {

  }
}
