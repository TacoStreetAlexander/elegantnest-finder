
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ClipboardCheck, Search, Home, UserCheck, MessageSquareText, PhoneCall, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold text-sm mb-4">
              Simple Process
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              How It <span className="text-gradient">Works</span>
            </h1>
            <p className="text-lg md:text-xl text-charcoal/80 mb-8">
              Our straightforward approach to finding your ideal luxury senior living community in Texas.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="relative mb-20 md:mb-32">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-24 h-24 flex-shrink-0 rounded-full bg-gold/10 flex items-center justify-center z-10">
                  <span className="text-4xl font-serif font-bold text-gold">1</span>
                </div>
                <div className="md:flex-1">
                  <div className="glass-card p-8 md:p-10">
                    <div className="flex items-center mb-4">
                      <ClipboardCheck className="w-8 h-8 text-gold mr-3" />
                      <h3 className="text-2xl font-serif font-semibold">Personalized Consultation</h3>
                    </div>
                    <p className="text-lg text-charcoal/80 mb-6">
                      We begin by understanding your unique needs, preferences, budget, and desired locations. Our thorough consultation process allows us to create a detailed profile of your ideal living situation.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <UserCheck className="w-5 h-5 text-gold mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium mb-1">Personal Assessment</h4>
                          <p className="text-charcoal/70">Complete our simple questionnaire to help us understand your needs.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <PhoneCall className="w-5 h-5 text-gold mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium mb-1">Discovery Call</h4>
                          <p className="text-charcoal/70">Schedule a one-on-one call with our senior living specialist.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block absolute top-12 left-12 w-0.5 h-40 bg-gradient-to-b from-gold to-gold/0"></div>
            </div>

            {/* Step 2 */}
            <div className="relative mb-20 md:mb-32">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-24 h-24 flex-shrink-0 rounded-full bg-gold/10 flex items-center justify-center z-10">
                  <span className="text-4xl font-serif font-bold text-gold">2</span>
                </div>
                <div className="md:flex-1">
                  <div className="glass-card p-8 md:p-10">
                    <div className="flex items-center mb-4">
                      <Search className="w-8 h-8 text-gold mr-3" />
                      <h3 className="text-2xl font-serif font-semibold">Curated Property Matching</h3>
                    </div>
                    <p className="text-lg text-charcoal/80 mb-6">
                      Our expert team searches our extensive network of luxury senior communities across Texas to identify options that match your criteria. We present you with a carefully selected list of communities, complete with detailed information.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <Home className="w-5 h-5 text-gold mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium mb-1">Personalized Selections</h4>
                          <p className="text-charcoal/70">Receive a handpicked list of communities tailored to your preferences.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MessageSquareText className="w-5 h-5 text-gold mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium mb-1">Expert Insights</h4>
                          <p className="text-charcoal/70">Get detailed information and insider knowledge about each property.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block absolute top-12 left-12 w-0.5 h-40 bg-gradient-to-b from-gold to-gold/0"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-24 h-24 flex-shrink-0 rounded-full bg-gold/10 flex items-center justify-center z-10">
                  <span className="text-4xl font-serif font-bold text-gold">3</span>
                </div>
                <div className="md:flex-1">
                  <div className="glass-card p-8 md:p-10">
                    <div className="flex items-center mb-4">
                      <ArrowRight className="w-8 h-8 text-gold mr-3" />
                      <h3 className="text-2xl font-serif font-semibold">Guided Transition Support</h3>
                    </div>
                    <p className="text-lg text-charcoal/80 mb-6">
                      Once you've selected your preferred community, we provide comprehensive support through every step of the transition process – from scheduling tours and facilitating applications to coordinating with the community and ensuring a smooth move-in experience.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <ClipboardCheck className="w-5 h-5 text-gold mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium mb-1">Tour Coordination</h4>
                          <p className="text-charcoal/70">We arrange and often accompany you on visits to your selected communities.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <UserCheck className="w-5 h-5 text-gold mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium mb-1">Move-In Assistance</h4>
                          <p className="text-charcoal/70">Guidance through paperwork, logistics, and coordination with the community.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-cream-lighter">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold text-sm mb-4">
              Common Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-charcoal/80 text-lg">
              Answers to the most common questions about our process and services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-xl font-serif font-semibold mb-3">Is there a cost for your services?</h3>
                <p className="text-charcoal/80">
                  Our service is completely free for seniors and their families. We are compensated by the communities when you decide to move in, similar to how a real estate agent is paid.
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-serif font-semibold mb-3">How long does the process typically take?</h3>
                <p className="text-charcoal/80">
                  The timeline varies based on your needs and urgency. Some clients find their ideal community within weeks, while others prefer a more extended search. We adapt to your pace and preferences.
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-serif font-semibold mb-3">Do you only work with luxury communities?</h3>
                <p className="text-charcoal/80">
                  While we specialize in luxury senior living options, we work with a range of communities to meet various budget levels while maintaining our standards for quality, service, and amenities.
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-serif font-semibold mb-3">What areas of Texas do you serve?</h3>
                <p className="text-charcoal/80">
                  We currently serve major metropolitan areas including Austin, Dallas, Houston, San Antonio, and Fort Worth, as well as many surrounding suburbs and smaller cities across Texas.
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-serif font-semibold mb-3">What if I'm not ready to move yet but want to plan ahead?</h3>
                <p className="text-charcoal/80">
                  We're happy to help with future planning. Many clients work with us months or even years before they're ready to transition, allowing for thoughtful consideration of options and financial planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="bg-gold/10 p-10 md:p-12 flex items-center">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-6">Our Client Success Stories</h3>
                  <div className="mb-8">
                    <p className="italic text-charcoal/80 mb-4">
                      "The team at ElegantNest made finding the perfect senior community for my mother so much easier than I expected. Their personal approach and attention to detail truly set them apart."
                    </p>
                    <p className="font-medium">— Jennifer K., Dallas</p>
                  </div>
                  <a href="/testimonials" className="text-gold font-medium flex items-center hover:underline">
                    Read more success stories
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1586539252580-326165f9a5e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Happy senior resident in their new apartment" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-gold/10 to-cream-light">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-lg text-charcoal/80 max-w-2xl mx-auto mb-8">
            Let us guide you through finding the perfect luxury senior living community that meets your unique needs and preferences.
          </p>
          <a href="/contact" className="btn-primary text-lg px-8 py-4">
            Begin Your Search Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
