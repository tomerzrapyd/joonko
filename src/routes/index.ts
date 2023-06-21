import express from 'express';

import usersRoutes from './users';

const appRoutes = (): express.Router => {
    const router = express.Router();

    router.use('/users', usersRoutes);
    return router;
}

export default appRoutes;