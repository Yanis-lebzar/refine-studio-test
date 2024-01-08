require('dotenv').config()

const logger = require('morgan')
const express = require('express')
const errorHandler = require('errorhandler')
const methodOverride = require('method-override')
const compression = require('compression')
const app = express()
const path = require('path')
const port = 3000
const fetch = require('node-fetch')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))

app.use(errorHandler())

const Prismic = require('@prismicio/client')
const PrismicH = require('@prismicio/helpers')
const UAParser = require('ua-parser-js')

const initApi = async (req) => {
  return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
    fetch
  })
}

const handleLinkResolver = doc => {
  // test

  // pour des sous pages

  // if (doc.type === 'product') {
  //   return `/detail/${doc.slug}`
  // }

  // if (doc.type === 'destinations') {
  //   return `/destinations/${doc.slug}`
  // }

  // if (doc.type === 'about') {
  //   return '/about'
  // }

  // if (doc.type === 'galerie') {
  //   return '/galerie'
  // }

  return '/'
}

app.use((req, res, next) => {
  const ua = UAParser(req.headers['user-agent'])

  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type === 'tablet'

  res.locals.Link = handleLinkResolver

  res.locals.Numbers = index => {
    return index === 0 ? 'One' : index === 1 ? 'Two' : index === 2 ? 'Three' : index === 3 ? 'Four' : ''
  }
  res.locals.PrismicH = PrismicH

  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const handleRequest = async api => {
  // const about = await api.getSingle('about')
  // const home = await api.getSingle('home')
  // const galerie = await api.getSingle('galerie')
  // // const destinations = await api.getSingle('destinations')
  // // const destinations = await api.getAllByType('destination')

  // const meta = await api.getSingle('metadata')
  // const footer = await api.getSingle('footer')

  // const navigation = await api.getSingle('navigation')
  // const preloader = await api.getSingle('preloader')

  // const destinations = await api.getAllByType('destination')
  // const randonnees = await api.getAllByType('rando')
  // const voyages = await api.getAllByType('voyage')

  // // Extraire les UIDs ordonnés pour les randonnées et les voyages
  // const orderedRandonneesUids = []
  // const orderedVoyageUids = []

  // destinations.forEach(destination => {
  //   if (destination.uid === 'randonnees') {
  //     orderedRandonneesUids.push(...destination.data.destinations.map(item => item.destination_destination.uid))
  //   } else if (destination.uid === 'voyages') {
  //     orderedVoyageUids.push(...destination.data.destinations.map(item => item.destination_destination.uid))
  //   }
  // })

  // Triez les 'randos' et voyages selon l'ordre des UIDs obtenus
  // const orderedRandonnees = orderedRandonneesUids.map(uid => randonnees.find(rando => rando.uid === uid))
  // const orderedVoyages = orderedVoyageUids.map(uid => voyages.find(voyage => voyage.uid === uid))

  // const assets = []

  // // ajouts de toutes les images dans assets
  // home.data.body[0].items.forEach(item => {
  //   assets.push(item.image.url)
  // })

  // home.data.body[1].items.forEach(item => {
  //   assets.push(item.image.url)
  // })

  // home.data.body[2].items.forEach(item => {
  //   assets.push(item.image.url)
  // })

  // home.data.body[3].items.forEach(item => {
  //   assets.push(item.image.url)
  // })

  // home.data.body[5].items.forEach(item => {
  //   assets.push(item.image.url)
  // })

  // home.data.body[6].items.forEach(item => {
  //   assets.push(item.image.url)
  // })

  // randonnees.forEach(rando => {
  //   assets.push(rando.data.image.url)
  // })

  // randonnees.forEach(rando => {
  //   rando.data.body.forEach(item => {
  //     if (item.primary.image1 && item.primary.image1.url) {
  //       assets.push(item.primary.image1.url)
  //     }
  //     if (item.items && Array.isArray(item.items)) {
  //       item.items.forEach(subItem => {
  //         if (subItem.image1 && subItem.image1.url) {
  //           assets.push(subItem.image1.url)
  //         }
  //       })
  //     }
  //   })
  //   assets.push(rando.data.image.url)
  // })

  // voyages.forEach(voyage => {
  //   voyage.data.body.forEach(item => {
  //     if (item.primary.image1 && item.primary.image1.url) {
  //       assets.push(item.primary.image1.url)
  //     }
  //     if (item.items && Array.isArray(item.items)) {
  //       item.items.forEach(subItem => {
  //         if (subItem.image1 && subItem.image1.url) {
  //           assets.push(subItem.image1.url)
  //         }
  //       })
  //     }
  //   })
  //   assets.push(voyage.data.image.url)
  // })

  // galerie.data.galerie.forEach(item => {
  //   assets.push(item.image.url)
  // })

  // assets.push(about.data.image.url)
  // assets.push(about.data.textimage.url)

  // assets.push(about.data.textimage.mobile.url)
  // console.log(home.data)
  return {
    // about,
    // assets,
    // home,
    // galerie,
    // meta,
    // navigation,
    // preloader,
    // destinations,
    // randonnees,
    // voyages,
    // orderedRandonnees,
    // orderedVoyages,
    // footer
  }
}

app.get('/', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/home', {
    ...defaults
  })
})

// app.get('/about', async (req, res) => {
//   const api = await initApi(req)
//   const defaults = await handleRequest(api)

//   res.render('pages/about', {
//     ...defaults
//   })
// })

// app.get('/galerie', async (req, res) => {
//   const api = await initApi(req)
//   const defaults = await handleRequest(api)

//   res.render('pages/galerie', {
//     ...defaults
//   })
// })

// app.get('/randonnees', async (req, res) => {
//   const api = await initApi(req)
//   const defaults = await handleRequest(api)

//   res.render('pages/randonnees', {
//     ...defaults
//   })
// })

// app.get('/randonnees/:uid', async (req, res) => {
//   const api = await initApi(req)

//   // const rando = await api.getByUID('rando', req.params.uid, { fetchLinks: 'rando.title' })

//   // const defaults = await handleRequest(api)

//   // res.render('pages/destination', {
//   //   ...defaults, rando, pageType: 'rando'

//   // })

//   try {
//     const rando = await api.getByUID('rando', req.params.uid, { fetchLinks: 'rando.title' })
//     console.log(rando)
//     if (!rando) {
//       // Si le document n'est pas trouvé, redirigez vers la page d'accueil avec un paramètre d'erreur
//       res.redirect('/?error=randoNotFound')
//       return
//     }

//     const defaults = await handleRequest(api)

//     res.render('pages/destination', {
//       ...defaults, rando, pageType: 'rando'
//     })
//   } catch (error) {
//     // En cas d'erreur avec la requête Prismic, redirigez également vers la page d'accueil
//     res.redirect('/?error=internalServerError')
//     console.error(error)
//   }
// })

// app.get('/voyages', async (req, res) => {
//   const api = await initApi(req)
//   const defaults = await handleRequest(api)

//   res.render('pages/voyages', {
//     ...defaults
//   })
// })

// app.get('/slice-simulator', async (req, res) => {
//   const api = await initApi(req)
//   const defaults = await handleRequest(api)

//   res.render('pages/slice-simulator', {
//     ...defaults
//   })
// })

// app.get('/voyages/:uid', async (req, res) => {
//   const api = await initApi(req)

//   // const voyage = await api.getByUID('voyage', req.params.uid, { fetchLinks: 'voyage.title' })
//   // const defaults = await handleRequest(api)

//   try {
//     const voyage = await api.getByUID('voyage', req.params.uid, { fetchLinks: 'voyage.title' })
//     console.log('outside :', voyage)
//     if (!voyage) {
//       console.log('inside :', voyage)
//       console.log('test')
//       // Si le document n'est pas trouvé, redirigez vers la page d'accueil avec un paramètre d'erreur
//       res.redirect('/?error=voyageNotFound')
//       return
//     }

//     const defaults = await handleRequest(api)

//     res.render('pages/destination', {
//       ...defaults, voyage, pageType: 'voyage'
//     })
//   } catch (error) {
//     // En cas d'erreur avec la requête Prismic, redirigez également vers la page d'accueil
//     res.redirect('/?error=internalServerError')
//     console.error(error)
//   }
// })

// app.get('/detail/:uid', async (req, res) => {
//   const api = await initApi(req)
//   const defaults = await handleRequest(api)
//   const product = await api.getByUID('product', req.params.uid, { fetchLinks: 'collection.title' })

//   res.render('template', {
//     ...defaults, product
//   })
// })

// Route pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).send('Désolé, cette page n\'existe pas!')
})

// Gestionnaire d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Quelque chose s\'est mal passé!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
