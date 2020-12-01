<template>
    <v-app>
        <v-app-bar app color="primary" dark v-if="isHome" flat>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title to="/">{{ appName }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-btn icon dark @click="setDialogComponent('search')">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-btn>
            <v-btn icon>
                <v-badge :value="countCart" color="orange" overlap>
                    <template v-slot:badge v-if="countCart>0">
                        <span>{{ countCart }}</span>
                    </template>
                    <v-icon>mdi-cart</v-icon>
                </v-badge>
            </v-btn>
        </v-app-bar>

        <v-app-bar app color="primary" dark v-else flat>
            <v-btn icon @click.stop="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-btn icon dark @click="setDialogComponent('search')">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-btn>
            <v-btn icon>
                <v-badge :value="countCart" color="orange" overlap>
                    <template v-slot:badge v-if="countCart>0">
                        <span>{{ countCart }}</span>
                    </template>
                    <v-icon>mdi-cart</v-icon>
                </v-badge>
            </v-btn>
        </v-app-bar>

        <v-card>
            <v-navigation-drawer app v-model="drawer">
                <v-list>
                    <v-list-item v-if="!guest">
                        <v-list-item-avatar>
                            <v-img :src="getImage('/users/'+user.avatar)"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ user.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <div class="pa-2" v-if="guest">
                        <v-btn block color="primary" class="mb-1" @click="setDialogComponent('login')">
                            <v-icon left>mdi-lock</v-icon>Login
                        </v-btn>
                        <v-btn block color="success">
                            <v-icon left>mdi-account</v-icon>Register
                        </v-btn>
                    </div>

                    <v-divider></v-divider>

                    <v-list-item
                        v-for="(item, index) in menus"
                        :key="`menu-` + index"
                        :to="item.route"
                    >
                        <v-list-item-icon>
                            <v-icon left>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <template v-slot:append v-if="!guest">
                    <div class="pa-2">
                        <v-btn block color="red" dark @click="logout">
                            <v-icon left>mdi-lock</v-icon>Logout
                        </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>
        </v-card>

        <alert />
        <keep-alive>
            <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
            >
                <component :is="currentComponent" @closed="setDialogStatus"></component>
            </v-dialog>
        </keep-alive>
        <v-main>
            <v-container fluid>
                <!-- jika menggunakan vue-router -->
                <v-slide-y-transition>
                    <router-view></router-view>
                </v-slide-y-transition>
            </v-container>
        </v-main>

        <v-card>
            <v-footer absolute app>
                <v-card-text class="text-center">
                    &copy; {{ new Date().getFullYear() }} -
                    <strong>Vueshop</strong>
                </v-card-text>
            </v-footer>
        </v-card>
    </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "App",
    components: {
        Alert: () => import(/* webpackChunkName: alert */ "./components/Alert"),
        Search: () => import(/* webpackChunkName: search */ "./components/Search"),
        Login: () => import(/* webpackChunkName: login */ "./components/Login")
    },
    data: () => ({
        drawer: false,        
        menus: [
            { title: "Home", icon: "mdi-home", route: "/" },
            { title: "About", icon: "mdi-account", route: "/about" }
        ],        
    }),
    methods: {
        ...mapActions({
            setDialogStatus: 'dialog/setStatus',
            setDialogComponent: 'dialog/setComponent',
            setAuth: 'auth/set',
            setAlert: 'alert/set',
        }),
        logout() {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.user.api_token
                }
            }
            this.axios.post('/logout', {}, config)
                .then(() => {
                    this.setAuth({})
                    this.setAlert({
                        status: true,
                        color: 'success',
                        text: 'Logout successfully'
                    })
                })
                .catch((error) => {
                    let {data} = error.response
                    this.setAlert({
                        status: true,
                        color: 'error',
                        text: data.message,
                    })
                })
        }
    },
    computed: {
        isHome() {
            return (this.$route.path === "/")
        },
        ...mapGetters({
            countCart: "cart/count",
            guest: "auth/guest",
            user: "auth/user",
            dialogStatus: "dialog/status",
            currentComponent: "dialog/component",
        }),
        dialog:{
            get() {
                return this.dialogStatus
            },
            set (value) {
                this.setDialogStatus(value)
            }
        }
    }
};
</script>
