import React, { useState } from 'react'
import './App.css'
import ImagePicker from './Components/ImagePicker'
import ImageEditor from './Components/ImageEditor'
import ImagePreview from './Components/ImagePreview'


const App = (): JSX.Element => {
    const [image, setImage] = useState<string | null>(null)

    return (
        <div>
            <ImagePicker imageCallback={(newImage) => setImage(newImage)} />
            { image === null 
            ? 
                null 
            : 
                <div>
                    <ImagePreview image={image} />
                    <ImageEditor image={image} imageEditCallback={(newImage) => setImage(newImage)}/>
                </div> 
            }
        </div>
    );
}

export default App
