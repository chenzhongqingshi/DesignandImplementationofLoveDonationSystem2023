const user={
namespace:true,
actions:{
    userStorageAccount(context,account){
       
         context.commit('userStorageAcc',account)
         
            },
},
mutations:{
    userStorageAcc(state,account){
     state.account=account
    },
   
},
state:{
account:''
},
getter:{
account(state){
    return state.account
}
}
}
export default user