import app from './main/config/app';
import 'dotenv/config';

const port = process.env.PORT || 8080;

app.listen(port, () => console.log('TESTE ' + port));
