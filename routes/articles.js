const express = require("express");
const router = express.Router();

Article = require("../models/Article.js");

router.get("/", (req, res, next) => {
    Article.getArticles((err,articles)=>{
        res.render("index",{title:"Index", articles:articles});
    });    
    res.render("article",{title:"Articles"});
});

router.get('/show/:id', (req, res, next) => {
    Article.getArticleById(req.params.id, (err, article) => {
      res.render('article', {
        title: 'Article',
        article: article
      });
    });
  });

router.get("/category/:category_id", (req, res, next) => {
    Article.getCategoryArticles(req.params.category_id,(err,articles)=>{
        Category.getCategoryById(req.params.category_id,(err,category)=>{
            res.render("articles",{title: category.title+" Articles", articles:articles});
        });        
    });
});

router.post("/add", (req,res,next)=> {
    let article = new Article();
    article.title = req.body.title;
    article.subtitle = req.body.subtitle;
    article.category = req.body.category;
    article.body = req.body.body;
    article.author = req.body.author;
    Article.addArticle(article, (err, category) => {
        if(err){
            res.send(err);
        }
        res.redirect("/manage/articles");
    });
});

router.post("/edit/:id", (req,res,next)=> {
    let article = new Article();
    const query = {_id:req.params.id}
    const update = {
        title:req.body.title,
        title:req.body.title,
        subtitle :req.body.subtitle,
        category : req.body.category,
        body : req.body.body,
        author : req.body.author
    }
   
    Article.updateArticle(article, (err, article) => {
        if(err){
            res.send(err);
        }
        res.redirect("/manage/articles");
    });
});

router.delete('/delete/:id', (req, res, next) => {
    const query = {_id: req.params.id}

    Article.removeArticle(query, (err, article) => {
      if(err){
        res.send(err);
      }
      res.json({success : "Delete Successfully", status : 200});
    });
  });

  router.post('/comments/add/:id', (req, res, next) => {
    req.checkBody('comment_subject', 'Subject is required').notEmpty();
    req.checkBody('comment_author', 'Author is required').notEmpty();
    req.checkBody('comment_body', 'Body is required').notEmpty();
  
    let errors = req.validationErrors();
  
    if(errors){
      Article.getArticleById(req.params.id, (err, article) => {
        res.render('article', {
          title: 'Article',
          article: article,
          errors: errors
        });
      });
    } else {
      let article = new Article();
      let query = {_id: req.params.id}
  
      let comment = {
        comment_subject: req.body.comment_subject,
        comment_author: req.body.comment_author,
        comment_body: req.body.comment_body,
        comment_email: req.body.comment_email,
      }
  
      Article.addComment(query, comment, (err, article) => {
        res.redirect('/articles/show/'+req.params.id);
      });
    }
  });

module.exports = router