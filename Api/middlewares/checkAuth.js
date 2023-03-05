const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  console.log('I m in token verification ...');

  const token = req.headers.authorization;
  if (!token)
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  let cleanedToken = token.replace('Bearer ', '');
  console.log(cleanedToken);

  if (!cleanedToken) {
    return res.status(403).json({ message: 'No token provided' });
  } else {
    jwt.verify(cleanedToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({
            message:
              'Your token is not valid,or not logged in! Please relogin in to continue',
          });
      } else {
        if (decoded?.data?.role === 'user') {
          req.user = decoded?.data?.id;
          req.role = decoded?.data?.role;

          // console.log(req.user)
          next();
        } else {
          return res
            .status(401)
            .json({ message: "You don't have access to this action" });
        }
      }
    });
  }
};
