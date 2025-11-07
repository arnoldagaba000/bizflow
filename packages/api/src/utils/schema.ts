import z from "zod";

// Date range schema used across multiple endpoints
export const dateRangeSchema = z.object({
    startDate: z.iso.datetime().or(z.date()),
    endDate: z.iso.datetime().or(z.date()),
});

// Pagination schema for list endpoints
export const paginationSchema = z.object({
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().min(1).max(100).default(20),
});