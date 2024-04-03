export const applyPolicies = (roles) => {
    return (req, res, next) => {
        if(roles[0].toUpperCase() === 'PUBLIC') {
            return next();
        }
        if(!req.user){
            return res.status(401).send({status: 'Error', message: 'Not authenticated'});
        }

        if(!roles.includes(req.user.role.toUpperCase())){
            return res.status(403).send({status: 'Error', message: 'Not authorized'});
        }
        return next();
    }
}