const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res, next) => {
  // find all tags
  // be sure to include its associated Product data
  let products
  try {
    tags = await Tag.findAll({
      include: [
        {
          model: Product,
          as: 'product',
        },
      ]
    }).then(results => {
      res.status(200).json(results)
    })
  } catch (error) {
    return next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const { id } = req.params
  let tag
  try {
    tag = await Tag.find({
      where: {id: id},
      include: [
        {
          model: Product,
          as: 'product',
        },
      ]
    }).then(results => {
      res.status(200).json(results)
    })
  } catch (error) {
    return next(error)
  }
});

router.post('/', (req, res, next) => {
  // create a new tag
   /* req.body should look like this...
    {
      tag_name: "TAG",
      
    }
  */
    Tag.create(req.body)
    .then((tag) => {
          res.status(201).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res, next) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    
    .then((updatedTag) => res.status(200).json(updatedTag))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });

});

router.delete('/:id', (req, res, next) => {
  // delete on tag by its `id` value
  const { id } = req.params
  try {
    Tag.destroy(
      {where : {id: id}}
    )
    res.status(200).json({message: 'deleted'})
  } catch (error) {
    return next(error)
  }
});

module.exports = router;
