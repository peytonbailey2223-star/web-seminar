import { useState } from "react";
import { calculateQuote, type ServiceType, type AddOnId } from "./quote";
import "./App.css";

const ADD_ON_OPTIONS: { id: AddOnId; label: string }[] = [
  { id: "emergency", label: "Emergency service (+$200)" },
  { id: "weekend", label: "Weekend work (+$100)" },
  { id: "permit", label: "Permit filing (+$75)" },
];

function App() {
  const [serviceType, setServiceType] = useState<ServiceType>("repair");
  const [squareFootage, setSquareFootage] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnId[]>([]);

  const quote = calculateQuote({
    serviceType,
    squareFootage,
    selectedAddOns,
  });

  function toggleAddOn(id: AddOnId) {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <div className="app">
      <h1>Cullman Plumbing — Instant Quote</h1>

      <div className="field">
        <label htmlFor="service">Service type</label>
        <select
          id="service"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value as ServiceType)}
        >
          <option value="repair">Repair</option>
          <option value="installation">Installation</option>
          <option value="inspection">Inspection</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="sqft">Square footage</label>
        <input
          id="sqft"
          type="number"
          value={squareFootage}
          onChange={(e) => setSquareFootage(Number(e.target.value))}
          min={0}
        />
      </div>

      <fieldset className="add-ons">
        <legend>Add-ons</legend>
        {ADD_ON_OPTIONS.map((option) => (
          <label key={option.id} className="add-on-row">
            <input
              type="checkbox"
              checked={selectedAddOns.includes(option.id)}
              onChange={() => toggleAddOn(option.id)}
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <div className="quote">
        <h2>Quote breakdown</h2>
        <div className="quote-line">
          <span>
            Service ({serviceType}, ×{quote.serviceMultiplier})
          </span>
          <span>${quote.baseRate.toFixed(2)}</span>
        </div>
        <div className="quote-line">
          <span>Square footage ({squareFootage} sq ft)</span>
          <span>${quote.squareFootageCost.toFixed(2)}</span>
        </div>
        {quote.addOnBreakdown.length > 0 && (
          <ul className="quote-addons">
            {quote.addOnBreakdown.map((a) => (
              <li key={a.id}>
                <span>{a.label}</span>
                <span>${a.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="quote-line">
          <span>Subtotal</span>
          <span>${quote.subtotal.toFixed(2)}</span>
        </div>
        <div className="quote-line">
          <span>Tax (9%)</span>
          <span>${quote.tax.toFixed(2)}</span>
        </div>
        <div className="quote-total">
          <span>Total</span>
          <span>${quote.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
