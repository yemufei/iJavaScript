###############################################################################################################################
最终代码################################################################################################################################
save(cb, silent) {
    if (!this.isReady()) {
        return;
    }
    const pages = VisualEngine.Pages.getPages();
    if (pages.length < 1) return;
    const content = this.exportData();
    content.pages[0].id = this.formUuid;
    console.log("---------------start-----------------");
    if (content && content.pages[0] && content.pages[0].layout && content.pages[0].layout.children) {
        var urlArr = this.findUrlArr(content.pages[0].layout.children);
        console.log("--------------------" + urlArr);
        if (urlArr && urlArr.length > 0) {
            var reg = /\/_gw\/\w*/;
            for (var i = 0; i < urlArr.length; i++) {
                console.log("--------step in------------");
                var temp = urlArr[i];
                if (!reg.test(temp)) {
                    // console.log(urlArr[i] + "-----------failed--------");
                    return;
                }
            }
        }
    }

    this.doSave(content, cb, silent);
}



findUrlArr(arrJson) {
    var urlArr = [];
    if (arrJson && arrJson.length > 0) {
        for (var i = 0; i < arrJson.length; i++) {
            urlArr = urlArr.concat(this.findUrl(arrJson[i]))
        }
    }
    return urlArr
}
findUrl(objJson) {
    var urlArr = [];

    if (objJson && objJson.componentName && objJson.componentName === "CascadeSelectField") {
        if (objJson.props && objJson.props.dataSource && objJson.props.dataSource && objJson.props.dataSource.url) {
            urlArr.unshift(objJson.props.dataSource.url);
            if (objJson.children && objJson.children.length > 0) {
                urlArr = urlArr.concat(this.findUrlArr(objJson.children));
            }
        }
    } else if (objJson.children && objJson.children.length > 0) {
        urlArr = urlArr.concat(this.findUrlArr(objJson.children));
    }

    return urlArr;
}






























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