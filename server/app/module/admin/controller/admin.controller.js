const authRepository = require("../repositories/admin.repositories");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../user/model/user.model");
const reviewModel = require("../../review/model/review.model");
const contactModel = require("../../contact/model/contact.model");
const profileModel = require("../../profile/model/profile.model");
const moment = require("moment");
const fs=require("fs")

class AdminController {
  async loginPage(req, res) {
    res.render("admin/login");
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        req.flash('error', 'All fields are required');
        return res.redirect("/admin/login");
      }
      const user = await authRepository.findAdminByEmail(email);
      if (!user || !user.isVerified || !user.isAdmin) {
        req.flash('error', 'Invalid credentials');
        return res.redirect("/admin/login");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        req.flash('error', 'Invalid credentials');
        return res.redirect("/admin/login");
      }
      const token = jwt.sign(
        {
          userId: user._id,
          name: user.firstName + " " + user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          image: user.image
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      if (isMatch && user.isVerified && user.isAdmin) {
        req.flash('success', 'Login successful');
        return res.redirect("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error in Admin login:", error);
      return req.flash('error', 'Server error');
    }
  }
  async showDashboard(req, res) {
    try {
      const user = req.user;
      const profile = await profileModel.findOne({ userId: user.userId });
      const profilePic = profile ? profile.profilePic : null;
      const totalUsers = await userModel.countDocuments({ isAdmin: false });
      const totalReviews = await reviewModel.countDocuments({ isDeleted: false });
      const percentReviewed = ((totalReviews / totalUsers) * 100).toFixed(2);
      const totalContacts = await contactModel.countDocuments({});
      const totalContactsReplied = await contactModel.countDocuments({ isReplied: true });
      const contactsNotReplied = await contactModel.countDocuments({ isReplied: false });
      const monthlyRegistrations = Array(12).fill(0); // Jan to Dec
      const users = await userModel.find({ isAdmin: false });
      users.forEach(user => {
        const month = moment(user.createdAt).month(); // 0 = Jan, 11 = Dec
        monthlyRegistrations[month]++;
      });
      const reviews = await reviewModel.find({ isDeleted: false })
      .populate({
        path: "userId",
        populate: {
          path: "profile",
          model: "profile"
        }
      });
      const ratingsCount = [0, 0, 0, 0, 0]; // Index 0 -> 1 star, 4 -> 5 star

      reviews.forEach(review => {
        if (review.rating >= 1 && review.rating <= 5) {
          ratingsCount[review.rating - 1]++;
        }
      });

      const totalRatings = ratingsCount.reduce((a, b) => a + b, 0);
      const avgRating =
        totalRatings > 0
          ? (
            ratingsCount.reduce((sum, count, i) => sum + (i + 1) * count, 0) /
            totalRatings
          ).toFixed(1)
          : 0;
      res.render("admin/dashboard", {
        user,
        totalUsers: totalUsers,
        totalReviews: totalReviews,
        percentReviewed: percentReviewed,
        totalContacts: totalContacts,
        totalContactsReplied: totalContactsReplied,
        contactsNotReplied: contactsNotReplied,
        profilePic: profilePic,
        monthlyRegistrations,
        reviews,
        avgRating,
        ratingsCount,
        totalRatings,
      });
    } catch (error) {
      console.error("Error in Admin dashboard:", error);
      req.flash('error', 'Server error');
      return res.redirect("/admin/login");
    }
  }
  async getProfile(req, res) {
    try {
      const user = req.user;
      const User = await userModel.findOne({ email: user.email });
      const profile = await profileModel.findOne({ userId: user.userId });
      if (req.file) {
        user.image = req.file.path;
      }
      res.render('admin/profile', { user, profile, User, profilePic: profile ? profile.profilePic : null });
    } catch (error) {
      console.error("Error in Admin profile:", error);
      req.flash('error', 'Server error');
      return res.redirect("/admin/dashboard");
    }
  }
  async updateProfile(req, res) {
    try {
      const user = req.user;
      const userId = user.userId;
      console.log(user, "user");

      const { firstName, lastName, phone, address } = req.body;

      const User = await userModel.findOne({ email: user.email });
      if (!User) {
        req.flash('error', 'User not found');
        return res.redirect('/admin/profile');
      }

      User.firstName = firstName;
      User.lastName = lastName;
      await User.save();

      const profile = await profileModel.findOne({ userId });
      if (profile) {
        await profileModel.findByIdAndUpdate(profile._id, { userId, phone, address });
        if (req.file) {
          if (fs.existsSync(profile.profilePic)) {
            fs.unlinkSync(profile.profilePic);
          }
          profile.profilePic = req.file.filename;
          await profile.save();
        }
      } else {
        await profileModel.create({ userId, phone, address });
      }

      req.flash('success', 'Profile updated successfully');
      res.redirect('/admin/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      req.flash('error', 'Server error');
      return res.redirect("/admin/profile");
    }
  }
  async logout(req, res) {
    try {
      res.clearCookie("token");
      req.flash("success", "Logged out successfully");
      res.redirect("/admin/login");
    } catch (error) {
      console.error("Error in Admin logout:", error);
      req.flash('error', 'Server error');
      return res.redirect("/admin/login");
    }
  }
}

module.exports = new AdminController();
