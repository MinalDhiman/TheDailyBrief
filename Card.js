import React from 'react'
import img from "./b1ce9e30-a557-11ee-93ef-548539c07ccf.jpeg"
const Card = (props) => {
  let {title,description,imageSrc,url,date,author,source,element}=props;
  
  const handleSave=async()=>{
    console.log(element);
  }
  return (
    <div className="card" >
            <div style={{display:'flex',
            justifyContent:'flex-end',
            right:'0',
            position:'absolute',
            borderRadius:'10px',
              backgroundColor:"#212529"}}>
            <span className=" badge rounded-pill " >{source}
  </span></div>
          <img src= {imageSrc?imageSrc:img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <hr/>
            <p className="card-text"><small >By <b>{!author?"Unknown":author}</b> on <b>{new Date(date).toGMTString()}</b></small></p>
            <a href={url} target="_blank"  rel="noreferrer" className="btn btn-sm btn-dark">
              Read more
            </a>.
            <div className="btn btn-sm btn-dark" onClick={handleSave}>Save</div>
          </div>
        </div>
  )
}

export default Card
