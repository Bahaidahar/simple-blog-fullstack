const articleUseCases = require("../useCases/articleUseCases");

const getArticles = async (req, res) => {
    try {
        const articles = await articleUseCases.getAllArticles();
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getArticle = async (req, res) => {
    try {
        const article = await articleUseCases.getArticleById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createArticle = async (req, res) => {
    try {
        const newArticle = await articleUseCases.createArticle(req.body);
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateArticle = async (req, res) => {
    try {
        const updatedArticle = await articleUseCases.updateArticle(
            req.params.id,
            req.body,
        );
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json(updatedArticle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const article = await articleUseCases.deleteArticle(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json({ message: "Article deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
};
