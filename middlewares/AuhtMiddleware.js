const jwt = require("jsonwebtoken");

exports.middleware = async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    ("");
    if (!header) {
      return res.status(401).send({
        response: "fail",
        message: "Header required",
      });
    }

    const token = header.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({
        response: "fail",
        message: "Token required",
      });
    }

    // VerifiedToken
    jwt.verify(token, process.env.SECRETKEY_ACCESS_TOKEN, (error, decode) => {
      if (error) {
        console.log(error);
        return res.status(401).send({
          response: "fail",
          message: "Token not Verified",
        });
      }
      req.user = decode;
      return next();
    });
    // End VerifiedToken
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};
