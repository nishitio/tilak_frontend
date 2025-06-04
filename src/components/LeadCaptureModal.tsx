import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Leaf, CheckCircle } from "lucide-react";

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
  productInterest?: string;
}

interface LeadData {
  id: string;
  name: string;
  email: string;
  source: string;
  productInterest: string;
  timestamp: string;
  date: string;
}

const LeadCaptureModal = ({ open, onOpenChange, source = "general", productInterest = "psyllium-husk" }: LeadCaptureModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both name and email fields.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check for existing email and save lead using API
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          source,
          productInterest,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.message === 'Email already exists') {
          toast({
            title: "Already Registered",
            description: "This email is already on our waitlist. We'll notify you when we launch!",
          });
        } else {
          throw new Error(data.message || 'Failed to save lead');
        }
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      toast({
        title: "Welcome to Our Wellness Community!",
        description: "You'll be the first to know when we launch. Get ready for natural wellness!",
      });

      // Reset form after delay
      setTimeout(() => {
        setName("");
        setEmail("");
        setIsSuccess(false);
        onOpenChange(false);
      }, 3000);

    } catch (error) {
      console.error('Error saving lead:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center space-y-6 py-8">
            <div className="flex justify-center">
              <div className="bg-emerald-100 rounded-full p-3">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-sage-900">Welcome to Our Wellness Journey!</h3>
              <p className="text-sage-600">
                You're now part of our exclusive community. We'll notify you as soon as our premium psyllium husk is available.
              </p>
            </div>
            <div className="bg-sage-50 p-4 rounded-lg">
              <p className="text-sm text-sage-700">
                <strong>What's next?</strong> Look out for our launch email with an exclusive 25% discount for early supporters like you!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-emerald-100 rounded-full p-3">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-bold text-sage-900">
            Join Our Wellness Community
          </DialogTitle>
          <p className="text-center text-sage-600 mt-2">
            Be the first to experience the power of ancient Ayurvedic wellness. 
            Get exclusive early access and a special launch discount.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sage-700 font-medium">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-sage-200 focus:border-emerald-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sage-700 font-medium">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-sage-200 focus:border-emerald-500"
              required
            />
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="text-sm text-emerald-800">
              <strong>Early Bird Benefits:</strong>
              <ul className="mt-2 space-y-1">
                <li>• 25% exclusive launch discount</li>
                <li>• Priority access to new products</li>
                <li>• Free wellness guide ($15 value)</li>
                <li>• Expert Ayurvedic tips & recipes</li>
              </ul>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-full text-lg font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Joining..." : "Join the Wellness Revolution"}
          </Button>

          <p className="text-xs text-sage-500 text-center">
            We respect your privacy. Unsubscribe anytime. No spam, just pure wellness.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
