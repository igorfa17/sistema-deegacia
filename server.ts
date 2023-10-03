import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = 3001;

app.use(express.json());

// Rota para listar todos os criminosos
app.get('/criminosos', async (req, res) => {
  try {
    const criminosos = await prisma.criminoso.findMany();
    res.json(criminosos);
  } catch (error) {
    console.error('Erro ao listar criminosos:', error);
    res.status(500).json({ error: 'Erro ao listar criminosos' });
  }
});

// Rota para criar um criminoso
app.post('/criminosos', async (req, res) => {
  try {
    const { nome, idade, endereco } = req.body;
    const criminoso = await prisma.criminoso.create({
      data: { nome, idade, endereco },
    });
    res.json(criminoso);
  } catch (error) {
    console.error('Erro ao criar criminoso:', error);
    res.status(500).json({ error: 'Erro ao criar criminoso' });
  }
});

// Rota para atualizar informações de um criminoso
app.put('/criminosos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, endereco } = req.body;
    const criminoso = await prisma.criminoso.update({
      where: { id: parseInt(id) },
      data: { nome, idade, endereco },
    });
    res.json(criminoso);
  } catch (error) {
    console.error('Erro ao atualizar criminoso:', error);
    res.status(500).json({ error: 'Erro ao atualizar criminoso' });
  }
});

// Rota para deletar um criminoso
app.delete('/criminosos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const criminosoDeletado = await prisma.criminoso.delete({
      where: { id: parseInt(id) },
    });
    res.json(criminosoDeletado);
  } catch (error) {
    console.error('Erro ao apagar criminoso:', error);
    res.status(500).json({ error: 'Erro ao apagar criminoso' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
