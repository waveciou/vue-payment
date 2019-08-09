<template>
    <div class="container">
        <div class="container-aside">
            <section>
                <h2 class="title">訂單資訊</h2>
                <div class="subtitle">ORDER INFORMATION</div>

                <table class="productList">
                    <thead>
                        <tr>
                            <th>商品名稱/數量</th>
                            <th>小計</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in product" :key="index">
                            <td>{{ item.name }} x {{ item.number }}</td>
                            <td>{{ item.price * item.number }}</td>
                        </tr>
                        <tr>
                            <td>{{ amount.receive.type }}</td>
                            <td>{{ amount.receive.price }}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="totalPrice">NT. {{ amount.total }}</div>
            </section>
        </div>
        <div class="container-article">
            <section>
                <div class="heading">
                    <div class="heading-caption">
                        <h2 class="title">付款資訊</h2>
                        <div class="subtitle">PAYMENT</div>
                    </div>
                    <div class="paymentSelect">
                        <a href="javascript:;" v-for="(item, index) in paymentSelect" :key="index" :class="[item.icon, {'current': item.id === paymentCurrent}]" class="paymentSelect-btn" @click.prevent="selectPayment(item.id)">
                            <span>{{ item.name }}</span>
                        </a>
                    </div>
                </div>

                <div v-if="paymentCurrent === 'A'" class="form-block">
                    <div class="fieldset">
                        <label for="a01-1">卡號</label>
                        <div class="form-control">
                            <input id="a01-1" type="text" class="size-small" maxlength="4" v-model="validator.a.card.number[0]">
                            <input id="a01-2" type="text" class="size-small" maxlength="4" v-model="validator.a.card.number[1]">
                            <input id="a01-3" type="text" class="size-small" maxlength="4" v-model="validator.a.card.number[2]">
                            <input id="a01-4" type="text" class="size-small" maxlength="4" v-model="validator.a.card.number[3]">
                        </div>
                        <div class="valid-feedback" v-if="validator.a.card.valid === false">請填妥有效的信用卡</div>
                    </div>
                    <div class="fieldset">
                        <label for="a02">持卡人</label>
                        <div class="form-control">
                            <input id="a02" type="text" :v-model="validator.a.username.value">
                        </div>
                        <div class="valid-feedback" v-if="validator.a.username.valid === false">請填妥信用卡持卡人姓名</div>
                    </div>
                    <div class="fieldset">
                        <label for="a03-1">卡片效期 (MM/YY)</label>
                        <div class="form-control">
                            <input id="a03-1" type="text" class="size-small" maxlength="2" v-model="validator.a.deadline.month">/
                            <input id="a03-2" type="text" class="size-small" maxlength="2" v-model="validator.a.deadline.years">
                        </div>
                        <div class="valid-feedback" v-if="validator.a.deadline.valid === false">請填妥有效的信用卡效期</div>
                    </div>
                    <div class="fieldset">
                        <label for="a04">安全碼</label>
                        <div class="form-control">
                            <input id="a04" type="text" class="size-small" maxlength="3" v-model="validator.a.password.value">
                        </div>
                        <div class="valid-feedback" v-if="validator.a.password.valid === false">請填妥有效的信用卡安全碼（CVV）</div>
                    </div>

                    <div class="check-block">
                        <div class="fieldset">
                            <input id="a05" type="checkbox">
                            <label for="a05">儲存卡片資訊</label>
                        </div>
                        <div class="fieldset">
                            <input id="a06" type="checkbox" v-model="validator.a.agree">
                            <label for="a06">我同意接受商家名稱服務條款及隱私權政策</label>
                        </div>
                    </div>
                    <p class="icon-ssl">使用SSL 128 Bit 安全加密機制，保障個人及信用卡資料不外洩</p>
                </div>

                <div v-else-if="paymentCurrent === 'B'" class="form-block">
                    <div class="fieldset">
                        <label for="b01">付款銀行</label>
                        <div class="select">
                            <select id="b01" v-model="banklist.selected">
                                <option v-for="(item, index) in banklist.option" :key="index" :value="item.name">
                                    {{item.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="fieldset">
                        <label for="b02">付款人電子信箱</label>
                        <div class="form-control">
                            <input id="b02" type="text" v-model="validator.b.email.value">
                        </div>
                        <div class="valid-feedback" v-if="validator.b.email.valid === false">請填妥有效的電子信箱</div>
                    </div>
                    <div class="check-block">
                        <div class="fieldset">
                            <input id="b03" type="checkbox" v-model="validator.b.agree">
                            <label for="b03">請再次確認「訂單資訊」與「付款資訊」，付款完成後將發送通知信至您的 E-mail 信箱</label>
                        </div>
                    </div>
                </div>

                <div v-else-if="paymentCurrent === 'C'" class="form-block">
                    <div class="fieldset">
                        <label for="c01">付款超商</label>
                        <div class="select">
                            <select id="c01" v-model="shoplist.selected">
                                <option v-for="(item, index) in shoplist.option" :key="index" :value="item.name">
                                    {{item.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="fieldset">
                        <label for="c02">付款人電子信箱</label>
                        <div class="form-control">
                            <input id="c02" type="text" v-model="validator.c.email.value">
                        </div>
                        <div class="valid-feedback" v-if="validator.c.email.valid === false">請填妥有效的電子信箱</div>
                    </div>
                    <div class="check-block">
                        <div class="fieldset">
                            <input id="c03" type="checkbox" v-model="validator.c.agree">
                            <label for="c03">請再次確認「訂單資訊」與「付款資訊」，付款完成後將發送通知信至您的 E-mail 信箱</label>
                        </div>
                    </div>
                </div>
            </section>

            <div class="controlbar">
                <a href="javascript:;" @click.prevent="goToPrevStep" class="side-left btn btn-secondary">上一步</a>
                <a href="javascript:;" @click.prevent="goToNextStep" class="side-right btn btn-primary">下一步</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                paymentCurrent: 'A',
                paymentSelect: [
                    {
                        id: 'A',
                        name: '使用信用卡付款',
                        icon: 'icon-credit-card'
                    },
                    {
                        id: 'B',
                        name: '使用ATM付款',
                        icon: 'icon-atm'
                    },
                    {
                        id: 'C',
                        name: '使用超商代碼付款',
                        icon: 'icon-shop'
                    }
                ],
                banklist: {
                    selected: '國泰世華銀行',
                    option: [
                        {
                            name: '國泰世華銀行',
                        },
                        {
                            name: '玉山銀行',
                        },
                        {
                            name: '華南銀行',
                        },
                    ]
                },
                shoplist: {
                    selected: '7-11',
                    option: [
                        {
                            name: '7-11',
                        },
                        {
                            name: '全家',
                        },
                        {
                            name: 'OK',
                        },
                    ]
                },
                validator: {
                    a: {
                        card: {
                            number: ['','','',''],
                            valid: true
                        },
                        username: {
                            value: '',
                            valid: true
                        },
                        deadline: {
                            month: '',
                            years: '',
                            valid: true
                        },
                        password: {
                            value: '',
                            valid: true
                        },
                        agree: false,
                    },
                    b: {
                        email: {
                            value: '',
                            valid: true
                        },
                        agree: false
                    },
                    c: {
                        email: {
                            value: '',
                            valid: true
                        },
                        agree: false
                    }
                }
            }
        },
        name: 'payment',
        props: ['product', 'amount'],
        created() {

        },
        mounted() {

        },
        methods: {
            selectPayment(value) {
                this.paymentCurrent = value;
            },
            goToPrevStep() {
                this.$router.replace({path:'shipping'});
            },
            goToNextStep() {
                this.$router.replace({path:'complete'});
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

    /* Product List */
    .productList {
        width: 100%;
        margin-top: 2rem;
        margin-bottom: 1rem;

        tr {
            th, td {
                padding: 7px 5px;
                line-height: 1.4em;
                text-align: left;
                vertical-align: middle;
                &:last-child {
                    text-align: right;
                }
            }

            th {
                font-size: 18px;
                font-weight: bold;
                color: $color-blue-dark;
            }
        }
    }

    /* Heading */
    .heading {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .paymentSelect {
        width: 600px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .paymentSelect-btn {
        width: 180px;
        display: block;
        padding: 15px 10px;
        border-radius: 5px;
        text-align: center;
        background-color: $color-gray-light;
        transition: all 0.2s ease-out;

        > span {
            display: block;
            margin-top: 10px;
        }

        &::before {
            content: '';
            width: 60px;
            height: 80px;
            display: block;
            margin: auto;
            background: {
                repeat: no-repeat;
                position: center;
                size: contain;
            }
        }

        &.icon-credit-card::before {
            background-image: url('../../public/img/icon-credit-card.svg');
        }

        &.icon-atm::before {
            background-image: url('../../public/img/icon-atm.svg');
        }

        &.icon-shop::before {
            background-image: url('../../public/img/icon-shop.svg');
        }

        &.current {
            background-color: $color-blue-dark;

            > span {
                color: $color-white;
            }

            &.icon-credit-card::before {
                background-image: url('../../public/img/icon-credit-card-white.svg');
            }

            &.icon-atm::before {
                background-image: url('../../public/img/icon-atm-white.svg');
            }

            &.icon-shop::before {
                background-image: url('../../public/img/icon-shop-white.svg');
            }
        }
    }

    /* ICON */
    .icon-ssl {
        line-height: 1.6em;

        &::before {
            content: '';
            width: 1.6em;
            height: 1.6em;
            display: inline-block;
            vertical-align: top;
            margin-right: 10px;
            background: {
                image: url('../../public/img/icon-ssl.svg');
                repeat: no-repeat;
                position: center;
                size: contain;
            }
        }
    }

</style>