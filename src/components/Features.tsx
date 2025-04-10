
import { Compass, Heart, Home, Shield, Users } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Features = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Home className="w-12 h-12 text-gold" />,
      title: "Luxury Residences",
      description: "Beautifully designed apartments with premium finishes and spacious layouts for comfortable living."
    },
    {
      icon: <Users className="w-12 h-12 text-gold" />,
      title: "Vibrant Community",
      description: "Engage with like-minded seniors in thoughtfully designed social spaces and organized activities."
    },
    {
      icon: <Shield className="w-12 h-12 text-gold" />,
      title: "Peace of Mind",
      description: "Security features and optional care services ensure safety without compromising independence."
    },
    {
      icon: <Heart className="w-12 h-12 text-gold" />,
      title: "Personalized Support",
      description: "Our team provides compassionate guidance throughout your journey to find the perfect home."
    },
    {
      icon: <Compass className="w-12 h-12 text-gold" />,
      title: "Prime Locations",
      description: "Strategically located communities with easy access to shopping, dining, healthcare, and entertainment."
    }
  ];

  return (
    <section ref={ref} className="section bg-cream-lighter">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold text-sm mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Elevating Senior Living Experiences
          </h2>
          <p className="text-charcoal/80 text-lg">
            We believe that your golden years should be lived with dignity, comfort, and joy. Our curated selection of luxury residences is designed to enhance your lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`glass-card p-8 hover-lift ${inView ? 'animate-fade-in' : 'opacity-0'}`} 
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-serif font-semibold mb-3">{feature.title}</h3>
              <p className="text-charcoal/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
