$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/order/list',
        datatype: "json",
        colModel: [			
			{ label: 'NO', name: 'orderId', index: 'order_id', width: 50, key: true },
			{ label: 'Order Number', name: 'orderNumber', index: 'order_number', width: 80 },
			{ label: 'Total Number Of Cards', name: 'managerCardNumber', index: 'manager_card_number', width: 80 },
			{ label: 'Amount Of Order', name: 'orderMoney', index: 'order_money', width: 80 },
			{ label: 'Amount Of Payment', name: 'orderPayMoney', index: 'order_pay_money', width: 80 },
            { label: 'Order Status', name: 'orderStatus', index: 'order_status', width: 80 ,
                formatter: function(value, options, row){
					var orderStatus="";
            		if (value==1)orderStatus="<a href=''>Outstanding</a>";
                    if (value==2)orderStatus="Verifying";
                    if (value==3)orderStatus="Proceeding";
                    if (value==4)orderStatus="lssuing";
                    if (value==5)orderStatus="lssued";
                    return orderStatus;
            	}
            }
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: false,
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
		q:{
            orderNumber: null,
			orderStatus: 0
		},
		cardTypes: {},
        amountOfOrder:0,
		showList: true,
		title: null,
        totalCardValue: 0,
        cardTypeDenomination: null,
		applycard: {
			orderNumber: null,
			orderStatus: null,
            orderMoney: null,
            orderPayMoney: null,
            cardTypeName: 0,
			cardType: null,
			cardTotal: null,
            cardTypeDenomination:null
		}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){

			var url = "sys/cardtype/findType"
            $.ajax({
                type: "POST",
                url: baseURL + url,
                dataType: "json",
                success: function(res){
                   if (res.success){
					   	var list = res.cardTypeList;
					   	vm.cardTypes=list;
				   }else{
					   alert(res.msg)
				   }
                }
            });
			vm.showList = false;
			vm.title = "添加";
			vm.cardTypes = {};
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
                postData:{'orderNumber': vm.q.orderNumber,'orderStatus':vm.q.orderStatus},
                page:page
            }).trigger("reloadGrid");
		},
        findAll: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
              postData:{'orderNumber': "",'orderStatus':"0"},
                page:page
            }).trigger("reloadGrid");
        },
        addTable:function () {
			var tradd =document.getElementById("addTB");
			var row = tradd.insertRow(0);

			var trs = document.getElementsByTagName("tr");



            if (vm.applycard.cardTypeName=="Please select"||vm.applycard.cardTotal==null){
					alert("'Card Type 'cannot be empty or 'Please Select' is not a type");
					return;
            }
            for(var a=0;a<vm.cardTypes.length;a++) {
				if(vm.cardTypes[a].cardTypeName==vm.applycard.cardTypeName){
					vm.cardTypeDenomination=vm.cardTypes[a].cardTypeDenomination;
				}
            }
			row.innerHTML="<td style='text-align:center;vertical-align:middle'>"+(trs.length-6)+"</td>" +
						  "<td style='text-align:center;vertical-align:middle'>"+vm.applycard.cardTypeName+'</td>'+
						  "<td style='text-align:center;vertical-align:middle'>"+"$"+vm.cardTypeDenomination.toFixed(2)+'</td>' +
						  "<td style='text-align:center;vertical-align:middle'><input type='text'  onchange='vm.total(this.value," +
						  "this.parentNode.previousSibling.innerText.substring(1)," +
						  "this.parentNode.previousSibling.previousSibling.previousSibling.innerText)' " +
						  "value="+vm.applycard.cardTotal+"></td>";
			tradd.appendChild(row);

            var totalCardValue = vm.applycard.cardTotal*vm.cardTypeDenomination;
            vm.totalCardValue += totalCardValue;
            vm.amountOfOrder = (vm.totalCardValue*1).toFixed(2);

		},
        total:function (number,total,trid) {

            Vue.set(vm.applycard,'cardTotal',number);
			var tradd =document.getElementById("addTB");
            var rows = tradd.rows;

            var a;
            var c;
            var b=0;
            var d;
            vm.totalCardValue=0;
            for(var i=1;i<rows.length;i++){ //遍历表格的行


                if (trid==(rows[i].cells[0].innerHTML)){
                    rows[i].cells[3].innerHTML=
						"<input type=\'text\'  onchange=\'vm.total(this.value," +
						"this.parentNode.previousSibling.innerText.substring(1)," +
						"this.parentNode.previousSibling.previousSibling.previousSibling.innerText)\' " +
						"value="+number+">" +
						"</td>"
                    b +=(parseFloat(total)*parseInt(number));
                   vm.totalCardValue=b;
                }else {
                	a=rows[i].cells[3].childNodes;
                    c=rows[i].cells[2].innerHTML.substring(1);
                    rows[i].cells[3].innerHTML=
						"<input type=\'text\'  onchange=\'vm.total(this.value," +
						"this.parentNode.previousSibling.innerText.substring(1)," +
						"this.parentNode.previousSibling.previousSibling.previousSibling.innerText)\' " +
						"value="+a[0].value+"></td>"
					b += (parseFloat(c)*parseInt(a[0].value));
					vm.totalCardValue=b;
                }




            }
            vm.amountOfOrder = (vm.totalCardValue*1).toFixed(2);



        }
	}
});
