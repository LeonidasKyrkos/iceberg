<template>
    <div
        class="text-input"
        :class="{ error: $slots.error, valid: valid && !loading, loading, slotted: $slots.default }"
    >
        <div class="text-input__inner">
            <label
                :for="id"
                class="text-input__label"
                :class="{ required, 'has-value': model.length }"
            >{{ label }}{{ required ? "*" : "" }}</label>
            <div class="text-input__input-wrap">
                <input
                    :type="type"
                    class="text-input__input"
                    :class="{ placeholder }"
                    v-model.trim="model"
                    :required="required"
                    :id="id"
                    ref="input"
                    :name="name"
                    @blur="onBlur"
                    :disabled="disabled"
                    :placeholder="placeholder"
                />
            </div>
            <div v-if="$slots.error">
                <slot name="error"></slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "TextInput",
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        required: {
            type: String,
            required: false,
        },
        updateAction: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            required: false,
        },
        valid: {
            type: Boolean,
            required: false,
        },
        loading: {
            type: Boolean,
            required: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
        },
        type: {
            type: String,
            default: "text",
        },
    },
    computed: {
        model: {
            get() {
                return this.state ? this.state : "";
            },
            set(value) {
                if (this.updateAction) {
                    this.$store.dispatch(this.updateAction, value);
                }

                this.$emit("input", value);
            },
        },
    },
    methods: {
        onBlur($event) {
            this.$emit("blur");
        },
        focus() {
            this.$refs.input.focus();
        },
    },
};
</script>

<style lang="scss" scoped>
$module: "text-input";

.#{$module} {
    margin-bottom: em(24);
    position: relative;

    &__inner {
        .#{$module}.slotted & {
            margin-bottom: em(16);
        }
    }

    &__label {
        $fz: 14;
        font-size: em($fz);
        color: $color1;
        margin-bottom: em(12, $fz);
        text-transform: uppercase;
        display: block;
        letter-spacing: 1.87px;
        line-height: (17 / $fz);
        font-weight: 700;
    }

    &__input {
        $fz: 18;
        font-size: rem($fz);
        background-color: white;
        padding: em(15, $fz) em(10, $fz) em(13, $fz) em(15, $fz);
        line-height: (28 / $fz);
        width: 100%;
        box-shadow: none;
        border: 0;
        border-bottom: 1px solid $color5;
        outline: 0;

        &:focus {
            border-bottom: 1px solid $color1;
        }
    }

    &__input-wrap {
        position: relative;

        .#{$module}.error & {
            margin-bottom: em(12);
        }
    }

    &__valid,
    &__invalid {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: em(5);
    }
}
</style>