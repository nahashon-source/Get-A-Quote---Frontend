import React, { useEffect, useState } from 'react';
import type { ServiceRequirements as ServiceReq } from '../types/form.types';
import { SERVICE_TYPES, COMMODITY_TYPES, CONTAINER_TYPES } from '../config/constants';

interface ServiceRequirementsProps {
  data: ServiceReq;
  onChange: (data: Partial<ServiceReq>) => void;
  errors?: Record<string, string>;
}

export const ServiceRequirements: React.FC<ServiceRequirementsProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const [chargeableWeight, setChargeableWeight] = useState<number>(0);

  // Calculate chargeable weight when weight or volume changes
  useEffect(() => {
    const weightKg = parseFloat(data.weightKg) || 0;
    const volumeCbm = parseFloat(data.volumeCbm) || 0;
    
    // Volumetric weight formula: CBM × 1000 ÷ 6 (for sea freight)
    // For air freight: CBM × 1000 ÷ 6 (or CBM × 167)
    const volumetricWeight = volumeCbm * 167; // Air freight standard
    
    if (data.serviceType === 'sea') {
      // Sea freight: CBM × 1000
      const seaVolumetricWeight = volumeCbm * 1000;
      setChargeableWeight(Math.max(weightKg, seaVolumetricWeight));
    } else {
      // Air/Road freight
      setChargeableWeight(Math.max(weightKg, volumetricWeight));
    }
  }, [data.weightKg, data.volumeCbm, data.serviceType]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <span className="section-icon">🚚</span>
        <h2>Service Requirements</h2>
      </div>

      <div className="form-group">
        <label htmlFor="serviceType">
          Service Type <span className="required">*</span>
        </label>
        <select
          id="serviceType"
          name="serviceType"
          value={data.serviceType}
          onChange={handleInputChange}
          className={errors.serviceType ? 'error' : ''}
        >
          {SERVICE_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.serviceType && <span className="error-message">{errors.serviceType}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="origin">
            Origin <span className="required">*</span>
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            placeholder="e.g., Nairobi, Kenya"
            value={data.origin}
            onChange={handleInputChange}
            className={errors.origin ? 'error' : ''}
          />
          {errors.origin && <span className="error-message">{errors.origin}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="destination">
            Destination <span className="required">*</span>
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder="e.g., Mombasa, Kenya"
            value={data.destination}
            onChange={handleInputChange}
            className={errors.destination ? 'error' : ''}
          />
          {errors.destination && <span className="error-message">{errors.destination}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="weightKg">
            Weight (kg) <span className="required">*</span>
          </label>
          <input
            type="number"
            id="weightKg"
            name="weightKg"
            placeholder="Enter weight in kilograms"
            value={data.weightKg || ''}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className={errors.weightKg ? 'error' : ''}
          />
          {errors.weightKg && <span className="error-message">{errors.weightKg}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="volumeCbm">
            Volume (CBM - Cubic Meters) <span className="required">*</span>
          </label>
          <input
            type="number"
            id="volumeCbm"
            name="volumeCbm"
            placeholder="Enter volume in cubic meters"
            value={data.volumeCbm || ''}
            onChange={handleInputChange}
            min="0"
            step="0.001"
            className={errors.volumeCbm ? 'error' : ''}
          />
          {errors.volumeCbm && <span className="error-message">{errors.volumeCbm}</span>}
        </div>
      </div>

      {chargeableWeight > 0 && (
        <div className="chargeable-weight-display">
          <div className="weight-info">
            <span className="label">📊 Chargeable Weight:</span>
            <span className="value">{chargeableWeight.toFixed(2)} kg</span>
          </div>
          <p className="weight-note">
            {chargeableWeight === parseFloat(data.weightKg) 
              ? 'Based on actual weight'
              : 'Based on volumetric weight (higher than actual weight)'}
          </p>
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="containerType">
            Container Type <span className="required">*</span>
          </label>
          <select
            id="containerType"
            name="containerType"
            value={data.containerType}
            onChange={handleInputChange}
            className={errors.containerType ? 'error' : ''}
          >
            {CONTAINER_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.containerType && <span className="error-message">{errors.containerType}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="commodityType">
            Commodity Type <span className="required">*</span>
          </label>
          <select
            id="commodityType"
            name="commodityType"
            value={data.commodityType}
            onChange={handleInputChange}
            className={errors.commodityType ? 'error' : ''}
          >
            {COMMODITY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.commodityType && <span className="error-message">{errors.commodityType}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="specialHandling">Special Handling Requirements</label>
        <textarea
          id="specialHandling"
          name="specialHandling"
          placeholder="Refrigeration, fragile, etc."
          value={data.specialHandling || ''}
          onChange={handleInputChange}
          rows={3}
        />
      </div>
    </div>
  );
};