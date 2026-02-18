//protect the routes -- so that only authenticated users can access them

//current version generates a JWT after GitHub login, but other routes are not protected 

//create middleware to verify JWT, attach user info to request and use it on protected routes