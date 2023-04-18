const {Sequelize,DataTypes}=require('sequelize');
const sequelize=new Sequelize('danish','danish','admin',{
    host:'localhost',
    dialect:'mysql',
})
sequelize.authenticate()
.then(()=>console.log("connected"))
.catch((err)=>console.log(err))

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.sequelize.sync({force:false})
.then(()=>{
    console.log("yes sync");
})
db.users=require('./model')(sequelize,DataTypes)
module.exports=db