import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        console.log(fullname, email, phoneNumber, password, role)
        if (!fullname || !email || !phoneNumber || !password || !role) {      
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        });
        return res.status(201).json({
            message: "User created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        };
        //checkrole
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with current role.",
                success: false
            });
        };
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Login successful with ${user.fullname}`, user,
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
export const logout = async (req, res) => {
    //continue
    try {
        res.status(200).clearCookie("token", "", { maxAge: 0 }).json({
            message: "Logout successful",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        console.log(fullname, email, phoneNumber, bio, skills)
        const file = req.file;
        
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        //cloudinary 
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id; //middleware
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        };
        //update data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray
   
        //resume comes
        if (cloudResponse){
            user.profile.resume = cloudResponse.secure_url
            user.profile.resumeOriginalName = file.originalname
        }
        
        await user.save();
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        
        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const loginByAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });
        }

        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findOne({ email, role: 'admin' });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        // Tạo token JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );

        // Gửi token trong cookie và trả về thông tin người dùng
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: "Login successful",
            user: { email: user.email, role: user.role },
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
            success: false
        });
    }
};

export const registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });
        }

        // Kiểm tra xem email đã được sử dụng để đăng ký tài khoản khác hay chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use",
                success: false
            });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo tài khoản admin mới
        const newUser = new User({
            email,
            password: hashedPassword,
            role: 'admin' // Đặt vai trò là 'admin'
        });

        // Lưu vào cơ sở dữ liệu
        await newUser.save();

        // Tạo token JWT
        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );

        // Gửi token trong cookie và thông tin người dùng trong response
        res.status(201).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: "Admin registered successfully",
            user: { email: newUser.email, role: newUser.role },
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to register admin",
            error: error.message,
            success: false
        });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: "You are not authorized to view all users.",
                success: false
            });
        }

        // Fetch all users except those with the 'admin' role
        const users = await User.find({ role: { $ne: 'admin' } });  // $ne stands for "not equal"
        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "All non-admin users retrieved successfully",
            users,
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve users",
            error: error.message,
            success: false
        });
    }
}


export const getAllStudents = async (req, res) => {
    try {
        // Query to find all users with the role of 'student'
        const students = await User.find({ role: 'student' });
        return res.status(200).json({
            message: "All students retrieved successfully",
            students,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to retrieve students",
            error: error.message,
            success: false
        });
    }
}

export const getAllRecruiters = async (req, res) => {
    try {
        // Query to find all users with the role of 'recruiter'
        const recruiters = await User.find({ role: 'recruiter' });
        return res.status(200).json({
            message: "All recruiters retrieved successfully",
            recruiters,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to retrieve recruiters",
            error: error.message,
            success: false
        });
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        // Optional: Check if the requester is an admin or the owner of the account
        if (req.user.role !== 'admin' && req.user._id.toString() !== userId) {
            return res.status(403).json({
                message: "Unauthorized: You can only delete your own account unless you're an admin",
                success: false
            });
        }

        // Perform the deletion
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "User account deleted successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete user",
            error: error.message,
            success: false
        });
    }
}
