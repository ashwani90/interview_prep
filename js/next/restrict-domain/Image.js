// components/Image.js
import NextImage from 'next/image';
import { isValidImageDomain } from '../lib/image-validation';

export default function Image({ src, alt, ...props }) {
  // Validate the image source
  const validation = isValidImageDomain(src);
  
  if (!validation.isValid) {
    console.warn('Invalid image domain:', src);
    
    // Fallback to a placeholder image or error message
    return (
      <div className="image-error">
        <div className="image-placeholder">
          <span>Invalid image domain</span>
        </div>
        {alt && <span className="image-alt">{alt}</span>}
      </div>
    );
  }

  return <NextImage src={src} alt={alt} {...props} />;
}