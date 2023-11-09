const express=require('express');
const router=express.Router();
const {telepulesek,telepules}=require('../controllers/telepulesController');

router.get('/',telepulesek);
router.get('/telepulesnev/:telepulesnev',telepules);



module.exports=router;