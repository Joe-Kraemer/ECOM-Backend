const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});
router.get('/:id', async (req, res, next) => {
  // find one category by its `id` value
  const { id } = req.params
  let category
  try {
    category = await Category.find({
      where: {id: id},
      include: [
        {
          model: Product,
          as: 'products',
          // where?
        }
      ]
    }).then(results => {
      res.status(200).json(results)
    })
  } catch (error) {
    return next(error)
  }
  // be sure to include its associated Products
});

router.post('/', (req, res, next) => {
  // create a new category
  const { category_name } = req.body
  try {
    Category.findOrCreate({
      where:  {category_name: category_name }
    }).then(category => {
      res.status(201).json(category)
    })
  } catch (error) {
    return next(error)
  }
});

router.put('/:id', (req, res, next) => {
  // update a category by its `id` value
  const { id } = req.params
  const {category_name} = req.body
  try {
    Category.update(
      { category_name: category_name},
      { where: { id: id } }
    ).then(category => {
      res.status(200).json((category))
    })
  } catch (error) {
    return next(error)
  }
});

router.delete('/:id', (req, res, next) => {
  // delete a category by its `id` value
  const { id } = req.params
  try {
    Category.destroy(
      {where : {id: id}}
    )
    res.status(200).json({message: 'deleted'})
  } catch (error) {
    return next(error)
  }
});

module.exports = router;
