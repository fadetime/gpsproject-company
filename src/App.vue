<template>
<div id="app">
    <top-bar v-if="$store.state.token"></top-bar>
    <router-view/>
    <bottom-bar v-if="$store.state.token" style="position:fixed;bottom:0;width: 100%;"></bottom-bar>
</div>
</template>

<script>
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'

export default {
    components: {
        TopBar,
        BottomBar
    },
    mounted() {
        if (localStorage.usertoken) {
            let usertoken = localStorage.getItem('usertoken')
            let username = localStorage.getItem('username')
            let address = localStorage.getItem('address')
            let email = localStorage.getItem('email')
            let phone = localStorage.getItem('phone')
            let postcode = localStorage.getItem('postcode')

            this.$store.commit('newname', username)
            this.$store.commit('newaddress', address)
            this.$store.commit('newphone', phone)
            this.$store.commit('newpostcode', postcode)
            this.$store.commit('newemail', email)

            this.$store.commit('newtoken', usertoken)

        } else {
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.emptyarea-top {
    padding: 30px 0;
}

@import "~vue-material/dist/theme/engine"; // Import the theme engine
@include md-register-theme("default", ( primary: #d74342, // The primary color of your application
accent: #d74342 // The accent or secondary color
));
@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
