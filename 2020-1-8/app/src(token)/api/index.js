import axios from 'axios';
const instance=axios.create();

axios.defaults.headers['Content-Type']='x-www-form-urlencoded'
instance.interceptors.request.use(config=>{
    console.log('请求拦截');
    const token=localStorage.getItem('token');
    if(token){
        config.headers['Authorization']=token;
    }
    return config;
},error=>{
    return Promise.reject(error);
})

instance.interceptors.response.use(config=>{
    if(config.data.token){
        localStorage.setItem('token',config.data.token);
    }
    return config.data;
},error=>{
    return Promise.reject(error);
})
export {instance}