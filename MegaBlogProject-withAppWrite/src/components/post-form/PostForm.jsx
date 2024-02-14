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
    const [value1, setValue1] = useState("");

    useEffect(() => {
        const subscribe = watch()

    },[watch, slugTransform, setValue]);

    return (
        <div>PostForm</div>
    )
}

export default PostForm