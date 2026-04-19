import { Client, Account, ID , Databases , Storage , Query } from "appwrite";
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

async createPost({content , slug , title , image , status , UserID})
{
    try {

        return await this.databases.createDocument(config.DatabaseID , config.collectionID , slug , 

            {
                content  , title , image , status , UserID
            }
        )
        
    } catch (error) {
      throw error  
    }
}

async updatepost( slug, {content  , title , image , status , UserID} ){

try {
    
return await this.databases.updateDocument(config.DatabaseID , config.collectionID , slug , 
    {
content ,  title , image , status

    })

} catch (error) {
  throw error  
}
}

async DeletePost(slug)
{
    try {
        return await this.databases.deleteDocument( config.DatabaseID , config.collectionID , slug  )

    } catch (error) {
        throw error
        
    }
}

async getpost(slug)
{
    try {

     return await this.databases.getDocument(config.DatabaseID , config.collectionID , slug)
        
    } catch (error) {
        throw error
    }
}
async getposts(query = [Query.equal('status' , "active")]){ // ststus is a  key ,, first we have to build  key in appwrite in database
try {
    
   return await this.databases.listDocuments(config.DatabaseID , config.collectionID , query)

} catch (error) {
    throw error
}
}

// FILE RELATED OPERATIONS
async uploadFile(files)
{
try {
    
return await this.storage.createFile(config.bucketID , ID.unique() , files)

} catch (error) {
    throw error
}


}

async deleteFile(fileID){
    try {

        await this.storage.deleteFile( config.bucketID , fileID )
            return true

    } 
    catch (error) {
        throw error
    }
}

async filepreview(fileID )
{
try {

    return this.storage.getFilePreview(
        config.bucketID , 
        fileID
    )
} catch (error) {
    throw error
}
}


}
const service = new Service()
export default service