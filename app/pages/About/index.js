import Page from 'classes/Page'

export default class extends Page {
  constructor () {
    super({
      id: 'about',
      classes: {
        active: 'about--active'
      },

      element: '.about',
      elements: {
        wrapper: '.about__wrapper',
        navigation: document.querySelector('.navigation')
      }
    })
  }

  /**
   * Animations.
   */
  async show (url) {

  }

  async hide (url) {

  }
}
