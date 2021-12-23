<template>
<div class="text-gray-900 bg-gray-200 min-h-screen ">
    <FlashMessage :type="flashType" :msg="flashMsg" v-if="showFlash" />

    <div class="p-4">
        <button name="logout" @click="logout" class="float-right bg-blue-500 text-white text-sm px-3 py-2 outline-none rounded-md hover:bg-blue-700">Logout</button>
    </div>

    <div class="px-3 my-10 xl:max-w-7xl max-w-full mx-auto overflow-auto">

        <router-link class="bg-green-500 text-white text-sm px-3 py-2 mb-3 float-right outline-none rounded-md hover:bg-green-700" :to="{ name: 'AddUser' }">Add New</router-link>
        <h1 class="float-left text-3xl font-semibold text-gray-700">Users</h1>

        <table class="w-full text-md bg-white shadow-md rounded">
            <tbody>
                <tr class="border-b">
                    <th class="text-left p-3 px-5 border-x w-10">ID</th>
                    <th class="text-left p-3 px-5 border-x">Name</th>
                    <th class="text-left p-3 px-5 border-x">Email</th>
                    <th class="text-left p-3 px-5 border-x w-10">Action</th>
                </tr>

                <tr v-if="user_list.length" v-for="(user,index) in user_list" class="border-b hover:bg-orange-100 bg-gray-100">
                    <td class="p-3 px-5 border-x">{{user.id}}</td>
                    <td class="p-3 px-5 border-x">{{user.name}}</td>
                    <td class="p-3 px-5 border-x">{{user.email}}</td>
                    <td class="p-3 px-5 flex justify-center">
                        <router-link class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" :to="{ name: 'EditUser', params:{id:user.id} }">Edit</router-link>
                        <button type="button" v-if="user_list.length>1" @click.prevent="deleteUser(user.id)" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                    </td>
                </tr>
                <tr v-else>
                    <td class="p-3 px-5" colspan="4">No Record found.</td>
                </tr>

            </tbody>
        </table>

    </div>
</div>
</template>

<script>
import FlashMessage from '../components/flashMessage.vue';

export default {
    name: 'Dashboard',
    data() {
        return {
            user_list: [],
            flashType: null,
            flashMsg: null,
            showFlash: false,
        }
    },
    components: {
        FlashMessage
    },
    beforeCreate() {
        if (localStorage.getItem('isAuth') == "false") {
            this.$router.push({
                name: 'Login',
                query: {
                    msg: "Please Login first.",
                    type: 'error'
                }
            });
        }
    },
    created() {
        if (localStorage.getItem('isAuth') == "true") {
            let user = localStorage.getItem('data');
            if (user) {
                this.user_list = JSON.parse(user);
            }
            this.flashMsg = this.$route.query.msg
            this.flashType = this.$route.query.type
            this.$router.replace({
                name: this.$route.name
            });
        }
    },
    mounted() {
        if (this.flashMsg) {
            this.showFlash = true
        }
    },
    methods: {
        logout() {
            localStorage.setItem('isAuth', false);
            this.$router.push({
                name: 'Login',
                query: {
                    msg: "Logout Successfully.",
                    type: 'success'
                }
            });
        },
        getUserIndex(u_id) {
            if (this.user_list.length) {
                return this.user_list.findIndex((v) => {
                    return v.id == u_id
                });
            }
        },
        deleteUser(u_id) {
            if(confirm("Are you sure you want delete this user?")) {
                const userIndex = this.getUserIndex(u_id);
                if (userIndex !== -1) {
                    this.user_list.splice(userIndex, 1);
                    localStorage.setItem('data', JSON.stringify(this.user_list));
                    this.flashMsg = 'User Deleted Successfully';
                    this.flashType = 'success';
                    this.showFlash = true;
                }
            }
        },
    },
    watch: {
        showFlash(oldValue, newValue) {
            if (oldValue) {
                setTimeout(() => {
                    this.showFlash = false;
                }, 3000);

            }
        }
    }
}
</script>
