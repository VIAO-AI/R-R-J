
import { cn } from "@/lib/utils";

interface FoodItemProps {
  name: string;
  description: string;
  price: string;
  image?: string;
  category?: string;
  featured?: boolean;
  className?: string;
}

export default function FoodItem({ 
  name, 
  description, 
  price, 
  image, 
  category,
  featured = false,
  className 
}: FoodItemProps) {
  return (
    <div 
      className={cn(
        "group relative p-4 rounded-lg transition-all duration-300",
        featured ? "md:col-span-2 bg-muted/50" : "bg-transparent hover:bg-muted/30",
        className
      )}
    >
      <div className={cn(
        "flex flex-col",
        featured && image ? "md:flex-row md:items-center" : "",
        !image ? "border-b border-border pb-4" : ""
      )}>
        {image && (
          <div className={cn(
            "relative overflow-hidden rounded-lg mb-4",
            featured ? "md:mb-0 md:mr-6 md:w-1/2" : "w-full aspect-[4/3]"
          )}>
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            {category && (
              <span className="absolute top-2 right-2 bg-primary/90 text-white text-xs px-2 py-1 rounded-full">
                {category}
              </span>
            )}
          </div>
        )}
        
        <div className={featured && image ? "md:w-1/2" : "w-full"}>
          <div className="flex justify-between items-start">
            <h3 className="font-display text-lg font-medium leading-tight">
              {name}
            </h3>
            <span className="font-medium text-primary ml-4">{price}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
