import similarity from "string-similarity-algorithm";
import stringSimilarity from "string-similarity";
import {
    banned_token_names,
    FORM_ERROR_AMOUNT,
    FORM_ERROR_COLLECTION,
    FORM_ERROR_NAME, FORM_ERROR_SYMBOL,
    UNKNOWN_ERROR
} from "../../_constants/constants";
import {FormError} from "../../_functions/Error/FormError";

export function validateFormData(data: {name: HTMLInputElement, symbol: HTMLInputElement, amount: HTMLInputElement}) {
    validateNameField(data.name)
    validateSymbolField(data.symbol)
    isValidNumber(data.amount, FORM_ERROR_AMOUNT)
}

function validateNameField(name: HTMLInputElement) {
    isAllowed(name, banned_token_names, FORM_ERROR_NAME)
    hasValidLength(name, 3, 20, FORM_ERROR_NAME)
}

function validateSymbolField(symbol: HTMLInputElement) {
    isAllowed(symbol, banned_token_names, FORM_ERROR_SYMBOL)
    hasValidLength(symbol, 3, 6, FORM_ERROR_SYMBOL)
}

const isAllowed = (element: HTMLInputElement, bannedWords: readonly string[], errorMessages: FORM_ERROR_COLLECTION) => {
    const input = element.value
    let lev = 0
    let lcs = 0
    let sim = 0
    for (const banned_name of bannedWords) {
        let i_lev = similarity(input.toString().toUpperCase(), banned_name, 'levenshtein') as number
        if (i_lev > lev) {
            lev = i_lev
        }
        let i_lcs = similarity(input.toString().toUpperCase(), banned_name, 'lcs') as number
        if (i_lcs > lcs) {
            lcs = i_lcs
        }
        let i_sim = stringSimilarity.compareTwoStrings(input.toString().toUpperCase(), banned_name)
        if (i_sim > sim) {
            sim = i_sim
        }
        if (input?.length > banned_name.length) {
            for (let i = 0; i < (input?.length - banned_name.length); i++) {
                const slice = input.slice(i, i + banned_name.length).toString().toUpperCase()
                i_lev = similarity(slice, banned_name, "levenshtein") as number
                if (i_lev > lev) {
                    lev = i_lev
                }
                i_lcs = similarity(slice, banned_name, "lcs") as number
                if (i_lcs > lcs) {
                    lcs = i_lcs
                }
                i_sim = stringSimilarity.compareTwoStrings(slice, banned_name)
                if (i_sim > sim) {
                    sim = i_sim
                }
            }


        }

        if (lcs > 0.7 || lev > 0.7 || sim > 0.7) {
            throw new FormError(errorMessages.BANNED ?? UNKNOWN_ERROR, element)
        }
    }
    // console.log('%c lev     ' + lev, 'color: red')
    // console.log('%c lcs     ' + lcs, 'color: blue')
    // console.log('%c sim      ' + sim, 'color: purple')
}

const hasValidLength = (element: HTMLInputElement, minLength: number, maxLength: number, errorMessages: FORM_ERROR_COLLECTION) => {
    const input = element.value
    if (input.length < minLength || input.length > maxLength) {
        throw new FormError(errorMessages.LENGTH_INVALID ?? UNKNOWN_ERROR, element)
    }
}

const isValidNumber = (element: HTMLInputElement, errorMessages: FORM_ERROR_COLLECTION) => {
    const input = element.value
    const inputNumber = Number(input.toString())
    const isInteger = Number.isInteger(inputNumber)
    const valid = isInteger && inputNumber > 0 && inputNumber < Math.pow(10, 20)
    if (!valid) throw new FormError(errorMessages.CONTENT_INVALID ?? UNKNOWN_ERROR, element)
}