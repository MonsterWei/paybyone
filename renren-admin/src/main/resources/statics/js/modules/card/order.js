$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/order/list',
        datatype: "json",
        colModel: [			
			{ label: 'orderId', name: 'orderId', index: 'order_id', width: 50, key: true },
			{ label: '', name: 'orderNumber', index: 'order_number', width: 80 }, 			
			{ label: '', name: 'orderAgentId', index: 'order_agent_id', width: 80 }, 			
			{ label: '', name: 'orderStatus', index: 'order_status', width: 80 }, 			
			{ label: '', name: 'orderMoney', index: 'order_money', width: 80 }, 			
			{ label: '', name: 'orderPayway', index: 'order_payway', width: 80 }, 			
			{ label: '', name: 'orderPayMoney', index: 'order_pay_money', width: 80 }, 			
			{ label: '', name: 'orderPayDate', index: 'order_pay_date', width: 80 }, 			
			{ label: '', name: 'orderExchange', index: 'order_exchange', width: 80 }, 			
			{ label: '', name: 'orderCreatetime', index: 'order_createtime', width: 80 }, 			
			{ label: '', name: 'orderModifytime', index: 'order_modifytime', width: 80 }, 			
			{ label: '', name: 'orderCreateby', index: 'order_createby', width: 80 }, 			
			{ label: '', name: 'orderModifyby', index: 'order_modifyby', width: 80 }, 			
			{ label: '', name: 'orderDeleteFlag', index: 'order_delete_flag', width: 80 }			
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
		order: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.order = {};
		},
		update: function (event) {
			var orderId = getSelectedRow();
			if(orderId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(orderId)
		},
		saveOrUpdate: function (event) {
			var url = vm.order.orderId == null ? "sys/order/save" : "sys/order/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.order),
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
			var orderIds = getSelectedRows();
			if(orderIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/order/delete",
                    contentType: "application/json",
				    data: JSON.stringify(orderIds),
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
		getInfo: function(orderId){
			$.get(baseURL + "sys/order/info/"+orderId, function(r){
                vm.order = r.order;
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