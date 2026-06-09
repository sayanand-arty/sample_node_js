import api from "./api"

const authService = {
    login: async (name, pass)=>{
        console.log(name,pass)
        try{
            const res = await api.post('/login',{name, pass})
            return res.data
        }catch(err){
            console.log(err);
                return err
        }

    },
    //sign up button
}
export default authService;
// const car={
//     color:'red',
//     model:2018,
//     is_insured:false,
//     start:()=>{

//     }
// }