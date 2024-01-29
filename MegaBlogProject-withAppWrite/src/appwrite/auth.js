import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite";


export class AuthService {
    client;
    account;

    constructor() {
        this.client = new Client()
                        .setEndpoint(conf.appwriteUrl)
                        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({name, email, password}) {
        try {

            const userAccount = await this.account.create(ID.unique(),email,password,name);

            if (userAccount) {
                //if user account is created successfully ...
                // here we will call another method to login directly after signUp..

                return await this.login({email,password});

            } else {
                //this will return null...
                return userAccount;
            }
            
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService ();

export default authService;