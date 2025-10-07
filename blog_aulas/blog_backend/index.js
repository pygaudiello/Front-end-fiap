require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const bcrypt = require('bcrypt');
const { User } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

const PORT = process.env.PORT || 4000;
sequelize.sync().then(async () => {
    const exists = await User.findOne({ where: { username: 'prof1' } });
    if (!exists) {
        const hash = await bcrypt.hash('senha123', 10);
        await User.create({ username: 'prof1', passwordHash: hash, role: 'teacher' });
        console.log('usuario prof1 criado (senha: senha123)');
    }
    app.listen(PORT, () => console.log(`API na porta ${PORT}`));
});

