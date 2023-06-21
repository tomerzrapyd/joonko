import express, {Application} from "express";
import CookieParser from 'cookie-parser';
import appRoutes from '../routes';

export function initRoutes (app: Application) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(CookieParser());

    app.use('/api/v1', appRoutes());

    app.use('*', (_req, res, _next) => {
        res.status(404).send({status: 'Invalid URL'});
    })
}