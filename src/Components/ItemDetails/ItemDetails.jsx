import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'

export default function ItemDetails() {
    let {id,media_type}=useParams();
    const [itemDetails, setitemDetails] = useState({})

   async function getItemDetails()
    {
        let {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=aa15a4edd81fdb1bc0dd3822b4f36c7e&language=en-US`) 
        setitemDetails(data);
    }
    useEffect(()=>{
        getItemDetails(id,media_type)
    },[])
  return <>
     <Helmet>
                <meta charSet="utf-8" />
             {itemDetails.title?<title>{itemDetails.title}</title>:<title>{itemDetails.name}</title>}   
                
            </Helmet>
    <div className="row">

    <div className="col-md-3">
    {itemDetails.poster_path?<img src={'https://image.tmdb.org/t/p/w500'+itemDetails.poster_path} className='w-100' alt="" />:<img src={'https://image.tmdb.org/t/p/w500'+itemDetails.profile_path} className='w-100' alt="" />}
    </div>
    <div className="col-md-9">
    <h2>{itemDetails.title}{itemDetails.name}</h2>
    {itemDetails.place_of_birth?<p className='text-muted'>{itemDetails.place_of_birth}</p>:''}
    <h5 className='py-2 text-muted'>{itemDetails.tagline}</h5>
  {itemDetails.vote_average?<h6 className='py-2'> Vote Average:{itemDetails.vote_average && <span className=" p-2 text-muted ">{itemDetails.vote_average?.toFixed(1)}</span>}</h6>:''}
  {itemDetails.vote_count? <h6 className='py-2'> Vote Count: {itemDetails.vote_count && <span className=" p-2 text-muted ">{itemDetails.vote_count?.toFixed(1)}</span>}</h6>:''}
  {itemDetails.birthday? <h6 className='py-2'>Birth date: {itemDetails.birthday && <span className=" p-2 text-muted ">{itemDetails.birthday}</span>}</h6>:''}

  <h6 className='py-2'> Popularity: {itemDetails.popularity && <span className=" p-2 text-muted ">{itemDetails.popularity?.toFixed(3)}</span>}</h6>
  <h6 className='py-2'> Known for: {itemDetails.known_for_department && <span className=" p-2 text-muted ">{itemDetails.known_for_department}</span>}</h6>
  {itemDetails.release_date?  <h6 className='py-2'> Release Date: {itemDetails.release_date && <span className=" p-2 text-muted ">{itemDetails.release_date}</span>}</h6>:''}
  {itemDetails.biography?  <h6 className='py-2'> Biography: {itemDetails.biography && <span className=" p-2 text-muted ">{itemDetails.biography}</span>}</h6>:''}
  <p className='py-2 tex    t-muted'>{itemDetails.overview}</p>
    </div>

    </div>



    </>
  
}
