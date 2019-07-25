exports.sanitizeUser = userDocument => {
  const user = userDocument.toObject();
  user.password = undefined;
  // eslint-disable-next-line no-underscore-dangle
  user._id = undefined;
  // eslint-disable-next-line no-underscore-dangle
  user.__v = undefined;
  user.id = userDocument.id;
  return user;
};
