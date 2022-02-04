import axios from "axios";
import { URLENDPOINT } from "../constants/constants";


/**
 * Singleton Employee Class to get employee data from the api code
 */
class EmployeeService {
    private static instance: EmployeeService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmployeeService()
        }
        return this.instance;
    }

    private async get(endpoint:string,options = {}) {
        return await axios.get(`${URLENDPOINT}/${endpoint}`, options);
    }

    public async getApi(endpoint:string) {
        return await this.get(endpoint);
    }

}

 const employeeService = EmployeeService.getInstance()
 export default employeeService;