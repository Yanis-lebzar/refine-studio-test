import GSAP from 'gsap'
import Animation from '../classes/Animation'
export default class Label extends Animation {
  constructor ({ element, elements }) {
    super({
      element, elements
    })
  }

  animateIn () {
    this.timelineIn = GSAP.timeline({
      delay: 0.3
    })
    this.timelineIn.set(this.element, {
      autoAlpha: 1
    })

    this.timelineIn.fromTo(this.element, { autoAlpha: 0 }, {
      autoAlpha: 1,
      duration: 0.5,
      ease: 'expo.in'
    })
  }

  animateOut () {
    GSAP.to(this.element, {
      autoAlpha: 0
    })
  }

  onResize () {
  }
}
