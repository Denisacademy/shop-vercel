import * as React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";
import { createCartOrUpdateAction } from "@/utils/actions";

export function RatingInput({ name, labelText }: { name: string; labelText?: string }) {
  const numbers = Array.from({ length: 5 }, (_, index) => {
    const value = index + 1;
    return value.toString();
  }).reverse();

  return (
    <Select defaultValue={numbers[0]} name={name} required>
      <Label>
        {name}
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
      </Label>
      <SelectContent>
        {numbers.map((n) => (
          <SelectItem value={n} key={n}>
            {n}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default RatingInput;

type RatingInputAmountType = {
  // action: () => Promise<void>;
  name: string;
  labelText?: string;
  amount?: number;
};

export function RatingInputAmount({
  name,
  labelText,
  amount,
}: // action
RatingInputAmountType) {
  const numbers = Array.from({ length: 5 }, (_, index) => {
    const value = index + 1;
    return value.toString();
  }).reverse();
  console.log(amount);
  return (
    <Select
      onValueChange={createCartOrUpdateAction}
      defaultValue={amount?.toString() || numbers[0]}
      name={name}
      required
    >
      <Label>
        {name}
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
      </Label>
      <SelectContent>
        {numbers.map((n) => (
          <SelectItem value={n} key={n}>
            {n}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
