<template>
    <div class="auth-container">
        <div class="container container-table" v-if="notLogged">
            <button id="signin-button" class="sprite mdl-button mdl-js-button" @click="signIn">
                Sign in with Google
            </button>
        </div>
        <div v-if="logged">
            <p class="logged-as">
                Logged as {{ this.$store.state.game.loggedAs }}<br/>
                <a @click="signOut">Logoff</a>
            </p>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
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
                return store.state.game.oauth === null
            },
            logged: () => {
                return store.state.game.oauth !== null
            }
        },
        methods: {
            signIn: function () {
                Vue.googleAuth().directAccess()
                Vue.googleAuth().signIn(this.onSignInSuccess, this.onSignInError)
            },
            onSignInSuccess: (googleUser) => {
                if (window.localStorage) {
                    window.localStorage.setItem('oauth_name', googleUser.getBasicProfile().getName())
                    window.localStorage.setItem('oauth_token', JSON.stringify(googleUser.getAuthResponse()))
                }

                store.dispatch('game/setOauth',
                    {token: googleUser.getAuthResponse(), name: googleUser.getBasicProfile().getName()}
                )
            },
            onSignInError: (error) => {
                this.response = 'Failed to sign-in'
                console.log('GOOGLE SERVER - SIGN-IN ERROR', error)
            },
            toggleLoading: () => {
                this.response = ''
            },
            signOut: () => {
                if (window.localStorage) {
                    window.localStorage.removeItem('oauth_name')
                    window.localStorage.removeItem('oauth_token')
                }

                store.dispatch('game/setOauth',
                    {token: null, name: null}
                )
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