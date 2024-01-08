import Prefix from 'prefix'

import { BREAKPOINT_TABLET } from 'utils/breakpoints'
import { getOffset } from 'utils/dom'
import { map, lerp } from 'utils/math'

export default class {
  constructor ({ element }) {
    this.transform = Prefix('transform')

    this.element = element

    this.targetElement = this.element.getAttribute('data-animation-target')
    this.target = this.targetElement ? element.parentNode.querySelector(this.targetElement) : element

    this.direction = this.element.getAttribute('data-animation-direction')
    this.rotationDirection = Math.random() < 0.5 ? -1 : 1 // Choisissez une direction de rotation au hasard

    this.isVisible = false

    this.onResize()

    this.parallax = {
      current: -this.amount,
      target: -this.amount,
      ease: 0.05
    }
    let initialRotation = element.getAttribute('data-initial-rotation')
    initialRotation = initialRotation ? parseInt(initialRotation, 10) : 0

    this.rotation = {
      current: initialRotation,
      target: initialRotation,
      ease: 0.1
    }
  }

  onResize () {
    this.amount = window.innerWidth < BREAKPOINT_TABLET ? 20 : 200 // Increased amount for starting a bit lower
    this.offset = getOffset(this.target)
  }

  update (scroll) {
    if (this.isVideo) {
      return
    }

    const { innerHeight } = window

    const offsetBottom = scroll.current + innerHeight
    this.parallax.current = lerp(this.parallax.current, this.parallax.target, this.parallax.ease)

    if (offsetBottom >= this.offset.top) {
      this.parallax.target = map(this.offset.top - scroll.current, -this.offset.height, innerHeight, -this.amount, this.amount) // Swapped the amounts

      // Modifier la cible de rotation en fonction de la direction du défilement
      if (scroll.current > this.previousScroll && this.rotation.target > -10) {
        this.rotation.target -= 0.1
      } else if (scroll.current < this.previousScroll && this.rotation.target < 0) {
        this.rotation.target += 0.1
      }

      // Utiliser lerp pour mettre à jour la rotation actuelle en direction de la cible
      this.rotation.current = lerp(this.rotation.current, this.rotation.target, this.rotation.ease)

      // Stocker le défilement actuel comme défilement précédent pour la prochaine mise à jour
      this.previousScroll = scroll.current
      this.element.style[this.transform] = `translate3d(0, ${this.parallax.current}px, 0) rotate(${this.rotation.current}deg`
    } else {
      if (this.rotation.current > -10) { // S'assurer que la rotation ne dépasse pas -10
        this.rotation.current -= 0.01 // Décrémenter la rotation par une petite quantité à chaque mise à jour
      }
      this.parallax.current = -this.amount
      this.element.style[this.transform] = `translate3d(0, ${this.parallax.current}px, 0) rotate(${this.rotation.current}deg)`
    }
  }
}
