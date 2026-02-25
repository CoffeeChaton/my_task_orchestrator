// src/routes/demo2/slots/DiscountFixed.tsx

import type { DiscountFixedPayload } from "../types";

interface Props {
  data: DiscountFixedPayload;
  onChange: (data: DiscountFixedPayload) => void;
}

export const DiscountFixed = ({ data, onChange }: Props) => {
  const updateField = (field: keyof DiscountFixedPayload, value: number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <input 
        type="number" 
        value={data.threshold}
        onChange={(e) => updateField("threshold", Number(e.target.value))}
      />
      <input 
        type="number" 
        value={data.discount}
        onChange={(e) => updateField("discount", Number(e.target.value))}
      />
    </div>
  );
};
