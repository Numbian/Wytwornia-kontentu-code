const middlewareObj = {};

middlewareObj.isLoggedIn = (req,res,next) => {

   if(req.isAuthenticated()){
		return next();	
}
	res.redirect("/login");
}

middlewareObj.isAdmin = (req,res,next) => {

   if(req.isAuthenticated() && req.user.isAdmin==true){
		return next();
}
	res.redirect("/login");
}


middlewareObj.noCache = (req,res,next) => {
   res.setHeader("Cache-Control", "no-cache")
   return next();
}




module.exports = middlewareObj
