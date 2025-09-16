// components/ImageUpload.js
import { useState } from 'react';
import { isValidImageDomain } from '../lib/image-validation';

export default function ImageUpload({ onImageSelect }) {
  const [imageUrl, setImageUrl] = useState('');
  const [validation, setValidation] = useState(null);

  const validateUrl = (url) => {
    const result = isValidImageDomain(url);
    setValidation(result);
    return result.isValid;
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    
    if (url) {
      validateUrl(url);
    } else {
      setValidation(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateUrl(imageUrl)) {
      onImageSelect(imageUrl);
      setImageUrl('');
      setValidation(null);
    }
  };

  return (
    <div className="image-upload">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="image-url" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="image-url"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        
        {validation && (
          <div className={`p-3 rounded-md ${
            validation.isValid ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {validation.reason}
            {!validation.isValid && validation.allowedDomains && (
              <div className="mt-2 text-sm">
                Allowed domains: {validation.allowedDomains.join(', ')}
              </div>
            )}
          </div>
        )}
        
        <button
          type="submit"
          disabled={!validation?.isValid}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Image
        </button>
      </form>
    </div>
  );
}