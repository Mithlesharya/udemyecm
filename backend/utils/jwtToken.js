// create and send token, save in the cookie

export const sendToken = (user, statusCode, res) => {

    // create jwt token

    const token = user.getJwtToken();
    const options = {
        expires: new Date((
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000 // set expires cookies time 24hrs, 60min, 60sec, 1000ms
        )),
        httpOnly: true
    }
    
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })


}

