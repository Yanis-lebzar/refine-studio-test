import each from 'lodash/each'

import Animation from 'classes/Animation'

import { split } from 'utils/text'
import GSAP from 'gsap'

export default class extends Animation {
  constructor ({ element }) {
    const lines = []

    const paragraphs = element.querySelectorAll('h1, h2, p')

    if (paragraphs.length !== 0) {
      each(paragraphs, element => {
        split({ element })
        split({ element })

        lines.push(...element.querySelectorAll('span span'))
      })
    } else {
      split({ element })
      split({ element })

      lines.push(...element.querySelectorAll('span span'))
    }

    each(lines, element => {
      split({
        append: false,
        element,
        expression: ''
      })
    })

    // console.log('lines', lines)
    super({
      element,
      elements: {
        lines
      }
    })

    // this.elements.titleSpans = split({
    //   append: true,
    //   element: this.element,
    //   expression: '<br>'
    // })

    // each(this.elements.titleSpans, element => {
    //   split({
    //     append: false,
    //     element,
    //     expression: ''
    //   })
    // })
    this.onResize()

    if ('IntersectionObserver' in window) {
      this.animateOut()
    }
  }

  animateIn () {
    super.animateIn()
    this.tl = GSAP.timeline({})
    this.animateInn = GSAP.timeline()
    console.log('line', this.elements.lines)

    each(this.elements.lines, (line, index) => {
      const words = line.querySelectorAll('span')

      this.wordTimeline = GSAP.timeline({ delay: 0.7 })

      this.wordTimeline.fromTo(words, {
        autoAlpha: 0,
        scale: 1.7

      }, {
        duration: 1,
        ease: 'power3',
        autoAlpha: 1,
        scale: 1,
        stagger: {
          each: 0.015,
          from: 'edges'
        }
      })
      this.tl.add(this.wordTimeline, `previous+=${Math.random() * 0.6}`)
    })
  }

  animateOut () {
    super.animateOut()

    this.animateOutt = GSAP.timeline({
      delay: 1
    })

    each(this.elements.titleSpans, (line, index) => {

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
