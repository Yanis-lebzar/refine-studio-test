import Page from 'classes/Page'

export default class extends Page {
  constructor () {
    super({
      id: 'galerie',

      element: '.galerie',
      elements: {
        wrapper: '.galerie__wrapper',

        navigation: document.querySelector('.navigation')
      }
    })
  }

  // create () {
  //   super.create()
  // }

  // /**
  //  * Animations.
  //  */
  async show (url) {
    // this.element.classList.add(this.classes.active)
    document.documentElement.classList.add('overflow-hidden')

    return super.show(url)
  }

  async hide (url) {
    document.documentElement.classList.remove('overflow-hidden')

    // this.element.classList.remove(this.classes.active)

    return super.hide(url)
  }

  // /**
  //  * Events.
  //  */
  // onResize () {
  //   super.onResize()
  // }

  // /**
  //  * Loop.
  //  */
  // update () {
  //   super.update()
  // }

  // /**
  //  * Destroy.
  //  */
  // destroy () {
  //   super.destroy()
  // }
}
