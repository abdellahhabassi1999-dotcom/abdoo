"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { CourseCategory, CourseLevel } from "@/types";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/lib/constants";
import Input from "@/components/ui/Input";

interface CourseFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CourseCategory | "all";
  onCategoryChange: (category: CourseCategory | "all") => void;
  selectedLevel: CourseLevel | "all";
  onLevelChange: (level: CourseLevel | "all") => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export default function CourseFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
  sortBy,
  onSortChange,
}: CourseFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters</span>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Category
          </label>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange("all")}
              className={`w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              All Categories
            </button>
            {COURSE_CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => onCategoryChange(category.value)}
                className={`w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
                  selectedCategory === category.value
                    ? "bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Level Filter */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Level
          </label>
          <div className="space-y-2">
            <button
              onClick={() => onLevelChange("all")}
              className={`w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
                selectedLevel === "all"
                  ? "bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              All Levels
            </button>
            {COURSE_LEVELS.map((level) => (
              <button
                key={level.value}
                onClick={() => onLevelChange(level.value)}
                className={`w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
                  selectedLevel === level.value
                    ? "bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </div>
    </div>
  );
}
