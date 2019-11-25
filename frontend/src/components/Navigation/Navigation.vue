<template>
    <div class="navigation__outer-wrap">
        <div class="navigation__logo">
            <router-link class="navigation__logo-link" to="/">
                <logo></logo>
            </router-link>
        </div>
        <nav class="navigation">
            <ul class="navigation__items">
                <li class="navigation__item-wrap">
                    <router-link to="/" exact class="navigation__item">Dashboard</router-link>
                </li>
                <li class="navigation__item-wrap">
                    <router-link to="/content" class="navigation__item">Content</router-link>
                </li>
                <li v-if="userRole === 'admin'" class="navigation__item-wrap">
                    <router-link to="/content-model" class="navigation__item">Content model</router-link>
                </li>
                <li class="navigation__item-wrap">
                    <router-link to="/documentation" class="navigation__item">Docs</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { RootState } from "@/models/RootState";

import Logo from "@/components/Icons/Logo.vue";

@Component({
    components: {
        Logo,
    },
    computed: {
        ...mapState({
            userRole: (state: RootState) => state.user.role,
        }),
    },
})
export default class Navigation extends Vue {}
</script>

<style lang="scss" scoped>
$module: "navigation";

.#{$module} {
    width: calc(100% - #{em($navWidth)});

    &__outer-wrap {
        background-color: $color1;
        display: flex;
        flex-flow: row nowrap;
    }

    &__logo {
        width: em($navWidth);
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
    }

    &__logo-link {
        display: block;
    }

    &__items {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }

    &__item-wrap {
        flex-basis: 25%;
    }

    &__item {
        text-transform: uppercase;
        padding: em(10);
        display: flex;
        height: em($headerHeight);
        align-items: center;
        justify-content: center;
        color: white;
        letter-spacing: 1px;
        font-weight: 700;

        &:hover {
            background-color: $color3;
        }

        &.router-link-active {
            background-color: $color3;
        }
    }
}
</style>