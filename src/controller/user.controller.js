const userModel = require("../models/user.schema");

exports.registration = async (req, res) => {
  try {
    const { userName, email, password, phoneNumber } = req.body;
    if (!userName) {
      return res.status(401).json({
        msg: "User name is missing",
      });
    }
    if (!email) {
      return res.status(401).json({
        msg: "email is missing",
      });
    }
    if (!password) {
      return res.status(401).json({
        msg: "password is missing",
      });
    }
    if (!phoneNumber) {
      return res.status(401).json({
        msg: "phoneNumber is missing",
      });
    }

    const isExit = await userModel.findOne({ email });
    // if exists
    if (isExit) {
      return res.status(401).json({
        msg: `${email} already exist`,
      });
    }
    //save the data into database
    await userModel.create({
      userName,
      email,
      password,
      phoneNumber,
      ...req.body,
    });
    return res.status(201).json({
      msg: "Registration successful",
    });
  } catch (error) {
    console.log("error from registration controller", error);
    res.status(501).json({
      msg: "error from registration controller",
    });
  }
};

//User login Controller

exports.login = async (req, res) => {
  try {
    const isExit = await userModel.findOne({
      $and: [{ email: req.body.email, password: req.body.password }],
    });
    if (!isExit) {
      return res.status(401).json({
        msg: "password or email invalid",
      });
    }
    return res.status(200).json({
      msg: "login successful",
    });
  } catch (error) {
    console.log("error from login", error);
    res.status(401).json({
      msg: "error from login",
    });
  }
};
