const mongoose = require("mongoose");


const articleSchema = mongoose.Schema({
    title:{
        type:String
    },
    subtitle:{
        type:String
    },
    category:{
        type:String
    },
    body:{
        type:String
    },
    author:{
        type:String
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    comments:[{
        comment_subject:{
            type:String
        },
        comment_body:{
            type:String
        },
        comment_author:{
            type:String
        },
        comment_email:{
            type:String
        },
        comment_date:{
            type:Date,
            default:Date.now
        }
    }]
});

const Article = module.exports = mongoose.model("Article", articleSchema);

module.exports.getArticles = function(callback, limit){
    Article.find(callback).limit(limit).sort([["title", "ascending"]]);
}

module.exports.addArticle = function(article, callback){
    Article.create(article, callback);
}

module.exports.getCategoryArticles = function(categoryId, callback){
    let query= {category:categoryId}
    Article.find(query, callback).sort([["title", "ascending"]]);
}

module.exports.getArticleById = function(id, callback){
    Article.findById(id, callback);    
}

module.exports.updateArticle = function(query, update, options, callback){
    Article.findOneAndUpdate(query, update, options, callback);    
}

module.exports.removeArticle = function(query, callback){
    Article.remove(query, callback);
}


module.exports.addComment = function(query, comment, callback){
    Article.update(query,
      {
        $push: {
          comments: comment
        }
      },
      callback
    );
  }
  