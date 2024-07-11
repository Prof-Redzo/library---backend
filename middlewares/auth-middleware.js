import jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log(req.headers);
  const token = req.headers.token;
if(!token) {
  return res.status(401).send("Unauthorized");
}
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
} catch(e) {
  return res.status(401).send("Invalid token");
};
}

export default verify;