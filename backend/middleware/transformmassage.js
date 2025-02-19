

const transformMessage = (transformation) => {
    const innereFunktion = (req, res, next) => {
      if (transformation === "lowercase") {
        req.message = req.message.toLowerCase();
      }
      next();
    };
    return innereFunktion;
  };

export default transformMessage;