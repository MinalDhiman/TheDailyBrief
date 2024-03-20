import React, { useEffect, useState } from "react";
import Card from "./Card";
import Spinner from "./Spinner";
import axios from "axios";
const NewsCard = (props) => {
    const [articles, setArticles] = useState([]);
   const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState({cat:props.category});
    
    const capitalize=(string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
 
async function fetchNews() {
  setLoading(true);

  try {
    const response = await axios.post("http://localhost:8080/api", JSON.stringify(category), {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;
    const parsedData = data.articles;
    console.log(data.articles);
    setArticles(parsedData);
    setLoading(false);
  } catch (error) {
    console.log("Error while fetching the data", error);

    if(error.response && error.response.data.message=="Unauthorized"){
      window.location.href = '/';
    }
  }
}


    useEffect(() => {
      document.title= `${capitalize(props.category)}  -  TheDailyBrief`;
    fetchNews();
    console.log("i fired once")
    }, [])
    
  return (
    <>
    <h2 className="text-center " style={{margin:"30px 0px"}}>TheDailyBrief - Top {capitalize(props.category)} headlines</h2>
    {loading && <Spinner/>}
    <div className="container">
    
      <div className="row my-3 ">
      { articles.map((element,index) => {
              return (
                <div className="col-md-4 my-2" key={index}>
                  <Card title={element.title} description={element.description} imageSrc={element.urlToImage} url={element.url} source={element.source.name} date={element.publishedAt} author={element.author} element={element}/>
                </div>
              );
            })}  
      </div>
    </div>
    </>
  );
};

export default NewsCard;
