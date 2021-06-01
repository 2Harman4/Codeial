module.exports.setFlash = function(req,res,next){
    //find out flash from the request and store in locals of response
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    
    next();
}