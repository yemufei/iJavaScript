var a = JSON.parse('{"layout":{"id":"node_jcpjoi6n","componentName":"Root","children":[{"id":"node_jcpjoi7n","componentName":"CascadeSelectField","children":[]},{"id":"node_jcpjoi7n","componentName":"GroupLayout","children":[{"id":"node_jcpjoi7n","componentName":"CascadeSelectField","children":[],"dataSource": {"type": "URL","url": "aaaaaa"}}]}]}}');
//console.log(a);

if (a.layout) {

    var b = a.layout;
    //console.log(b);

    var urlArr = findUrlArr(a.layout.children);
    console.log(urlArr[0]);

}



function findUrlArr(arrJson) {

    var urlArr = [];
    if (arrJson && arrJson.length > 0) {
        for (var i = 0; i < arrJson.length; i++) {
            urlArr = urlArr.concat(findUrl(arrJson[i]))
        }
    }
    return urlArr
}


function findUrl(objJson) {
    var urlArr = [];

    if (objJson && objJson.componentName && objJson.componentName === "CascadeSelectField") {
        if (objJson.dataSource && objJson.dataSource.url) {
            urlArr.unshift(objJson.dataSource.url);
            if (objJson.children && objJson.children.length > 0) {
                urlArr = urlArr.concat(findUrlArr(objJson.children));
            }

        }
    } else if (objJson.children && objJson.children.length > 0) {
        urlArr = urlArr.concat(findUrlArr(objJson.children));
    }

    return urlArr;
}