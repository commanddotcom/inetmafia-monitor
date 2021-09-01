<script>
export default {
    name: 'Avatar',
    props: ['avatar'],
    methods: {
        getAvatarHttp: function(avatar) {
            if (avatar == null) {
                avatar = 0;
            }
            return `https://inetmafia.ru/u_file/avatar_micro/${ avatar }.jpg`;
        }
    }
}
</script>

<template>
    <img :src="getAvatarHttp(avatar)" class="ava"> 
</template>