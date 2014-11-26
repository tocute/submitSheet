$(document).on("pageinit","#page-2",function(e)
{
	Parse.initialize("CPFQXuoHErkxiN8b3uDFuGuGBnZbLen9jglvAB4p", "qvHqLCDitrqkwAL3bSbMfbdcYlUY9wlfVJZmom3S");	
    $('#popupDialog').css({'width':$(window).width()*0.8});
    var mHouseID = 1;
    var mCalTimer = null;
    var mIsUpdateFail = false;
	
	var ResetTable = function(msg) 
    {
      	$("#house_progress").val(0);
       	$("#house_progress").slider("refresh");
       	mHouseID = 1;
       	mIsUpdateFail = false;

        mCalTimer = setInterval(function() 
        {
        	console.log("Update : "+mHouseID);
            $("#house_progress").val(mHouseID);
            $("#house_progress").slider("refresh");

    		var TicketInfoObject = Parse.Object.extend("TicketInfoObject");	
       		var query = new Parse.Query(TicketInfoObject);
			query.equalTo("voteHouseId", mHouseID);
            query.find({    
                success: function(results) 
                {
                    if(results.length > 0)
                    {
                        var found_object = results[0];
                        var temp1 = 0;
                        var temp2 = 0;
                        if(msg == "update")
                        {
                            temp1 = parseInt(Math.random()*10000);
                            temp2 = parseInt(Math.random()*10000);
                        }

                        found_object.set("candidate7", temp1);
                        found_object.set("candidate6", temp2);

                        found_object.save(null, {
                            success: function(obj) 
                            {
                            },
                            error: function(model, error) 
                            {
                                mIsUpdateFail = true;
                            }
                        });
                    }
                },
                error: function() 
                {
                    mIsUpdateFail = true;
                }
            });

            mHouseID++;
            if(mHouseID > 1534)
            {
            	clearInterval(mCalTimer);
            	if(mIsUpdateFail)
        			showAlert("更新失敗");
       			else
        			showAlert("更新成功");
            }	
        }, 150);
    };

	var onBtnUpdateClick = function (e)
	{
		ResetTable("update");
	}

	var onBtnClearClick = function (e)
	{
		ResetTable();
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

	$("#btn_update").on("click",onBtnUpdateClick);
	$("#btn_clean").on("click",onBtnClearClick);
});


	var onCreateTable = function (e)
	{
		var VoteHouseObject = Parse.Object.extend("TicketInfoObject");
		for(var i = 1;i<=1534;i++)
		{
			var info = new VoteHouseObject();
		    info.set("voteHouseId", i);
		    var temp0 = parseInt((Math.random()*10000 + 1111)%10000);
		    if(temp0 < 1000)
		    	temp0 += 1000;
		    info.set("secretPassword", ""+temp0 );
		    var temp1 = parseInt(Math.random()*1000);
		    var temp2 = parseInt(Math.random()*1000);

		    info.set("candidate7", temp1);
		    info.set("candidate6", temp2);
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

	