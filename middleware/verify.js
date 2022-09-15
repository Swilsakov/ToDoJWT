const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']
  console.log(req.headers);
  if(!token) {
    return res.status(403).send('Forbidden')
  }
  try {
    const decoded = jwt.verify(token, "ToDoes")
    req.user = decoded
  } catch (error) {
    return res.status(401).send('Invalid token')
  }
  return next()
}

module.exports = verifyToken