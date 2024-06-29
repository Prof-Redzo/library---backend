import jwt from "jsonwebtoken";

export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}
 
if(!token) {
   res.status(401).send("Unauthorized");
}

try{
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
} catch(e){
   res.status(401).send("Invalid token");
};

export default verify;