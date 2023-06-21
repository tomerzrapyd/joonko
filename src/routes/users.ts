import {Router, Request, Response, NextFunction} from "express";

const router = Router();

// GET
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).end();
});

router.get('/job', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).end();
})

router.get('/jobs', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).end();
});

// POST
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).end();
});

export default router;