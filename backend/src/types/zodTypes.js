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

module.exports = {
  registerInput,
  signinInput,
};
