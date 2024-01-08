import Animation from 'classes/Animation'
import GSAP from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
GSAP.registerPlugin(ScrollTrigger)

export default class extends Animation {
  constructor ({ element }) {
    super({
      element
    })
    this.animate()
  }

  animate () {
    GSAP.fromTo(this.element, {
      scrollTrigger: {
        trigger: this.element,
        start: 'top center',
        toggleActions: 'restart pause reverse pause',
        scrub: 1
      },
      rotation: 90,
      duration: 3
    }
    )
  }

  update () {

  }
}
