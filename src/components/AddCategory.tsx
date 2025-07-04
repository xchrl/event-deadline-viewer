"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Event } from "@/types/Event";

const availableCategories = [
  {
    name: "Genshin Impact",
    colors:
      "bg-white border-gray-300 text-gray-900 dark:bg-black dark:border-gray-600 dark:text-white",
  },
  {
    name: "Wuthering Waves",
    colors:
      "bg-green-50 border-green-200 text-green-800 dark:bg-green-950/50 dark:border-green-800 dark:text-green-200",
  },
  {
    name: "Zenless Zone Zero",
    colors:
      "bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950/50 dark:border-orange-800 dark:text-orange-200",
  },
];

export default function AddCategory({
  id,
  category,
}: {
  id: number;
  category: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category == "" ? "" : category
  );

  const handleCategoryUpdate = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  useEffect(() => {
    const existingData = localStorage.getItem("events");
    let parsedData: Event[] = [];

    if (existingData) parsedData = JSON.parse(existingData);
    const updatedData = parsedData.map((event) =>
      event.id == id ? { ...event, category: selectedCategory } : event
    );
    localStorage.setItem("events", JSON.stringify(updatedData));
    window.dispatchEvent(new Event("dataUpdated"));
  }, [selectedCategory, id]);

  const getCategoryColors = (categoryName: string) => {
    const category = availableCategories.find(
      (cat) => cat.name === categoryName
    );
    return (
      category?.colors ||
      "bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-950/50 dark:border-gray-800 dark:text-gray-200"
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Selected Category */}
      <div className="flex flex-wrap gap-2 min-h-[2.5rem] items-center">
        {selectedCategory && (
          <Badge
            key={selectedCategory}
            variant="secondary"
            className={`px-3 py-1 text-sm font-medium rounded-md flex items-center gap-1 hover:opacity-80 transition-opacity border ${getCategoryColors(
              selectedCategory
            )}`}
          >
            {selectedCategory}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => handleCategoryUpdate("")}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {selectedCategory}</span>
            </Button>
          </Badge>
        )}

        {/* Add Category Button - only show if no category is selected */}
        {!selectedCategory && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50 transition-colors"
              >
                <Plus className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Add category</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {availableCategories.map((category) => (
                <DropdownMenuItem
                  key={category.name}
                  onClick={() => handleCategoryUpdate(category.name)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-sm border ${category.colors}`}
                    ></div>
                    {category.name}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
