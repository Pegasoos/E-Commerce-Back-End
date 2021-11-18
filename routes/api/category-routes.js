const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
  const categoryData = await Category.findAll({
    include: Product
  });
  res.status(200).json(categoryData);
  }
  catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
  const categoryIdData = await Category.findByPk(req.params.id, {include: Product});
  if(!categoryIdData){
    res.status(404).json([{message:'No category found with this id!'}])
  }
  res.status(200).json(categoryIdData);
  }
  catch(err){
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
