import React, {useState,  useRef, useImperativeHandle } from 'react'


const SideEditor = (props, ref) => {
    const [fileUrl, setFileUrl] = useState(null);
    const [name, setName] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [objectFile, setObjectFile] = useState(null);


  
    const handleProductNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      props.onFileUpload(file);
      setObjectFile(file);
    };
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setFileUrl(url);
        setProductImage(file);
      } else {
        setFileUrl(null);
        setProductImage(null);
      }
    };

    
  
    
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        const obj = {
          hello: "world"
        };
        const json = JSON.stringify({
          name: name || "",
          category: "Footwear Try-on"
        });
        const blob = new Blob([json], {
          type: 'application/json'
        });
        const mainData = new FormData();
        mainData.append(blob);
        mainData.append('glb', objectFile);
        mainData.append('image', productImage);
        const response = await fetch('https://verve-ar-backend.vercel.app/api/v1/products/add',{
          method: 'post',
          body: mainData,
        })
    
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
    
        const data = await response.json();
      } catch (error) {
        console.error(error);
      }
    };
    
      
      
  
    return (
      <>
        <main>
          <form onSubmit={handleSubmit}>
            <div className="sideeditor">
              <h4>Product Info</h4>
              <input
                type="text"
                placeholder="Balcony Chair"
                value={name}
                onChange={handleProductNameChange}
              />
  
              <div className="productimage">
                <img className="product-img" src={fileUrl} alt="" />
                <div className="replace">
                  {/* <img src={exclamation} alt="" /> */}
                  replace me
                </div>
                <div className="divide">
                  <input type="file" onChange={handleImageChange} />
                </div>
              </div>
            </div>
  
            <div className="sideeditor-two">
              <h4>Object</h4>
  
              <div className="productimage">
                <h3>3D model</h3>
  
                <div className="divide">
                  <input  type="file" onChange={handleFileChange} />
                </div>
  
                <div className="replace">
                  {/* <img src={exclamation} alt="" /> */}
                  replace me
                </div>
              </div>
            </div>
  
            <button className="publish" type="submit">
              {/* <img src={cloud} alt="" /> */}
              Publish to your website
            </button>
          </form>
          
        </main>
      </>
    );
  };
  
  export default SideEditor;
  