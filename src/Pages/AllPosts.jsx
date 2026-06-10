import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import Container from '../Components/container/Container'
import PostCard from '../Components/PostCard'
import service from '../Appwrite/services'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState("")
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (!userData?.$id) {
            return
        }

        const loadPosts = async () => {
            try {
                setError("")
                const postsResponse = await service.getUserPosts(userData.$id)
                if (postsResponse) {
                    setPosts(postsResponse.documents)
                }
            } catch (error) {
                console.error('Failed to load posts:', error)
                setError(error?.message || String(error))
                setPosts([])
            }
        }

        loadPosts()
    }, [userData?.$id])

  return (
    <div className='w-full py-12'>
        <Container>
            <div className='mb-8'>
                <h1 className='text-4xl font-bold text-white mb-2'>My Posts</h1>
                <div className='h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full'></div>
            </div>
            {error ? (
                <p className='text-red-400 text-lg font-semibold'>{error}</p>
            ) : posts.length === 0 ? (
                <p className='text-slate-300 text-lg font-semibold'>You have not created any posts yet.</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            )}
            </Container>
    </div>
  )
}

export default AllPosts
