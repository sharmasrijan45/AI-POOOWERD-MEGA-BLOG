//this file is used to access env variable more conviently 
// env variable should always be in string 

const cleanEnv = (value) => String(value || "").trim().replace(/^["']|["']$/g, "")

const cleanEndpoint = (value) => {
    const endpoint = cleanEnv(value)
        .replace("httpscloud.appwrite.io", "cloud.appwrite.io")
        .replace(/^:\/\//, "https://")

    return endpoint && !endpoint.startsWith("http") ? `https://${endpoint}` : endpoint
}

const config = {

    appwriteurl : cleanEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT),
    projectId : cleanEnv(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    DatabaseID : cleanEnv(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionID : cleanEnv(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bucketID : cleanEnv(import.meta.env.VITE_APPWRITE_BUCKET_ID), 
    tinymcekey : cleanEnv(import.meta.env.VITE_TINYMCE_KEY)



}

export default config
