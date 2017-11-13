import dva from 'dva';
import 'babel-polyfill';
//import loggerMiddleware from './middleware/loggerMiddleware';

import './index.css';


// 1. Initialize
const app = dva({
    //onAction:[loggerMiddleware]
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/Organization'));
app.model(require('./models/Role'));
app.model(require('./models/Login'));
app.model(require('./models/User'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

