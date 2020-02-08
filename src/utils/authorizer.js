const checkLogin = ({ session }) => {
  if (!session || !session.user) {
    throw Error('Not logged in');
  }
};

module.exports = {
  checkLogin
};
