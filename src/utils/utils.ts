
export function getRandomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(arr.length * Math.random())]
}

export function getWeightAndCost(human_normalized_text: string){
    const humanNormalizedTextArr = human_normalized_text.split(' ')
    const arr = []
    for (let i = 0; i < humanNormalizedTextArr.length; i++) {
        if (Number(humanNormalizedTextArr[i])){
            if (humanNormalizedTextArr[i + 1] === 'килограмм' || humanNormalizedTextArr[i + 1] === 'литр'){
                arr.push(Number(humanNormalizedTextArr[i])*1000)
            } else if (humanNormalizedTextArr[i + 1] === 'тонна'){
                arr.push(Number(humanNormalizedTextArr[i])*1000_000)
            } else {
                arr.push(Number(humanNormalizedTextArr[i]))
            }
        }
    }
    return {
        weight1: arr[0],
        cost1: arr[1],
        weight2: arr[2],
        cost2: arr[3]
    }
}

export function countCheapest(cost1: number, cost2: number, weight1: number, weight2: number){
    const costForGram1 = cost1 / weight1
    const costForGram2 = cost2 / weight2

    if (costForGram1 > costForGram2){
        return {
            cheapest: 2,
            percentage: Math.round((costForGram1 - costForGram2) / costForGram2 * 100)
        }
    } else if (costForGram1 < costForGram2){
        return {
            cheapest: 1,
            percentage: Math.round((costForGram2 - costForGram1) / costForGram1 * 100)
        }
    } else {
        return {
            cheapest: 0,
            percentage: 0
        }
    }
}