const roleCheck = (targetRole) => {

    const innereFunktion = (req, res, next) => {

        if(req.user.role !== targetRole) {

            return res.status(403).json({error: 'unauthorized'});
        }

        next();
    }
    return innereFunktion;
}

export default roleCheck;