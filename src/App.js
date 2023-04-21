import React, { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [selectedImages, setSelectedImages] = useState([])

  const url = 'https://aib-shop.up.railway.app/ad/products/8/images/'

  const submitData = async (e) => {
    e.preventDefault()
    console.log(selectedImages)

    const formData = new FormData()
    for (let img of selectedImages) {
      formData.append('image', img)
    }

    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.status, res.data)
        if (res.status === 400) {
          console.log(res.data)
        }
        alert('successful')
      })
      .catch((error) => {
        console.log(error.response)
      })
  }
  
  const onSelectFile = async (e) => {
    setSelectedImages(e.target.files)
  }

  return (
    <div className='App'>
      <form onSubmit={submitData} className='product-attributes'>
        <div className='file-input'>
          <input
            type='file'
            name='image'
            multiple
            id='image'
            onChange={onSelectFile}
            accept='image/*'
          />
        </div>
        <div className='formDescription'>
          <button type='submit'>SUBMIT</button>
        </div>
      </form>
    </div>
  )
}

export default App
