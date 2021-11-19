const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({include: Product});
    res.status(200).json(tagData);
    }
    catch (err){
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  try{
    const tagIdData = await Tag.findByPk(req.params.id, {include: Product});
    if(!tagIdData){
      res.status(404).json([{message:'No product found with this id!'}]);
    }
    res.status(200).json(tagIdData);
    }
    catch(err){
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  // create a new tag
    try{
      const newTagData = await Tag.create(req.body);
      res.status(200).json(newTagData)
    }
    catch(err){
      res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Tag.update({tag_name: req.body.tag_name}, {
      where:{
        id: req.params.id,
      }
    })
    if(!tagData[0]){
      res.status(404).json({req})
      return
    }
    res.status(200).json(tagData);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
