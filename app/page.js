"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { CodeBlock, dracula } from "react-code-blocks";

// Catppuccin Mocha theme colors
const theme = {
  base: "#1e1e2e",
  surface0: "#313244",
  surface1: "#45475a",
  surface2: "#585b70",
  text: "#cdd6f4",
  subtext1: "#bac2de",
  subtext0: "#a6adc8",
  overlay0: "#6c7086",
  blue: "#89b4fa",
  lavender: "#b4befe",
  sapphire: "#74c7ec",
  sky: "#89dceb",
  mauve: "#cba6f7",
  red: "#f38ba8",
  peach: "#fab387",
  yellow: "#f9e2af",
  green: "#a6e3a1",
};

// Sorting algorithms implementations and their code snippets
const algorithms = {
  "Bubble Sort": {
    name: "Bubble Sort",
    complexity: "O(n²)",
    code: {
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
      java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
      cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
    },
    implementation: (arr) => {
      const n = arr.length;
      const steps = [];
      const array = [...arr];
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (array[j] > array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            steps.push([...array]);
          }
        }
      }
      return steps;
    },
  },
  "Quick Sort": {
    name: "Quick Sort",
    complexity: "O(n log n)",
    code: {
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivot = partition(arr, low, high);
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)`,
    },
    implementation: (arr) => {
      const steps = [];
      const array = [...arr];

      const quickSort = (arr, low, high) => {
        if (low < high) {
          const pivot = partition(arr, low, high);
          quickSort(arr, low, pivot - 1);
          quickSort(arr, pivot + 1, high);
        }
      };

      const partition = (arr, low, high) => {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
          if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            steps.push([...arr]);
          }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        steps.push([...arr]);
        return i + 1;
      };

      quickSort(array, 0, array.length - 1);
      return steps;
    },
  },
};

const languages = ["JavaScript", "Python", "Java", "Cpp"];

const SortingVisualizer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState([]);
  const [sortingSteps, setSortingSteps] = useState([]);
  useEffect(() => {
    console.log(algorithms["Bubble Sort"]["code"]["cpp"]);
  }, []);
  // Initialize random data
  useEffect(() => {
    const initialData = Array.from({ length: 10 }, (_, i) => ({
      name: i.toString(),
      value: Math.floor(Math.random() * 50) + 1,
    }));
    setData(initialData);

    // Generate sorting steps
    const values = initialData.map((item) => item.value);
    const steps = algorithms[selectedAlgorithm].implementation(values);
    setSortingSteps(
      steps.map((step) =>
        step.map((value, i) => ({ name: i.toString(), value }))
      )
    );
    setCurrentStep(0);
    setIsPlaying(false);
  }, [selectedAlgorithm]);

  // Handle animation
  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < sortingSteps.length) {
      interval = setInterval(() => {
        setCurrentStep((step) => {
          if (step >= sortingSteps.length - 1) {
            setIsPlaying(false);
            return step;
          }
          return step + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, sortingSteps.length]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePrevStep = () => {
    setCurrentStep((step) => Math.max(0, step - 1));
    setIsPlaying(false);
  };

  const handleNextStep = () => {
    setCurrentStep((step) => Math.min(sortingSteps.length - 1, step + 1));
    setIsPlaying(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme.base, color: theme.text }}
    >
      {/* Navigation Bar */}
      <nav
        className="w-full px-6 py-4"
        style={{ backgroundColor: theme.surface0 }}
      >
        <div className="flex items-center">
          <h1 className="text-2xl font-bold" style={{ color: theme.blue }}>
            Sortfolio.io
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 flex gap-6">
        {/* Left Section - Visualization */}
        <Card
          className="flex-1 p-6"
          style={{ backgroundColor: theme.surface0 }}
        >
          <div className="flex flex-col h-full">
            {/* Chart */}
            <div className="flex-1 mb-6" style={{ minHeight: "400px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sortingSteps[currentStep] || data}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme.surface2}
                  />
                  <XAxis dataKey="name" stroke={theme.subtext0} />
                  <YAxis stroke={theme.subtext0} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={theme.blue}
                    strokeWidth={2}
                    isAnimationActive={true}
                    animationDuration={500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevStep}
                style={{ borderColor: theme.surface2, color: theme.text }}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                style={{ borderColor: theme.surface2, color: theme.text }}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextStep}
                style={{ borderColor: theme.surface2, color: theme.text }}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                style={{ borderColor: theme.surface2, color: theme.text }}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Right Section - Controls & Code */}
        <Card
          className="flex-1 p-6"
          style={{ backgroundColor: theme.surface0 }}
        >
          <div className="flex flex-col h-full">
            {/* Algorithm Info */}
            <div className="mb-4">
              <h2
                className="text-xl font-semibold"
                style={{ color: theme.mauve }}
              >
                {selectedAlgorithm}
              </h2>
              <p className="text-sm" style={{ color: theme.subtext1 }}>
                Time Complexity: {algorithms[selectedAlgorithm].complexity}
              </p>
            </div>

            {/* Dropdowns */}
            <div className="flex gap-4 mb-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    style={{ borderColor: theme.surface2, color: theme.text }}
                  >
                    {selectedLanguage}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  style={{
                    backgroundColor: theme.surface0,
                    borderColor: theme.surface2,
                  }}
                >
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      style={{ color: theme.text }}
                    >
                      {lang}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    style={{ borderColor: theme.surface2, color: theme.text }}
                  >
                    {selectedAlgorithm}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  style={{
                    backgroundColor: theme.surface0,
                    borderColor: theme.surface2,
                  }}
                >
                  {Object.keys(algorithms).map((algo) => (
                    <DropdownMenuItem
                      key={algo}
                      onClick={() => setSelectedAlgorithm(algo)}
                      style={{ color: theme.text }}
                    >
                      {algo}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Code Display */}
            <div className="flex-1 rounded-lg overflow-auto">
              <CodeBlock
                text={
                  algorithms[selectedAlgorithm].code[
                    selectedLanguage.toLowerCase()
                  ] || "Code not available for this language"
                }
                language={selectedLanguage.toLowerCase()}
                showLineNumbers={true}
                theme={dracula}
                customStyle={{
                  backgroundColor: theme.surface1,
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SortingVisualizer;
