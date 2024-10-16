const signup = (req, res, next) => {
    res.json({
        status: 'success',
        message: 'Signup controller working'
    });
};

module.exports = { signup };