import { SaluteHandler } from '@salutejs/scenario'
import * as dictionary from './system.i18n'
import { countCheapest, getWeightAndCost } from './utils/utils'


export const runAppHandler: SaluteHandler = ({ req, res }, dispatch) => {
    const keyset = req.i18n(dictionary)
    const helloText = keyset('Привет')
    res.setPronounceText(helloText)
    res.appendBubble(helloText)
    console.log('runAppHandler')
}

export const noMatchHandler: SaluteHandler = ({ req, res }) => {
    const keyset = req.i18n(dictionary)
    const errorText = keyset('404')
    res.setPronounceText(errorText)
    res.appendBubble(errorText)
}

export const whatIsChipperHandler: SaluteHandler = ({ req, res }) => {
    const { cost1, cost2, weight1, weight2 } = getWeightAndCost(req.message.human_normalized_text)

    if (typeof cost1 === 'number' && typeof cost2 === 'number' && typeof weight1 === 'number' && typeof weight2 === 'number') {
        const { cheapest, percentage } = countCheapest(cost1, cost2, weight1, weight2)
        if (cheapest) {
            const percentageStringArr = percentage.toString().split('')
            const lastPercentageChar = percentageStringArr[percentageStringArr.length - 1]
            const last2PercentageChar = percentageStringArr[percentageStringArr.length - 2]
            res.setPronounceText(`<speak>${cheapest === 1 ? 'Первый' : 'Второй'} вариант выгоднее на ${percentage}, ${last2PercentageChar !== '1' ? lastPercentageChar === '1' ? 'процент' :
                lastPercentageChar === '2' || lastPercentageChar === '3' || lastPercentageChar === '4' ? 'процента' : 'процентов' : 'процентов'} </speak>`, {ssml: true})
            res.appendBubble(`${cheapest === 1 ? 'Первый' : 'Второй'} вариант выгоднее на ${percentage}%.`)
        } else {
            res.setPronounceText(`Тут разницы в цене вообще нет.`)
            res.appendBubble(`Тут разницы в цене вообще нет.`)
        }
    } else {
        const keyset = req.i18n(dictionary)
        const text = keyset('Привет')
        res.setPronounceText(text)
        res.appendBubble(text)
    }
}
