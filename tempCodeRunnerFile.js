import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';




const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'))


// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) =>{
  const title = 'home';
  res.render('home', {title});
});

app.get('/organizations', async (req, res) =>{
  const title = 'organizations';
  res.render('organizations', {title});
});

app.get('/projects', async (req, res) =>{
  const title = 'service projects';
  res.render('projects', { title });
});



app.get('/categories', async (req, res) =>{
  const title = 'categories';
  res.render('categories',{ title});
})


app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});