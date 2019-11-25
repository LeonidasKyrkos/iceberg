<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="(parseInt(width) * 0.57).toString()"
        viewBox="0 0 14 8"
        class="chevron"
        :class="[ direction ]"
    >
        <g fill="none" fill-rule="evenodd">
            <path class="chevron__path2" d="M14 6.545L7 0 0 6.545 1.556 8 7 2.91 12.444 8z" />
        </g>
    </svg>
</template>

<script>
export default {
    name: "Chevron",
    props: {
        width: {
            type: String,
            default: "14",
        },
        direction: {
            type: String,
            default: "down",
        },
    },
};
</script>

<style lang="scss" scoped>
$module: "chevron";

.#{$module} {
    @extend %svg-icon;

    transition: transform 0.15s linear;

    &.down {
        transform: rotate(180deg);
    }

    &.right {
        transform: rotate(90deg);
    }

    &.left {
        transform: rotate(-90deg);
    }

    &__path2 {
        fill: $color5;
    }
}
</style>