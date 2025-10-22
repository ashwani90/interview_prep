import React, { useEffect, useState } from "react";
import ImageItem from "./ImageItem";
import Modal from "./Modal";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.unsplash.com/photos/random?count=20&client_id=YOUR_ACCESS_KEY"
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="gallery">
        {images.map((img) => (
          <ImageItem
            key={img.id}
            src={img.urls.small}
            alt={img.alt_description}
            onClick={() => setSelectedImage(img.urls.full)}
          />
        ))}
      </div>

      {selectedImage && (
        <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}
