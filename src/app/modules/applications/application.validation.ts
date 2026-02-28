import { z } from "zod";

const createApplicationZodSchema = z.object({
  body: z.object({
    jobId: z.string({
      required_error: "Job ID is required",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    resumeLink: z
      .string({
        required_error: "Resume link is required",
      })
      .url("Invalid URL for resume link"),
    coverNote: z.string({
      required_error: "Cover note is required",
    }),
  }),
});

const updateApplicationStatusZodSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "reviewed"], {
      required_error: "Status is required",
    }),
  }),
});

export const ApplicationValidation = {
  createApplicationZodSchema,
  updateApplicationStatusZodSchema,
};
