import VueRouter from "vue-router"
import Vue from "vue"
Vue.use(VueRouter)
const push=VueRouter.prototype.push
VueRouter.prototype.push=function(location){
return push.call(this,location).catch(err=>err)
}
import Login from "../components/Login/Login.vue"
import User from "../components/User/User.vue"
import Administrators from "../components/Administrators/Administrators.vue"
import Courier from "../components/Courier/Courier.vue"

import userHomePage from "../components/User/SubPage/userHomePage.vue"
import itemStatus from "../components/User/SubPage/itemStatus.vue"
import shoppingMall from "../components/User/SubPage/shoppingMall.vue"
import uploadItems from "../components/User/SubPage/uploadItems.vue"
import exchangeItems from "../components/User/SubPage/exchangeItems.vue"
import donationSucceeded from "../components/User/SubPage/donationSucceeded.vue"
import donationFailed from "../components/User/SubPage/donationFailed.vue"
import userMy from "../components/User/SubPage/userMy.vue"

const userRouter=[
    {
        path:'userHomePage',
        component:userHomePage
    },
    {
        path:'itemStatus',
        component:itemStatus
    },
    {
        path:'shoppingMall',
        component:shoppingMall
    },
    {
        path:'uploadItems',
        component:uploadItems
    },
    {
        path:'exchangeItems',
        component:exchangeItems
    },
    {
        path:'donationSucceeded',
        component:donationSucceeded
    },
    {
        path:'donationFailed',
        component:donationFailed
    },
    {
        path:'userMy',
        component:userMy
    }
]

import approved from "../components/Administrators/SubPage/approved.vue"
import administratorsAreaToBeDelivered from "../components/Administrators/SubPage/administratorsAreaToBeDelivered.vue"
import assignedTasks from "../components/Administrators/SubPage/assignedTasks.vue"
import donatedArea from "../components/Administrators/SubPage/donatedArea"
import failedToPassTheReview from "../components/Administrators/SubPage/failedToPassTheReview.vue"
import administratorsHomePage from "../components/Administrators/SubPage/administratorsHomePage.vue"
import itemsToBeRviewed from "../components/Administrators/SubPage/itemsToBeRviewed.vue"
import regionList from "../components/Administrators/SubPage/regionList.vue"
import taskCompleted from "../components/Administrators/SubPage/taskCompleted.vue"
import administratorsUserPending from "../components/Administrators/SubPage/administratorsUserPending.vue"
import administratorsWarehouseDetails from "../components/Administrators/SubPage/administratorsWarehouseDetails.vue"
import warehouseList from "../components/Administrators/SubPage/warehouseList.vue"
const administratorsRouter=[
    {
        path:"approved",
        component:approved
    },
    {
        path:"administratorsAreaToBeDelivered",
        component:administratorsAreaToBeDelivered
    },
    {
        path:"assignedTasks",
        component:assignedTasks
    },
    {
        path:"donatedArea",
        component:donatedArea
    },
    {
        path:"failedToPassTheReview",
        component:failedToPassTheReview
    },
    {
        path:"administratorsHomePage",
        component:administratorsHomePage
    },
    {
        path:"itemsToBeRviewed",
        component:itemsToBeRviewed
    },
    {
        path:"regionList",
        component:regionList
    },
    {
        path:"taskCompleted",
        component:taskCompleted
    },
    {
        path:"administratorsUserPending",
        component:administratorsUserPending
    },
    {
        path:"administratorsWarehouseDetails",
        component:administratorsWarehouseDetails
    },
    {
        path:"warehouseList",
        component:warehouseList
    },
]

import areaSent from "../components/Courier/SubPage/areaSent.vue"
import courierAreaToBeDelivered from "../components/Courier/SubPage/courierAreaToBeDelivered.vue"
import exchangePending from "../components/Courier/SubPage/exchangePending.vue"
import courierHomePage from "../components/Courier/SubPage/courierHomePage.vue"
import itemsToBeTaken from "../components/Courier/SubPage/itemsToBeTaken.vue"
import courierMy from "../components/Courier/SubPage/courierMy.vue"
import redemptionSent from "../components/Courier/SubPage/redemptionSent.vue"
import redemptionWithdrawn from "../components/Courier/SubPage/redemptionWithdrawn.vue"
import regionalPending from "../components/Courier/SubPage/regionalPending.vue"
import regionFetched from "../components/Courier/SubPage/regionFetched.vue"
import courierUserPending from "../components/Courier/SubPage/courierUserPending.vue"
import userRedemption from "../components/Courier/SubPage/userRedemption.vue"
import courierwarehouseDetails from "../components/Courier/SubPage/courierwarehouseDetails.vue"
import warehousingOfArticles from "../components/Courier/SubPage/warehousingOfArticles.vue"

const courierRouter=[
    {
     path:'areaSent',
     component:areaSent
    },
    {
        path:'courierAreaToBeDelivered',
        component:courierAreaToBeDelivered
       },
       {
        path:'exchangePending',
        component:exchangePending
       },
       {
        path:'courierHomePage',
        component:courierHomePage
       },
       {
        path:'itemsToBeTaken',
        component:itemsToBeTaken
       },
       {
        path:'courierMy',
        component:courierMy
       },
       {
        path:'redemptionSent',
        component:redemptionSent
       },
       {
        path:'redemptionWithdrawn',
        component:redemptionWithdrawn
       },
       {
        path:'regionalPending',
        component:regionalPending
       },
       {
        path:'regionFetched',
        component:regionFetched
       },
       {
        path:'courierUserPending',
        component:courierUserPending
       },
       {
        path:'userRedemption',
        component:userRedemption
       },
       {
        path:'courierwarehouseDetails',
        component:courierwarehouseDetails
       },
       {
        path:'warehousingOfArticles',
        component:warehousingOfArticles
       },
                                     
]

export default new VueRouter({
    routes:[
        {
            name:"login",
            path:'/Login',
            component:Login
        },
        {
            name:"user",
            path:'/User',
            component:User,
            children:userRouter
        },
        {
            name:"administrators",
            path:'/Administrators',
            component:Administrators,
            children:administratorsRouter
        },
        {
            name:"courier",
            path:'/Courier',
            component:Courier,
            children:courierRouter
        }
    ]
})