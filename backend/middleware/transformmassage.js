const transformMessage = (transformation) => {
  return (req, res, next) => {
      if (req.body.message) {
          if (transformation === "lowercase") {
              req.body.message = req.body.message.toLowerCase();
          }
          if (transformation === "uppercase") {
              req.body.message = req.body.message.toUpperCase();
          }
      }
      next();
  };
};

export default transformMessage;
