// blog_backend/middleware/auth.js - VERSÃO CORRIGIDA
const jwt = require('jsonwebtoken');

    const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        return res.status(403).json({ error: 'Token inválido' });
        }
        
        req.user = decoded;
        next();
    });
    };

    const requireTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        next();
    } else {
        res.status(403).json({ error: 'Acesso negado. Apenas professores.' });
        res.render('/login');
    }
    };

    module.exports = { authenticateToken, requireTeacher };