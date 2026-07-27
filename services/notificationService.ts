import axios from "@/lib/axios";

const notificationService = {

    async getAll(){

        const {data}=await axios.get(
            "/notifications"
        );

        return data;

    },

    async markRead(id:number){

        return axios.put(
            `/notifications/${id}`
        );

    },

    async markAll(){

        return axios.put(
            "/notifications/read-all"
        );

    },

    async delete(id:number){

        return axios.delete(
            `/notifications/${id}`
        );

    }

};

export default notificationService;