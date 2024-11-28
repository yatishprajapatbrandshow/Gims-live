const { Registration } = require("../model");

const checkIfExits = async (sid) => {
  try {
    const check = await Registration.findOne({
      sid: sid,
      status: 1,
      delete_flag: false,
    });

    if (check) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  checkIfExits,
};
