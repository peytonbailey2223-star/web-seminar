// The service types we offer
const SERVICE_TYPES = [
  "drain_cleaning",
  "water_heater",
  "leak_repair",
  "full_repipe",
] as const;
type ServiceType = (typeof SERVICE_TYPES)[number];

// The add-ons a customer can select
const ADD_ONS = ["weekend", "after_hours", "rush", "warranty"] as const;
type AddOn = (typeof ADD_ONS)[number];

// Input from the user
type QuoteRequest = {
  serviceType: ServiceType;
  squareFootage: number;
  addOns: AddOn[];
  customerName: string;
};

// Output we return
type Quote = {
  customerName: string;
  serviceType: ServiceType;
  basePrice: number;
  squareFootageFee: number;
  addOnFees: number;
  subtotal: number;
  tax: number;
  total: number;
  lineItems: string[];
};
const BASE_PRICES = {
  drain_cleaning: 150,
  water_heater: 800,
  leak_repair: 250,
  full_repipe: 3500,
} as const;

const ADD_ON_FEES = {
  weekend: 75,
  after_hours: 125,
  rush: 200,
  warranty: 150,
} as const;

const PER_SQ_FT_RATE = 0.5;
const TAX_RATE = 0.09;
function calculateQuote(request: QuoteRequest): Quote {
  // Look up base price for this service type
  const basePrice = BASE_PRICES[request.serviceType];

  // Square footage fee
  const squareFootageFee = request.squareFootage * PER_SQ_FT_RATE;

  // Sum all add-on fees using reduce
  const addOnFees = request.addOns.reduce(
    (sum, addOn) => sum + ADD_ON_FEES[addOn],
    0,
  );

  // Subtotal + tax + total
  const subtotal = basePrice + squareFootageFee + addOnFees;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  // Build human-readable line items using map
  const lineItems = [
    `Base service (${request.serviceType}): $${basePrice.toFixed(2)}`,
    `Square footage (${request.squareFootage} sq ft @ $${PER_SQ_FT_RATE}/sq ft): $${squareFootageFee.toFixed(2)}`,
    ...request.addOns.map(
      (addOn) => `Add-on (${addOn}): $${ADD_ON_FEES[addOn].toFixed(2)}`,
    ),
    `Tax (${(TAX_RATE * 100).toFixed(0)}%): $${tax.toFixed(2)}`,
  ];

  return {
    customerName: request.customerName,
    serviceType: request.serviceType,
    basePrice,
    squareFootageFee,
    addOnFees,
    subtotal,
    tax,
    total,
    lineItems,
  };
}
function printQuote(quote: Quote): void {
  console.log("=".repeat(50));
  console.log(`QUOTE FOR: ${quote.customerName}`);
  console.log(`SERVICE:   ${quote.serviceType}`);
  console.log("=".repeat(50));
  for (const item of quote.lineItems) {
    console.log(`  ${item}`);
  }
  console.log("-".repeat(50));
  console.log(`  TOTAL: $${quote.total.toFixed(2)}`);
  console.log("=".repeat(50));
}
const sampleRequest: QuoteRequest = {
  customerName: "Sarah Johnson",
  serviceType: "water_heater",
  squareFootage: 1800,
  addOns: ["weekend", "warranty"],
};

const quote = calculateQuote(sampleRequest);
printQuote(quote);
