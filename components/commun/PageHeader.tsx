interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  actions, 
  className = '' 
}: PageHeaderProps) {
  return (
    <div className={`mb-8 md:mb-10 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="
            text-2xl md:text-3xl 
            font-bold 
            text-foreground 
            mb-1 md:mb-2
            transition-colors duration-300
          ">
            {title}
          </h1>
          {subtitle && (
            <p className="
              text-base 
              text-muted
              transition-colors duration-300
            ">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}