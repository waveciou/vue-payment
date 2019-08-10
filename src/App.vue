<template>
    <div id="app">
        <div class="header">
            <div class="wrap">
                <div class="paymentStatus">
                    <div class="paymentStatus-item" :class="{'current': routerIndex === 'shipping'}">
                        <div class="paymentStatus-title">選擇運送方式<span>SHIPPING</span></div>
                    </div>
                    <div class="paymentStatus-item" :class="{'current': routerIndex === 'payment'}">
                        <div class="paymentStatus-title">選擇付款方式<span>PAYMENT</span></div>
                    </div>
                    <div class="paymentStatus-item" :class="{'current': routerIndex === 'complete'}">
                        <div class="paymentStatus-title">付款完成<span>COMPLETE</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="wrap">
                <transition name="fade" mode="out-in">
                    <router-view :product="product" :amount="amount" :order="order" :stepchecked="stepchecked" @checkAmount="computeAmount" @checkOrder="computeOrder" />
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import shipping from './views/shipping.vue';
    import payment from './views/payment.vue';
    import complete from './views/complete.vue';

    export default {
        data() {
            return {
                product: [
                    {
                        name: '手持不了的電風扇',
                        number: 1,
                        price: 100,
                    },
                    {
                        name: '手持不了的冰箱',
                        number: 5,
                        price: 1000,
                    },
                    {
                        name: '可以手持的洗衣機',
                        number: 1,
                        price: 500,
                    },
                    {
                        name: '不能發動的腳踏車',
                        number: 1,
                        price: 900,
                    }
                ],
                amount: {
                    receive: {
                        type: 'N',
                        price: 0
                    },
                    total: 0
                },
                order: [],
                stepchecked: {
                    shipping: false,
                    payment: false
                },
                routerIndex: ''
            }
        },
        components: {
            'shipping': shipping,
            'payment': payment,
            'complete': complete
        },
        created() {

        },
        mounted() {
            if(this.stepchecked.shipping === false || this.stepchecked.payment === false) {
                this.$router.replace({path:'shipping'});
            }
        },
        methods: {
            computeAmount(obj) {
                this.amount.receive.type = obj.receive.type;
                this.amount.receive.price = obj.receive.price;
                this.amount.total = obj.total;

                this.stepchecked.shipping = true;
            },
            computeOrder(arr) {
                this.order = arr;
                this.stepchecked.payment = true;
            }
        },
        computed: {

        },
        watch: {
            $route(to, from) {
                this.routerIndex = to.name;
                window.scrollTo(0, 0);
            }
        }
    }
</script>

<style lang="scss">
    @import 'assets/scss/_utils.scss';
    @import 'assets/scss/main.scss';

    .paymentStatus {
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        counter-reset: payment-status;
        @include min-width(768px) {
            height: 180px;
        }
    }

    .paymentStatus-item {
        width: 33.33%;
        counter-increment: payment-status;
        opacity: 0.5;

        &.current {
            opacity: 1;
        }

        &::before {
            content: counter(payment-status);
            width: 40px;
            height: 40px;
            display: block;
            margin: {
                left: auto;
                right: auto;
                bottom: 10px;
            };
            line-height: 40px;
            font-size: 18px;
            text-align: center;
            border-radius: 100%;
            background-color: $color-blue-dark;
            color: $color-white;

            @include min-width(768px) {
                width: 50px;
                height: 50px;
                line-height: 50px;
                font-size: 24px;
            }
        }
    }

    .paymentStatus-title {
        text-align: center;
        line-height: 1.4em;
        letter-spacing: 1px;
        font-size: 10px;
        font-weight: bold;
        color: $color-blue-dark;
        > span {
            display: block;
            color: inherit;
            font-size: 85%;
        }

        @include min-width(768px) {
            font-size: 18px;
        }
    }
</style>
