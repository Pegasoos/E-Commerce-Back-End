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
});

router.post('/', async (req, res) => {
  try{
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData)
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const categoryData = await Category.update({category_name: req.body.category_name}, {
      where:{
        id: req.params.id,
      }
    })
    if(!categoryData[0]){
      res.status(404).json({req})
      return
    }
    res.status(200).json(categoryData);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({
      where: {
        id:req.params.id
      }
    });
    if(!categoryData){
      res.status(404).json({message: "No category found with this id!"})
    }
    res.status(200).json(categoryData);
  }
  catch(err){
    res.status(400).json(err);
  }
});

module.exports = router;
