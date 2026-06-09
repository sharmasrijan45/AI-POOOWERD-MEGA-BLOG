import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import Container from './../Components/container/Container';
import PostCard from './../Components/PostCard';
import service from '../Appwrite/services';

function Home() {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState("")
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const postsResponse = await service.getPosts()
                if (postsResponse) {
                    setPosts(postsResponse.documents)
                }
            } catch (error) {
                const message = error?.message || String(error)
                console.error('Failed to load home posts:', error)
                setError(message)
                setPosts([])
            }
        }

        loadPosts()
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-16 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">
                                {authStatus ? "📝 You are signed in, but posts are unavailable." : "🔐 Login to read posts"}
                            </h1>
                            {error && (
                                <p className="mt-4 text-red-400 text-lg font-semibold">
                                    {error}
                                </p>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-12'>
            <Container>
                <div className='mb-8'>
                    <h1 className='text-4xl font-bold text-white mb-2'>📚 Latest Posts</h1>
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

export default Home