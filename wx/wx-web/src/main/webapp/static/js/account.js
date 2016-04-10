/**
 * Created by Admin on 2016/4/10.
 */
$(function () {
    $('#btnSave').click(saveAccount);
});

function add() {
    Tools.showModel('#popModel');
    var input = $('#formAccount input');
    input.each(function (index, el) {
        $(el).val(null)
    });

    $('#remark').val(null);
    $('#type').val(-1);
}

function edit() {

}

function del() {
    var input = $('.chkId:checked');
    var data = new Array();
    input.each(function (index, el) {
        data.push(parseInt($(el).attr('val')));
    });
    if (data.length == 0) {
        Tools.showToast("请选择要删除的数据")
        return;
    }

    $.ajax({
        url: '/account/deleteAccount',
        type: 'POST',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json",
        traditional: true,
        success: function (resp) {
            Tools.hideModel();
            if (resp.success) {
                Tools.showToast('删除成功');
                pager.loadData();
            } else {
                Tools.showToast(resp.info)
            }
        },
        error: function (resp) {
            Tools.showToast('系统出错，请稍后再试');
        }
    })
}

/**
 * 执行保存操作
 */
function saveAccount() {
    $('#btnSave').attr('disabled', 'disabled');
    var data = {};
    var input = $('#formAccount input');

    input.each(function (index, el) {
        var loc = $(el);
        data[loc.attr('id')] = loc.val();
    });
    data['type'] = $('#type').val();
    data['remark'] = $('#remark').val();
    if (data.id == '') {
        data.id = 0;
    }
    var msg = valid(data);
    if (msg != "") {
        Tools.showToast(msg);
        $('#btnSave').removeAttr('disabled');
        return;
    }

    $.ajax({
        url: '/account/addAccount',
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function (resp) {
            Tools.hideModel();
            $('#btnSave').removeAttr('disabled');
            if (resp.success) {
                Tools.showToast('保存成功');
                pager.loadData();
            } else {
                Tools.showToast(resp.info);
            }
        },
        error: function (resp) {
            Tools.showToast('系统出错，请稍后再试');
            $('#btnSave').removeAttr('disabled');
        }
    })
}

function valid(data) {
    var msg = "";
    var index = 1;
    if (data.name == '') {
        msg += index + ".账号名不能为空<br/>";
        index++;
    }
    if (data.appid == '') {
        msg += index + ".appid不能为空<br/>";
        index++;
    }
    if (data.secret == '') {
        msg += index + ".secret不能为空<br/>";
        index++;
    }
    if (data.type == '' || data.type == -1) {
        msg += index + ".公众号类型不能为空<br/>";
    }
    return msg;
}