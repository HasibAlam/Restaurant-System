import axios from 'axios';

class ManagerService {
    constructor() {
      this.url = 'https://swe30003-assignment3-express.vercel.app/authenticate';
    }
  
    async authenticateManager(username, password, accountType) {
      try {
        const response = await axios.post(this.url, { username, password, accountType });
        if (response.status === 200) {
          return response.data.success;
        } else {
          throw new Error(`Unexpected status code: ${response.status}`);
        }
      } catch (error) {
        throw new Error(`Error authenticating manager: ${error.message}`);
      }
    }
  }
  
  export default ManagerService;
  