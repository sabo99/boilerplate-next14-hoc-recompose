import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, testProps, tid } from '@/lib/utils';

interface Option {
  label: string;
  value: string;
}

interface Props {
  screenName: string;
  name: string;
  options: Option[];
  value?: string;
  onChange: (value: any) => void;
  placeholder?: string;
}

const Combobox: React.FC<Props> = ({
  screenName, name, options, value, onChange, placeholder = 'Select an option'
}) => {
  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <div {...testProps(tid(screenName, name, 'StyledContainer'))} className="flex flex-col">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn('justify-between', !value && 'text-muted-foreground')}
          >
            {selectedLabel || placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[420px] p-0">
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => onChange(option.value)}
                  >
                    {option.label}
                    <Check className={cn('ml-auto', option.value === value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Combobox;