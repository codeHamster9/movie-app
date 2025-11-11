'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from '@/components/ui/command'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface Item {
  value: string
  label: string
}

interface AutocompleteProps {
  items: Item[]
  onSelect: (value: string, suggested?: boolean) => void
  placeholder?: string
  size?: 'small' | 'medium' | 'large'
}

export function Autocomplete({
  items,
  onSelect,
  placeholder,
  size = 'medium',
}: AutocompleteProps) {
  const [inputValue, setInputValue] = useState('')
  const [filtered, setFiltered] = useState<Item[]>(items || [])
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>('')

  const handleInputChange = (val: string) => {
    setInputValue(val)
    setFiltered(
      items.filter((item) =>
        item.label.toLowerCase().includes(val.toLowerCase()),
      ),
    )
    if (!open) setOpen(true)
  }

  const handleSelectItem = (item: Item) => {
    setSelectedValue(item.label)
    onSelect(item.value, true)
    setInputValue(item.label)
    setOpen(false)
  }

  const handleCommit = () => {
    const found = items.find((item) => item.label === inputValue)
    if (found) {
      handleSelectItem(found)
    } else {
      onSelect(inputValue) // allow free text
      setSelectedValue(inputValue)
      setOpen(false)
    }
  }

  const clearSelection = () => {
    setSelectedValue('')
    setInputValue('')
    setFiltered(items)
    onSelect('')
  }

  const sizeClasses = {
    small: 'h-8 text-sm px-2',
    medium: 'h-10 text-base px-3',
    large: 'h-12 text-lg px-4',
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-full justify-between pr-10', // space for clear icon
              sizeClasses[size],
            )}
            onClick={() => setOpen((prev) => !prev)}
          >
            {selectedValue || placeholder || 'Select or type...'}
          </Button>

          {selectedValue && (
            <button
              type="button"
              onClick={clearSelection}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={placeholder || 'Type to search...'}
            value={inputValue}
            onValueChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleCommit()}
          />
          <CommandList>
            {filtered.length ? (
              <CommandGroup>
                {filtered.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => handleSelectItem(item)}
                  >
                    <span className="text-muted-foreground mr-2">🎬</span>
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>Press Enter to search "{inputValue}"</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
