import Page from 'classes/Page'
// import Gallery from './Gallery.js'
// import Gallery2 from './Gallery_2.js'
import GSAP from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { CustomEase } from 'gsap/CustomEase'
import each from 'lodash/each'
import { lerp } from 'utils/math'
import { BREAKPOINT_PHONE } from '../../utils/breakpoints.js'

GSAP.registerPlugin(CustomEase)

GSAP.registerPlugin(ScrollTrigger)

export default class extends Page {
  constructor () {
    super({
      id: 'home',

      classes: {
        active: 'home--active'
      },

      element: '.home__wrapper',
      elements: {
        backgroundCircle: '.home__hero__wrapper__background__circle__media',
        circle: '.home__hero__text__middle__circle',
        paragraphs: document.querySelectorAll('.home__hero__text span'),
        description: '.home__hero__text__description',
        cta: '.home__hero__text__cta__link',
        navigation: document.querySelectorAll('.navigation__list__link'),
        projects: '.home__projects__project__media',
        projectNames: '.home__projects__project__name',
        projectArrowLinks: '.home__projects__project__arrowlink'
      }
    })
  }

  create () {
    super.create()

    this.elementsToAnimateSkew = [this.elements.paragraphs, this.elements.description, this.elements.cta, this.elements.circle]
    this.elementsToAnimateProject = [this.elements.projectNames, this.elements.projectArrowLinks]

    GSAP.set(this.elementsToAnimateSkew, {
      y: '160%',
      skewX: -15,
      skewY: 15,
      autoAlpha: 1
    })

    GSAP.set(this.elements.backgroundCircle, {
      scale: 0.5,
      autoAlpha: 0
    })

    GSAP.set(this.elements.projects, {
      autoAlpha: 0
    })

    GSAP.set(this.elementsToAnimateProject, {
      autoAlpha: 0,
      y: '100%'
    })
    this.projects = GSAP.utils.toArray(this.elements.projects)

    this.heroAnimationIn()

    each(this.elements.navigation, (link, index) => {
      link.style.textDecoration = 'none'
    })
  }

  // Animations
  async show (url) {
    GSAP.delayedCall(0, () => {
      this.element.classList.add(this.classes.active)

      GSAP.to(this.element, {
        autoAlpha: 1,
        ease: 'power3.in',
        duration: 0.5
      })
    })

    return super.show(url)
  }

  heroAnimationIn () {
    this.timeline = GSAP.timeline({})
    this.timeline.to(this.elements.backgroundCircle, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.8,
      ease: CustomEase.create('cubicOut', '0.33, 1, 0.68, 1'),
      delay: 0.2
    })

    this.timeline.to(this.elements.paragraphs, {
      skewX: 0,
      skewY: 0,
      y: '0%',
      duration: 0.8,
      ease: CustomEase.create('cubicOut', '0.33, 1, 0.68, 1'),
      delay: 0.2,
      stagger: {
        each: 0.2
      }
    }, '<')

    this.timeline.to(this.elements.circle, {
      skewX: 0,
      skewY: 0,
      y: '0%',
      duration: 0.8,
      ease: CustomEase.create('cubicOut', '0.33, 1, 0.68, 1'),
      delay: 0.2
    }, '<')

    this.timeline.to(this.elements.description, {
      skewX: 0,
      skewY: 0,
      y: '0%',
      duration: 0.8,
      ease: CustomEase.create('cubicOut', '0.33, 1, 0.68, 1')
    }, '<')

    this.timeline.to(this.elements.cta, {
      skewX: 0,
      skewY: 0,
      y: '0%',
      duration: 0.8,
      ease: CustomEase.create('cubicOut', '0.33, 1, 0.68, 1'),
      delay: 0.4
    }, '<')

    // Animation stop when not in viewport
    const rotateAnimation = GSAP.to(this.elements.backgroundCircle, {
      rotateZ: 360,
      duration: 6,
      ease: 'none',
      repeat: -1,
      paused: true
    })

    ScrollTrigger.create({
      trigger: this.elements.backgroundCircle,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => rotateAnimation.play(),
      onLeave: () => rotateAnimation.pause(),
      onEnterBack: () => rotateAnimation.play(),
      onLeaveBack: () => rotateAnimation.pause()
    })

    this.projects.forEach((project, index) => {
      const speed = project.dataset.speed
      const projectName = project.querySelector('.home__projects__project__name')
      const projectArrowLink = project.querySelector('.home__projects__project__arrowlink')

      console.log(projectName)

      GSAP.to(project, {
        autoAlpha: 1,
        ease: 'power3.in',
        duration: 0.8,
        scrollTrigger: {
          trigger: project,
          start: 'top bottom',
          end: 'bottom center'
        }
      })
      GSAP.to(project, {
        yPercent: speed * 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.home__projects__wrapper',
          start: 'top bottom',
          end: 'bottom center',
          scrub: true
        }
      })
      ScrollTrigger.create({
        trigger: projectName,
        start: 'top bottom',
        onEnter: () => {
          GSAP.to([projectName, projectArrowLink], {
            autoAlpha: 1,
            y: '0%',
            duration: 0.8,
            ease: CustomEase.create('cubicOut', '0.33, 1, 0.68, 1'),
            stagger: {
              each: 0.2
            }
          })
        }
      })
    })
  }

  async hide (url) {
    this.element.classList.remove(this.classes.active)

    return super.hide(url)
  }

  update (time) {
    super.update(time)
  }

  onResize () {
    super.onResize()
  }

  addEventListeners () {
  }

  removeEventListeners () {
  }

  /**
   * Destroy.
   */
  destroy () {
    super.destroy()
    window.removeEventListener('preloaderCompleted', this.heroAnimationIn.bind(this))
  }
}
