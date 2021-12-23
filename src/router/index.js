import {createRouter, createWebHistory} from "vue-router"
//import Login from "../views/Login.vue"

const routes = [
    {
        path: "/",
        name: "Login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/signup",
        name: "SignUp",
        component: () => import("../views/SignUp.vue"),
    },
    {
        path: "/dashboard",
        name: "UserLayout",
        component: () => import("../views/UserLayout.vue"),
        children: [
            {
                path: "",
                name: "Dashboard",
                component: () => import("../views/Dashboard.vue"),
            },
            {
                path: "addUser",
                name: "AddUser",
                component: () => import("../views/SignUp.vue"),
            },
            {
                path: "editUser/:id",
                name: "EditUser",
                component: () => import("../views/SignUp.vue"),
                props: true
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import("../components/NotFound.vue"),
    }
    
];

export default createRouter({
    history: createWebHistory(),
    routes
});