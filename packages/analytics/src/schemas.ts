import { z } from 'zod';

// Define the recursive structure for apiObject
type ApiObjectValue = string | number | boolean | ApiObject | (string | number | boolean | ApiObject)[] | undefined;
export type ApiObject = { [key: string]: ApiObjectValue };

// Create a Zod schema for ApiObject
const apiObjectSchema: z.ZodType<ApiObject> = z.lazy(() =>
    z.record(z.union([
        z.string(),
        z.number(),
        z.boolean(),
        apiObjectSchema,
        z.array(z.union([z.string(), z.number(), z.boolean(), z.lazy(() => apiObjectSchema)])),
        z.undefined()
    ]))
);

export const ApiObjectSchema = apiObjectSchema;

export type ApiOptions = {
    integrations?: { [key: string]: boolean };
    anonymousId?: string;
    originalTimestamp?: string;
    [key: string]: any;
};

export const ApiOptionsSchema = z.object({
    integrations: z.record(z.boolean()).optional(),
    anonymousId: z.string().optional(),
    originalTimestamp: z.string().optional(),
}).catchall(z.any());

export type ApiCallback = (response: any) => void;

export const ApiCallbackSchema = z.function()
    .args(z.any())
    .returns(z.void());