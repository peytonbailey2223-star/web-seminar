// --- Variables with explicit type annotations ---
const userName: string = "Peyton";
const age: number = 22;
const isStudent: boolean = true;

console.log(`${userName} is ${age} and student status: ${isStudent}`);

// --- Variables with inferred types (preferred) ---
const city = "Cullman"; // TS infers: string
const population = 18000; // TS infers: number

// Hover over `city` in VS Code — you'll see "const city: string"

// --- A typed function ---
function calculateTax(amount: number, rate: number): number {
  return amount * rate;
}

console.log("Tax on $100 at 9%:", calculateTax(100, 0.09));

// --- Now intentionally break it to see TS catch the error ---
// Uncomment the next line and watch Error Lens light up:
// console.log(calculateTax(100, "0.09"));
// --- type ---
type Booking = {
  customerName: string;
  serviceType: "plumbing" | "hvac" | "electrical";
  estimatedCost: number;
  notes?: string;  // optional
};

const myBooking: Booking = {
  customerName: "Sarah Johnson",
  serviceType: ""roofing"",
  estimatedCost: 350,
};

console.log("Booking:", myBooking);

// --- as const + derived union ---
const ADD_ONS = ["weekend", "after_hours", "rush"] as const;
type AddOn = typeof ADD_ONS[number];  // "weekend" | "after_hours" | "rush"

const selectedAddOn: AddOn = "weekend";
console.log("Add-on:", selectedAddOn);

// Try changing "weekend" to "saturday" — Error Lens should flag it.