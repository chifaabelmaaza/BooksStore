const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  console.log('I m in token verification ...'); 

  const token = req.headers.authorization;
  let cleanedToken = token.replace("Bearer ", "");
//  console.log(cleanedToken)

  if (!cleanedToken) {
    return res.status(403).json({ message: 'No token provided' });
  } else {
    jwt.verify(cleanedToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ message: 'Your token is not valid,or not logged in! Please relogin in to continue' });
      } else {
        console.log("role " + decoded?.data?.role);
        if (decoded?.data?.role === 'admin') {
          console.log(decoded?.data?.role);
          req.user = decoded?.data?.id;
          req.role = decoded?.data?.role;
          next();
        } else {
          return res
            .status(401)
            .json({ message: 'You don\' have access to this action' });
        }
      }
    });
  }
};
