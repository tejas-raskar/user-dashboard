const z = require("zod");

const registerInput = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

const signinInput = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const postInput = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

const updateUserInput = z.object({
  email: z.email().optional(),
  name: z.string().optional(),
});

const changePasswordInput = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmNewPassword: z.string().min(6),
});

module.exports = {
  registerInput,
  signinInput,
  postInput,
  updateUserInput,
  changePasswordInput,
};
