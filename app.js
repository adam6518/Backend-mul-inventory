import express from 'express';
import {checkConnection} from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import cors from 'cors'

import createAllTable from './src/utils/dbUtils.js' 

const app = express();
app.use(cors())

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(3000, async () => {
    console.log('Server rnning on port 3000');
    try {
        await checkConnection()
        await createAllTable()
    } catch(error) {
        console.log('failed to initiate databases',error);
        
    }
});