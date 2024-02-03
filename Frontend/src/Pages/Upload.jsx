// Upload
import axios from "axios";
import { useState,useRef } from "react";
import React from "react";
import { Route, Redirect } from 'react-router-dom';
import "./Upload.css";
import NavBar from "../Components/NavBar";
import SearchBar from '../Components/SearchBar';
import { ReactComponent as WhitePlus } from "../Icons/WhitePlus.svg";
import { ReactComponent as Logo2 } from "../Icons/Logo2.svg";
import myImage from '../Icons/Object.png'
import FileListItem from "../Components/FileListItem";
import pdfimg from '../Icons/Pdf.svg'
import LoadingBar from "../Components/loadingBar";
import { ReactComponent as MyIcon }  from '../Icons/Vector.svg';
import {ReactComponent as Cross} from '../Icons/Cross.svg'
import done from '../Icons/done.png'

const Upload = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [droppedFiles, setDroppedFiles] = useState([]);
    const [redirectTo404, setRedirectTo404] = useState(false);
    const handleWhitePlusClick = async (search) => {
      setLoading(true);
      
      try {
        const formData = new FormData();
        if (droppedFiles.length === 0 && !search) {
          setError("No files to upload please drop files or enter url");
          return;
        }
        droppedFiles.forEach((file) => {
          formData.append("files", file);
        });
        if (search) {
          formData.append("url", search);
        }
        // Make a POST request to the Django endpoint
        const response = await axios.post(
          "http://127.0.0.1:8000/Upload/pdff/",
          formData
        );
        if (response.status === 404) {
          // Redirect to the 404 error page
          setRedirectTo404(true);
        } else {
          console.log(response.data);
          setSuccess(true);
          setDroppedFiles([]);
        } // Handle the response as needed
      } catch (error) {
        console.error("Error uploading files:", error);
        setError("Error during upload"); // Handle the error response as needed
      } finally {
        setLoading(false);
      }

  };
   const handleCrossClick =(e)=>{ 
    setError(null);
    setSuccess(false);
   };
    const handleDragStart = (e) => {
      e.dataTransfer.setData('text/plain', ''); // Required for Firefox to enable dragging
    };
  
      
      const handleDelete = (name) => {
        // Filter out the file with the specified name
        const updatedFiles = droppedFiles.filter(file => file.name !== name);
      
        // Update the state with the new array of files
        setDroppedFiles(updatedFiles);
      };
      const handleDrop = (e) => {
        e.preventDefault();
    
        const files = e.dataTransfer.files;
    
        // Filter out non-PDF files
        const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf');
    
        if (pdfFiles.length > 0) {
          console.log('Dropped PDF files:', pdfFiles);
    
          // Update the state with the dropped PDF files
          setDroppedFiles(prevFiles => [...prevFiles, ...pdfFiles]);
    
          // Handle the dropped PDF files as needed
          // For example, you can upload the files to a server or perform other operations
        } else {
          console.log('No PDF files dropped.');
        }
      };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
    const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    // Trigger the click event of the file input
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    // Handle the selected file
    const files = e.target.files;
    const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length > 0) {
      console.log('Dropped PDF files:', pdfFiles);

      // Update the state with the dropped PDF files
      setDroppedFiles(prevFiles => [...prevFiles, ...pdfFiles]);

      // Handle the dropped PDF files as needed
      // For example, you can upload the files to a server or perform other operations
    } else {
      console.log('No PDF files dropped.');
    }
  };
  const handleContinuer =()=>{
    setSuccess(false);
  }

  return (
    <div>
     {redirectTo404 && <Redirect to="/404" />}
      <NavBar />
      <div className="SearchContainer">
        <Logo2 className="Logo2" />
        {/* Pass handleAddClick as a callback to the SearchBar component */}
        <SearchBar label={"Enter URL"} onSearch={handleWhitePlusClick} icon={<WhitePlus />} />
      </div>
      <div className="parent"  
      draggable="true"
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver} >
      <svg width="40.5vw" height="40.5vh" viewBox="0 0 40.5vw 40.5vh" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="40vw" height="40vh" rx="8.5" stroke="#595959" stroke-dasharray="24 24"/>
      </svg>
      {droppedFiles.length==0  && (<img className="image" src={myImage}/>)}
      {droppedFiles.length>0 && (
        <>
         <img className="image" src={pdfimg}/>
         <div className="counting">
          <span>{droppedFiles.length}</span>
         </div>
        </>
      
      )}
      <p className="phrase">Drag and Drop or <a className="link" onClick={handleFileInputClick}>
        click
      </a>
    
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      /> to browse files</p>
      </div>
      
      {droppedFiles.length > 0 && (
        <div className="dropped-files-list">
          <ul>
            {droppedFiles.map((file, index) => (
              <FileListItem className='item' handleDelete={handleDelete} key={index} filename={file.name} ></FileListItem>
            ))}
          </ul>
        </div>
      )}
      {(loading || success|| error) && 
      <>
      <div className="bg"></div>
      <div className={`overlayContainer ${success ? "success" : error ? "error" : ""}`}>
      {loading && !success && !error &&
      <>
        <div className="loadingbaroverlay">
        <LoadingBar/></div>
        <div className="overlay">Loading...</div>
      </>
      }
      {error && <div className="erorUpload">
      <Cross onClick={handleCrossClick} className="cross"/>  
      {error}</div>}
      {success && (
        <>
          {/* Add your success overlay content here */}
          <div className="overlay success">
          <img src={done} className="done"/>
          <p>Success!</p></div>
          <MyIcon onClick={handleContinuer} className="contin"/>
        </>
      )}
      </div>
      </>
      }
    </div>
  );
};

export default Upload;

