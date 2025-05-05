import Jwt from 'jsonwebtoken';
import { userData } from '../models/user.js';
import dotenv from 'dotenv';
import { adminData } from '../models/admin.js';
dotenv.config({ path: './config.env' });

export const setCookies = async (res, user, message) => {
  try {
    const token = Jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SCRETE,
      { expiresIn: '2d' }
    );

    const oneUser = await userData
      .findOne({ email: user.email })
      .select('-createdAt -_id -updatedAt -__v -password');

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
        maxAge: 90000000,
        // expires: new Date(Date.now() + 60 * 1000),
      })
      .json({ message, success: true, oneUser });
  } catch (err) {
    res.json({ error: err });
  }
};

export const setAdminCookies = async (res, admin, message) => {
  try {
    const token = Jwt.sign(
      { email: admin.email, id: admin._id },
      process.env.JWT_SCRETE
    );

    const oneAdmin = await adminData
      .findOne({ email: admin.email })
      .select('-createdAt -_id -updatedAt -__v -password');

    res
      .cookie('adminToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
        maxAge: 90000000,
        // expires: new Date(Date.now() + 60 * 1000),
      })
      .json({ message, success: true, oneAdmin });
  } catch (err) {
    res.json({ error: err });
  }
};

export const setLogout = (res, cookieName) => {
  try {
    res
      .status(200)
      .clearCookie(cookieName)
      .json({ message: 'Logout Succsessfull!' });
  } catch (err) {
    errorHandler('Logout failed!', 200, res);
    console.log(err);
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // if (!token) return res.json({ error: "Login first!" });
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Login first!' });
    }

    if (token) {
      const decoded = await Jwt.verify(token, process.env.JWT_SCRETE);
      const user = await userData.findById(decoded.id);
      // if (!user) return res.json({ error: 'Login first!' });
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized: User not found!' });
      }
      req.user = user;
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const errorHandler = (err, statusCode, res) => {
  return res.status(statusCode).json({
    success: false,
    error: err,
  });
};

// export const loginFun = async (req, res, data) => {
//   // const { email, password } = req.body;
//   try {
//     if (!email || !password)
//       return errorHandler("Enter your email and password!", 200, res);

//     const user = await data.findOne({ email }).select("+password");
//     if (!user) return errorHandler("user not found!", 200, res);

//     const checkPass = await bcrypt.compare(password, user.password);
//     if (!checkPass) return errorHandler("password is incorrect!", 200, res);

//     setCookies(res, user, userData, "Login Succsessfully!");
//   } catch (err) {
//     console.log(err);
//   }
// };
