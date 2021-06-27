import React, { FC } from 'react'
import ImageUploader from 'react-images-upload'

interface ImagePickerProps {
    imageCallback: (image: string) => void
}

const ImagePicker: FC<ImagePickerProps> = (
    imagePickerProps: ImagePickerProps
) => {
    const getImageDataUrl = async (image: File): Promise<string> => {
        const rawBuffer = await image.arrayBuffer()
        const imageData = new Uint8Array(rawBuffer)
        const imageDataAsChars = imageData.reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
        )
        const base64String = btoa(imageDataAsChars)

        return `data:image/png;base64,${base64String}`
    }

    const onSelectImage = async (files: File[]) => {
        const file = files[0]
        const imageDataUrl = await getImageDataUrl(file)
        imagePickerProps.imageCallback(imageDataUrl)
    }

    return (
        <ImageUploader
            withIcon={false}
            buttonText={'Select Image'}
            onChange={(images) => onSelectImage(images)}
            singleImage={true}
            withLabel={false}
        />
    )
}

export default ImagePicker
