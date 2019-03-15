$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/cardtype/list',
        datatype: "json",
        colModel: [			
			{ label: 'cardTypeId', name: 'cardTypeId', index: 'card_type_id', width: 50, key: true },
			{ label: '', name: 'cardTypeName', index: 'card_type_name', width: 80 }, 			
			{ label: '', name: 'cardTypeDenomination', index: 'card_type_denomination', width: 80 }, 			
			{ label: '', name: 'cardTypeValidity', index: 'card_type_validity', width: 80 }, 			
			{ label: '', name: 'cardTypeStatus', index: 'card_type_status', width: 80 }, 			
			{ label: '', name: 'cardTypeCreatetime', index: 'card_type_createtime', width: 80 }, 			
			{ label: '', name: 'cardTypeModifytime', index: 'card_type_modifytime', width: 80 }			
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
		cardType: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.cardType = {};
		},
		update: function (event) {
			var cardTypeId = getSelectedRow();
			if(cardTypeId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(cardTypeId)
		},
		saveOrUpdate: function (event) {
			var url = vm.cardType.cardTypeId == null ? "sys/cardtype/save" : "sys/cardtype/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.cardType),
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
			var cardTypeIds = getSelectedRows();
			if(cardTypeIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/cardtype/delete",
                    contentType: "application/json",
				    data: JSON.stringify(cardTypeIds),
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
		getInfo: function(cardTypeId){
			$.get(baseURL + "sys/cardtype/info/"+cardTypeId, function(r){
                vm.cardType = r.cardType;
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