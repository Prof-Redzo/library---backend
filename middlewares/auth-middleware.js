import jwt from "jsonwebtoken";

export const verify = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
if(!token) {
  return res.status(401).send("Unauthorized");
}
try {
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  req.user = decoded;
  next();
} catch(e) {
  return res.status(401).send("Invalid token");
};
}

export default verify;