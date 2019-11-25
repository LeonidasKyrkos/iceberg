<template>
    <svg
        viewBox="186.263 186.006 92.074 90.781"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:bx="https://boxy-svg.com"
        class="logo"
        width="50"
        height="50"
    >
        <g>
            <path
                style="fill: rgb(51, 102, 153);"
                transform="matrix(0, 0.567537, -0.567537, 0, 480.469269, -38.587421)"
                d="M 476.037 515.037 A 78.666 78.666 0 0 1 476.072 357.713 L 476.82 436.375 Z"
                bx:shape="pie 476.82 436.375 0 78.666 180.57 359.455 1@8dab8c7d"
            />
            <path
                style="fill: rgb(22, 60, 98);"
                transform="matrix(0, -0.567537, -0.567537, 0, 480.189972, 501.463318)"
                d="M 476.037 515.037 A 78.666 78.666 0 0 1 476.072 357.713 L 476.82 436.375 Z"
                bx:shape="pie 476.82 436.375 0 78.666 180.57 359.455 1@8dab8c7d"
            />
        </g>
        <g>
            <path
                d="M 220.977 212.876 L 231.457 231.028 L 210.497 231.028 L 220.977 212.876 Z"
                style="fill: rgb(134, 187, 216);"
                bx:shape="triangle 210.497 212.876 20.96 18.152 0.5 0 1@2c37a817"
            />
            <path
                d="M 232.859 204.59 L 248.132 231.044 L 217.586 231.044 L 232.859 204.59 Z"
                style="fill: rgb(134, 187, 216);"
                bx:shape="triangle 217.586 204.59 30.546 26.454 0.5 0 1@f1c1a390"
            />
            <path
                d="M 246.331 216.15 L 255.085 231.314 L 237.576 231.314 L 246.331 216.15 Z"
                style="fill: rgb(134, 187, 216);"
                bx:shape="triangle 237.576 216.15 17.509 15.164 0.5 0 1@647ade52"
            />
        </g>
        <g transform="matrix(1, 0, 0, -1, 0.177843, 462.765015)">
            <path
                d="M 220.977 212.876 L 231.457 231.028 L 210.497 231.028 L 220.977 212.876 Z"
                style="fill: rgb(104, 158, 187);"
                bx:shape="triangle 210.497 212.876 20.96 18.152 0.5 0 1@2c37a817"
            />
            <path
                d="M 232.859 204.59 L 248.132 231.044 L 217.586 231.044 L 232.859 204.59 Z"
                style="fill: rgb(104, 158, 187);"
                bx:shape="triangle 217.586 204.59 30.546 26.454 0.5 0 1@f1c1a390"
            />
            <path
                d="M 246.331 216.15 L 255.085 231.314 L 237.576 231.314 L 246.331 216.15 Z"
                style="fill: rgb(104, 158, 187);"
                bx:shape="triangle 237.576 216.15 17.509 15.164 0.5 0 1@647ade52"
            />
        </g>
        <line
            style="fill: rgb(255, 255, 255); stroke: rgb(255, 255, 255); stroke-width: 2px;"
            x1="187.9"
            y1="231.755"
            x2="277.5"
            y2="231.755"
        />
    </svg>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Logo extends Vue {}
</script>

<style lang="scss" scoped>
$module: "logo";

.#{$module} {
    @extend %svg-icon;
}
</style>