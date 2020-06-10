chrome.devtools.inspectedWindow.eval(
    "pc.version",
    function (result, isException) {
        if (isException) {
            console.log("The page is not using PlayCanvas");
        } else {
            let version = document.createElement('p');
            version.innerText = 'Engine Version:\t' + result;
            document.body.appendChild(version);
        }
    }
);

chrome.devtools.inspectedWindow.eval(
    "pc.revision",
    function (result, isException) {
        if (isException) {
            console.log("The page is not using PlayCanvas");
        } else {
            let revision = document.createElement('p');
            revision.innerText = 'Engine Revision:\t' + result;
            document.body.appendChild(revision);
        }
    }
);

let code = [
  'function getComponentStats() {',
  '    let systems = pc.app.systems.list;',
  '    let results = [];',
  '    systems.forEach(system => {',
  '        results.push({',
  '            name: system.id,',
  '            count: pc.app.root.findComponents(system.id).length',
  '        });',
  '    });',
  '    return results;',
  '}',
  '',
  'getComponentStats();'
].join('');

chrome.devtools.inspectedWindow.eval(
    code,
    function (result, isException) {
        if (isException) {
            console.log("The page is not using PlayCanvas");
        } else {
            result.forEach(component => {
                if (component.count > 0) {
                  let componentCount = document.createElement('p');
                  componentCount.innerText = component.name + ' ' + component.count;
                  document.body.appendChild(componentCount);
                }
            });
        }
    }
);
