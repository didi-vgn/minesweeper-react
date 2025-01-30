export const username_validation = {
  label: "username:",
  type: "text",
  id: "username",
  placeholder: "username...",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    minLength: {
      value: 3,
      message: "Min 3 characters",
    },
    maxLength: {
      value: 16,
      message: "Max 16 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9]+$/,
      message: "Must be alphanumeric",
    },
  },
};

export const nickname_validation = {
  label: "nickname:",
  type: "text",
  id: "nickname",
  placeholder: "nickname...",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    minLength: {
      value: 3,
      message: "Min 3 characters",
    },
    maxLength: {
      value: 16,
      message: "Max 16 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9]+$/,
      message: "Must be alphanumeric",
    },
  },
};

export const password_validation = {
  label: "password:",
  type: "password",
  id: "password",
  placeholder: "password...",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    minLength: {
      value: 8,
      message: "Min 8 characters",
    },
  },
};

export const login_validation = {
  validation: {
    required: {
      value: true,
      message: "Required",
    },
  },
};
