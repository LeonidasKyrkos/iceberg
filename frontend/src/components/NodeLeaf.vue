<template>
    <div>
        <div class="leaf__title-wrap">
            <router-link
                :to="`/content/${leaf.id}`"
                class="leaf__title"
            >{{ leaf.short_title ? leaf.short_title : leaf.title }}</router-link>
            <button v-if="leaf.children.length" class="leaf__toggle" @click="open = !open">
                <chevron direction="down"></chevron>
            </button>
        </div>
        <node-tree
            v-if="leaf.children.length && (open || parseInt($route.params.id, 10) === leaf.id)"
            :node-tree="leaf.children"
        ></node-tree>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import { INode } from "@/models/Node";
import gql from "graphql-tag";

import Chevron from "@/components/Icons/Chevron.vue";
import NodeTree from "@/components/NodeTree.vue";

@Component({
    components: {
        Chevron,
        NodeTree: () => import("@/components/NodeTree.vue"),
    },
    apollo: {
        isAncestor: {
            query: gql`
                query isAncestor($node: Int, $child: Int) {
                    isAncestor(node: $node, child: $child)
                }
            `,
            variables() {
                return {
                    node: parseInt(this.leaf.id, 10),
                    child: parseInt(this.$route.params.id, 10),
                };
            },
            update({ isAncestor }) {
                if (isAncestor) {
                    this.$nextTick(this.handleOpenState);

                    return isAncestor;
                }
            },
        },
    },
})
export default class Leaf extends Vue {
    public open: boolean;
    private isAncestor: boolean;

    @Prop() private readonly leaf!: INode;

    constructor() {
        super();
        this.open = false;
        this.isAncestor = false;
    }

    private mounted() {
        this.handleOpenState();
    }

    private handleOpenState() {
        this.open = this.deriveOpenState({
            nodeId: parseInt(this.$route.params.id, 10),
        });
    }

    private deriveOpenState({ nodeId }: { nodeId: number }) {
        if (nodeId === this.leaf.id || this.isAncestor) {
            return true;
        }

        return false;
    }
}
</script>

<style lang="scss" scoped>
$module: "leaf";

.#{$module} {
    &__title-wrap {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }

    &__title {
        display: block;
        padding: em(12);
    }

    &__toggle {
        @extend %button;
    }
}
</style>