export const SERVICE_TYPES = [
  { value: '', label: 'Select a service' },
  { value: 'air', label: 'Air Freight' },
  { value: 'sea', label: 'Sea Freight' },
  { value: 'road', label: 'Road Freight' },
];

export const COMMODITY_TYPES = [
  { value: '', label: 'Select commodity type' },
  { value: 'general', label: 'General Cargo' },
  { value: 'perishable', label: 'Perishable Goods' },
  { value: 'hazardous', label: 'Hazardous Materials' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'textiles', label: 'Textiles & Apparel' },
  { value: 'machinery', label: 'Machinery & Equipment' },
  { value: 'food', label: 'Food & Beverages' },
  { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
];

export const PACKAGING_TYPES = [
  { value: '', label: 'Select packaging type' },
  { value: 'pallets', label: 'Pallets' },
  { value: 'boxes', label: 'Boxes/Cartons' },
  { value: 'crates', label: 'Wooden Crates' },
  { value: 'containers', label: 'Containers (20ft/40ft)' },
  { value: 'drums', label: 'Drums' },
  { value: 'bags', label: 'Bags/Sacks' },
  { value: 'bulk', label: 'Bulk' },
];

export const CONTAINER_TYPES = [
  { value: '', label: 'Select container type' },
  { value: '20GP', label: '20GP (20ft General Purpose)' },
  { value: '40GP', label: '40GP (40ft General Purpose)' },
];

export const CURRENCIES = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'KES', label: 'KES - Kenyan Shilling' },
  { value: 'ZAR', label: 'ZAR - South African Rand' },
  { value: 'NGN', label: 'NGN - Nigerian Naira' },
];

export const URGENCY_LEVELS = [
  { value: 'standard', label: '🇰🇪 Standard (5-7 days)' },
  { value: 'express', label: '⚡ Express (2-3 days)' },
  { value: 'urgent', label: '🚨 Urgent (24-48 hours)' },
];

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';