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
            <select
                class="select"
                name="type"
                id="type"
                @input="$event => handleInput('type', parseInt($event.target.value))"
            >
                <option
                    v-for="type in types"
                    :key="type.id"
                    :value="type.id"
                    :selected="type.id === node.type"
                >{{ type.name }}</option>
            </select>
        </div>
    </form>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import gql from "graphql-tag";
import { INode } from "@/models/Node";
import { IType } from "@/models/Type";

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
        types: {
            query: gql`
                query types {
                    types {
                        id
                        name
                    }
                }
            `,
        },
    },
})
export default class Node extends Vue {
    public nodes: INode[] = [];
    public types: IType[] = [];
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
            case "type":
                this.nodes[0].type = parseInt(value, 10);
                break;
        }

        if (this.timeouts[input]) {
            clearTimeout(this.timeouts[input]);
        }

        this.timeouts[input] = window.setTimeout(() => {
            this.submitMutation(input, value);
        }, 1500);
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