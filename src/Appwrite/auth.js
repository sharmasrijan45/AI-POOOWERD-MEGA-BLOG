import { Client, Account, ID } from "appwrite";
import config from "../Config/config";

export class Authservice {
 client = new Client()
 account ;

constructor(){

this.client
  .setEndpoint(config.appwriteurl) // Your API Endpoint
    .setProject(config.projectId); 


   this.account = new Account(this.client);
}

async createAcc({ email , password , name})

{
    try {
       
      const useraccount  = await this.account.create( ID.unique() , email , password , name)
if (useraccount) {
    login()    // if accunt is fund then direct login 
} else {
    return useraccount
}
    } catch (error) {
        throw error
    }
}
async login ({email , password})
{
try {


    await this.account.createEmailPasswordSession(email , password)
    
} catch (error) {
    throw error   
}
}
async isLoogin ()
{
    try {
         await this.account.get();
    } catch (error) {
        throw error
    }
}

async logout()
{
       try {
         await this.account.deleteSessions('current');
    } catch (error) {
        throw error
    }
} 
}

    const authservice = new Authservice()



export default authservice
//  class ko use krne k lie object bnana pdega to yaha directly object bna dia and destructuring krdi 