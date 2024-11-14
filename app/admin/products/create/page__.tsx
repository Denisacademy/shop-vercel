"use client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { createProductAction } from "@/utils/actions";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

import { useFormState, useFormStatus } from "react-dom";
//export type actionFunction = (prevState: any, formData: FormData) => Promise<{ message: string }>;

type actionFunction = (prevState: any, formData: FormData) => Promise<{ message: string }>;

type StateForm = {
  message: string;
};
const initialState = {
  message: "",
};

const BtnSubmit = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        `capitalize bg-indigo-600 inline-flex items-center justify-center  p-2 rounded-md text-white`,
        `${pending ? "bg-opacity-50" : ""}`
      )}
      disabled={pending}
      type="submit"
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait...
        </>
      ) : (
        "create product"
      )}
    </button>
  );
};
const defValue = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium tempora quisquam quo
corporis totam molestiae facilis, aspernatur illum minima.`;

const CreateProduct = () => {
  const [state, formAction] = useFormState(createProductAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) toast({ variant: "destructive", description: state.message });
  }, [state]);

  return (
    <form action={formAction}>
      <div className="mb-5 rounded-md">
        <p className="font-bold">Product Name</p>
        <input className="w-full p-3 border" type="text" name="name" placeholder="type any" />
      </div>
      <div className="mb-5 rounded-md">
        <p className="font-bold">Product Description</p>
        <textarea className="w-full p-4 rounded-md border" rows={5} defaultValue={defValue} />
      </div>
      <BtnSubmit />
    </form>
  );
};

export default CreateProduct;
