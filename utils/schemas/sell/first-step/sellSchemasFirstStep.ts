import { z } from 'zod';

export const titleSchema = z.object({
  property: z.string().trim().min(5).max(100)
});

export const descriptionSchema = z.object({
  property: z.string().trim().min(5).max(4_000)
});

export const descriptionSmallSchema = z.object({
  property: z.string().trim().min(5).max(1_000)
});

export const propertyForSchema = z.object({
  property: z.enum([`rent`, `sell`])
});

export const propertyAreaSchema = z.object({
  property: z.string().min(1).max(4)
}).refine((arg) => {
  return !isNaN(Number(arg.property)) && Number(arg.property) >= 5 && Number(arg.property) <= 10_000;
});

export const propertyPriceSchema = z.object({
  property: z.string().min(1).max(8)
}).refine(({ property: propertyPrice }) => {
  return !isNaN(Number(propertyPrice)) && Number(propertyPrice) >= 5 && Number(propertyPrice) <= 10_000_000;
});

export const ownershipSchema = z.object({
  property: z.enum(['leasehold', 'freehold'])
});

export const mapChosenCoordinatesSchema = z.object({
  title: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  location: z.object({ type: z.enum(['Point', 'Polygon']), coordinates: z.array(z.number()) })

});
