import areaSent from "../components/Courier/SubPage/areaSent.vue"
import areaToBeDelivered from "../components/Courier/SubPage/courierAreaToBeDelivered.vue"
import exchangePending from "../components/Courier/SubPage/exchangePending.vue"
import homePage from "../components/Courier/SubPage/homePage.vue"
import itemsToBeTaken from "../components/Courier/SubPage/itemsToBeTaken.vue"
import My from "../components/Courier/SubPage/My.vue"
import redemptionSent from "../components/Courier/SubPage/redemptionSent.vue"
import redemptionWithdrawn from "../components/Courier/SubPage/redemptionWithdrawn.vue"
import regionalPending from "../components/Courier/SubPage/regionalPending.vue"
import regionFetched from "../components/Courier/SubPage/regionFetched.vue"
import userPending from "../components/Courier/SubPage/userPending.vue"
import userRedemption from "../components/Courier/SubPage/userRedemption.vue"
import warehouseDetails from "../components/Courier/SubPage/warehouseDetails.vue"
import warehousingOfArticles from "../components/Courier/SubPage/warehousingOfArticles.vue"

const courierRouter=[
    {
     path:'areaSent',
     component:areaSent
    },
    {
        path:'areaToBeDelivered',
        component:areaToBeDelivered
       },
       {
        path:'exchangePending',
        component:exchangePending
       },
       {
        path:'homePage',
        component:homePage
       },
       {
        path:'itemsToBeTaken',
        component:itemsToBeTaken
       },
       {
        path:'My',
        component:My
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
        path:'userPending',
        component:userPending
       },
       {
        path:'userRedemption',
        component:userRedemption
       },
       {
        path:'warehouseDetails',
        component:warehouseDetails
       },
       {
        path:'warehousingOfArticles',
        component:warehousingOfArticles.vue
       },
                                     
]
