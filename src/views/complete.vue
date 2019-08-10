<template>
    <div>
        <section>
            <div class="heading">
                <div class="heading-caption">
                    <h2 class="title">付款完成</h2>
                    <div class="subtitle">ORDER COMPLETE</div>
                </div>
            </div>
            <p class="desc-text">我們將寄送完整的訂購明細至您的 Email</p>
            <div class="orderList">
                <dl v-for="(item, index) in order" :key="index">
                    <dt>{{ item.title }}</dt>
                    <dd>{{ item.value }}</dd>
                </dl>
                <dl>
                    <dt>運送方式</dt>
                    <dd>{{ amount.receive.type}}</dd>
                </dl>
                <dl>
                    <dt>實付金額</dt>
                    <dd>{{ amount.total }}</dd>
                </dl>
            </div>
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

    .desc-text {
        line-height: 1.6em;
        padding-left: 70px;
    }

    /* Order List */
    .orderList {
        width: 100%;
        max-width: 500px;
        margin: 2rem auto;
        font-size: 16px;
        line-height: 1.6em;
        letter-spacing: 1px;

        dt, dd {
            display: inline-block;
            vertical-align: top;
            padding: 10px;
        }

        dt {
            width: 150px;
            font-weight: bold;
        }
    }
</style>