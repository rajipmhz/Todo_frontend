type SearchProps = {
  value: string;
  onChange: (value: string) => void;
};

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        border border-gray-300 
        rounded-lg px-3 py-2
        text-sm text-gray-800 
        bg-white
        focus:outline-none focus:ring-2 focus:ring-blue-500
        transition
        w-full md:w-64
      "
    />
  );
};

export default Search;
