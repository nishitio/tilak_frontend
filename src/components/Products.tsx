
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";

const Products = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-sage-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
            Pure. Natural. Effective.
          </h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Experience the transformative power of our premium psyllium husk, 
            carefully sourced and processed to maintain maximum potency.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-sage-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-sage-100 to-emerald-100 rounded-3xl p-8 h-80 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80" 
                    alt="Natural product on wooden plate"
                    className="rounded-2xl object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-emerald-600 text-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm mt-1">4.9/5 from 2,400+ reviews</div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-sage-900 mb-4">
                    Premium Psyllium Husk
                  </h3>
                  <p className="text-sage-600 leading-relaxed mb-6">
                    100% pure, organic psyllium husk powder. No additives, no artificial ingredients—
                    just nature's powerful fiber solution in its purest form.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sage-700">✓ 85% Soluble Fiber</span>
                    <span className="text-sage-700">✓ Gluten-Free</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sage-700">✓ Non-GMO Verified</span>
                    <span className="text-sage-700">✓ Lab Tested</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sage-700">✓ 30-Day Supply</span>
                    <span className="text-sage-700">✓ Easy Mixing</span>
                  </div>
                </div>

                <div className="border-t border-sage-200 pt-6">
                  <div className="flex items-baseline space-x-3 mb-4">
                    <span className="text-4xl font-bold text-sage-900">$24.99</span>
                    <span className="text-xl text-sage-500 line-through">$34.99</span>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                      30% OFF
                    </span>
                  </div>
                  
                  <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl text-lg group">
                    <ShoppingCart className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                    Add to Cart - Free Shipping
                  </Button>
                  
                  <p className="text-sm text-sage-500 text-center mt-3">
                    30-day money-back guarantee • Free shipping on orders over $25
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
