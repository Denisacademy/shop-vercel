import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectProductAmount({
  amount,
  setAmount,
}: {
  amount: number;
  setAmount: (n: number) => void;
}) {
  const changeValue = (value: string) => {
    setAmount(Number(value));
  };
  console.log("changeValue", amount);
  return (
    <Select defaultValue={amount.toString()} onValueChange={changeValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit">{amount}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 5 }, (_, idx) => {
          return (
            <SelectItem key={idx + 1} value={(idx + 1).toString()}>
              {idx + 1}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
