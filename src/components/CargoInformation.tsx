import React from 'react';
import type { CargoInformation as CargoInfo } from '../types/form.types';
import { PACKAGING_TYPES, CURRENCIES, URGENCY_LEVELS } from '../config/constants';

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

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="weight">
            Weight (kg) <span className="required">*</span>
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            placeholder="Total weight"
            value={data.weight}
            onChange={handleInputChange}
            min="0"
            step="0.1"
            className={errors.weight ? 'error' : ''}
          />
          {errors.weight && <span className="error-message">{errors.weight}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="packagingType">
            Packaging Type <span className="required">*</span>
          </label>
          <select
            id="packagingType"
            name="packagingType"
            value={data.packagingType}
            onChange={handleInputChange}
            className={errors.packagingType ? 'error' : ''}
          >
            {PACKAGING_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.packagingType && <span className="error-message">{errors.packagingType}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cargoValue">
            Cargo Value <span className="required">*</span>
          </label>
          <input
            type="number"
            id="cargoValue"
            name="cargoValue"
            placeholder="10000"
            value={data.cargoValue}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className={errors.cargoValue ? 'error' : ''}
          />
          {errors.cargoValue && <span className="error-message">{errors.cargoValue}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="currency">
            Currency <span className="required">*</span>
          </label>
          <select
            id="currency"
            name="currency"
            value={data.currency}
            onChange={handleInputChange}
            className={errors.currency ? 'error' : ''}
          >
            {CURRENCIES.map((curr) => (
              <option key={curr.value} value={curr.value}>
                {curr.label}
              </option>
            ))}
          </select>
          {errors.currency && <span className="error-message">{errors.currency}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="urgencyLevel">
          Urgency Level <span className="required">*</span>
        </label>
        <select
          id="urgencyLevel"
          name="urgencyLevel"
          value={data.urgencyLevel}
          onChange={handleInputChange}
          className={errors.urgencyLevel ? 'error' : ''}
        >
          {URGENCY_LEVELS.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
        {errors.urgencyLevel && <span className="error-message">{errors.urgencyLevel}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="specialRequirements">Special Requirements</label>
        <textarea
          id="specialRequirements"
          name="specialRequirements"
          placeholder="Handling instructions, temperature, insurance needs..."
          value={data.specialRequirements || ''}
          onChange={handleInputChange}
          rows={3}
        />
      </div>
    </div>
  );
};