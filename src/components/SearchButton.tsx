import { useEffect, useState } from "react";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
};

const Search = ({ value, onChange }: SearchProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <input
      type="text"
      placeholder="Search todos..."
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      className="
        border border-gray-300 
        rounded-lg px-3 py-2
        text-sm text-gray-800 
        bg-white
        focus:outline-none focus:ring-2 focus:ring-blue-500
        w-full md:w-64
      "
    />
  );
};

export default Search;
