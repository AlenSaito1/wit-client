import React, { FC } from 'react';

interface ImagePreviewProps {
    image: string;
}

const ImagePreview:FC<ImagePreviewProps> = (imagePreviewProps: ImagePreviewProps) => {
    return (
            <img src={imagePreviewProps.image} alt={"Preview"} />
    );
};

export default ImagePreview;