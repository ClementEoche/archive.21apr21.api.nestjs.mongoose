const axios = require('axios');

(async()=>{
    const{data:{token}} = await axios.post('http://localhost:3000/auth/register',{
        name: 'name',
        password: 'password',
    })
    try {
        const{data} = await axios.get('http://localhost:3000/auth',{
            headers: {authorization: 'Bearer ${token}'},
        });
    
        console.log(data); 
    } catch (error) {
        console.log(error);
    }
    
})();