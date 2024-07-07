const User = require('../Models/Data')

// Get All User
async function handleGetAlluser(req,res){
   const allUser = await User.find({});
   return res.json(allUser);
}

//Get User By ID

async function handlegetUserByID(req,res){
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({ err:"User not found"});
    }

    return res.json(user);
}

//Update 

async function handleUpdateUserByID(req,res){
    const user = await User.findByIdAndUpdate(req.params.id,{lastname: "changed"});
    if(!user){
        return res.status(404).json({ err:"User not found"});
    }

    return res.json(user);
}

// Delete 

async function handleDeleteUserByID(req,res){
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(404).json({ err:"User not found"});
    }

    return res.status(200).json({msg:"Deleted Successfully"});
}

//Create user 

const handleCreateUser = async (req, res) => {
    const body = req.body;

    if (!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) {
        return res.status(400).json({ err: "All fields are required." });
    }

    try {
        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle
        });

        res.status(201).json({ msg: "Success", id: result._id });
    } catch (error) {
        res.status(500).json({ err: "Server error, please try again later." });
    }
};




module.exports ={
    handleGetAlluser,
    handlegetUserByID,
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateUser,
}