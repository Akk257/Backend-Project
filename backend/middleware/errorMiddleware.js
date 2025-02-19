
const errorHandler = (err, req, res, next) => {
    res.status(500);
    console.log(err);
    res.json({
        message: err.message,
    });
};

export default errorHandler;
