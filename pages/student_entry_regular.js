import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Webcam from "react-webcam";
import axios from "axios";
import { toast } from "react-toastify";

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpeg' }); // Change the type as needed
}

export default function StudentEntry(){
  const router = useRouter();

  const webcamRef = React.useRef(null);
  var intervalId;

  const capture = React.useCallback(() => {
    const imageb64 = webcamRef.current.getScreenshot();
    const formData = new FormData();
    formData.append('file', dataURItoBlob(imageb64)); // Convert base64 to blob

    // Use Axios or another HTTP library to send the request
    axios.post('http://localhost:5000/scan', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      if(response.data.length == 11){ // Our Entry Number
        document.getElementById("status").innerText = "Updating Entry"
        clearInterval(intervalId);
        const entry_number = String(response.data) 
        console.log(entry_number)
        axios.post("http://localhost:5000/regular_entry", {entry_number:entry_number})
          .then(resp=>{
            toast.success(resp.data, {
              theme: "dark"
            })
            setTimeout(()=>router.push("/"), 2000);
          })
      }else{
        document.getElementById("status").innerText = response.data
      }
    })
    .catch(error => {
      // Handle errors
      console.log(error);
    });
  }, [webcamRef]);

  useEffect(()=>{
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(capture, 5000);
  }, []);

  return (
    <main>
      <Head>
        <title>Student Entry | EZFlow</title>
      </Head>
      <header className="w-full p-4 h-full flex justify-center items-center relative" style={{height:"100vh"}}>
        <div className="flex-1 p-8">
          <h1 className="text-5xl font-bold my-4">Scan the Barcode on your ID Card</h1>
          <h2 className="font-fine text-xl flex items-center">
            <span id="status" className="mr-4">We can't find a Barcode</span>
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg> 
          </h2>
          <h2 className="font-fine text-xl mt-10"><span className="hover:underline cursor-pointer" onClick={()=>{
            router.push("/")
            clearInterval(intervalId);
          }}>&lt; Go Back</span></h2>
        </div>
        <div className="flex-1 p-8">
          <Webcam 
            className="w-full h-full m-4 rounded-lg" 
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
        </div>
      </header>
    </main>
  )
}