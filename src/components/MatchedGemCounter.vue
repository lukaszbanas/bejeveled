<template>
    <div class="matched-gem-counter sprite drop-shadow" v-bind:class="conditionalClass">
        <div class="sprite matched-gem-counter__icon"></div>
        <span>{{ matched > target ? target : matched }}</span>/<span>{{ target }}</span>
    </div>
</template>

<script>
    export default {
        name: 'MatchedGemCounter',
        props: {
            type: '',
            matched: 0,
            target: 0
        },
        computed: {
            conditionalClass () {
                return {
                    'matched-gem-counter--first': this.type === 1,
                    'matched-gem-counter--second': this.type === 2,
                    'matched-gem-counter--third': this.type === 3,
                    'matched-gem-counter--fourth': this.type === 4,
                    'matched-gem-counter--fifth': this.type === 5,
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .matched-gem-counter {
        background-position: -348px -681px;
        width: 137px;
        height: 37px;
        line-height: 35px;
        margin-left: 20px;
        position: relative;

        & + .matched-gem-counter {
            margin-top: 10px
        }
    }

    .matched-gem-counter__icon {
        position: absolute;
        left: -10px;
        top: -10px;
        transform: scale(.6) rotate(20deg);
    }

    .matched-gem-counter--first {
        .matched-gem-counter__icon{
            background-position: -536px 0;
            width: 57px;
            height: 67px;
        }
    }

    .matched-gem-counter--second {
        .matched-gem-counter__icon{
            background-position: -644px 0;
            width: 50px;
            height: 68px;
        }
    }

    .matched-gem-counter--third {
        .matched-gem-counter__icon{
            background-position: -535px -67px;
            width: 56px;
            height: 49px;
        }
    }

    .matched-gem-counter--fourth {
        .matched-gem-counter__icon{
            background-position: -644px -69px;
            width: 50px;
            height: 75px;
        }
    }

    .matched-gem-counter--fifth {
        .matched-gem-counter__icon{
            background-position: -693px -143px;
            width: 46px;
            height: 75px;
        }
    }

</style>