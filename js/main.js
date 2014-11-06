$(document).on("mobileinit",function(e)
{
	
});

$(document).on("pageinit","#page-1",function(e)
{
	Parse.initialize("766GgtZAVp0Z7GB6kZX3ahMHDbAgir1N4GKQnlDA", "cBJFTgN2y7YWDB1VQYD9l6h06wcWm1zeTsnIWn6N");
	
	var VoteHouseId = null;
	var VoteHousePassword = null;

	var checkPasswordValid = function (id, pw, white_ticket_num, blue_ticket_num)
	{
		if(VoteHouseId != id || VoteHousePassword != pw)
			VoteHousePassword = null;

		if(VoteHousePassword == null)
		{
			var VoteHouseObject = Parse.Object.extend("VoteHouseObject");
			var query = new Parse.Query(VoteHouseObject);
			query.equalTo("VoteHouseId", id);
			query.find({
  				success: function(results) 
  				{
   					 if(results.length >= 1)
   					 {
						object = results[0];
      					var temp_pw = object.get('secretPassword');
      					if(temp_pw == pw)
      					{
      						VoteHousePassword = temp_pw;
      						VoteHouseId = object.get('VoteHouseId');
      						searchObjectByHouseID(VoteHouseId,white_ticket_num,blue_ticket_num);
      					}
      					else
      					{
      						alert("密碼錯誤  請再次確認投票所編號與密碼");
      						$("#pw_id").val("");
      					}
   					 }	
  				},
  				error: function(error) 
  				{
    				alert("網路不穩  傳送失敗");
  				}
			});
		}
		else
			searchObjectByHouseID(VoteHouseId,white_ticket_num,blue_ticket_num);	
	}
	
	var checkFieldFormat = function ()
	{
		var is_valid = true;

		if(!$.isNumeric($("#house_id").val()))
		{
			$("#house_id").val("");
			is_valid = false;
		}	
		if(!$.isNumeric($("#white_ticket_id").val()))
		{
			$("#white_ticket_id").val("");
			is_valid = false;
		}	
		if(!$.isNumeric($("#blue_ticket_id").val()))
		{
			$("#blue_ticket_id").val("");
			is_valid = false;
		}	

		return is_valid;
	}

 	var submitInfo = function(object_ID,house_id, white_ticket_num, blue_ticket_num)
 	{
 		var TicketInfoObject = Parse.Object.extend("TicketInfoObject");
		var ticketsInfo = new TicketInfoObject();
	    ticketsInfo.set("id", object_ID);
	    ticketsInfo.set("house_id", house_id);
		ticketsInfo.set("white_ticket_num", white_ticket_num);
	    ticketsInfo.set("blue_ticket_num", blue_ticket_num);
				    
		ticketsInfo.save(null, {
		    success: function(object) 
		    {
		      	showPop("已成功傳送更新資料");
		    },
		    error: function(model, error) 
		    {
		        alert("網路不穩  傳送失敗");
		    }
		});
 	}

    var searchObjectByHouseID = function(house_id, white_ticket_num, blue_ticket_num)
    {
		var TicketInfoObject = Parse.Object.extend("TicketInfoObject");
		var query = new Parse.Query(TicketInfoObject);
		query.equalTo("house_id", house_id);
		query.find({
	  		success: function(results) 
  			{
  				var object_ID = null;
   				if(results.length >= 1)
   				{
					var object = results[0];
      				object_ID = object.id	
   				}	
   				submitInfo(object_ID,house_id, white_ticket_num, blue_ticket_num);
  			},
  			error: function(error) 
  			{
   				alert("網路不穩  傳送失敗");
   				return false;
  			}
		});
    }

	var onBtnSubmitClick = function (e)
	{
		var house_id = $("#house_id").val();
		var password = $("#pw_id").val();
		var white_ticket_num = $("#white_ticket_id").val();
		var blue_ticket_num = $("#blue_ticket_id").val();
		

		if(house_id != undefined && password != undefined && white_ticket_num != undefined && blue_ticket_num != undefined)
		{
			if(checkFieldFormat())
			{
				checkPasswordValid(house_id,password,white_ticket_num, blue_ticket_num);
			}
			else
			{
				alert("格式錯誤");
			}
		}	
		else	
		{
			alert("有欄位尚未填寫");
		}
	}
	
	var showPop = function (msg)
	{
		$("#popupText").html(msg);
		$("#popupBasic").popup( "open" );
		setTimeout(function() {
     		$( "#popupBasic" ).popup( "close" );
		}, 800);
	}

	/*var onBtnCreateClick = function (e)
	{
		var VoteHouseObject = Parse.Object.extend("TicketInfoObject");
		for(var i = 1;i<1640;i++)
		{
			var info = new VoteHouseObject();
		    info.set("house_id", ""+i);
		    var temp1 = parseInt(Math.random()*10000);
		    var temp2 = parseInt(Math.random()*10000);

		    info.set("white_ticket_num", ""+temp1);
		    info.set("blue_ticket_num", ""+temp2);
		    
			info.save(null, {
		    	success: function(object) 
			    {

			    },
		        error: function(model, error) 
				{

				}
			});
		}
	}*/
	
	/*var onBtnCreateClick = function (e)
	{
		var VoteHouseObject = Parse.Object.extend("VoteHouseObject");
		for(var i = 0;i<1635;i++)
		{
			var info = new VoteHouseObject();
		    info.set("VoteHouseId", ""+i);
		    info.set("secretPassword", ""+i*2);
				    
			info.save(null, {
		    	success: function(object) 
			    {

			    },
		        error: function(model, error) 
				{

				}
			});
		}

	}*/

	/*var onBtnRoadman = function()
	{
		var TicketInfoObject = Parse.Object.extend("TicketInfoObject");
		var query = new Parse.Query(TicketInfoObject);
		//query.equalTo("house_id", "10");
		query.greaterThan("house_id", "10");
		query.lessThanOrEqualTo("house_id", "20");
		query.find({
	  		success: function(results) 
  			{
  				alert(results[0]);
  				results[0].id
  			},
  			error: function(error) 
  			{
   				alert("網路不穩  傳送失敗");
   				return false;
  			}
		});
	}*/

	$("#btn_submit").on("click",onBtnSubmitClick);
	//$("#btn_submit").on("click",onBtnRoadman);

});