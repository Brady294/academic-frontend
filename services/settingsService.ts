import axios from "@/lib/axios";

const settingsService = {

    async getSettings(){

        const {data}=await axios.get(
            "/settings"
        );

        return data;

    },

    async changePassword(password:string){

        const {data}=await axios.put(

            "/settings/password",

            {

                password

            }

        );

        return data;

    }

};

export default settingsService;