<template>
    <header class="py-3 pl-5 shadow-md border-b border-gray-200 ">
        <img src="../assets/users.png" class="object-cover w-18 h-10 float-left" alt="">
        <i class="text-2xl text-gray-700 tracking-wider italic">Dashboard</i>
    </header>
    <conent>
        <router-view></router-view>
    </conent>
    <footer class="bg-gray-400 fixed bottom-0 w-full text-md text-center text-gray-50 py-2 tracking-widest">FOOTER</footer>
</template>