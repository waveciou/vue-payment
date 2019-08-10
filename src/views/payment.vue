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
                            <input v-for="(item, index) in validator.a.card.number" :key="index" :id="`a01-${index + 1}`" type="text" class="size-small" maxlength="4" v-model.trim="validator.a.card.number[index]" @keyup="checkCreditCard">
                        </div>
                        <div class="valid-feedback" v-if="validator.a.card.valid === false">請填妥有效的信用卡</div>
                    </div>
                    <div class="fieldset">
                        <label for="a02">持卡人</label>
                        <div class="form-control">
                            <input id="a02" type="text" v-model.trim="validator.a.username.value" @keyup="checkUserName(validator.a.username)">
                        </div>
                        <div class="valid-feedback" v-if="validator.a.username.valid === false">請填妥信用卡持卡人姓名</div>
                    </div>
                    <div class="fieldset">
                        <label for="a03-1">卡片效期 (MM/YY)</label>
                        <div class="form-control">
                            <div class="select size-small">
                                <select id="a03-1" v-model="validator.a.deadline.month" @change="checkDeadline">
                                    <option v-for="(item, index) in validator.a.deadline.monthList" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                            /
                            <div class="select size-small">
                                <select id="a03-2" v-model="validator.a.deadline.years" @change="checkDeadline">
                                    <option v-for="(item, index) in validator.a.deadline.yearsList" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="valid-feedback" v-if="validator.a.deadline.valid === false">請填妥有效的信用卡效期</div>
                    </div>
                    <div class="fieldset">
                        <label for="a04">安全碼</label>
                        <div class="form-control">
                            <input id="a04" type="text" class="size-small" maxlength="3" v-model.trim="validator.a.password.value" @keyup="checkPassword">
                        </div>
                        <div class="valid-feedback" v-if="validator.a.password.valid === false">請填妥有效的信用卡安全碼（CVV）</div>
                    </div>
                    <div class="fieldset">
                        <label for="a05">電子信箱</label>
                        <div class="form-control">
                            <input id="b05" type="text" v-model.trim="validator.a.email.value" @keyup="checkEmailAddress(validator.a.email)">
                        </div>
                        <div class="valid-feedback" v-if="validator.a.email.valid === false">請填妥有效的電子信箱</div>
                    </div>

                    <div class="check-block">
                        <div class="fieldset">
                            <input id="a06" type="checkbox">
                            <label for="a06">儲存卡片資訊</label>
                        </div>
                        <div class="fieldset">
                            <input id="a07" type="checkbox" v-model="validator.a.agree">
                            <label for="a07">我同意接受商家名稱服務條款及隱私權政策</label>
                        </div>
                    </div>
                    <p class="icon-ssl">使用SSL 128 Bit 安全加密機制，保障個人及信用卡資料不外洩</p>
                </div>

                <div v-else-if="paymentCurrent === 'B'" class="form-block">
                    <div class="fieldset">
                        <label for="b01">訂購人</label>
                        <div class="form-control">
                            <input id="b01" type="text" v-model.trim="validator.b.username.value" @keyup="checkUserName(validator.b.username)">
                        </div>
                        <div class="valid-feedback" v-if="validator.b.username.valid === false">請填妥訂購人姓名</div>
                    </div>
                    <div class="fieldset">
                        <label for="b02">付款銀行</label>
                        <div class="select">
                            <select id="b02" v-model="banklist.selected">
                                <option v-for="(item, index) in banklist.option" :key="index" :value="item.name">
                                    {{item.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="fieldset">
                        <label for="b03">電子信箱</label>
                        <div class="form-control">
                            <input id="b03" type="text" v-model.trim="validator.b.email.value" @keyup="checkEmailAddress(validator.b.email)">
                        </div>
                        <div class="valid-feedback" v-if="validator.b.email.valid === false">請填妥有效的電子信箱</div>
                    </div>
                    <div class="check-block">
                        <div class="fieldset">
                            <input id="b04" type="checkbox" v-model="validator.b.agree">
                            <label for="b04">請再次確認「訂單資訊」與「付款資訊」，付款完成後將發送通知信至您的 E-mail 信箱</label>
                        </div>
                    </div>
                </div>

                <div v-else-if="paymentCurrent === 'C'" class="form-block">
                    <div class="fieldset">
                        <label for="c01">訂購人</label>
                        <div class="form-control">
                            <input id="c01" type="text" v-model.trim="validator.c.username.value" @keyup="checkUserName(validator.c.username)">
                        </div>
                        <div class="valid-feedback" v-if="validator.c.username.valid === false">請填妥訂購人姓名</div>
                    </div>
                    <div class="fieldset">
                        <label for="c02">付款超商</label>
                        <div class="select">
                            <select id="c02" v-model="shoplist.selected">
                                <option v-for="(item, index) in shoplist.option" :key="index" :value="item.name">
                                    {{item.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="fieldset">
                        <label for="c03">電子信箱</label>
                        <div class="form-control">
                            <input id="c03" type="text" v-model.trim="validator.c.email.value" @keyup="checkEmailAddress(validator.c.email)">
                        </div>
                        <div class="valid-feedback" v-if="validator.c.email.valid === false">請填妥有效的電子信箱</div>
                    </div>
                    <div class="check-block">
                        <div class="fieldset">
                            <input id="c04" type="checkbox" v-model="validator.c.agree">
                            <label for="c04">請再次確認「訂單資訊」與「付款資訊」，付款完成後將發送通知信至您的 E-mail 信箱</label>
                        </div>
                    </div>
                </div>
            </section>

            <div class="controlbar">
                <a href="javascript:;" @click.prevent="goToPrevStep" class="side-left btn btn-secondary">上一步</a>
                <a href="javascript:;" @click.prevent="checkPaymentForm" class="side-right btn btn-primary">下一步</a>
            </div>
        </div>
    </div>
</template>

<script>
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';
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
                            monthList: ['01','02','03','04','05','06','07','08','09','10','11','12'],
                            years: '',
                            yearsList: ['19','20','21','22','23','24','25','26','27','28','29','30'],
                            valid: true
                        },
                        password: {
                            value: '',
                            valid: true
                        },
                        email: {
                            value: '',
                            valid: true
                        },
                        agree: false,
                    },
                    b: {
                        username: {
                            value: '',
                            valid: true
                        },
                        email: {
                            value: '',
                            valid: true
                        },
                        agree: false
                    },
                    c: {
                        username: {
                            value: '',
                            valid: true
                        },
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
            },
            valUserName(value) {
                // 驗證姓名
                let reg = /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/;
                if(!reg.test(value) || value == false) {
                    return false
                } else {
                    return true
                }
            },
            valPassword(value) {
                // 驗證安全碼
                let reg = /^\d{3}$/;
                if(reg.test(value)) {
                    return true
                } else {
                    return false
                }
            },
            valCreditCard(arr) {
                // 驗證信用卡號碼
                let value = arr.join('');
                let reg = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|622((12[6-9]|1[3-9][0-9])|([2-8][0-9][0-9])|(9(([0-1][0-9])|(2[0-5]))))[0-9]{10}|64[4-9][0-9]{13}|65[0-9]{14}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})*$/;
                if(reg.test(value) && value !== '') {
                    return true
                } else {
                    return false
                }
            },
            valEmailAddress(value) {
                // 驗證Email地址
                let reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if(reg.test(value) && value !== '') {
                    return true
                } else {
                    return false
                }
            },
            checkUserName(obj) {
                obj.valid = this.valUserName(obj.value);
            },
            checkCreditCard() {
                this.validator.a.card.valid = this.valCreditCard(this.validator.a.card.number);
            },
            checkDeadline() {
                if(this.validator.a.deadline.month === '' || this.validator.a.deadline.years === '') {
                    this.validator.a.deadline.valid = false;
                } else {
                    this.validator.a.deadline.valid = true;
                }
            },
            checkPassword() {
                this.validator.a.password.valid = this.valPassword(this.validator.a.password.value);
            },
            checkEmailAddress(obj) {
                obj.valid = this.valEmailAddress(obj.value);
            },
            checkPaymentForm() {
                let checkForm = false;
                let orderList = [];

                if(this.paymentCurrent === 'A') {
                    this.checkCreditCard();
                    this.checkUserName(this.validator.a.username);
                    this.checkDeadline();
                    this.checkPassword();
                    this.checkEmailAddress(this.validator.a.email);

                    if( this.validator.a.card.valid === true &&
                        this.validator.a.username.valid === true &&
                        this.validator.a.deadline.valid === true &&
                        this.validator.a.password.valid === true)
                    {
                        if(this.validator.a.agree === false) {
                            window.alert('請同意接受商家名稱服務條款及隱私權政策');
                        } else {
                            checkForm = true;

                            let obj = [
                                {
                                    title: '訂購人',
                                    value: this.validator.a.username.value
                                },
                                {
                                    title: '付款方式',
                                    value: '信用卡付款'
                                },
                                {
                                    title: '信用卡號碼',
                                    value: this.validator.a.card.number.join('')
                                },
                                {
                                    title: '電子信箱',
                                    value: this.validator.a.email.value
                                }
                            ]

                            obj.forEach((item) => {
                                orderList.push(item);
                            });
                        }
                    }
                } else if(this.paymentCurrent === 'B') {
                    this.checkUserName(this.validator.b.username);
                    this.checkEmailAddress(this.validator.b.email);

                    if(this.validator.b.email.valid === true) {
                        if(this.validator.b.agree === false) {
                            window.alert('請勾選確認「訂單資訊」與「付款資訊」')
                        } else {
                            checkForm = true;

                            let obj = [
                                {
                                    title: '訂購人',
                                    value: this.validator.b.username.value
                                },
                                {
                                    title: '付款方式',
                                    value: 'ATM付款'
                                },
                                {
                                    title: '付款銀行',
                                    value: this.banklist.selected
                                },
                                {
                                    title: '電子信箱',
                                    value: this.validator.b.email.value
                                }
                            ]

                            obj.forEach((item) => {
                                orderList.push(item);
                            });
                        }
                    }
                } else if(this.paymentCurrent === 'C') {
                    this.checkUserName(this.validator.c.username);
                    this.checkEmailAddress(this.validator.c.email);

                    if(this.validator.c.email.valid === true) {
                        if(this.validator.c.agree === false) {
                            window.alert('請勾選確認「訂單資訊」與「付款資訊」')
                        } else {
                            checkForm = true;

                            let obj = [
                                {
                                    title: '訂購人',
                                    value: this.validator.c.username.value
                                },
                                {
                                    title: '付款方式',
                                    value: '超商付款'
                                },
                                {
                                    title: '付款超商',
                                    value: this.shoplist.selected
                                },
                                {
                                    title: '電子信箱',
                                    value: this.validator.c.email.value
                                }
                            ]

                            obj.forEach((item) => {
                                orderList.push(item);
                            });
                        }
                    }
                }

                if(checkForm === true) {
                    this.$emit('checkOrder', orderList);
                    this.goToNextStep();
                }
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
        @include min-width(1025px) {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .heading-caption {
        margin-bottom: 2rem;
        @include min-width(1025px) {
            margin-bottom: 0px;
        }
    }

    .paymentSelect {
        @include min-width(768px) {
            display: flex;
            justify-content: space-around;
        }

        @include min-width(1025px) {
            width: 600px;
            justify-content: space-around;
            align-items: center;
        }
    }

    .paymentSelect-btn {
        width: 100%;
        display: block;
        padding: 15px 10px;
        margin-bottom: 1rem;
        border-radius: 5px;
        text-align: center;
        background-color: $color-gray-light;
        transition: all 0.2s ease-out;

        @include min-width(768px) {
            width: 180px;
            margin-bottom: 0px;
        }

        > span {
            display: block;
            margin-top: 10px;
        }

        &::before {
            content: '';
            width: 50px;
            height: 70px;
            display: block;
            margin: auto;
            background: {
                repeat: no-repeat;
                position: center;
                size: contain;
            }

            @include min-width(768px) {
                width: 60px;
                height: 80px;
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