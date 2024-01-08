import GSAP from 'gsap'
import Animation from '../classes/Animation'

export default class Divider extends Animation {
  constructor ({ element, elements }) {
    super({
      element, elements
    })
    this.element = element
  }

  animateIn () {
    this.timelineIn = GSAP.timeline({
      delay: 0.6
    })

    this.elementWidth = this.element.getAttribute('data-width')
    // console.log(this.element.getAttribute('data-width'))
    this.timelineIn.fromTo(this.element,
      {
        autoAlpha: 0,
        width: 0,
        y: 10
      }
      , {
        autoAlpha: 1,
        width: this.elementWidth + 'rem',
        y: 0,
        duration: 1,
        ease: 'expo.out'
      })
  }

  animateOut () {
    GSAP.to(this.element, {
      autoAlpha: 0,
      width: 0
    })
  }
}
