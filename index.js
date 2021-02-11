import auth from './api/routes/auth';
module.exports = (app) => {
    app.use('/api/auth', auth);

    app.use((req, res, next) => {
        const err = new Error('Page not found');
        err.status = 404;
        next(err);
    });

    // eslint-disable-next-line no-unused-vars
    app.use((error, req, res, next) => {
        const status = error.status || 500;
        res.status(status);
        res.json({
            status,
            error: error.message,
        });
    });
};