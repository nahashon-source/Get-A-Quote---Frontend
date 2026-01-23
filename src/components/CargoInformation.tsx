import React from 'react';
import type { CargoInformation as CargoInfo } from '../types/form.types';

interface CargoInformationProps {
  data: CargoInfo;
  onChange: (data: Partial<CargoInfo>) => void;
  errors?: Record<string, string>;
}

export const CargoInformation: React.FC<CargoInformationProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <span className="section-icon">📦</span>
        <h2>Cargo Information</h2>
      </div>

      <div className="form-group">
        <label htmlFor="cargoDescription">
          Cargo Description <span className="required">*</span>
        </label>
        <textarea
          id="cargoDescription"
          name="cargoDescription"
          placeholder="Describe your cargo: type, quantity, packaging..."
          value={data.cargoDescription}
          onChange={handleInputChange}
          rows={4}
          className={errors.cargoDescription ? 'error' : ''}
        />
        {errors.cargoDescription && (
          <span className="error-message">{errors.cargoDescription}</span>
        )}
      </div>
    </div>
  );
};