<template>
<div v-if="msg" class="w-96 mx-auto relative top-5 ">
    <div v-if="type=='success'" class="px-4 py-3 rounded-lg shadow-lg leading-normal text-green-700 bg-green-100 " role="alert">
        <p>{{msg}}</p>
    </div>
    <div v-if="type=='error'" class="px-4 py-3 rounded-lg shadow-lg leading-normal text-red-700 bg-red-100" role="alert">
        <p>{{msg}}</p>
    </div>
    <div v-if="type=='warning'" class="px-4 py-3 rounded-lg shadow-lg leading-normal text-yellow-700 bg-yellow-100" role="alert">
        <p>{{msg}}</p>
    </div>
</div>
</template>

<script>
export default {
    name: 'FlashMessage',
    props: {
        msg: String,
        type: String
    }
}
</script>
