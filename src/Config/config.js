//this file is used to access env variable more conviently 
// env variable should always be in string 

const config = {

    appwriteurl : String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    projectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    DatabaseID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bucketID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID), 
    tinymcekey : String(import.meta.env.VITE_TINYMCE_KEY)



}

export default config