const Usertable = require("../../Models/usertable");
const deleteUser =async (req,res) => {
    try {
       const user = await Usertable.findByIdAndDelete(req.params.id);
       return res.status(200).json({
        status:true,
        message:"User deleted successfully",
        data:user
       })
        
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:'error while deleting',
            error:error
        });
    }

}

module.exports = deleteUser;