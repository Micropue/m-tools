export function $(selector) {
    const ele = document?.querySelector(selector || "");
    const features = {
        css(option, value) {
        }
    };
    const actions = {};
    for (const i in features) {
        this[i] = features[i];
    }
    if (selector)
        return features;
    else
        return actions;
}
