<template>
    <div class="content__wrapper">
        <div class="content__nav-wrap">
            <tree-navigation></tree-navigation>
        </div>
        <article class="content">
            <router-view></router-view>
        </article>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

import TreeNavigation from "@/components/Navigation/TreeNavigation.vue";

@Component({
    components: {
        TreeNavigation,
    },
})
export default class Content extends Vue {}
</script>

<style lang="scss" scoped>
$module: "content";

.#{$module} {
    padding: em(24);

    &__wrapper {
        display: flex;
        height: calc(100vh - #{em($headerHeight)});
    }

    &__nav-wrap {
        width: em(250);
        height: 100%;
        background-color: $color3;
        color: white;
    }
}
</style>