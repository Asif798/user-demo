<template>
<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">User Registration</div>
        <div class="mt-4 self-center text-xl sm:text-sm text-gray-800">Enter your credentials to get access account</div>

        <div class="mt-10">
            <form action="#" @submit.prevent="formSubmit($event)">
                <div class="flex flex-col mb-5">
                    <label for="name" class="mb-1 text-xs tracking-wide text-gray-600">Name:</label>
                    <div class="relative">
                        <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                            <i class="fas fa-user text-blue-500"></i>
                        </div>

                        <input id="name" type="name" name="name" class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Enter your name" v-model="name" :class="{'border-red-500':error.name}" />
                        <div class="error text-xs mt-2 text-red-500" v-if="error.name">{{error.name}}</div>
                    </div>
                </div>
                <div class="flex flex-col mb-5">
                    <label for="email" class="mb-1 text-xs tracking-wide text-gray-600">E-Mail Address:</label>
                    <div class="relative">
                        <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                            <i class="fas fa-at text-blue-500"></i>
                        </div>

                        <input id="email" type="email" name="email" class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Enter your email" v-model="email" :class="{'border-red-500':error.email}" />
                        <div class="error text-xs mt-2 text-red-500" v-if="error.email">{{error.email}}</div>
                    </div>
                </div>
                <div class="flex flex-col mb-6">
                    <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                    <div class="relative">
                        <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                            <span>
                                <i class="fas fa-lock text-blue-500"></i>
                            </span>
                        </div>

                        <input id="password" type="password" name="password" class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Enter your password" v-model="password" :class="{'border-red-500':error.password}" />
                        <div class="error text-xs mt-2 text-red-500" v-if="error.password">{{error.password}}</div>
                    </div>
                </div>

                <div class="flex w-full">
                    <button type="submit" class="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-500 hover:bg-green-600 rounded-2xl py-2 w-full transition duration-150 ease-in">
                        <span class="mr-2 uppercase">Sign Up</span>
                        <span>
                            <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
    <div class="flex justify-center items-center mt-6">
        <a href="#" target="_blank" class="inline-flex items-center text-gray-700 font-medium text-xs text-center">
            <span class="ml-2">
                You have an account?
                <router-link class="text-xs ml-2 text-blue-500 font-semibold" :to="{ name: 'Login' }">Login here</router-link>
            </span>
        </a>
    </div>
</div>
</template>

<script>
export default {
    name: 'SignUp',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            error: {}
        }
    },
    methods: {
        formSubmit() {
            this.error = {};
            if (this.name == '') {
                this.error.name = 'Name Cannot be blank.'
            }
            if (this.email == '') {
                this.error.email = 'Email Cannot be blank.'
            }
            if (this.password == '') {
                this.error.password = 'Password Cannot be blank.'
            }

            var user_data = [];
            let id = 1;
            var user = localStorage.getItem('data');
            if (user && Object.keys(this.error).length == 0) {
                user_data = JSON.parse(user);
                user_data.forEach((v) => {
                    if (v.name == this.name) {
                        this.error.name = 'Name is already exist.'
                    }
                    if (v.email == this.email) {
                        this.error.email = 'Email is already exist.'
                    }
                });
                id = (user_data.length) + 1;
            }
            if (Object.keys(this.error).length) {
                return false;
            }
            user_data.push({
                "id": id,
                "name": this.name,
                "email": this.email,
                "password": this.password
            });

            localStorage.setItem('data', JSON.stringify(user_data));
            localStorage.setItem('isAuth', true);

            this.$router.push({
                name: 'Login',
                query: {
                    msg: "User created Successfully.",
                    type: 'success'
                }
            });
        }
    }
}
</script>
