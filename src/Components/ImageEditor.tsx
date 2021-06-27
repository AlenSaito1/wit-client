import React, { FC, useState } from 'react'
import Jimp from 'jimp'
import axios from 'axios'
import label from '../assets/images/label.png'

interface ImageEditorProps {
    image: string
    imageEditCallback: (imageData: string) => void
}

const ImageEditor: FC<ImageEditorProps> = (
    imageEditorProps: ImageEditorProps
) => {
    const [loading, setLoading] = useState(false)

    const fetchAndFormatData = async (image: string) => {
        const { data } = await axios.post<IImageDetect>('https://wit-server.herokuapp.com/api/detect',{
            image
        })

        if (data.error) return { result: [] }
        if (data.result.length === 0) return { result: [] }
        return data
    }
    const placeMarkers = async (imageSource: string, data: IImageDetect) => {
        setLoading(true)
        const bg = await Jimp.read(imageSource)
        const marker = await Jimp.read(label)
        marker.resize(20, 20)
        data.result.forEach((object) => bg.composite(marker, object.bbox[0], object.bbox[1]))
        const final = await bg.getBase64Async(Jimp.MIME_PNG)
        imageEditorProps.imageEditCallback(final)
        setLoading(false)
    }

    const editImage = async (image: string) => {
        const data = await fetchAndFormatData(image)
        await placeMarkers(image, data)
    }

    return (
        <div>
            <p>
                Well....
            </p>

            {loading ? (
                <p>loading...</p>
            ) : (
                <button
                    onClick={async () =>
                        editImage(imageEditorProps.image)
                    }
                >
                    Detect
                </button>
            )}
        </div>
    )
}

interface IImageDetect {
   result: {
       bbox: number[]
       class: string
   }[]
   error?: string
}

export default ImageEditor
