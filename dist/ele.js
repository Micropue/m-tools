export function $(selector) {
    const ele = document?.querySelector(selector || "");
    const features = {
        css(option, value) {
        }
    };
    for (const i in features) {
        this[i] = features[i];
    }
    return features;
}
