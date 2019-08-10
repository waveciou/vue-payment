<template>
    <div>
        <section>
            <h2 class="title">訂單資訊</h2>
            <div class="subtitle">ORDER INFORMATION</div>

            <table class="productTable">
                <thead>
                    <tr>
                        <th>商品名稱</th>
                        <th>單價</th>
                        <th>數量</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in product" :key="index">
                        <td>{{item.name}}</td>
                        <td>NT. {{item.price}}</td>
                        <td>{{item.number}}</td>
                    </tr>
                </tbody>
            </table>

            <table class="receiveTable">
                <thead>
                    <tr>
                        <th>運送方式</th>
                        <th>運費</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="select">
                                <select v-model="receive.selected">
                                    <option v-for="(item, index) in receive.option" :key="index" :value="item.name">
                                        {{item.name}}</option>
                                </select>
                            </div>
                        </td>
                        <td>NT. {{ this.receivePrice }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="totalPrice">總價：NT. {{ this.totalPrice }}</div>
        </section>

        <div class="controlbar">
            <a href="javascript:;" @click.prevent="goToNextStep" class="side-right btn btn-primary">下一步</a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                receive: {
                    selected: 'N',
                    option: [
                        {
                            name: '超商取貨',
                            price: 60
                        },
                        {
                            name: '宅配到府',
                            price: 100
                        },
                        {
                            name: '自行取貨',
                            price: 0
                        },
                    ]
                }
            }
        },
        name: 'shipping',
        props: ['product', 'amount', 'stepchecked'],
        created() {

        },
        mounted() {
            this.receive.selected = this.amount.receive.type;
        },
        methods: {
            goToNextStep() {
                if(this.receive.selected === 'N') {
                    window.alert('請選擇運送方式');
                } else {
                    let promptText = `確認金額為：${this.totalPrice}`;
                    let amount = {
                        receive: {
                            type: this.receive.selected,
                            price: this.receivePrice
                        },
                        total: this.totalPrice
                    }
                    if(window.confirm(promptText)) {
                        this.$emit('checkAmount', amount);
                        this.$router.replace({path:'payment'});
                    }
                }
            }
        },
        computed: {
            receivePrice() {
                // 計算運費
                if(this.receive.selected === 'N') {
                    return '－'
                } else {
                    let currentItem = this.receive.option.filter((item) => {
                        return item.name === this.receive.selected;
                    });
                    return currentItem[0].price;
                }
            },
            totalPrice() {
                // 計算總價
                if(this.receive.selected === 'N') {
                    return '－'
                } else {
                    let productPrice = this.product.reduce((total, current) => {
                        return total + (current.price * current.number)
                    }, 0);
                    let totalPrice = productPrice + this.receivePrice;
                    return totalPrice
                }
            }
        },
        watch: {

        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/scss/_utils.scss';
    @import url('https://cdnjs.cloudflare.com/ajax/libs/jquery-footable/2.0.3/css/footable.core.min.css');

    table {
        width: 100%;
        margin-top: 2rem;
        margin-bottom: 2rem;

        tr {
            th, td {
                padding: 15px 10px;
                line-height: 1.6em;
                vertical-align: middle;
            }

            th {
                text-align: center;
                background-color: $color-gray-light;
                color: $color-gray-dark;
                &:first-child {
                    text-align: left;
                }
            }

            td{
                text-align: center;
                background-color: $color-white;
                &:first-child {
                    text-align: left;
                }
            }
        }
    }

    .productTable {
        thead {
            display: none;
            @include min-width(768px) {
                display: table-header-group;
            }
        }

        tr {
            width: 100%;
            display: block;
            overflow: hidden;
            @include min-width(768px) {
                width: auto;
                display: table-row;
            }

            td {
                width: 50%;
                display: block;
                float: left;
                text-align: left;

                &:first-child {
                    width: 100%;
                    float: none;
                    background-color: $color-gray-light;
                    color: $color-gray-dark;
                    @include min-width(768px) {
                        width: auto;
                        background-color: transparent;
                    }
                }

                &:nth-child(2) {
                    &::before {
                        content: '單價：';
                        font-weight: bold;
                    }
                }
                

                &:nth-child(3) {
                    text-align: right;
                    &::before {
                        content: '數量：';
                        font-weight: bold;
                    }
                    @include min-width(768px) {
                        text-align: center;
                    }
                }

                @include min-width(768px) {
                    width: auto;
                    display: table-cell;
                    float: none;
                    text-align: center;
                    &::before {
                        display: none;
                    }
                }
            }
        }
    }

    /* Receive Table */
    .receiveTable {
        th, td {
            &:first-child {
                width: 60%;
                text-align: left;
                @include min-width(768px) {
                    width: 80%;
                }
            }
        }
    }
</style>