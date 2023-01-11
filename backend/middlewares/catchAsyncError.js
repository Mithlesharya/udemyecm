// creating global catch async error for api
  export const catchAsyncError = func => (req, res, next) =>{
    Promise.resolve(func(req, res, next))
    .catch(next)
  }