import { Search } from 'lucide-react';

const SearchBar = ({ placeholder = 'Search...', value, onChange }) => {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
      />
    </div>
  );
};

export default SearchBar;