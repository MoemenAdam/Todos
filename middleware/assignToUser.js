const assignToUser = (key = 'userId') => {
  return (req, res, next) => {
    req.body[key] = req.user._id;
    next();
  };
};

export default assignToUser;
