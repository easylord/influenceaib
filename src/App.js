import React, { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [selectedImages, setSelectedImages] = useState([])
  const [data, setData] = useState({
    name: '',
    price: '',
    description: '',
    brand: '',
    condition: '',
  })

  const url = 'https://aib-shop.up.railway.app/ad/products/'

  const submitData = async (e) => {
    e.preventDefault()
    console.log(selectedImages)

    const formData = new FormData()
    for (let img of selectedImages) {
      formData.append('uploaded_images', img)
    }
    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('description', data.description)
    formData.append('brand', data.brand)
    formData.append('condition', data.condition)
    formData.append('subCategory', data.subCategory)

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
        //navigate('/addProducts')
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  const handle = (e) => {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
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
            name='uploaded_images'
            multiple
            id='uploaded_images'
            onChange={onSelectFile}
            accept='image/*'
          />
        </div>
        <div className='form1'>
          <div className='input'>
            <p>Name</p>
            <input
              type='text'
              id='name'
              value={data.name}
              onChange={handle}
              //required
            />
          </div>
          <div className='input'>
            <p>Price</p>
            <input
              type='text'
              id='price'
              value={data.price}
              onChange={handle}
              //required
            />
          </div>
          <div className='description'>
            <p>description</p>
            <textarea
              id='description'
              type='text'
              value={data.description}
              onChange={handle}
              placeholder='**Additional Description'
            ></textarea>
          </div>
        </div>
        <div className='formDescription'>
          <div className='div-flex'>
            <div className='box1'>
              <p>Brand</p>
              <input
                type='text'
                id='brand'
                value={data.brand}
                onChange={handle}
                required
              />
            </div>
            <div className='box2'>
              <p>Condition</p>
              <input
                type='text'
                id='condition'
                value={data.condition}
                onChange={handle}
                required
              />
            </div>
          </div>
          <button type='submit'>SUBMIT</button>
        </div>
      </form>
    </div>
  )
}

export default App
