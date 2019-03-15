$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/manager/list',
        datatype: "json",
        colModel: [			
			{ label: 'managerId', name: 'managerId', index: 'manager_id', width: 50, key: true },
			{ label: '', name: 'managerCardId', index: 'manager_card_id', width: 80 }, 			
			{ label: '', name: 'managerOrderId', index: 'manager_order_id', width: 80 }, 			
			{ label: '', name: 'managerCardNumber', index: 'manager_card_number', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		manager: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.manager = {};
		},
		update: function (event) {
			var managerId = getSelectedRow();
			if(managerId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(managerId)
		},
		saveOrUpdate: function (event) {
			var url = vm.manager.managerId == null ? "sys/manager/save" : "sys/manager/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.manager),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var managerIds = getSelectedRows();
			if(managerIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/manager/delete",
                    contentType: "application/json",
				    data: JSON.stringify(managerIds),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(managerId){
			$.get(baseURL + "sys/manager/info/"+managerId, function(r){
                vm.manager = r.manager;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});