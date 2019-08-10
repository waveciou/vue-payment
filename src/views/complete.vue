<template>
    <div>
        <section>
            <div class="heading">
                <div class="heading-caption">
                    <h2 class="title">付款完成</h2>
                    <div class="subtitle">ORDER COMPLETE</div>
                </div>
            </div>
            <p>我們將寄送完整的訂購明細至您的 Email</p>
        </section>
        <div class="controlbar">
            <a href="javascript:;" @click.prevent="goToNextStep" class="side-right btn btn-primary">完成</a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        name: 'complete',
        props: ['product', 'amount', 'order'],
        created() {

        },
        mounted() {

        },
        methods: {
            goToNextStep() {
                this.$router.replace({path:'shipping'});
            }
        },
        computed: {

        },
        watch: {

        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/scss/_utils.scss';

    /* Heading */
    .heading {
        display: flex;
        align-items: center;
        margin-bottom: 2rem;
        &::before {
            content: 'check_circle_outline';
            @include material;
            font-size: 50px;
            margin-right: 20px;
            color: $color-blue-dark;
        }
    }
</style>