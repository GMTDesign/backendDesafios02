export function onlyRoles(roles) {
    return async function(req, res, next) {
        if (roles.includes(req.user.role)) {
            return next()
        }
        const errorType = new Error('you need special permission')
        errorType['type'] = 'FAILED_AUTHORIZATION'
        next(errorType)
    }
}