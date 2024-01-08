import Component from 'classes/Component'

import Link from 'animations/Link'

import { mapEach } from 'utils/dom'

export default class FullscreenMenu extends Component {
  constructor ({ template }) {
    super({
      element: '.fullscreenMenu',
      elements: {
        list: '.fullscreenMenu__list',
        items: '.fullscreenMenu__list__item',
        links: '.fullscreenMenu__list__link'
      }
    })

    this.links = mapEach(this.elements.links, element => {
      return new Link({
        element
      })
    })

    this.onChange(template)
  }

  onChange (template) {
    // if (template !== 'home') {
    //   this.element.classList.add('navigation--active')
    //   this.elements.burger.classList.add('navigation__hamburger--show')
    // }
  }
}
