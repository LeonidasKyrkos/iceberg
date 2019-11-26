<template>
    <form class="node">
        <div v-if="!$apolloData.queries.nodes.loading" class="node__inner">
            <text-input
                :state="node.title"
                id="title"
                name="title"
                label="Title"
                @input="$value => handleInput('title', $value)"
            ></text-input>
            <text-input
                :state="node.short_title"
                id="shorttitle"
                name="shorttitle"
                label="Short title"
                @input="$value => handleInput('short_title', $value)"
            ></text-input>
        </div>
    </form>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import gql from "graphql-tag";
import { INode } from "@/models/Node";

import TextInput from "@/components/Controls/TextInput.vue";

@Component({
    components: {
        TextInput,
    },
    apollo: {
        nodes: {
            query: gql`
                query nodes($ids: [Int]) {
                    nodes(ids: $ids) {
                        id
                        type
                        parent_node
                        title
                        short_title
                    }
                }
            `,
            variables() {
                return {
                    ids: [parseInt(this.$route.params.id, 10)],
                };
            },
        },
    },
})
export default class Node extends Vue {
    public nodes: INode[] = [];
    public timeouts: { [key: string]: number } = {};

    public get node(): INode {
        return this.nodes[0];
    }

    private handleInput<I extends keyof INode>(input: I, value: string): void {
        switch (input) {
            case "title":
                this.nodes[0].title = value;
                break;
            case "short_title":
                this.nodes[0].short_title = value;
                break;
        }

        if (this.timeouts[input]) {
            clearTimeout(this.timeouts[input]);
        }

        this.timeouts[input] = window.setTimeout(() => {
            this.submitMutation(input, value);
        }, 2500);
    }

    private submitMutation(input: string, value: any) {
        const payload: {
            [key: string]: any;
        } = {
            id: this.node.id,
        };

        payload[input] = value;

        this.$apollo.mutate({
            mutation: gql`
                mutation($payload: NodeInput!) {
                    UPDATE_NODE(payload: $payload) {
                        id
                        title
                        short_title
                        type
                    }
                }
            `,
            variables: {
                payload,
            },
        });
    }
}
</script>

<style lang="scss" scoped>
$module: "node";

.#{$module} {
}
</style>