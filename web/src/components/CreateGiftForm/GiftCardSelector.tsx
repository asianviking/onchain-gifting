"use client";

import { ChevronsUpDown } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { type CreateGiftFormSchema } from ".";
import { BaseNameOption } from "./BaseNameOption";

const mockNames = [
  {
    value: "ayvee.base.eth",
    img: "https://raw.seadn.io/files/b79f096162e1f7d0750cb0f491c8689d.svg",
  },
] as const;

export function GiftCardSelector({
  form,
}: {
  form: UseFormReturn<z.infer<typeof CreateGiftFormSchema>>;
}) {
  return (
    <FormField
      control={form.control}
      name="giftCard"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Gift Card</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "h-[60px] w-[512px] justify-between",
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    <div className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          mockNames.find((name) => name.value === field.value)
                            ?.img
                        }
                        alt={field.value}
                        className="h-11 w-11 rounded-sm"
                      />
                      <span className="text-[16px]">{field.value}</span>
                    </div>
                  ) : (
                    "Select gift card"
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[512px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search giftcard..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No gift cards found.</CommandEmpty>
                  <CommandGroup>
                    {mockNames.map((name) => (
                      <CommandItem
                        value={name.value}
                        key={name.value}
                        onSelect={() => {
                          form.setValue("giftCard", name.value);
                        }}
                        className="flex items-center justify-between hover:bg-red-500"
                      >
                        <BaseNameOption
                          value={name.value}
                          img={name.img}
                          isSelected={name.value === field.value}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}