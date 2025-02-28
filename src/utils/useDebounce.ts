import { useEffect, useState } from "react";

export const useDebouncedSearch = (searchTerm: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(searchTerm);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, delay]);

  useEffect(() => {
    if (debouncedValue.trim()) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedValue}`)
        .then((res) => res.json())
        .then((data) => {
          setResults((data.meals || []).slice(0, 8));
        })
        .catch((err) => {
          console.error("Error fetching search results:", err);
          setResults([]);
        });
    } else {
      setResults([]);
    }
  }, [debouncedValue]);

  return results;
};
