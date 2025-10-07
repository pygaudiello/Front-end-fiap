const express = require('express');
const router = express.Router();
const { Post, Comment, User, Op } = require('../models'); 
const { authenticateToken, requireTeacher } = require('../middleware/auth');

// listar posts (público) com busca q
router.get("/", async (req, res) => {
    try {
        const q = req.query.q || ""; // pega query da URL (?q=xxx)
        
        let where = {};
        if (q) {
        where = {
            [Op.or]: [
            { title: { [Op.like]: `%${q}%` } },   // busca no título
            { content: { [Op.like]: `%${q}%` } } // busca no conteúdo
            ]
        };
        }

        const posts = await Post.findAll({
            where,
            // include: [{ model: User, as: 'user', attributes: ["username"] }],
            order: [["createdAt", "DESC"]]
        });

        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ver post por id (com comentários)
router.get('/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id, { include: [Comment] });
    if (!post) return res.status(404).json({ error: 'not found' });
    res.json(post);
});

// criar post (só professores autenticados)
/*router.post("/", authenticateToken, requireTeacher, async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        if (!title || !content || !userId) {
        return res.status(400).json({ error: "Preencha todos os campos" });
        }

        const post = await Post.create({ title, content, userId });
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});*/
// criar post (só professores autenticados)
router.post("/", authenticateToken, requireTeacher, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }

        const post = await Post.create({
            title,
            content,
            author: req.user.username,
            userId: req.user.id // vem do token decodificado
        });

        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
    });




// editar post
router.put('/:id', authenticateToken, requireTeacher, async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'not found' });
    const { title, content, author } = req.body;
    post.title = title; post.content = content; post.author = author; post.excerpt = content.slice(0,200);
    await post.save();
    res.json(post);
});

// excluir post
router.delete('/:id', authenticateToken, requireTeacher, async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'not found' });
    await post.destroy();
    res.json({ ok: true });
});

// adicionar comentário (público)
router.post('/:id/comments', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'not found' });
    const { author, content } = req.body;
    const comment = await Comment.create({ author, content, PostId: post.id });
    res.status(201).json(comment);
});

module.exports = router;

