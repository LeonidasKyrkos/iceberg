<template>
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
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

import { RootState } from "@/models/RootState";

@Component({
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
    background-color: $color2;

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
            background-color: $color1;
        }

        &.router-link-active {
            background-color: $color1;
        }
    }
}
</style>