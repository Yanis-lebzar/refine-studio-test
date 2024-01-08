import GSAP from 'gsap'
import Animation from '../classes/Animation'

export default class Highlight extends Animation {
  constructor ({ element, elements }) {
    super({
      element, elements
    })
  }

  animateIn () {
    this.timelineIn = GSAP.timeline({
      delay: 0.5
    })
    this.timelineIn.fromTo(this.element, { scale: 1.2, autoAlpha: 0 }, {
      autoAlpha: 1,
      scale: 1,
      duration: 1.5,
      ease: 'expo.out'
    })
  }

  animateOut () {
    GSAP.to(this.element, {
      autoAlpha: 0
    })
  }
}
