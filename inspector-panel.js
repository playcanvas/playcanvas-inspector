function createElement(type, parent, innerText) {
    const el = document.createElement(type);
    if (innerText) {
        el.innerText = innerText;
    }
    parent.appendChild(el);
    return el;
}

chrome.devtools.inspectedWindow.eval(
    "pc.version",
    function (result, isException) {
        if (isException) {
            console.log("The page is not using PlayCanvas");
        } else {
            createElement('p', document.body, 'Engine Version:\t' + result);
        }
    }
);

chrome.devtools.inspectedWindow.eval(
    "pc.revision",
    function (result, isException) {
        if (isException) {
            console.log("The page is not using PlayCanvas");
        } else {
            createElement('p', document.body, 'Engine Revision:\t' + result);
        }
    }
);

const code = [
    'function getComponentStats() {',
    '    let systems = pc.app.systems.list;',
    '    let results = [];',
    '    systems.forEach(system => {',
    '        let components = pc.app.root.findComponents(system.id);',
    '        let enabled = components.filter(component => {',
    '            return component.enabled && component.entity.enabled;',
    '        }).length;',
    '        results.push({',
    '            name: system.id,',
    '            enabled: enabled,',
    '            total: components.length',
    '        });',
    '    });',
    '    return results;',
    '}',
    '',
    'getComponentStats();'
].join('\n');

chrome.devtools.inspectedWindow.eval(
    code,
    function (result, isException) {
        if (isException) {
            console.log("The page is not using PlayCanvas");
        } else {
            const table = createElement('table', document.body);
            let row = createElement('tr', table);
            createElement('th', row, 'Component');
            createElement('th', row, 'Enabled');
            createElement('th', row, 'Total');

            result.forEach((system) => {
                if (system.total > 0) {
                    row = createElement('tr', table);
                    createElement('td', row, system.name);
                    createElement('td', row, system.enabled);
                    createElement('td', row, system.total);
                }
            });
        }
    }
);

var onDocumentLoaded = function () {
    // Handler when the DOM is fully loaded
    var injectorUrl = chrome.runtime.getURL('playcanvas-devtools/injector.js');

    // Getting the base URL so we can inject the other scripts
    var baseUrl = injectorUrl.replace('injector.js', '');

    // Override the url to load from for the injector script
    chrome.devtools.inspectedWindow.eval("window.__overrideurl__ = '" + baseUrl + "';");
    var injectorCode = "(function(){var a=document.createElement('script');a.src='" + injectorUrl + "';document.head.appendChild(a);})();";
    var addDevtoolsButton = document.getElementById("add-devtools-button");
    addDevtoolsButton.onclick = function () {
        chrome.devtools.inspectedWindow.eval(injectorCode);
        chrome.devtools.inspectedWindow.eval("console.log('Added PlayCanvas Devtools');");
    };
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    onDocumentLoaded();
} else {
    document.addEventListener("DOMContentLoaded", onDocumentLoaded);
}
