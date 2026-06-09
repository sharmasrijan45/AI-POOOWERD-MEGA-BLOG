import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../Appwrite/services"
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
// import { Service } from './../Appwrite/services';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const isAuthor = post && userData ? post.UserID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            Service.getpost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    useEffect(() => {
        let active = true;

        if (post?.capturedimage) {
            Service.getFileView(post.capturedimage)
                .then((url) => {
                    if (active) setImagePreviewUrl(url);
                })
                .catch((error) => {
                    console.error("Failed to load post image preview", error);
                });
        } else {
            setImagePreviewUrl(null);
        }

        return () => {
            active = false;
        };
    }, [post?.capturedimage]);

    const deletePost = () => {
        Service.DeletePost(post.$id).then((status) => {
            if (status) {
                Service.deleteFile(post.capturedimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 min-h-screen">
            <Container>
                <div className="w-full aspect-video flex items-center justify-center rounded-2xl overflow-hidden mb-6 relative border-2 border-purple-500/30 shadow-2xl shadow-purple-900/50 group bg-slate-950/60">
                    {imagePreviewUrl ? (
                        <img
                            src={imagePreviewUrl}
                            alt={post.title}
                            className="rounded-2xl w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : null}

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-3 rounded-full bg-slate-950/80 p-2 shadow-2xl shadow-black/40 backdrop-blur-sm">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-gradient-to-r from-green-600 to-green-700" className="px-6">
                                    ✏️ Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-gradient-to-r from-red-600 to-red-700" onClick={deletePost} className="px-6">
                                🗑️ Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl border border-purple-500/20">
                    <h1 className="text-4xl font-bold text-white mb-2">{post.title}</h1>
                    <div className="flex items-center text-gray-300 text-sm">
                        <span>📅</span>
                        <span className="ml-2">{new Date(post.$createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="browser-css bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-purple-500/20 text-gray-100 leading-relaxed">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
