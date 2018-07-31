<template>
<div id="app">
	<top-bar></top-bar>
    <router-view/>
	<bottom-bar style="position:fixed;bottom:0;width: 100%;"></bottom-bar>
</div>
</template>

<script>
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
export default {
	components:{
		TopBar,
		BottomBar
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

@include md-register-theme("default", (
  primary: #d74342, // The primary color of your application
  accent: #d74342 // The accent or secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
