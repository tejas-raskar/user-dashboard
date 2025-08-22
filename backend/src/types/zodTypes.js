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

module.exports = {
  registerInput,
  signinInput,
  postInput,
};
