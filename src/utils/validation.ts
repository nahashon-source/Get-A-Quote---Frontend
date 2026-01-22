import { z } from 'zod';

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().regex(/^\+?[\d\s\-()]+$/, 'Invalid phone number format'),
  company: z.string().min(2, 'Company/Individual name is required'),
});

export const serviceRequirementsSchema = z.object({
  serviceType: z.string().min(1, 'Please select a service type'),
  origin: z.string().min(2, 'Origin is required'),
  destination: z.string().min(2, 'Destination is required'),
  weightKg: z.string().min(1, 'Weight is required'),
  volumeCbm: z.string().min(1, 'Volume is required'),
  commodityType: z.string().min(1, 'Please select a commodity type'),
  containerType: z.string().min(1, 'Please select a container type'),
  specialHandling: z.string().optional(),
});

export const cargoInformationSchema = z.object({
  cargoDescription: z.string().min(10, 'Please provide a detailed description (min 10 characters)'),
  weight: z.string().min(1, 'Weight is required'),
  packagingType: z.string().min(1, 'Please select a packaging type'),
  cargoValue: z.string().min(1, 'Cargo value is required'),
  currency: z.string().min(1, 'Please select a currency'),
  urgencyLevel: z.string().min(1, 'Please select urgency level'),
  specialRequirements: z.string().optional(),
});

export const freightQuoteFormSchema = z.object({
  personal: personalInfoSchema,
  service: serviceRequirementsSchema,
  cargo: cargoInformationSchema,
});

export type FreightQuoteFormData = z.infer<typeof freightQuoteFormSchema>;