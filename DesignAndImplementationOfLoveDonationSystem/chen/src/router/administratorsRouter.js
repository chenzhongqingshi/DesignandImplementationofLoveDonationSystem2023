import approved from "../components/Administrators/SubPage/approved.vue"
import areaToBeDelivered from "../components/Administrators/SubPage/areaToBeDelivered.vue"
import assignedTasks from "../components/Administrators/SubPage/assignedTasks.vue"
import donatedArea from "../components/Administrators/SubPage/donatedArea"
import failedToPassTheReview from "../components/Administrators/SubPage/failedToPassTheReview.vue"
import homePage from "../components/Administrators/SubPage/homePage.vue"
import itemsToBeRviewed from "../components/Administrators/SubPage/itemsToBeRviewed.vue"
import regionList from "../components/Administrators/SubPage/regionList.vue"
import taskCompleted from "../components/Administrators/SubPage/taskCompleted.vue"
import userPending from "../components/Administrators/SubPage/userPending.vue"
import warehouseDetails from "../components/Administrators/SubPage/warehouseDetails.vue"
import warehouseList from "../components/Administrators/SubPage/warehouseList.vue"
const administratorsRouter=[
    {
        path:"approved",
        component:approved
    },
    {
        path:"areaToBeDelivered",
        component:areaToBeDelivered
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
        path:"homePage",
        component:homePage
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
        path:"userPending",
        component:userPending
    },
    {
        path:"warehouseDetails",
        component:warehouseDetails
    },
    {
        path:"warehouseList",
        component:warehouseList
    },
]
