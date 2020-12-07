export const nullCheck = (value) => {
  if (value === null || value === undefined) {
    return "";
  } else {
    return value;
  }
};

export const splitCamelCase = (value) => {
  return (
    value
      // insert a space between lower & upper
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // space before last upper in a sequence followed by lower
      .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
      // uppercase the first character
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  );
};

export const adminValidation = (role, condition) => {
  let valid = false;
  if (role === condition || role === "super_admin") {
    valid = true;
  }
  return valid;
};
