
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  const testimonials = [
    {
      quote: "Moving my mother to ElegantNest was the best decision we made. The staff is incredibly caring, the community is vibrant, and the amenities are first-class. She's happier than she's been in years.",
      author: "Jennifer Thompson",
      relation: "Daughter of Resident",
      image: "https://randomuser.me/api/portraits/women/23.jpg"
    },
    {
      quote: "After living here for a year, I can confidently say this is where I belong. I've made wonderful friends, the staff remembers all my preferences, and I feel both independent and well-supported.",
      author: "Robert Wilson",
      relation: "Resident for 1 year",
      image: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    {
      quote: "The personalized attention my parents receive at their community is exceptional. From dietary preferences to activity recommendations, everything is tailored to their needs and interests.",
      author: "Lisa Gardner",
      relation: "Daughter of Residents",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('next');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('prev');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section bg-cream">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold text-sm mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Voices of Our Community
          </h2>
          <p className="text-charcoal/80 text-lg">
            Hear directly from families and residents about their experiences with our luxury senior living communities.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden py-8">
            <div className="relative min-h-[300px]">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`
                    absolute w-full transition-all duration-500 ease-in-out
                    ${index === currentIndex ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 z-0 ' + 
                      (direction === 'next' ? 'translate-x-full' : '-translate-x-full')}
                  `}
                >
                  <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white rounded-2xl shadow-lg">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gold/20">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <Quote className="w-10 h-10 text-gold/40 mb-4" />
                      <blockquote className="mb-6 text-lg text-charcoal italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <div>
                        <p className="font-semibold text-charcoal-dark">{testimonial.author}</p>
                        <p className="text-sm text-charcoal/70">{testimonial.relation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white border border-cream-dark hover:bg-cream transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-charcoal" />
              </button>
              
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 'next' : 'prev');
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-gold scale-125' 
                      : 'bg-gold/30 hover:bg-gold/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
              
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white border border-cream-dark hover:bg-cream transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-charcoal" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
