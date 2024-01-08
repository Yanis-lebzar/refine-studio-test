// import Prefix from 'prefix'

// import { BREAKPOINT_TABLET } from 'utils/breakpoints'
// import { getOffset } from 'utils/dom'
// import { clamp, map } from 'utils/math'

// export default class {
//   constructor ({ element }) {
//     this.transform = Prefix('transform')

//     this.element = element
//     this.media = element.querySelector('img')
//     this.media.onload = _ => {
//       this.onResize()
//     }

//     this.isVisible = false

//     this.parallax = {
//       current: -this.amount,
//       target: -this.amount
//     }

//     this.scale = {
//       current: 1.15,
//       target: 1.15
//     }

//     this.onResize()
//   }

//   onResize () {

//     this.amount = window.innerWidth < BREAKPOINT_TABLET ? 10 : 150
//     this.offset = getOffset(this.element)
//   }

//   update (scroll) {
//     if (!this.offset) {
//       return
//     }

//     const { innerHeight } = window

//     const offsetBottom = scroll.current + innerHeight

//     if (offsetBottom >= this.offset.top) {
//       this.parallax = clamp(-this.amount, this.amount, map(this.offset.top - scroll.current, -this.offset.height, innerHeight, this.amount, -this.amount))
//       this.scale = clamp(1, 1.15, map(this.offset.top - scroll.current, -this.offset.height, innerHeight, 1, 1.15))

//       this.media.style[this.transform] = `translate3d(0, ${this.parallax}px, 0) scale(${this.scale})`
//     } else {
//       this.media.style[this.transform] = `translate3d(0, -${this.amount}px, 0) scale(1.15)`
//     }
//   }
// }

// Parallax floema vrai site, image qui s'agrandissent au scroll
import Prefix from 'prefix'
import { getOffset } from 'utils/dom'
import { clamp, map } from 'utils/math'

export default class {
  constructor ({ element }) {
    this.transform = Prefix('transform')

    this.element = element
    this.media = element.querySelector('img')
    this.media.onload = _ => {
      this.onResize()
    }

    this.isVisible = false

    this.scale = {
      current: 1,
      target: 1
    }

    this.onResize()
  }

  onResize () {
    this.offset = getOffset(this.element)
  }

  update (scroll) {
    if (!this.offset) {
      return
    }
    const { innerHeight } = window
    const offsetBottom = scroll.current + innerHeight

    if (offsetBottom >= this.offset.top) {
      // Ici on ajuste la valeur de scale en fonction de la position de défilement
      this.scale.current = clamp(1, 1.2, map(this.offset.top - scroll.current, -this.offset.height, innerHeight, 1, 1.2))

      // Ici on applique l'échelle à l'image
      this.media.style[this.transform] = `scale(${this.scale.current})`
    } else {
      // Si l'image n'est pas visible, on réinitialise l'échelle à 1
      this.media.style[this.transform] = 'scale(1)'
    }
  }
}
