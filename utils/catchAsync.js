module.exports = function AsyncError(func) {
  return function (req, rep, next) {
    func(req, rep, next).catch(next);
  };
};
