import React, {useEffect, useState} from 'react'
import { Container } from '../Components'
import PostForm from '../Components/Post-Form/PostForm'
import { useNavigate,  useParams } from 'react-router-dom';
import Service from "../Appwrite/services"
function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            Service.getpost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost