import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from '../Select';
import Button from './../Button';
import Input from './../Input';
import RTE from '../RTE';
import service from '../../Appwrite/services';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "published",
        },
    });

    const [localPreviewUrl, setLocalPreviewUrl] = useState(null);
    const selectedImage = watch("image");
    const existingPreviewUrl = post?.capturedimage ? service.getFileView(post.capturedimage) : null;

    useEffect(() => {
        if (selectedImage && selectedImage.length > 0) {
            const file = selectedImage[0];
            const url = URL.createObjectURL(file);
            setLocalPreviewUrl(url);

            return () => {
                URL.revokeObjectURL(url);
                setLocalPreviewUrl(null);
            };
        }

        setLocalPreviewUrl(null);
    }, [selectedImage]);

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            if (post) {
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

                if (file) {
                    service.deleteFile(post.capturedimage);
                }

                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    image: file ? file.$id : post.capturedimage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!data.image || !data.image[0]) {
                    alert("Image is required for new posts");
                    console.error("Image is required for new posts");
                    return;
                }

                const file = await service.uploadFile(data.image[0]);

                if (file) {
                    const dbPost = await service.createPost({
                        title: data.title,
                        slug: data.slug,
                        content: data.content,
                        status: data.status,
                        image: file.$id,
                        userId: userData.$id
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Form submission error:", error);
            alert("Error submitting form: " + error.message);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-6 bg-linear-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-900/50">
            <div className="w-full lg:w-2/3">
                <div className="space-y-6">
                    <Input
                        label="📝 Title"
                        placeholder="Enter post title..."
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="🔗 Slug"
                        placeholder="Auto-generated from title"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <div>
                        <label className="inline-block mb-2 pl-1 font-semibold text-gray-200 text-sm">✍️ Content</label>
                        <RTE name="content" control={control} defaultValue={getValues("content")} />
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/3">
                <div className="space-y-6 sticky top-8">
                    <div>
                        <label className="inline-block mb-2 pl-1 font-semibold text-gray-200 text-sm">🖼️ Featured Image</label>
                        <Input
                            type="file"
                            className="mb-4"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                    </div>
                    {(localPreviewUrl || existingPreviewUrl) && (
                        <div className="w-full aspect-video flex items-center justify-center mb-4 rounded-xl overflow-hidden border border-purple-500/30 bg-slate-950/60">
                            <img
                                src={localPreviewUrl || existingPreviewUrl}
                                alt={post?.title || "Selected image preview"}
                                className="rounded-lg w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    )}
                    <div>
                        <label className="inline-block mb-2 pl-1 font-semibold text-gray-200 text-sm">📌 Status</label>
                        <Select
                            options={["draft", "published", "archived"]}
                            className="mb-4 bg-slate-800 border border-purple-500/30 text-white rounded-lg px-4 py-2.5 focus:border-purple-500"
                            {...register("status", { required: true })}
                        />
                    </div>
                    <Button 
                        type="submit" 
                        bgColor={post ? "bg-gradient-to-r from-green-600 to-green-700" : "bg-gradient-to-r from-purple-600 to-purple-700"} 
                        className="w-full text-lg font-bold py-3"
                    >
                        {post ? "✅ Update Post" : "📤 Publish Post"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
