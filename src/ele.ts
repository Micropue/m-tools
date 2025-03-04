//元素操作
interface Actions {

}
interface Returned extends Actions {
    [name: string]: any
    css(option: Array<{
        name: string,
        value: string
    }> | string, value?: string): void
}
export function $(this: any, selector?: string): Returned | Actions {
    const ele = document?.querySelector(selector || "")
    /**
     * 对元素操作
     */
    const features: Returned = {
        css(option, value) {

        }
    }
    /**
     * 非元素型操作
     */
    const actions: Actions = {

    }
    for (const i in features) {
        this[i] = features[i]
    }
    if (selector)
        return features
    else
        return actions
}