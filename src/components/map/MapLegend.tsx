
const MapLegend = () => {
  return (
    <div className="absolute bottom-4 right-4 z-10">
      <div className="bg-white p-1 rounded-lg shadow-md text-xs text-muted-foreground">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-4 h-4 rounded-full bg-[#8B5CF6]"></div>
          <span>Featured</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#0EA5E9]"></div>
          <span>Available</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
