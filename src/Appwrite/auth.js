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
    const useraccount  = await this.account.create( ID.unique() , email , password , name)
    return useraccount
}
async login ({email , password})
{
    await this.account.deleteSession('current').catch(() => null)
    return await this.account.createEmailPasswordSession(email , password)
}
async isLoogin () //get current user 
{
    try {
      return await this.account.get();
    } catch (error) {
        if (error?.code === 401 || error?.code === 403) {
            return null
        }
        throw error
    }
}

async logout()
{
    try {
        await this.account.deleteSession('current');
        return true
    } catch (error) {
        if (error?.code === 401 || error?.code === 404) {
            return true
        }

        throw error
    }
} 
}

    const authservice = new Authservice()



export default authservice
//  class ko use krne k lie object bnana pdega to yaha directly object bna dia and destructuring krdi 
