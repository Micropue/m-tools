const useCore = (element) => {
    const core = {
        value: element,
        attr: function (prop, value) {
            if (!prop)
                throw new Error("can't find parameter: 'prop'");
            if (value) {
                element.setAttribute(prop, value);
                return this;
            }
            else {
                return element.getAttribute(prop) ?? false;
            }
        },
        classList: (() => {
            return [...element.classList];
        })(),
        hasClass: function (className) {
            return this.classList.includes(className);
        },
        addClass: function (className) {
            if (!className)
                throw new Error("can't find parameter: 'className'");
            element.classList.add(className);
            return this;
        },
        removeClass: function (className) {
            if (!className)
                throw new Error("can't find parameter: 'className'");
            element.classList.remove(className);
            return this;
        },
        toggleClass: function (className) {
            if (!className)
                throw new Error("can't find parameter: 'className'");
            if (this.classList.includes(className)) {
                element.classList.remove(className);
            }
            else {
                element.classList.add(className);
            }
            return this;
        },
        append: function (template) {
            return this;
        },
        prepend: function (template) {
            throw new Error("Function not implemented.");
        },
        focus: function () {
            throw new Error("Function not implemented.");
        },
        blur: function () {
            throw new Error("Function not implemented.");
        },
        css: function (name, value) {
            throw new Error("Function not implemented.");
        },
        on: function (type, listener) {
            throw new Error("Function not implemented.");
        },
        offset: function () {
            throw new Error("Function not implemented.");
        },
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        hide: function () {
            throw new Error("Function not implemented.");
        },
        show: function () {
            throw new Error("Function not implemented.");
        },
        remove: function () {
            throw new Error("Function not implemented.");
        },
        html: function (innerHTML) {
            throw new Error("Function not implemented.");
        },
        text: function (innerText) {
            throw new Error("Function not implemented.");
        },
        innerWidth: function () {
            throw new Error("Function not implemented.");
        },
        innerHeight: function () {
            throw new Error("Function not implemented.");
        },
        outerWidth: function () {
            throw new Error("Function not implemented.");
        },
        outerHeight: function () {
            throw new Error("Function not implemented.");
        },
        each: function (eachItems) {
            throw new Error("Function not implemented.");
        },
        scrollTo: function (scrollHeight) {
            throw new Error("Function not implemented.");
        },
        fadeIn: function () {
            throw new Error("Function not implemented.");
        },
        fadeOut: function () {
            throw new Error("Function not implemented.");
        }
    };
    return core;
};
export function $(selector) {
    const ele = document.querySelectorAll(selector);
    if (ele.length > 1) {
        const rst = [];
        ele.forEach(self => rst.push(useCore(self)));
        return rst;
    }
    else {
        return useCore(ele[0]);
    }
}
