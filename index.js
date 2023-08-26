const express = require('express');
const app = express();

app.use(express.json());

let koders = []

// Registrar un nuevo koder
app.post('/koders', (request, response) => {
  const { name, age, progLang } = request.body;
  const koder = { name, age, progLang };
  koders.push(koder);
  response.json(koder);
});

// Listar todos los koders
app.get('/koders', (request, response) => {
  response.json(koders);
});

// Eliminar koders por su nombre
app.delete('/koders/:name', (request, response) => {
  const { name } = request.params;
  const index = koders.findIndex(koder => koder.name === name);
  if (index!== -1) {
    koders.splice(index, 1);
    response.json({ message: `Koder ${name} borrado con éxito` });
  } else {
    response.status(404).json({ message: `Koder ${name} no encontrado` });
  }
});

// Eliminar todos los koders
app.delete('/koders', (request, response) => {
  koders = [];
  response.json({ message: 'Todos los koders han sido borrados correctamente' });
});

app.listen(8080, () => {
    console.log("server running on port 8080");
});