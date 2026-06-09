import React, { useEffect, useState } from 'react'
import service from '../Appwrite/services'
import { Link } from 'react-router-dom'

function PostCard({$id , title , image, capturedimage }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const imageId = capturedimage || image;

  useEffect(() => {
    let active = true;

    if (imageId) {
      service.getFileView(imageId)
        .then((url) => {
          if (active) setPreviewUrl(url);
        })
        .catch((error) => {
          console.error('Failed to load card image preview', error);
        });
    } else {
      setPreviewUrl(null);
    }

    return () => {
      active = false;
    };
  }, [imageId]);

  return (
   <Link to={ `/post/${$id}` }> 
   
      <div className='w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 border border-purple-500/30 group overflow-hidden'>
            <div className='w-full aspect-video flex items-center justify-center mb-4 relative overflow-hidden rounded-xl bg-slate-950/60'>
                {previewUrl ? (
                  <img src={previewUrl} alt={title}
                    className='rounded-xl w-full h-full object-contain group-hover:scale-105 transition-transform duration-500' />
                ) : null}

            </div>

            
            <h2
            className='text-lg font-bold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2'
            >{title}</h2>
        </div>
   
   
    </Link>
  )
}

export default PostCard
