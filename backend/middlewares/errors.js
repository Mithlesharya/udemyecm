
export const errorsMiddlewares = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'enter server error';

    res.status(err.statusCode).json({
        success: false,
        error: err.stack
    })
}