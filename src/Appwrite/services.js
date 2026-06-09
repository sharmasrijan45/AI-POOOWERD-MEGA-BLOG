import { Client, ID , Databases , Storage , Query, Permission, Role } from "appwrite";
import config from "../Config/config";


export class Service{

 client = new Client()
 databases ;
 storage

 constructor()
 {
    this.client
  .setEndpoint(config.appwriteurl) // Your API Endpoint
    .setProject(config.projectId); 
    this.databases = new Databases(this.client)
    this.storage = new Storage(this.client)
 }

async createPost({content , slug , title , image , status , userId})
{
    return await this.databases.createDocument(config.DatabaseID , config.collectionID , slug , 

        {
            content  , title , status , UserID: userId , author: userId , capturedimage: image
        }
    )
}

async updatePost( slug, {content  , title , image , status , userId} ){

return await this.databases.updateDocument(config.DatabaseID , config.collectionID , slug , 
    {
content ,  title , status , UserID: userId , author: userId , capturedimage: image

    })
}

async DeletePost(slug)
{
    return await this.databases.deleteDocument( config.DatabaseID , config.collectionID , slug )
}

async getpost(slug)
{
    return await this.databases.getDocument(config.DatabaseID , config.collectionID , slug)
}
async getPosts(query = [Query.equal('status' , "published")]){ // status is a key, first build the key in Appwrite database
    return await this.databases.listDocuments(config.DatabaseID , config.collectionID , query)
}

// FILE RELATED OPERATIONS
async uploadFile(files)
{
return await this.storage.createFile(
    config.bucketID ,
    ID.unique() ,
    files,
    [Permission.read(Role.any())]
)
}

async deleteFile(fileID){
    if (!fileID) {
        return false
    }

    await this.storage.deleteFile(config.bucketID, fileID)
    return true
}

async getFilePreview(fileID )
{
    return this.storage.getFilePreview(
        config.bucketID , 
        fileID
    )
}

async getFileView(fileID )
{
    return this.storage.getFileView(
        config.bucketID ,
        fileID
    )
}


}
const service = new Service()
export default service
