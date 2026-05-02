import { Search } from "lucide-react";

export const ClayInput = ({ 
  placeholder = "Search something...", 
  icon: Icon = Search,
  className = "" 
}) => {
  return (
    <div className={`relative group ${className}`}>
      {Icon && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-clay-muted group-focus-within:text-clay-accent transition-colors">
          <Icon size={20} />
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={`
          flex w-full h-16 border-0 bg-[#EFEBF5] px-6 ${Icon ? 'pl-14' : ''} py-4 
          text-clay-foreground text-lg shadow-clay-pressed rounded-2xl
          focus:bg-white focus:ring-4 focus:ring-clay-accent/20 focus:outline-none focus:shadow-clay-card
          transition-all duration-300 placeholder:text-clay-muted
        `}
      />
    </div>
  );
};
