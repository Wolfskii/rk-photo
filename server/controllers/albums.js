const Album = require('../models/Album')

const albums = {}

albums.readAll = async (req, res, next) => {
  try {
    const items = await Album.find() // .limit() for a limit of gotten
    res.json({
      albums: items,
      links: {
        self: { href: '', method: 'GET, POST', desc: 'GET all registered albums or POST to create a new album if logged in', params: 'POST: { {name}, {description}, {imgUrl}, {longitude}, {latitude}, {type} }', authToken: '{token}' },
        getOneAlbum: { href: '/:id', method: 'GET', desc: 'Get a specific album from id', params: '{id}' },
        editAlbum: { href: '/:id', method: 'PUT', desc: 'Change a album if logged in and is yours', params: '{id}, {name}, {description}, {imgUrl}, {longitude}, {latitude}, {type} }', authToken: '{token}' },
        deleteAlbum: { href: '/:id', method: 'DELETE', desc: 'Delete a album by its id if logged in and is yours', params: '{id}', authToken: '{token}' }
      }
    })
  } catch (err) {
    res.json({ message: err })
  }
}

albums.readById = async (req, res, next) => {
  try {
    const item = await Album.findOne({ _id: req.params.id })
    res.json(item)
  } catch (err) {
    res.json({ message: err })
  }
}

albums.create = async (req, res, next) => {
  const item = new Album({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    coverImgUrl: req.body.coverImgUrl,
    images: req.body.images,
    // authorId: req.body.authorId, // TODO: To take from user-token when logged in later
    links: {}
  })

  try {
    // Set datetime if provided in POST-request - Otherwise sets current automatically
    if (req.body.datetime) { item.datetime = req.body.datetime }

    item.links = {
      self: `/api/albums/${item._id}`
      /* user: `/api/albums/${item.authorId}` TODO: add endpoint for all authors */
    }
    const savedItem = await item.save()
    delete savedItem.links
    res.status(201).json(savedItem)
  } catch (err) {
    res.json({ message: err })
  }
}

albums.updateById = async (req, res, next) => {
  try {
    // TODO: Implement checking if current user is the owner of the item, otherwise deny update, and if item exists

    await Album.updateOne({ _id: req.params.id }, {
      $set: {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        coverImgUrl: req.body.coverImgUrl,
        images: req.body.images,
        datetime: req.body.datetime
      }
    })

    const updatedItem = await Album.findOne({ _id: req.params.id })
    delete updatedItem.links
    res.json(updatedItem)
  } catch (err) {
    res.json({ message: err })
  }
}

albums.deleteById = async (req, res, next) => {
  try {
    const searchedItem = await Album.findOne({ _id: req.params.id })

    // TODO: Implement checking if current user is the owner of the item, otherwise deny update, and if item exists

    await Album.deleteOne({ _id: req.params.id })
    delete searchedItem.links
    res.json({
      message: 'Succesfully removed!',
      removed: searchedItem
    })
  } catch (err) {
    res.json({ message: err })
  }
}

module.exports = albums
