const Article = require("../models/articleModel");

const getAllArticles = async () => {
    return await Article.find();
};

const getArticleById = async (id) => {
    return await Article.findById(id);
};

const createArticle = async (articleData) => {
    const article = new Article(articleData);
    return await article.save();
};

const updateArticle = async (id, articleData) => {
    return await Article.findByIdAndUpdate(id, articleData, { new: true });
};

const deleteArticle = async (id) => {
    return await Article.findByIdAndDelete(id);
};

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
};
