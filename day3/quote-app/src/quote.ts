export type ServiceType = "repair" | "installation" | "inspection";

export type AddOnId = "emergency" | "weekend" | "permit";

export interface QuoteInput {
  serviceType: ServiceType;
  squareFootage: number;
  selectedAddOns: AddOnId[];
}

export interface Quote {
  baseRate: number;
  serviceMultiplier: number;
  squareFootageCost: number;
  addOnBreakdown: { id: AddOnId; label: string; price: number }[];
  subtotal: number;
  tax: number;
  total: number;
}

const SERVICE_MULTIPLIERS: Record<ServiceType, number> = {
  repair: 1.0,
  installation: 1.5,
  inspection: 0.6,
};

const ADD_ON_PRICES: Record<AddOnId, { label: string; price: number }> = {
  emergency: { label: "Emergency service", price: 200 },
  weekend: { label: "Weekend work", price: 100 },
  permit: { label: "Permit filing", price: 75 },
};

const BASE_RATE = 150;
const TAX_RATE = 0.09;

export function calculateQuote(input: QuoteInput): Quote {
  const { serviceType, squareFootage, selectedAddOns } = input;

  const serviceMultiplier = SERVICE_MULTIPLIERS[serviceType];
  const squareFootageCost = squareFootage * 2;
  const baseWithService = BASE_RATE * serviceMultiplier;

  const addOnBreakdown = selectedAddOns.map((id) => ({
    id,
    label: ADD_ON_PRICES[id].label,
    price: ADD_ON_PRICES[id].price,
  }));

  const addOnTotal = addOnBreakdown.reduce((sum, a) => sum + a.price, 0);

  const subtotal = baseWithService + squareFootageCost + addOnTotal;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return {
    baseRate: baseWithService,
    serviceMultiplier,
    squareFootageCost,
    addOnBreakdown,
    subtotal,
    tax,
    total,
  };
}
