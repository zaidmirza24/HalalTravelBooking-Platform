import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Stepper } from '../components/Stepper';
import { Button } from '../components/Button';
import { Calendar, Users, CreditCard, Check, Shield } from 'lucide-react';

interface Step {
  id: number;
  label: string;
}

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const steps: Step[] = [
    { id: 1, label: 'Dates' },
    { id: 2, label: 'Travelers' },
    { id: 3, label: 'Details' },
    { id: 4, label: 'Payment' },
    { id: 5, label: 'Confirm' }
  ];

  const handleNext = (): void => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 py-6">
        <div className="container-custom">
          <h2>Complete Your Booking</h2>
          <p className="text-neutral-600 mt-2">Luxury Istanbul Discovery - 7 Days</p>
        </div>
      </div>
      
      {/* Stepper */}
      <div className="bg-white border-b border-neutral-200 py-8">
        <div className="container-custom">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
      </div>
      
      {/* Content */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-card p-8 mb-8">
            {/* Step 1: Dates */}
            {currentStep === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3>Select Your Travel Dates</h3>
                    <p className="text-neutral-600">Choose when you'd like to travel</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Departure Date
                      </label>
                      <input 
                        type="date"
                        className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                        defaultValue="2024-12-15"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Return Date
                      </label>
                      <input 
                        type="date"
                        className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                        defaultValue="2024-12-22"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <p className="text-sm text-emerald-900">
                      <strong>Note:</strong> This package is 7 days and 6 nights. Your return date has been automatically adjusted.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Travelers */}
            {currentStep === 2 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3>Traveler Information</h3>
                    <p className="text-neutral-600">Who's traveling?</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg mb-4">
                      <div>
                        <div className="font-medium">Adults</div>
                        <div className="text-sm text-neutral-600">Age 13+</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full border-2 border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 transition-colors font-medium">
                          -
                        </button>
                        <span className="w-8 text-center font-medium text-lg">2</span>
                        <button className="w-10 h-10 rounded-full border-2 border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 transition-colors font-medium">
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                      <div>
                        <div className="font-medium">Children</div>
                        <div className="text-sm text-neutral-600">Age 2-12</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full border-2 border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 transition-colors font-medium">
                          -
                        </button>
                        <span className="w-8 text-center font-medium text-lg">0</span>
                        <button className="w-10 h-10 rounded-full border-2 border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 transition-colors font-medium">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-6">
                    <h4 className="mb-4">Lead Traveler Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          First Name *
                        </label>
                        <input 
                          type="text"
                          placeholder="John"
                          className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Last Name *
                        </label>
                        <input 
                          type="text"
                          placeholder="Smith"
                          className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Email *
                        </label>
                        <input 
                          type="email"
                          placeholder="john.smith@email.com"
                          className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Phone *
                        </label>
                        <input 
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Details */}
            {currentStep === 3 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h3>Additional Details</h3>
                    <p className="text-neutral-600">Help us personalize your experience</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Special Requests or Dietary Requirements
                    </label>
                    <textarea 
                      rows={4}
                      placeholder="Let us know if you have any special requests, dietary requirements, or accessibility needs..."
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-4">
                      Room Preferences
                    </label>
                    <div className="space-y-3">
                      {['Twin beds', 'King bed', 'Ground floor', 'High floor', 'Near prayer room'].map((pref, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 rounded text-emerald-600 border-neutral-300 focus:ring-emerald-500"
                          />
                          <span className="text-neutral-700">{pref}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-teal-50 rounded-lg p-4">
                    <h4 className="mb-2 text-teal-900">Prayer Time Notifications</h4>
                    <p className="text-sm text-teal-800 mb-3">
                      Would you like to receive prayer time notifications during your trip?
                    </p>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="prayer-notif" className="text-emerald-600" defaultChecked />
                        <span className="text-sm text-teal-900">Yes, please</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="prayer-notif" className="text-emerald-600" />
                        <span className="text-sm text-teal-900">No, thank you</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3>Payment Information</h3>
                    <p className="text-neutral-600">Secure payment processing</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <p className="text-sm text-emerald-900">
                      Your payment is secured with bank-level encryption. We never store your card details.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Card Number *
                    </label>
                    <input 
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Expiry Date *
                      </label>
                      <input 
                        type="text"
                        placeholder="MM/YY"
                        className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        CVV *
                      </label>
                      <input 
                        type="text"
                        placeholder="123"
                        className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input 
                      type="text"
                      placeholder="John Smith"
                      className="w-full h-12 px-4 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-6">
                    <h4 className="mb-4">Booking Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-neutral-700">
                        <span>2 Adults × $1,299</span>
                        <span>$2,598</span>
                      </div>
                      <div className="flex justify-between text-neutral-700">
                        <span>Service Fee</span>
                        <span>$99</span>
                      </div>
                      <div className="flex justify-between text-neutral-700">
                        <span>Travel Insurance (Optional)</span>
                        <span>$149</span>
                      </div>
                      <div className="border-t border-neutral-200 pt-3 flex justify-between">
                        <h4>Total Amount</h4>
                        <h3 className="text-emerald-600">$2,846</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 5: Confirmation */}
            {currentStep === 5 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-6 animate-in zoom-in duration-500">
                  <Check className="w-10 h-10" />
                </div>
                <h2 className="mb-3">Booking Confirmed!</h2>
                <p className="text-body-large text-neutral-600 mb-8">
                  Your booking has been successfully confirmed. We've sent a confirmation email to your inbox.
                </p>
                
                <div className="bg-neutral-50 rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
                  <h4 className="mb-4">Booking Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Booking ID:</span>
                      <span className="font-medium">HT-2024-12345</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Package:</span>
                      <span className="font-medium">Luxury Istanbul Discovery</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Dates:</span>
                      <span className="font-medium">Dec 15-22, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Travelers:</span>
                      <span className="font-medium">2 Adults</span>
                    </div>
                    <div className="flex justify-between border-t border-neutral-200 pt-3">
                      <span className="text-neutral-600">Total Paid:</span>
                      <span className="font-medium text-emerald-600">$2,846</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/dashboard">
                    <Button variant="primary" size="large">
                      View My Trip
                    </Button>
                  </Link>
                  <Button variant="secondary" size="large">
                    Download Receipt
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex items-center justify-between gap-4">
              <Button 
                variant="ghost" 
                size="large"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="disabled:opacity-50"
              >
                Back
              </Button>
              <Button 
                variant="primary" 
                size="large"
                onClick={handleNext}
              >
                {currentStep === 4 ? 'Complete Payment' : 'Continue'}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
