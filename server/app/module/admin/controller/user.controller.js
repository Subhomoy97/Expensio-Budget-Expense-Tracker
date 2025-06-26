const profileModel = require("../../profile/model/profile.model");
const userModel = require("../../user/model/user.model");

class UserController {
    async userPage(req, res) {
        try{
            const user = req.user;
            const profile = await profileModel.findOne({ userId: user.userId });
            const allUsers=await userModel.find({isAdmin:false}).sort({createdAt:-1});
            res.render("admin/user/users",{user,allUsers,profile,profilePic: profile ? profile.profilePic : null});
        }catch(error){
            console.error("Error in Admin user page:", error);
            req.flash('error', 'Server error');
            return res.redirect("/admin/dashboard");
        }
    }
    async userDetailsPage(req,res){
        try{
            const userId=req.params.id;
            const user=await userModel.findById(userId);
            const profile = await profileModel.findOne({ userId: userId });
            console.log(profile,"profile");
            res.render("admin/user/userDetails",{user,profile,profilePic: profile ? profile.profilePic : null});
        }catch(error){
            console.error("Error in Admin user details page:", error);
            req.flash('error', 'Server error');
            return res.redirect("/admin/dashboard");
        }
    }
    async userDelete(req,res){
        try{
            const userId=req.params.id;
            await userModel.findByIdAndUpdate(userId,{isDeleted:true},{new:true});
            req.flash('success', 'User disabled successfully');
            res.redirect("/admin/users");
        }catch(error){
            console.error("Error in Admin user delete:", error);
            req.flash('error', 'Server error');
            return res.redirect("/admin/dashboard");
        }
    }
    async userRestore(req,res){
        try{
            const userId=req.params.id;
            await userModel.findByIdAndUpdate(userId,{isDeleted:false},{new:true});
            req.flash('success', 'User restored successfully');
            res.redirect("/admin/users");
        }catch(error){
            console.error("Error in Admin user restore:", error);
            req.flash('error', 'Server error');
            return res.redirect("/admin/dashboard");
        }
    }
    async DeactivatedUsers(req,res){
        try{
            const user = req.user;
            const profile = await profileModel.findOne({ userId: user.userId });
            const allUsers=await userModel.find({isDeleted:true}).sort({createdAt:-1});
            res.render("admin/user/deactivatedUsers",{allUsers,user,profile,profilePic: profile ? profile.profilePic : null});
        }catch(error){
            console.error("Error in Admin deactivated users page:", error);
            req.flash('error', 'Server error');
            return res.redirect("/admin/dashboard");
        }
    }
}

module.exports = new UserController();