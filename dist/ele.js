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
            const tmp = document.createElement("span");
            tmp.innerHTML = template;
            const childArray = Array.from(tmp.childNodes);
            for (const node of childArray) {
                element.append(node);
            }
            return this;
        },
        prepend: function (template) {
            const tmp = document.createElement("span");
            tmp.innerHTML = template;
            const childArray = Array.from(tmp.childNodes).reverse();
            for (const node of childArray) {
                element.prepend(node);
            }
            return this;
        },
        focus: function () {
            const ele = element;
            ele.focus();
            return this;
        },
        blur: function () {
            const ele = element;
            ele.blur();
            return this;
        },
        css: function (name, value) {
            if (!value) {
                return getComputedStyle(element)[name] || null;
            }
            else {
                if (name !== "length" && name !== "parentRule") {
                    element.style.setProperty(name.toString(), value.toString());
                }
                else {
                    console.warn(`尝试修改只读属性: ${name}`);
                }
                return this;
            }
        },
        on: function (type, listener) {
            element.addEventListener(type.toString(), listener);
            return this;
        },
        offset: function () {
            return {
                top: element.offsetTop,
                left: element.offsetLeft,
                width: element.offsetWidth,
                height: element.offsetHeight,
            };
        },
        width: (() => {
            return element.getBoundingClientRect().width;
        })(),
        height: (() => {
            return element.getBoundingClientRect().height;
        })(),
        top: (() => {
            return element.getBoundingClientRect().top;
        })(),
        left: (() => {
            return element.getBoundingClientRect().left;
        })(),
        hide: function () {
            const all = element?.getAttribute("style");
            element.setAttribute("style", all + "; display: none");
            return this;
        },
        show: function () {
            const all = element?.getAttribute("style");
            if (all) {
                element.setAttribute("style", all.replace(/display:[ ]*none/, ""));
            }
            else {
                element.style.display = "initial";
            }
            return this;
        },
        remove: function () {
            element.remove();
        },
        html: function (innerHTML) {
            element.innerHTML = innerHTML;
            return this;
        },
        text: function (innerText) {
            element.innerText = innerText;
            return this;
        },
        innerWidth: function () {
            return window.innerWidth;
        },
        innerHeight: function () {
            return window.innerHeight;
        },
        outerWidth: function () {
            return window.outerWidth;
        },
        outerHeight: function () {
            return window.outerHeight;
        },
        scrollTo: function (scrollHeight) {
            element.scrollTop = scrollHeight;
            return this;
        },
        fadeIn: function () {
            throw new Error("Function not implemented.");
        },
        fadeOut: function () {
            throw new Error("Function not implemented.");
        },
    };
    return core;
};
export function $(selector) {
    const ele = document.querySelectorAll(selector);
    if (ele.length > 1) {
        const rst = [];
        ele.forEach((self) => rst.push(useCore(self)));
        return rst;
    }
    else {
        return useCore(ele[0]);
    }
}
