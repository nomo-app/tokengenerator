export const banned_token_names = [
    'ZENIQ',
    '🐟',
    '👏👏👏',
    '👏',
    'TUPAN',
    'AVINOC',
    'VOO'
] as const

export const banned_symbol_names = [
    'ZENIQ',
    '🐟',
    '👏👏👏',
    '👏',
    'TUPAN',
    'AVINOC',
    'VOO'
] as const

export const UNKNOWN_ERROR = 'An unknown error has occured. Please try with different data!'
export const TOO_LITTLE_BALANCE_ERROR = 'It seems you have too little balance for creating a token. Make sure to get free Zeniq Token via the Zeniq Faucet Plugin'
export const ABORT_GENERATION_ERROR = 'It seems you did not authorize the transaction for generating your token.'

export const localStoragePrefix = 'nomo_tg_'

export const ids = {
    nameField: 'name',
    amountField: 'amount',
    symbolField: 'symbol'
} as const

export type FORM_ERROR_COLLECTION = {
    BANNED?: string,
    LENGTH_INVALID?: string,
    CONTENT_INVALID?: string
}
export const FORM_ERROR_NAME: FORM_ERROR_COLLECTION = {
    BANNED: 'Please choose another name!',
    LENGTH_INVALID: 'The name has to be between 3 and 20 symbols!',
} as const

export const FORM_ERROR_SYMBOL: FORM_ERROR_COLLECTION = {
    BANNED: 'Please choose another symbol!',
    LENGTH_INVALID: 'The symbol has to be between 3 and 6 symbols!'
} as const

export const FORM_ERROR_AMOUNT: FORM_ERROR_COLLECTION = {
    CONTENT_INVALID: 'Please enter a valid number!',
} as const
