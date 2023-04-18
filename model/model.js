
module.exports=(Sequelize,DataTypes)=>{
    const Users=Sequelize.define('users',{
        agent_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            unique:true, 
            
        },
        agent_name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:'Name is required'
                }
            }
        },
        agent_email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                notEmpty:{
                    msg:'Email is required'
                },
                isEmail:true

            }
        },
        agent_password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:'Password is required'
                },
                },
            },
    },
    {
		initialAutoIncrement: 100001
	},
   
    { timestamps: true })
  }