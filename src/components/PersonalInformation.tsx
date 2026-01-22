import React from 'react';
import type { PersonalInfo } from '../types/form.types';

interface PersonalInformationProps {
  data: PersonalInfo;
  onChange: (data: Partial<PersonalInfo>) => void;
  errors?: Record<string, string>;
}

export const PersonalInformation: React.FC<PersonalInformationProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <span className="section-icon">👤</span>
        <h2>Personal Information</h2>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            value={data.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            value={data.fullName}
            onChange={handleInputChange}
            className={errors.fullName ? 'error' : ''}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="company">
            Company/Individual Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Company or Individual Name"
            value={data.company || ''}
            onChange={handleInputChange}
            className={errors.company ? 'error' : ''}
          />
          {errors.company && <span className="error-message">{errors.company}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">
            Phone Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="+254 XXX XXX XXX"
            value={data.phoneNumber}
            onChange={handleInputChange}
            className={errors.phoneNumber ? 'error' : ''}
          />
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>
      </div>
    </div>
  );
};