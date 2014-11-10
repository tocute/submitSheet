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
		var house_id = $("#house_id").val();
		var password = $("#pw_id").val();
		var white_ticket_num = $("#white_ticket_id").val();
		var blue_ticket_num = $("#blue_ticket_id").val();
		
		if(house_id != undefined && password != undefined && white_ticket_num != undefined && blue_ticket_num != undefined && house_id != "" && password != "" && white_ticket_num != "" && blue_ticket_num != "")
		{
			if(checkFieldFormat())
			{
				Parse.Cloud.run("UpdateTicket", 
					{ voteHouseId: house_id, secretPassword:password, candidate7:white_ticket_num, candidate6:blue_ticket_num}, 
					{
	  					success: function(msg) 
	  					{
    						// result is 'Hello world!'
    						showPop(msg+" \n 白："+white_ticket_num +" \n 藍："+blue_ticket_num);
    					},
  						error: function(error) 
  						{
  							/*{
								"code":141,
								"message":"密碼錯誤  請再次確認投票所編號與密碼"
							}*/
  							showAlert(error.message);
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

	var onCreateTable = function (e)
	{
		var VoteHouseObject = Parse.Object.extend("TicketInfoObject");
		for(var i = 1;i<=1534;i++)
		{
			var info = new VoteHouseObject();
		    info.set("voteHouseId", ""+i);
		    info.set("secretPassword", ""+i*2);
		    var temp1 = parseInt(Math.random()*1000);
		    var temp2 = parseInt(Math.random()*1000);

		    info.set("candidate7", ""+temp1);
		    info.set("candidate6", ""+temp2);
		    var district_id = 0;
		    if(i >= 1 && i <= 139)
		    {
		    	district_id = 6301200;  //1北投
		    }
		    else if(i >= 140 && i <= 302)
		    {
		    	district_id = 6301100;  //2士林
		    }
		    else if(i >= 303 && i <= 449)
		    {
		    	district_id = 6301000;  //3內湖
		    }
		    else if(i >= 450 && i <= 521)
		    {
		    	district_id = 6300900;  //4南港
		    }
		    else if(i >= 522 && i <= 636)
		    {
		    	district_id = 6300100;  //5松山
		    }
		    else if(i >= 637 && i <= 777)
		    {
		    	district_id = 6300200; //6信義
		    }
		    else if(i >= 778 && i <= 906)
		    {
		    	district_id = 6300400; //7中山
		    }
		    else if(i >= 907 && i <= 983)
		    {
		    	district_id = 6300600;  //8大同
		    }
		    else if(i >= 984 && i <= 1074)
		    {
		    	district_id = 6300500;  //9中正
		    }
		    else if(i >= 1075 && i <= 1184)
		    {
		    	district_id = 6300700;  //10萬華
		    }
		    else if(i >= 1185 && i <= 1372)
		    {
		    	district_id = 6300300;  //11大安
		    }
		    else if(i >= 1373 && i <= 1534)
		    {
		    	district_id = 6300800;  //12文山
		    }
		    info.set("districtId", ""+district_id);

			info.save(null, {
                            success: function(obj) {},
                            error: function(model, error) {}
                        });
			sleep(100);
		}
	}

	var ResetTable = function(msg) 
    {
    	var TicketInfoObject = Parse.Object.extend("TicketInfoObject");	
        var query = new Parse.Query(TicketInfoObject);
        var is_fail = false;
        for(var i = 1; i<=2; i++)
        {
            if(is_fail)
                break;
            query.equalTo("voteHouseId", ""+i);
            query.find({    
                success: function(results) 
                {
                    if(results.length > 0)
                    {
                        var found_object = results[0];
                        var temp1 = parseInt(Math.random()*10000);
                        var temp2 = parseInt(Math.random()*10000);
                        /*if(msg == undefined)
                        {
                            temp1 = 0;
                            temp2 = 0;
                        }*/

                        found_object.set("candidate7", ""+temp1);
                        found_object.set("candidate6", ""+temp2);

                        found_object.save(null, {
                            success: function(obj) 
                            {
                            },
                            error: function(model, error) 
                            {
                                is_fail = true;
                            }
                        });
                    }
                },
                error: function() 
                {
                    is_fail = true;
                }
            });
            sleep(100);
        }
        if(is_fail)
        	showAlert("更新失敗");
        else
        	showAlert("更新成功");
    }

	$("#btn_submit").on("click",onBtnSubmitClick);
});