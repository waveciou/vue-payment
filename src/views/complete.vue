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
                    <dd>{{ this.toCurrency(amount.total) }}</dd>
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
        methods: {
            goToNextStep() {
                this.$router.replace({path:'shipping'});
            },
            toCurrency(num) {
                // 轉換成貨幣格式
                num = num.toString();
                let reg = /(-?\d+)(\d{3})/;
                while(reg.test(num)) {
                    num = num.replace(reg, '$1,$2');
                }
                return num;
            },
        },
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
        @include min-width(768px) {
            padding-left: 70px;
        }
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
            padding: 10px;
            padding: {
                top: 10px;
                bottom: 10px;
                left: 20px;
                right: 10px;
            };
            @include min-width(768px) {
                display: inline-block;
                vertical-align: top;
                padding-left: 10px;
            }
        }

        dt {
            padding-left: 0px;
            font-weight: bold;
            color: $color-blue-dark;
            @include min-width(768px) {
                width: 150px;
                padding-left: 10px;
            }
        }
    }
</style>