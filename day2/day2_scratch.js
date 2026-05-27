const services = [
  { name: "Drain Cleaning", price: 250, emergency: false },
  { name: "Pipe Burst Repair", price: 800, emergency: true },
  { name: "Water Heater Install", price: 1200, emergency: false },
  { name: "Toilet Replacement", price: 450, emergency: false },
];

// Task 1: Get an array of just the names
// Expected output: ["Drain Cleaning", "Pipe Burst Repair", "Water Heater Install", "Toilet Replacement"]
const names = services.map((service) => service.name);
console.log("Task 1:", names);

// Task 2: Get only the emergency services (full objects, not just names)
// Expected output: [{ name: "Pipe Burst Repair", price: 800, emergency: true }]
const emergencies = services.filter((service) => service.emergency);
console.log("Task 2:", emergencies);

// Task 3: Get the total price of all services
// Expected output: 2700
const total = services.reduce((sum, service) => sum + service.price, 0);
console.log("Task 3:", total);

// Task 4: Get the average price of non-emergency services
// Expected output: 633.33 (or thereabouts)
const avgNonEmergency =
  services
    .filter((service) => !service.emergency)
    .reduce((sum, service) => sum + service.price, 0) /
  services.filter((service) => !service.emergency).length;
console.log("Task 4:", avgNonEmergency);
