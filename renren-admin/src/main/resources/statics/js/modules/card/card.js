$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/card/list',
        datatype: "json",
        colModel: [			
			{ label: 'cardId', name: 'cardId', index: 'card_id', width: 50, key: true },
			{ label: '', name: 'cardNumber', index: 'card_number', width: 80 }, 			
			{ label: '', name: 'cardAgentId', index: 'card_agent_id', width: 80 }, 			
			{ label: '', name: 'cardTypeId', index: 'card_type_id', width: 80 }, 			
			{ label: '', name: 'cardDueDate', index: 'card_due_date', width: 80 }, 			
			{ label: '', name: 'cardStatus', index: 'card_status', width: 80 }, 			
			{ label: '', name: 'cardOrderCreatetime', index: 'card_order_createtime', width: 80 }, 			
			{ label: '', name: 'cardOrderModifytime', index: 'card_order_modifytime', width: 80 }, 			
			{ label: '', name: 'cardCreatecardTime', index: 'card_createcard_time', width: 80 }			
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
		card: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.card = {};
		},
		update: function (event) {
			var cardId = getSelectedRow();
			if(cardId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(cardId)
		},
		saveOrUpdate: function (event) {
			var url = vm.card.cardId == null ? "sys/card/save" : "sys/card/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.card),
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
			var cardIds = getSelectedRows();
			if(cardIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/card/delete",
                    contentType: "application/json",
				    data: JSON.stringify(cardIds),
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
		getInfo: function(cardId){
			$.get(baseURL + "sys/card/info/"+cardId, function(r){
                vm.card = r.card;
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