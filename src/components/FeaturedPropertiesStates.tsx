
export const FeaturedPropertiesLoading = () => {
  return (
    <section className="section relative bg-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold text-sm mb-4">
            Featured Communities
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Discover Exceptional Living Spaces
          </h2>
          <p className="text-charcoal/80 text-lg">
            Loading featured properties...
          </p>
        </div>
      </div>
    </section>
  );
};

export const FeaturedPropertiesEmpty = () => {
  return (
    <section className="section relative bg-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold text-sm mb-4">
            Featured Communities
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Discover Exceptional Living Spaces
          </h2>
          <p className="text-charcoal/80 text-lg">
            No featured properties found. Please check back later.
          </p>
        </div>
      </div>
    </section>
  );
};
