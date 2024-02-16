import React,{ useCallback, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {Button, Select, Input, RTE} from "../../components/index";
import databaseService from '../../appwrite/databaseService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues : {
            title : post?.title || "",
            slug : post?.slug || "",
            content : post?.content || "",
            status : post?.status || "active",
        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async(data) => {
        if(post) {
            const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;

            if(file) {
                databaseService.deleteFile(post.featuredImage);
            }
            const dbPost = await databaseService.updatePost(
                post.$id,{
                    ...data,
                    featuredImage:file ? file.$id : undefined,
                }
            );

            if(dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }

        else {
            const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;

            if(file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await databaseService.createPost({
                    ...data,
                    userId : userData.$id,
                });

                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((text)=>{
        if(text && typeof text === 'string') {
            return text.trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }

        return "";
    },[]);

    useEffect(() => {
        const subscribe = watch((value, {name}) => {
            if(name === "title") {
                setValue("slug", slugTransform(value.title), {shouldValidate : true});
            }
        });

        return () => {subscribe.unsubscribe()}
    },[watch, slugTransform, setValue]);

    return (
        <>
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input
                    label ="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", {required: true})}
                />

                <Input
                    label="Slug :"
                    placeholder="slug"
                    className="mb-4"
                    {...register("slug",{required:true})}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.target.value),{shouldValidate:true});

                    }}
                />

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            <div className='w-1/3 px-2'>
                <Input
                    label="Featured Image :"
                    type='file'
                    className="mb-4"
                    accept="image/jpg, image/jpeg, image/png, image/gif"
                    {...register("image", {required : !post})}
                />

                {post && (
                    <div className='w-full mb-4'>
                        <img 
                            src={databaseService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className='rounded-lg'
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", {required:true})}
                />

                <Button
                    type='submit'
                    bgColor={post ? "bg-green-500" : undefined}
                    className='w-full'
                    children={post ? "Update" : "Submit"}
                />
            </div>
        </form>
        </>
    )
}

export default PostForm