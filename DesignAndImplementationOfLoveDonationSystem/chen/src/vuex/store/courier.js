const courier={
    namespace:true,
    actions:{
        courierStorageAccount(context,account){
            
             context.commit('courierStorageAcc',account)
          
        },
    },
    mutations:{
        courierStorageAcc(state,account){
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
    export default courier