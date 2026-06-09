import React, {useState, useEffect} from 'react'
import Container from '../Components/container/Container';
import PostCard from '../Components/PostCard';
import service from '../Appwrite/services';
function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const postsResponse = await service.getPosts([])
                if (postsResponse) {
                    setPosts(postsResponse.documents)
                }
            } catch (error) {
                console.error('Failed to load posts:', error)
                setPosts([])
            }
        }

        loadPosts()
    }, [])
  return (
    <div className='w-full py-12'>
        <Container>
            <div className='mb-8'>
                <h1 className='text-4xl font-bold text-white mb-2'>📖 All Posts</h1>
                <div className='h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full'></div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {posts.map((post) => (
                    <div key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts