const sendEmail = require("../config/send_mail");
const { validateEmail } = require("../helpers/validator");
const User = require("../model/user.model");

const createUser = async (req, res) => {
  try {
    const {email,userName,expireAt}=req.body;
    if(!validateEmail(email)){
      return res.status(200).json({
          message: `Invalid email`,
      });
    }
    const checkEmail = await User.findOne({email:email});
    if(checkEmail){
        return res.status(200).json({
            message: `User already exist`,
        });
    }
    
    const expireTime = Date.now() + parseInt(expireAt) * 60 * 1000;
    const user = {userName:userName, email:email, expireAt: expireTime, verified:false };
    const savedUser = await new User(user).save();
    sendEmail(savedUser);
    return res.status(200).json({
      message: `An email verification link has been send to ${email}`,
      user: savedUser,
    });
  } catch (error) {
    return res.send(error.message);
  }
};

const userVerify = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findOne({ _id: id, expireAt: { $gt: Date.now() } });
    if (!user) {
      return res.status(200).json({
        message: "This link has been Expired or Invalid",
      });
    }
    else{
        await User.findByIdAndUpdate({ _id: id},{$set:{verified:true,expireAt:Date.now()}},{new: true});
    }
    return res.status(200).json({
      message: "You are successfully Verified",
      user: { userName: user.userName },
    });
  } catch (error) {
    return res.send(error.message);
  }
};
module.exports = { createUser, userVerify };
