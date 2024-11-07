"use client";
import React, { useState, useEffect } from "react";
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
  BarChart,
  Bar,
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
      [arr[i], arr[j]] =       [arr[j], arr[i]];
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
      java: `public static void quickSort(int[] arr, int low, int high) {
      if (low < high) {
          int pi = partition(arr, low, high);
          quickSort(arr, low, pi - 1);
          quickSort(arr, pi + 1, high);
      }
  }

  private static int partition(int[] arr, int low, int high) {
      int pivot = arr[high];
      int i = low - 1;
      
      for (int j = low; j < high; j++) {
          if (arr[j] <= pivot) {
              i++;
              int temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
          }
      }
      int temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      return i + 1;
  }`,
      cpp: `void quickSort(int arr[], int low, int high) {
      if (low < high) {
          int pi = partition(arr, low, high);
          quickSort(arr, low, pi - 1);
          quickSort(arr, pi + 1, high);
      }
  }

  int partition(int arr[], int low, int high) {
      int pivot = arr[high];
      int i = low - 1;
      
      for (int j = low; j < high; j++) {
          if (arr[j] <= pivot) {
              i++;
              swap(arr[i], arr[j]);
          }
      }
      
      swap(arr[i + 1], arr[high]);
      return i + 1;
  }`,
    },
    implementation: (arr) => {
      const steps = [];
      const array = [...arr];
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

      const quickSort = (arr, low, high) => {
        if (low < high) {
          const pi = partition(arr, low, high);
          quickSort(arr, low, pi - 1);
          quickSort(arr, pi + 1, high);
        }
      };

      steps.push([...array]); // Initial state
      quickSort(array, 0, array.length - 1);
      return steps;
    },
  },
  "Selection Sort": {
    name: "Selection Sort",
    complexity: "O(n²)",
    code: {
      javascript: `function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      }
    }
    return arr;
  }`,
      python: `def selection_sort(arr):
      n = len(arr)
      for i in range(n):
          min_idx = i
          for j in range(i + 1, n):
              if arr[j] < arr[min_idx]:
                  min_idx = j
          arr[i], arr[min_idx] = arr[min_idx], arr[i]
      return arr`,
      java: `public static void selectionSort(int[] arr) {
      int n = arr.length;
      for (int i = 0; i < n - 1; i++) {
                    int minIdx = i;
          for (int j = i + 1; j < n; j++) {
              if (arr[j] < arr[minIdx]) {
                  minIdx = j;
              }
          }
          int temp = arr[minIdx];
          arr[minIdx] = arr[i];
          arr[i] = temp;
      }
  }`,
      cpp: `void selectionSort(int arr[], int n) {
      for (int i = 0; i < n - 1; i++) {
          int minIdx = i;
          for (int j = i + 1; j < n; j++) {
              if (arr[j] < arr[minIdx]) {
                  minIdx = j;
              }
          }
          if (minIdx != i) {
              swap(arr[i], arr[minIdx]);
          }
      }
  }`,
    },
    implementation: (arr) => {
      const steps = [];
      const array = [...arr];
      steps.push([...array]); // Initial state

      for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
          if (array[j] < array[minIdx]) {
            minIdx = j;
          }
        }
        if (minIdx !== i) {
          [array[i], array[minIdx]] = [array[minIdx], array[i]];
          steps.push([...array]);
        }
      }
      return steps;
    },
  },
  "Insertion Sort": {
    name: "Insertion Sort",
    complexity: "O(n²)",
    code: {
      javascript: `function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
    return arr;
  }`,
      python: `def insertion_sort(arr):
      for i in range(1, len(arr)):
          key = arr[i]
          j = i - 1
          while j >= 0 and arr[j] > key:
              arr[j + 1] = arr[j]
              j -= 1
          arr[j + 1] = key
      return arr`,
      java: `public static void insertionSort(int[] arr) {
      int n = arr.length;
      for (int i = 1; i < n; i++) {
          int key = arr[i];
          int j = i - 1;
          while (j >= 0 && arr[j] > key) {
              arr[j + 1] = arr[j];
              j--;
          }
          arr[j + 1] = key;
      }
  }`,
      cpp: `void insertionSort(int arr[], int n) {
      for (int i = 1; i < n; i++) {
          int key = arr[i];
          int j = i - 1;
          while (j >= 0 && arr[j] > key) {
              arr[j + 1] = arr[j];
              j--;
          }
          arr[j + 1] = key;
      }
  }`,
    },
    implementation: (arr) => {
      const steps = [];
      const array = [...arr];
      steps.push([...array]); // Initial state

      for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
          array[j + 1] = array[j];
          j--;
          steps.push([...array]);
        }
        array[j + 1] = key;
        if (j + 1 !== i) {
          steps.push([...array]);
        }
      }
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
      if (isPlaying && currentStep < sortingSteps.length-1) {
        interval = setInterval(() => {
          setCurrentStep((step) => {
            if (step >= sortingSteps.length - 1) {
              setIsPlaying(false);
              return step;
            }
            return step + 1;
          });
        }, 500);
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
      <div className="min-h-screen flex flex-col bg-[#1e1e2e] text-[#cdd6f4]">
      {/* Navigation Bar */}
      <nav className="w-full px-6 py-4 bg-[#313244]">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-[#89b4fa]">
            Sortfolio.io
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 flex gap-6">
        {/* Left Section - Visualization */}
        <Card className="flex-1 p-6 bg-[#313244]">
          <div className="flex flex-col h-full">
            {/* Chart */}
            <div className="flex-1 mb-6 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sortingSteps[currentStep] || data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.surface2} />
                  <XAxis dataKey="name" stroke={theme.subtext0} />
                  <YAxis stroke={theme.subtext0} />
                  <Bar
                    dataKey="value"
                    fill={theme.blue}
                    animationDuration={500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevStep}
                className="border-[#585b70] text-[#6f87d9]"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="border-[#585b70] text-[#6f87d9]"
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
                className="border-[#585b70] text-[#6f87d9]"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                className="border-[#585b70] text-[#6f87d9]"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Right Section - Controls & Code */}
        <Card className="flex-1 p-6 bg-[#313244]">
          <div className="flex flex-col h-full">
            {/* Algorithm Info */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-[#cba6f7]">
                {selectedAlgorithm}
              </h2>
              <p className="text-sm text-[#bac2de]">
                Time Complexity: {algorithms[selectedAlgorithm].complexity}
              </p>
            </div>

            {/* Dropdowns */}
            <div className="flex gap-4 mb-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-[#585b70] text-[#6f87d9]">
                    {selectedLanguage}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#313244] border-[#585b70]">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className="text-[#cdd6f4]"
                    >
                      {lang}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-[#585b70] text-[#6f87d9]">
                    {selectedAlgorithm}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#313244] border-[#585b70]">
                  {Object.keys(algorithms).map((algo) => (
                    <DropdownMenuItem
                      key={algo}
                      onClick={() => setSelectedAlgorithm(algo)}
                      className="text-[#cdd6f4]"
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
