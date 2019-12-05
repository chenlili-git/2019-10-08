// 面包屑
let $breadcrumb = $('#breadcrumb');
function breadcrumb(id) {
    $breadcrumb.html('');
    let pary = getParents(data, id);
    //找当前id下的所有父级包括自己
    pary.forEach((item, i, all) => {
        let $navChild = null;
        //如果item是数组的最后一项，那么元素应为span
        if (i === all.length - 1) {
            $navChild = $('<span>' + item.title + '</span>')
        } else {
            $navChild = $('<a href="javascript:void(0);">' + item.title + '<i>><i></a>')
        }

        //点击面包屑，让文件夹和面包屑一起动
        $navChild.click(function (ev) {
            //console.log(ev.currentTarget)
            if (ev.currentTarget === 'span') return null;
            // console.log(tools.getChild(data,3));

            //清除无数据时的图片提示 展示显示文件夹的画布
            $fBox.show();
            $cheackAll.show();
            $noData.hide();
            //清除全选样式        
            clearCheckAllClass();
            //每点击一次面包屑按钮都把全选的数据清除一次
            getChildrenFolders(data, id).forEach(item => item.checked = false);
            render(item.id);
            breadcrumb(item.id);
            //联动左侧的tree
            treePosition(item.id);
        });
        $breadcrumb.append($navChild);
    });
}
breadcrumb(0);