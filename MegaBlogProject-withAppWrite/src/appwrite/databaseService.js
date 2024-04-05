import { Client, Databases, ID, Query, Storage } from "appwrite";
import  conf  from "../conf/conf";


class DatabaseService {
    client;
    databases;
    storage;

    constructor() {
        this.client = new Client()
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionId,
                /**id  *//***ID.unique()**/ slug ,
                /** data to save to db */ {
                    title,
                    content, 
                    featuredImage, 
                    status, 
                    userId
                }
            );


        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content, 
                    featuredImage, 
                    status
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionId,
                slug
            )
            // if post deleted successfully return true...
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error;
        }
    }

    async getAllPost(queries =[ Query.equal("status","active") ] ) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            throw error;
        }
    }

    // ========== FILE HANDLING SERVICES (FOR STORAGE AND BUCKET) ==============

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }

}

const databaseService = new DatabaseService();

export default databaseService;
