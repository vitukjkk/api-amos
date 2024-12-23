import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// ROUTES
import { routes } from './routes/index';

app.use(express.json());
app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  res.json({message:'Hello World!'});
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})