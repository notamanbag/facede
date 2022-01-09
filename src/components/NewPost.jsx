import React from 'react'
import { useEffect, useRef,useState } from 'react';
import * as faceapi from  'face-api.js'


function NewPost({image}) {
    const {url,width,height} = image
    const [faces,setFaces] = useState([])
    const [friends,setFriends] = useState([])
    const [age,setAge] = useState(0)
    const [gender ,setGender] = useState("M/F")

    const imageRef = useRef()
  const canvasRef = useRef()
  const handleImage = async ()=>{
    const detection  = await faceapi.detectAllFaces(imageRef.current,new faceapi.TinyFaceDetectorOptions()).withAgeAndGender()
    //.withFaceLandmarks().withFaceExpressions()
    console.log(detection); //here we are getting values of all the vaaible expression through which we can calculate the mas value o and get the correspinding expression
    // canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imageRef.current)
    // faceapi.matchDimensions(canvasRef.current,{
    //   "width":"940",
    //   "height":"650"
    // })
   
    //faceapi.draw.drawFaceExpressions(canvasRef.current,resizedFaceAPi)
    //faceapi.draw.drawFaceLandmarks(canvasRef.current,resizedFaceAPi)
    setFaces(detection.map(d=>Object.values(d.detection.box)))
    setGender(detection.map(d=>d.gender))
    
  }
  console.log(gender);
  const drawDetected = ()=>{
      const ctx = canvasRef.current.getContext("2d");
      ctx.linewidth = 5;
      faces.map(face=>ctx.strokeRect(...face))
  }
  
  
  useEffect(()=>{
    const loadModels = async  ()=>{
      
      
        const tfd = await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        const fl = await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        const fr = await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        const fe = await faceapi.nets.faceExpressionNet.loadFromUri("/models");
        const ag = await faceapi.nets.ageGenderNet.loadFromUri("/models")
       handleImage()

    }
    imageRef && loadModels();
  },[])
  const addFriend = (e) => {
    setFriends((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(friends);
    return (
        <div className='container' >
            <div className='left' style={{width,height}}>
                <img src={url} ref={imageRef} height={height} crossOrigin="anonymous" />
                <canvas onMouseEnter={drawDetected} ref={canvasRef} width={width} height={height} className='canvas'/>
                {faces.map((face,id)=>(
                    <input 
                    name={`input${id}`}
                    style={{left:face[0],top:face[1]+face[3]+5}}
                     placeholder="Tag you friend" 
                     key={id} className='friendInput'
                     onChange={addFriend}    
                     />))}
            </div>
            <div className='right'>
                <h1>Share your post</h1>
                <input
                    type="text"
                    placeholder='Whats on your mind'
                    className='rightInput'
                />
                <button className='rightButton'>Send</button>
            </div>
        </div>
    )
}

export default NewPost
