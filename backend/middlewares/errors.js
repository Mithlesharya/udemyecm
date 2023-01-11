export const errorsMiddlewares = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'enter server error';
    

    //development error
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    //production error 
    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err };
        error.message = err.message
        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server error'
        })
    }


}