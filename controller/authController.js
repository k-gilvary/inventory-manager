const user = require("../db/models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRETKEY, {
        expiresIn: process.env.JWT_EXPIRESIN
    })
}

const signup = catchAsync(async (req, res, next) => {
    const body = req.body;

    if('admin'.includes(body.userType)) {
        throw new AppError('Invalid user type', 400);
    };

    const newUser = await user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword
    });

    if(!newUser) {
        return next(new AppError('Failed to create new user', 400));
    };


    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id,
    })

    return res.status(201).json({
        status: 'success',
        data: result
    });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    };

    const result = await user.findOne({ where: { email } });
    if (!result || !(await bcrypt.compare(password, result.password))) {
        return next(new AppError('Incorrect email or password', 401));
    };

    const token = generateToken({
        id: result.id
    });

    return res.json({
        status: 'success',
        token
    });
});

module.exports = { signup, login };