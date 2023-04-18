const db=require('../model/index');
const Users=db.sequelize.models.users;
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const registerUser=async(req,res)=>{
  
  try{
  if(req.body.agent_password!==req.body.agent_confirmPassword){
    return res.status(400).json("Password and Confirm Password not match");
}else{
 
    const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.agent_password, salt);
  req.body.agent_password = hashedPass
}
const{agent_email}=req.body
return res.send({"email":agent_email,"message":"succes"}).status(201)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// const getUserById=(req,res)=>{
//     Users.findOne({
//         where:{
//             agent_agent_id:req.params.agent_agent_id
//         }
//     }).then(user=>{
//         res.status(200).json(user)
//     }).catch(err=>{
//         res.status(500).json({message:err.message})
//     })

// }
// const getUser=(req,res)=>{
//     Users.findAll().then(user=>{
//         res.status(200).json(user)
//     }).catch(err=>{
//         res.status(500).json({message:err.message})
// })
// }
const LoginUser=async(req,res)=>{
    const { agent_email, agent_password } = req.body;

  try {
    const user = await Users.findOne({where:{
        agent_email:agent_email
    }});

    if (user) {
      const validity = await bcrypt.compare(agent_password, user.agent_password);

      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { agent_email: user.agent_email, agent_id: user.agent_id },
          process.env.SECRET,
          { expiresIn: "1h" }
        );
       
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const resetAgent_Password= async(req,res)=>{
    const { agent_email, agent_password ,agent_newPassword,agent_confirmNewPassword} = req.body;

  try {
    const user = await Users.findOne({where:{
        agent_email:agent_email
    }});

    if (user) {
      const validity = await bcrypt.compare(agent_password, user.agent_password);

      if (!validity) {
        res.status(400).json("wrong agent_password");
      } else {
        if(agent_newPassword!==agent_confirmNewPassword){
            res.status(400).json("New Password and Confirm New Password not match");
        }else{
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(agent_newPassword, salt);
            user.agent_password = hash;
            await user.save();
            res.status(200).json({ message: "Password changed successfully" });
      }
    }
 } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}









module.exports={

    LoginUser,
    registerUser,
    resetAgent_Password

}