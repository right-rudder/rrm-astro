import React, { useState, useEffect } from 'react';
import { 
  validateStep1, 
  validateStep2, 
  formatPhoneNumber,
  validateEmail,
  validateUSPhone,
  validateRequired,
  validateAircraft,
  validateRevenue
} from '../utils/pricingValidation.js';
import { selectPackage } from '../utils/pricingLogic.js';
import { 
  submitContactWebhook, 
  submitCompleteForm, 
  handleAbandonedCheckout 
} from '../utils/pricingWebhook.js';

const PricingEstimator = () => {
  // Form state
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  
  // Contact data (Step 1)
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    businessName: '',
    phone: ''
  });
  
  // Business data (Step 2)
  const [businessData, setBusinessData] = useState({
    aircraft: '',
    currentRevenue: '',
    targetRevenue: '',
    leadsPerMonth: '',
    newStudentsPerMonth: '',
    additionalLocations: '',
    desiredServices: []
  });
  
  // Abandoned checkout timer
  const [abandonedTimer, setAbandonedTimer] = useState(null);
  const [partialSubmitted, setPartialSubmitted] = useState(false);
  
  // Available service options
  const serviceOptions = [
    'SEO',
    'Google Ads',
    'Meta Facebook/Instagram Ads', 
    'Social Media Consulting',
    'Video Production',
    'Custom Web Development'
  ];
  
  const revenueOptions = [
    '$0-$500k',
    '$500k-$1M', 
    '$1M-$3M',
    '$3M-$6M',
    '$6M-$10M',
    '$10M+'
  ];
  
  // Real-time validation for individual fields
  const validateField = (fieldName, value, isStep1 = true) => {
    let validation;
    
    if (isStep1) {
      switch (fieldName) {
        case 'name':
          validation = validateRequired(value, 'Name');
          break;
        case 'email':
          validation = validateEmail(value);
          break;
        case 'businessName':
          validation = validateRequired(value, 'Business name');
          break;
        case 'phone':
          if (value.trim() !== '') {
            validation = validateUSPhone(value);
          } else {
            validation = { isValid: true, error: '' };
          }
          break;
        default:
          validation = { isValid: true, error: '' };
      }
    } else {
      switch (fieldName) {
        case 'aircraft':
          validation = validateAircraft(value);
          break;
        case 'currentRevenue':
        case 'targetRevenue':
          validation = validateRevenue(value);
          break;
        default:
          validation = { isValid: true, error: '' };
      }
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: validation.error
    }));
    
    return validation.isValid;
  };
  
  // Handle contact form changes
  const handleContactChange = (field, value) => {
    let processedValue = value;
    
    // Format phone number
    if (field === 'phone') {
      processedValue = formatPhoneNumber(value);
    }
    
    setContactData(prev => ({
      ...prev,
      [field]: processedValue
    }));
    
    // Real-time validation
    validateField(field, processedValue, true);
  };
  
  // Handle business form changes
  const handleBusinessChange = (field, value) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Real-time validation
    validateField(field, value, false);
    
    // Reset abandoned checkout timer
    if (abandonedTimer) {
      clearTimeout(abandonedTimer);
    }
    
    // Set new timer for abandoned checkout (30 seconds)
    if (!partialSubmitted) {
      const newTimer = setTimeout(() => {
        handleAbandonedSubmission();
      }, 30000);
      setAbandonedTimer(newTimer);
    }
  };
  
  // Handle service selection changes
  const handleServiceChange = (service, checked) => {
    setBusinessData(prev => ({
      ...prev,
      desiredServices: checked 
        ? [...prev.desiredServices, service]
        : prev.desiredServices.filter(s => s !== service)
    }));
  };
  
  // Handle abandoned checkout
  const handleAbandonedSubmission = async () => {
    if (partialSubmitted) return;
    
    try {
      const result = await handleAbandonedCheckout(contactData, businessData);
      if (result.success) {
        setPartialSubmitted(true);
        console.log('Partial submission successful');
      }
    } catch (error) {
      console.error('Error in abandoned checkout:', error);
    }
  };
  
  // Submit Step 1 (Contact Info)
  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // Validate all Step 1 fields
    const validation = validateStep1(contactData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }
    
    try {
      const result = await submitContactWebhook(contactData);
      
      if (result.success) {
        setStep(2);
        setMessage('');
      } else {
        setMessage('There was an error processing your information. Please try again.');
      }
    } catch (error) {
      console.error('Step 1 submission error:', error);
      setMessage('There was an error processing your information. Please try again.');
    }
    
    setLoading(false);
  };
  
  // Submit Step 2 (Complete Form)
  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // Clear abandoned checkout timer
    if (abandonedTimer) {
      clearTimeout(abandonedTimer);
    }
    
    // Validate all Step 2 fields
    const validation = validateStep2(businessData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }
    
    try {
      // Get package recommendation
      const packageRecommendation = selectPackage(businessData);
      
      // Submit complete form
      const result = await submitCompleteForm(contactData, businessData, packageRecommendation);
      
      if (result.success) {
        // Redirect to package page
        window.location.href = result.redirectUrl;
      } else {
        setMessage('There was an error processing your request. Please try again.');
      }
    } catch (error) {
      console.error('Step 2 submission error:', error);
      setMessage('There was an error processing your request. Please try again.');
    }
    
    setLoading(false);
  };
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (abandonedTimer) {
        clearTimeout(abandonedTimer);
      }
    };
  }, [abandonedTimer]);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-accent text-white' : 'bg-gray-300 text-gray-600'} mr-2`}>
            1
          </div>
          <div className={`flex-1 h-1 ${step >= 2 ? 'bg-accent' : 'bg-gray-300'} mx-2`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-accent text-white' : 'bg-gray-300 text-gray-600'} ml-2`}>
            2
          </div>
        </div>
        <div className="text-center">
          <span className="text-lg font-semibold text-gray-700">
            Step {step} of 2: {step === 1 ? 'Contact Information' : 'Business Details'}
          </span>
        </div>
      </div>
      
      {/* Error/Success Messages */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
          {message}
        </div>
      )}
      
      {/* Step 1: Contact Information */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary-dark mb-6">Tell us about your flight school</h2>
          <form onSubmit={handleStep1Submit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                value={contactData.name}
                onChange={(e) => handleContactChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="John Smith"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={contactData.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="john@flightschool.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                Flight School Name *
              </label>
              <input
                type="text"
                id="businessName"
                value={contactData.businessName}
                onChange={(e) => handleContactChange('businessName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${errors.businessName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Sky High Aviation Academy"
              />
              {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                value={contactData.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="555-123-4567"
                required
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Continue →'}
            </button>
          </form>
        </div>
      )}
      
      {/* Step 2: Business Information */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary-dark mb-6">Let's find your perfect marketing package</h2>
          <form onSubmit={handleStep2Submit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="aircraft" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Aircraft *
                </label>
                <input
                  type="number"
                  id="aircraft"
                  min="1"
                  max="100"
                  value={businessData.aircraft}
                  onChange={(e) => handleBusinessChange('aircraft', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${errors.aircraft ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="5"
                />
                {errors.aircraft && <p className="mt-1 text-sm text-red-600">{errors.aircraft}</p>}
              </div>
              
              <div>
                <label htmlFor="additionalLocations" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Locations
                </label>
                <input
                  type="number"
                  id="additionalLocations"
                  min="0"
                  max="10"
                  value={businessData.additionalLocations}
                  onChange={(e) => handleBusinessChange('additionalLocations', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent border-gray-300"
                  placeholder="0"
                />
                <p className="mt-1 text-xs text-gray-500">Beyond your main location</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currentRevenue" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Annual Revenue *
                </label>
                <select
                  id="currentRevenue"
                  value={businessData.currentRevenue}
                  onChange={(e) => handleBusinessChange('currentRevenue', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${errors.currentRevenue ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select current revenue...</option>
                  {revenueOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.currentRevenue && <p className="mt-1 text-sm text-red-600">{errors.currentRevenue}</p>}
              </div>
              
              <div>
                <label htmlFor="targetRevenue" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Annual Revenue *
                </label>
                <select
                  id="targetRevenue"
                  value={businessData.targetRevenue}
                  onChange={(e) => handleBusinessChange('targetRevenue', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${errors.targetRevenue ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select target revenue...</option>
                  {revenueOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.targetRevenue && <p className="mt-1 text-sm text-red-600">{errors.targetRevenue}</p>}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="leadsPerMonth" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Leads per Month
                </label>
                <input
                  type="number"
                  id="leadsPerMonth"
                  min="0"
                  max="500"
                  value={businessData.leadsPerMonth}
                  onChange={(e) => handleBusinessChange('leadsPerMonth', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent border-gray-300"
                  placeholder="25"
                />
                <p className="mt-1 text-xs text-gray-500">Approximate inquiries per month</p>
              </div>
              
              <div>
                <label htmlFor="newStudentsPerMonth" className="block text-sm font-medium text-gray-700 mb-2">
                  New Students per Month
                </label>
                <input
                  type="number"
                  id="newStudentsPerMonth"
                  min="0"
                  max="100"
                  value={businessData.newStudentsPerMonth}
                  onChange={(e) => handleBusinessChange('newStudentsPerMonth', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent border-gray-300"
                  placeholder="8"
                />
                <p className="mt-1 text-xs text-gray-500">New student enrollments per month</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Which services are you most interested in? (Optional)
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {serviceOptions.map(service => (
                  <label key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={businessData.desiredServices.includes(service)}
                      onChange={(e) => handleServiceChange(service, e.target.checked)}
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-2 bg-accent hover:bg-accent-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50"
              >
                {loading ? 'Finding Your Package...' : 'Get My Recommendation →'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PricingEstimator;