import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TDialogId = "fund_account" | "withdraw" | "calculator" | "swap" | "bill" | "airtime" | "pay_bills" | "crypto_funding" | "fiat_funding" | "fund_account_amount_via_fiat" | "withdraw_via_fiat" | "withdraw_via_crypto" | "add_wallet" | "redeem_voucher" | "complete_redeem_voucher" | "success" | "failed" | "select_transaction_type_buy_or_sell" | "select_coin_to_buy_or_sell" | "complete_buy_sell_transaction" | "confirm_buy_or_sell_transaction";

type IDialogData<T = any> = { isOpen: boolean, data?: T, returnedData?: any }

type TDialogKeyFieldStrict = { [K in (TDialogId)]: IDialogData }

type TDialogKeyField = { [K in (TDialogId)]?: IDialogData }


interface IDialogStateStrict extends TDialogKeyFieldStrict {

    get_pin: IDialogData<{ pin: string | null }>;

    failed: IDialogData<{ title: string, desc: string }>,
    success: IDialogData<{ title: string, desc: string }>
}

interface IDialogState extends TDialogKeyField {

    get_pin?: IDialogData<{ pin: string | null }>;
    failed?: IDialogData<{ title: string, desc: string }>,
    success?: IDialogData<{ title: string, desc: string }>
}

interface IDashboardState {
    dialogHistory: Array<TDialogId>,
    state: IDialogStateStrict
}

function lastItemInArray<T>(arr: Array<T>) { return arr[arr.length - 1] }

const initialState: IDashboardState = {
    dialogHistory: [],
    state: {
        fund_account: { isOpen: false, data: {} },
        pay_bills: { isOpen: false, data: {} },
        airtime: { isOpen: false, data: {} },
        calculator: { isOpen: false, data: {} },
        swap: { isOpen: false, data: {} },
        withdraw: { isOpen: false, data: {} },
        fiat_funding: { isOpen: false, data: {} },
        crypto_funding: { isOpen: false, data: {} },
        bill: { isOpen: false, data: {} },
        fund_account_amount_via_fiat: { isOpen: false, data: { method: 'voucher' } },
        withdraw_via_fiat: { isOpen: false, data: 'fiat' },
        withdraw_via_crypto: { isOpen: false, data: 'crypto' },
        add_wallet: { isOpen: false, data: 'crypto' },
        get_pin: { isOpen: false, data: { pin: null, } },
        redeem_voucher: { isOpen: false, data: {} },
        complete_redeem_voucher: { isOpen: false, data: {} },
        failed: { isOpen: false, data: { desc: '', title: '' } },
        success: { isOpen: false, data: { desc: '', title: '' } },
        select_transaction_type_buy_or_sell: { isOpen: false, data: {} },
        select_coin_to_buy_or_sell: { isOpen: false, data: {} },
        complete_buy_sell_transaction: { isOpen: false, data: { currency: '', transactionType: 'buy' } },
        confirm_buy_or_sell_transaction: { isOpen: false, data: { currency: '', transactionType: 'buy', amount: '0' } }
    },
};

const dashboardSlice = createSlice({
    name: "dialogs", initialState: initialState, reducers: {



        openDialog: (state, action: PayloadAction<{ dialogId: TDialogId, data: any }>) => {
            const dialog = action.payload.dialogId;

            if (!state.state[dialog].isOpen) {
                state.dialogHistory.push(dialog);
            }

            //open new dialog and add to dialog history
            state.state[dialog].isOpen = true;
            state.state[dialog].data = action.payload.data;
            console.log(state.state[dialog].isOpen);
            state = JSON.parse(JSON.stringify(state));
        },
        updateDialogData: (state, action: PayloadAction<{ dialog: IDialogState }>) => {
            state.state = { ...state.state, ...action.payload.dialog };
        },
        closeDialog: (state, action: PayloadAction<TDialogId>) => {
            // close dialog and remove it from history
            const dialog = action.payload;
            state.state[dialog].isOpen = false;
        }, closeAllDialog: (state) => {
            Object.keys(state.state).forEach((key: any) => {
                state.state[key as TDialogId].isOpen = false;
            });
        },
        closeAndRemoveAllDialog: (state) => {
            Object.keys(state.state).forEach((key: any) => {
                state.state[key as TDialogId].isOpen = false;
            });
            state.dialogHistory = [];
        },
        closeAndRemove: (state, action: PayloadAction<TDialogId>) => {
            const dialog = action.payload;
            state.state[dialog].isOpen = false;
            state.dialogHistory = state.dialogHistory.filter((e) => e !== dialog);
        },
        goBackDialog: (state, action: PayloadAction<any>) => {
            if (state.dialogHistory.length === 0) {
                Object.keys(state.state).forEach((key: any) => {
                    state.state[key as TDialogId].isOpen = false;
                });
                return;
            }
            const currentDialog = state.dialogHistory.pop() as TDialogId;
            const previousDialog = lastItemInArray<TDialogId>(state.dialogHistory);
            state.state[currentDialog].isOpen = false;

            if (previousDialog) {
                if (action.payload) {
                    state.state[previousDialog].returnedData = action.payload;
                }
                state.state[previousDialog].isOpen = true;
            }

        }

    }
})


export const { closeDialog, closeAndRemoveAllDialog, closeAllDialog, openDialog, updateDialogData, goBackDialog, closeAndRemove } = dashboardSlice.actions;

export default dashboardSlice.reducer;
