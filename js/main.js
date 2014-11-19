$(document).on("mobileinit",function(e)
{
	
});

$(document).on("pageinit","#page-1",function(e)
{
	Parse.initialize("CPFQXuoHErkxiN8b3uDFuGuGBnZbLen9jglvAB4p", "qvHqLCDitrqkwAL3bSbMfbdcYlUY9wlfVJZmom3S");	
    $('#popupDialog').css({'width':$(window).width()*0.8});

	var checkFieldFormat = function ()
	{
		var is_valid = true;
		var check_num = $("#house_id").val();
		if(!$.isNumeric(check_num) || check_num <= 0 || parseInt(check_num) != check_num)
		{
			$("#house_id").val("");
			is_valid = false;
		}	
		
		check_num = $("#white_ticket_id").val();
		if(!$.isNumeric(check_num) || check_num < 0 || parseInt(check_num) != check_num)
		{
			$("#white_ticket_id").val("");
			is_valid = false;
		}

		check_num = $("#blue_ticket_id").val();
		if(!$.isNumeric(check_num) || check_num < 0 || parseInt(check_num) != check_num)
		{
			$("#blue_ticket_id").val("");
			is_valid = false;
		}	

		return is_valid;
	}
	
	var onBtnSubmitClick = function (e)
	{
		var house_id = parseInt($("#house_id").val());
		var password = $("#pw_id").val();
		var white_ticket_num = parseInt($("#white_ticket_id").val());
		var blue_ticket_num = parseInt($("#blue_ticket_id").val());
		
		if(house_id != undefined && password != undefined && white_ticket_num != undefined && blue_ticket_num != undefined && house_id != "" && password != "" && white_ticket_num != "" && blue_ticket_num != "")
		{
			if(checkFieldFormat())
			{
				$.mobile.loading( 'show', {
					text: 'loading',
					textVisible: true,
					theme: 'a',
					html: ""
				});
				
				$("#btn_submit").addClass("ui-disabled");
				Parse.Cloud.run("UpdateTicket", 
					{ voteHouseId: house_id, secretPassword:password, candidate7:white_ticket_num, candidate6:blue_ticket_num}, 
					{
	  					success: function(msg) 
	  					{
    						// result is 'Hello world!'
    						showPop(msg+" \n 白："+white_ticket_num +" \n 藍："+blue_ticket_num);
    						$.mobile.loading( 'hide' );
    						$("#btn_submit").removeClass("ui-disabled");
    					},
  						error: function(error) 
  						{
  							/*{
								"code":141,
								"message":"密碼錯誤  請再次確認投票所編號與密碼"
							}*/
  							showAlert(error.message);
  							$.mobile.loading( 'hide' );
  							$("#btn_submit").removeClass("ui-disabled");
  						}
					});
			}
			else
			{
				showAlert("格式錯誤");
			}
		}	
		else	
		{
			showAlert("有欄位尚未填寫");
		}
	}

	var showPop = function (msg)
	{
		$("#popupBasic #popupText").html(msg);
		$("#popupBasic").popup( "open" );
		setTimeout(function() {
     		$( "#popupBasic" ).popup( "close" );
		}, 1200);
	}

	var showAlert = function (msg)
	{
		$("#popupDialog #popupText").html(msg);
		$("#popupDialog").popup( "open" );
	}

	// Parse.com 30 request/sec
	function sleep(milliseconds) 
	{
  		var start = new Date().getTime();
  		for (var i = 0; i < 1e7; i++) 
  		{
    		if ((new Date().getTime() - start) > milliseconds)
    		{
      			break;
    		}
  		}
	}

	$("#btn_submit").on("click",onBtnSubmitClick);
});