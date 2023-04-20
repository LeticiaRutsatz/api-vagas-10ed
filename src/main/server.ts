import app from './config/app';
import 'dotenv/config';

const port = process.env.PORT || 8080;

app.listen(port, () => console.log('Sevidor rodando na porta ' + port));
