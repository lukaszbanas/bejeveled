<template>
    <div class="auth-container">
        <div class="container container-table" v-if="notLogged === true">
            <button id="signin-button" class="sprite mdl-button mdl-js-button" @click="signIn">
                Sign in with Google
            </button>
        </div>
        <div v-if="logged === true">
            <p class="logged-as">
                Logged as {{ this.$store.state.auth.loggedAs }}<br/>
                <a @click="signOut">Logoff</a>
            </p>
        </div>
    </div>
</template>

<script>
    import store from '../store'

    export default {
        name: 'OAuth',
        data: function () {
            return {
                section: 'Login',
                loading: '',
                response: ''
            }
        },
        computed: {
            notLogged: () => {
                return (store.state.auth.oauth === null)
            },
            logged: () => {
                return store.state.auth.oauth !== null
            }
        },
        methods: {
            signIn: function () {
                store.dispatch('auth/getAuth')
            },
            signOut: () => {
                if (window.localStorage) {
                    window.localStorage.removeItem('oauth_name')
                    window.localStorage.removeItem('oauth_token')
                }

                store.dispatch('auth/setOauth', {token: null, name: null})
            }
        }
    }
</script>

<style scoped>
    .logged-as {
        margin-top: 20px;
        max-width: 100%
    }

    button {
        width: 200px;
        height: 50px;
        background-position: 0px -200px;
    }
</style>