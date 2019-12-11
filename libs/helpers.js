const isValidEmail = (email) => {
  // const regex = new RegExp('^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$');
  const arr = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.exec(email)
  // const arr = regex.exec(email);
  // console.log('\nARR', arr)
  if (!arr) return false;
  for (item of arr) {
    if (item === email) return true;
  }
  return false;
};

const isValidPassword = (password) => {
  if (password.length > 2) {
    return true;
  }
  return false;
};

export {
  isValidEmail,
  isValidPassword,
}