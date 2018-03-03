const express = require("express");
const router = express.Router();

Category = require("../models/Category.js")

router.get("/", (req, res, next) => {
    Category.getCategories((err, categories) => {
        if(err){
        res.send(err);
        }
        res.render("categories",{title:"Categories", categories:categories});
    });    
});

router.post("/add", (req,res,next)=> {
    req.checkBody('title', 'Title is required').notEmpty();

    let error = req.validationErrors();

    if(error){
        res.render('add_category',{
            errors:error,
            title:'Create Category'
        })
    }else{
        let category = new Category();
        category.title = req.body.title;
        category.description = req.body.description;
        Category.addCategory(category, (err, category) => {
            if(err){
                res.send(err);
            }
            res.redirect("/manage/categories");
        });
    }    
});

router.post("/edit/:id", (req,res,next)=> {
    req.checkBody('title', 'Title is required').notEmpty();

    let error = req.validationErrors();
    if(error){
        res.render('edit',{
            errors:error,
            title:'Edit Category'
        })
    }else{
        let category = new Category();
        const query = {_id: req.params.id};
        const update ={title: req.body.title, description:req.body.description};
        Category.updateCategory(query, update, {}, (err, category) => {
        if(err){
            res.send(err);
        }
        res.redirect("/manage/categories");
    });
    }    
    
});

router.delete('/delete/:id', (req, res, next) => {
    const query = {_id: req.params.id}

    Category.removeCategory(query, (err, category) => {
      if(err){
        res.send(err);
      }
      res.json({success : "Delete Successfully", status : 200});
    });
  });

module.exports = router