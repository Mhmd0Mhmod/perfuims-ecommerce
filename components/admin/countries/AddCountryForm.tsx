"use client";

import { Form, FormField } from "@/components/ui/form";
import { AddCountrySchema, addCountrySchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

function AddCountryForm() {
  const form = useForm({
    resolver: zodResolver(addCountrySchema),
  });
  const onSubmit = useCallback(async (formData: AddCountrySchema) => {}, []);

  return (
    <Form {...form}>
      <form></form>
    </Form>
  );
}
export default AddCountryForm;
