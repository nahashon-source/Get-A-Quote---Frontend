import React, { useState } from 'react';
import axios from 'axios';
import { PersonalInformation } from './PersonalInformation';
import { ServiceRequirements } from './ServiceRequirements';
import { CargoInformation } from './CargoInformation';
import type { FreightQuoteFormData } from '../types/form.types';
import { freightQuoteFormSchema } from '../utils/validation';
import { API_BASE_URL } from '../config/constants';

export const FreightQuoteForm: React.FC = () => {
  const [formData, setFormData] = useState<FreightQuoteFormData>({
    personal: {
      fullName: '',
      email: '',
      phoneNumber: '',
      company: '',
    },
    service: {
      serviceType: '',
      origin: '',
      destination: '',
      weightKg: '',
      volumeCbm: '',
      commodityType: '',
      containerType: '',
      specialHandling: '',
    },
    cargo: {
      cargoDescription: '',
      weight: '',
      packagingType: '',
      cargoValue: '',
      currency: 'USD',
      urgencyLevel: 'standard',
      specialRequirements: '',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handlePersonalChange = (data: Partial<typeof formData.personal>) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...data },
    }));
    // Clear errors for changed fields
    const fieldKeys = Object.keys(data);
    setErrors((prev) => {
      const newErrors = { ...prev };
      fieldKeys.forEach((key) => delete newErrors[`personal.${key}`]);
      return newErrors;
    });
  };

  const handleServiceChange = (data: Partial<typeof formData.service>) => {
    setFormData((prev) => ({
      ...prev,
      service: { ...prev.service, ...data },
    }));
    // Clear errors for changed fields
    const fieldKeys = Object.keys(data);
    setErrors((prev) => {
      const newErrors = { ...prev };
      fieldKeys.forEach((key) => delete newErrors[`service.${key}`]);
      return newErrors;
    });
  };

  const handleCargoChange = (data: Partial<typeof formData.cargo>) => {
    setFormData((prev) => ({
      ...prev,
      cargo: { ...prev.cargo, ...data },
    }));
    // Clear errors for changed fields
    const fieldKeys = Object.keys(data);
    setErrors((prev) => {
      const newErrors = { ...prev };
      fieldKeys.forEach((key) => delete newErrors[`cargo.${key}`]);
      return newErrors;
    });
  };

  const validateForm = (): boolean => {
    try {
      freightQuoteFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const validationErrors: Record<string, string> = {};
      
      if (error.errors) {
        error.errors.forEach((err: any) => {
          const path = err.path.join('.');
          validationErrors[path] = err.message;
        });
      }
      
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fix the errors in the form before submitting.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await axios.post(`${API_BASE_URL}/quote/submit`, formData);
      
      setSubmitStatus({
        type: 'success',
        message: response.data.message || 'Quote request submitted successfully! We\'ll respond within 24 hours.',
      });

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          personal: {
            fullName: '',
            email: '',
            phoneNumber: '',
            company: '',
          },
          service: {
            serviceType: '',
            origin: '',
            destination: '',
            weightKg: '',
            volumeCbm: '',
            commodityType: '',
            containerType: '',
            specialHandling: '',
          },
          cargo: {
            cargoDescription: '',
            weight: '',
            packagingType: '',
            cargoValue: '',
            currency: 'USD',
            urgencyLevel: 'standard',
            specialRequirements: '',
          },
        });
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error: any) {
      console.error('Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to submit quote request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="freight-quote-container">
      <div className="form-header">
        <span className="header-icon">📦</span>
        <h1>Request a Freight Quote</h1>
        <p>Tell us about your shipment. We'll respond within 24 hours.</p>
      </div>

      <form onSubmit={handleSubmit} className="freight-quote-form">
        <PersonalInformation
          data={formData.personal}
          onChange={handlePersonalChange}
          errors={errors}
        />

        <p className="info-text">
          All pricing estimates should include advisement about the variables based on current market conditions.
        </p>

        <ServiceRequirements
          data={formData.service}
          onChange={handleServiceChange}
          errors={errors}
        />

        <CargoInformation
          data={formData.cargo}
          onChange={handleCargoChange}
          errors={errors}
        />

        {submitStatus.type && (
          <div className={`alert alert-${submitStatus.type}`}>
            {submitStatus.type === 'success' ? '✅' : '❌'} {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            <>
              <span>🚀</span>
              Submit Quote Request
            </>
          )}
        </button>

        <p className="submit-note">
          Submission disabled until service is ready.
        </p>
      </form>
    </div>
  );
};