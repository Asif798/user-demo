<template>
<div class="bg-gray-100 ">
    <FlashMessage :type="flashType" :msg="flashMsg" v-if="showFlash" />
</div>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">Login</div>
        <div class="mt-4 self-center text-xl sm:text-sm text-gray-800">Enter your credentials to access your account</div>

        <div class="mt-10">
            <form action="#" @submit.prevent="formSubmit($event)">
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
                    <button type="submit" class="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in">
                        <span class="mr-2 uppercase">Sign In</span>
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
                You don't have an account?
                <router-link class="text-xs ml-2 text-blue-500 font-semibold" :to="{ name: 'SignUp' }">Register now</router-link>
            </span>
        </a>
    </div>
</div>
</template>

<script>
import FlashMessage from '../components/flashMessage.vue';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            error: {},
            flashType: null,
            flashMsg: null,
            showFlash: false,
        }
    },
    components: {
        FlashMessage
    },
    created() {
        this.flashMsg = this.$route.query.msg
        this.flashType = this.$route.query.type
        this.$router.replace({
            name: this.$route.name
        });
    },
    mounted() {
        if (this.flashMsg) {
            this.showFlash = true
        }
    },
    methods: {
        formSubmit() {
            this.error = {};
            if (this.email == '') {
                this.error.email = 'Email Cannot be blank.'
            }
            if (this.password == '') {
                this.error.password = 'Password Cannot be blank.'
            }
            if (Object.keys(this.error).length) {
                return false;
            }
            var user = localStorage.getItem('data');
            if (user) {
                let user_data = JSON.parse(user);
                let is_valid = user_data.some((u) => {
                    return (u.email == this.email && u.password == this.password)
                });
                if (!is_valid) {
                    this.error.email = 'Invalid Email ID.'
                    this.error.password = 'Invalid Password.'
                } else {
                    localStorage.setItem('isAuth', true);
                    this.$router.push({
                        name: 'Dashboard',
                        query: {
                            msg: "Login Successfully.",
                            type: 'success'
                        }
                    });
                }
            } else {
                this.error.email = 'Email ID is not exits.'
            }
        }
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
