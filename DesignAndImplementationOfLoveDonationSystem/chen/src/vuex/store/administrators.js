const administrators={
    namespace:true,
    actions:{
        administratorsStorageAccount(context,account){
            
             context.commit('administratorsStorageAcc',account)
            
        },
    },
    mutations:{
        administratorsStorageAcc(state,account){
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
    export default administrators