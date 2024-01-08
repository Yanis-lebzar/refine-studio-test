import Component from 'classes/Component'
import GSAP from 'gsap'
import each from 'lodash/each'

import { COLOR_BEE_YELLOW, COLOR_BRIGHT_NAVY, COLOR_FSDARK, COLOR_FSLIGHT, COLOR_HOOKER_GREEN, COLOR_INTERNATIONAL_ORANGE, COLOR_SAP_GREEN, COLOR_SNOW, COLOR_WHITE, COLOR_WINDSOR_TAN } from '../utils/colors.js'

export default class Navigation extends Component {
  constructor ({ template }) {
    super({
      element: '.navigation',
      pageClasses: {
        gallery: 'galeriePage',
        about: 'aboutPage',
        voyages: 'voyagesPage',
        destination: 'destinationPage',
        randonnees: 'randonneesPage',
        home: 'homePage'
      },
      elements: {

        items: '.navigation__list__item',
        links: '.navigation__list__link'
        // burger: '.navigation__hamburger',
        // burgerLines: document.querySelector('.navigation__hamburger__lines'),
        // fullscreenList: '.fullscreenMenu__list',

        // fullscreenMenu: document.querySelector('.fullscreenMenu'),
        // fullscreenMenuLinks: document.querySelectorAll('.fullscreenMenu__list__link'),
        // footerMail: document.querySelector('.fullscreenMenu').querySelector('.footer__mail__wrapper'),
        // footerInstagram: document.querySelector('.fullscreenMenu').querySelector('.footer_social_link')
      }
    })
    // GSAP.set('.fullscreenMenu', { yPercent: 100 })

    // this.links = mapEach(this.elements.fullscreenMenuLinks, element => {
    //   return new Link({
    //     element
    //   })
    // })

    this.onChange(template)
  }

  // onTouch () {
  //   this.elements.burgerLines.classList.toggle('navigation__hamburger__lines--active')

  //   if (this.elements.burgerLines.classList.contains('navigation__hamburger__lines--active')) {
  //     this.elements.fullscreenMenu.classList.add('fullscreenMenu--active')

  //     GSAP.to('.fullscreenMenu',
  //       {
  //         yPercent: 0,
  //         duration: 0.4,
  //         ease: 'ease-in-out'
  //       })

  //     // Utilisez forEach pour animer chaque lien avec un décalage
  //     this.elements.fullscreenMenuLinks.forEach((link, index) => {
  //       GSAP.fromTo(link, {
  //         opacity: 0,
  //         y: 100,
  //         stagger: 0.5

  //       }, {
  //         opacity: 1,
  //         y: 0,
  //         duration: 1,
  //         ease: 'power2.out',
  //         delay: index * 0.1 // Applique un décalage à chaque lien
  //       })
  //     })

  //     GSAP.fromTo(this.elements.footerMail,
  //       { opacity: 0, y: 0 },
  //       { opacity: 1, duration: 0.5, delay: 0.7 }
  //     )

  //     GSAP.fromTo(this.elements.footerInstagram,
  //       { opacity: 0, y: 0 },
  //       { opacity: 1, duration: 0.5, delay: 0.9 }
  //     )
  //   } else {
  //     // Utilisez forEach pour animer chaque lien avec un décalage
  //     this.elements.fullscreenMenuLinks.forEach((link, index) => {
  //       GSAP.to(link, {
  //         opacity: 0,
  //         y: -800,
  //         stagger: 0.5,
  //         duration: 1,
  //         ease: 'power2.out',
  //         delay: index * 0.01 // Applique un décalage à chaque lien
  //       })
  //     })

  //     GSAP.to(this.elements.footerMail,
  //       { opacity: 0, y: -600, duration: 0.5, ease: 'power2.out' }
  //     )

  //     GSAP.to(this.elements.footerInstagram,
  //       { opacity: 0, y: -600, duration: 0.5, ease: 'power2.out' }
  //     )

  //     setTimeout(() => {
  //       GSAP.to('.fullscreenMenu', {
  //         yPercent: -100,
  //         duration: 0.4,
  //         ease: 'ease-in-out',
  //         onComplete: () => {
  //           // Supprimez la classe 'fullscreenMenu--active' uniquement lorsque vous désactivez le menu
  //           this.elements.fullscreenMenu.classList.remove('fullscreenMenu--active')
  //           // this.elements.fullscreenMenu.style.top = '100%'
  //           GSAP.set('.fullscreenMenu', { yPercent: 100 })
  //         }
  //       })
  //     }, 200)
  //   }
  // }

  onChange (template) {
    // GSAP.set('.fullscreenMenu', { yPercent: 100 })

    // if (template === 'home') {
    //   this.element.classList.add('hidden')
    // } else {
    //   this.element.classList.remove('hidden')
    // }
    if (template !== 'about') {
      // this.elements.fullscreenMenu.style.backgroundColor = COLOR_FSDARK
    } else {
      // this.elements.fullscreenMenu.style.backgroundColor = COLOR_FSLIGHT
    }

    if (template === 'home') {
      // const sheet = document.styleSheets[0] // Ou une autre feuille de style si nécessaire
      // const cssRule = `.navigation__hamburger__lines::before,::after { background-color: ${COLOR_WINDSOR_TAN} !important; }` // La nouvelle règle CSS
      // sheet.insertRule(cssRule, sheet.cssRules.length) // Insérer la règle à la fin de la feuille de style
      // document.querySelectorAll('.navigation__list__link').forEach(element => {
      //   element.style.fontSize = '2.4rem'
      // })
      // document.querySelector('.navigation__hamburger').style.borderColor = COLOR_WINDSOR_TAN
      // document.querySelector('.navigation__icon__link').style.borderColor = COLOR_WINDSOR_TAN
      // document.querySelector('.navigation__icon__link').style.color = COLOR_WINDSOR_TAN

      // document.querySelector('.fullscreenMenu__list').style.color = COLOR_WINDSOR_TAN

      // this.fullscreenMenu.querySelector('.footer__mail__wrapper').style.color = COLOR_BRIGHT_NAVY
    } else {
      // document.querySelectorAll('.navigation__list__link').forEach(element => {
      //   element.style.fontSize = '3.6rem'
      // })
    }

    // if (template === 'about') {
    //   const sheet = document.styleSheets[0] // Ou une autre feuille de style si nécessaire
    //   const cssRule = `.navigation__hamburger__lines::before,::after { background-color: ${COLOR_BRIGHT_NAVY} !important; }` // La nouvelle règle CSS
    //   sheet.insertRule(cssRule, sheet.cssRules.length) // Insérer la règle à la fin de la feuille de style

    //   document.querySelector('.navigation__hamburger').style.borderColor = COLOR_BRIGHT_NAVY
    //   document.querySelector('.navigation__icon__link').style.borderColor = COLOR_BRIGHT_NAVY
    //   document.querySelector('.navigation__icon__link').style.color = COLOR_BRIGHT_NAVY

    //   this.elements.fullscreenMenu.style.backgroundColor = COLOR_FSLIGHT

    //   each(document.querySelectorAll('.footer__mail'), element => {
    //     element.classList.remove('voyagesPage')
    //     element.classList.remove('voyagesPage')

    //     element.classList.add('aboutPage')
    //   })

    // console.log('footer', document.querySelector('.about .footer__mail__wrapper'))

    // document.querySelector('.fullscreenMenu .footer__mail__wrapper').style.color = COLOR_BRIGHT_NAVY
    // }
  }

  addEventListeners () {
    // this.onTouchBound = this.onTouch.bind(this)
    // this.elements.burger.addEventListener('click', this.onTouchBound)
  }

  removeEventListeners () {
    // this.elements.burger.removeEventListener('click', this.onTouchBound)
  }

  destroy () {
    super.destroy()
    this.removeEventListeners()
  }
}
