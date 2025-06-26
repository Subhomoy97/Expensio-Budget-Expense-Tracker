const jwt = require('jsonwebtoken');

const AdminCheck = async(req, res, next) => {
    const cookie=req.cookies['token']
    if(!cookie){
        req.flash('error', 'Not authorized. Please login first.');
        return res.redirect('/admin/login');
    }
    try {
        const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        req.flash('error', 'Invalid Token Access');
        return res.redirect('/admin/login');
    }
    next();
}

module.exports = AdminCheck