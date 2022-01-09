
import { useEffect, useRef, useState } from 'react';
import * as faceapi from  'face-api.js'
import './App.css';
import Navbar from './components/Navbar';
import NewPost from './components/NewPost';

function App() {
  
  const [file,setFile] = useState()
  const [img,setImg] = useState()
  useEffect(()=>{
    const getImg = ()=>{
      const img = new Image();
      img.src = URL.createObjectURL(file) // stan alone this doesnt load the img so we use onload
      img.onload =()=>{
        setImg(
          { 
            url:img.src,
            width:img.width,
            height:img.height
          }
  
        )
      } 
      

    }
    file && getImg(); //using this we do not what are the dimenison of images being uploaded 
  },[file])
  console.log(img);
  return (
    
    <div >
      <Navbar/>
      {img ? <NewPost image={img}/>:(
      <div className='newPostCard'>
        <div className='addPost'>
        <img
              src="https://images.pexels.com/photos/9371782/pexels-photo-9371782.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
            <div className="postForm">
              <input
                type="text"
                placeholder="What's on your mind?"
                className="postInput"
              />
              <label htmlFor="file">
                <img
                  className="addImg"
                  src="https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png"
                  alt=""
                />
                <img
                  className="addImg"
                  src="https://icon-library.com/images/maps-icon-png/maps-icon-png-5.jpg"
                  alt=""
                />
                <img
                  className="addImg"
                  src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84451/preview.svg"
                  alt=""
                />
                <button>Send</button>
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                id="file"
                style={{ display: "none" }}
                type="file"
              />
            </div>
        </div>

      </div>
      )}

    </div>
  );
}

export default App;
