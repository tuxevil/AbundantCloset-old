    var $item_tr = null;
    var $origTable = null;
    
    $(document).ready(function() {
        $(":input").eq(0).focus();
        
        $("#customOCRCompany").text(customOCRCompany);
        $("#customImage").attr("src","img/partner/" + customImage);
        $("#customOCRLink").attr("href", customOCRUrl).text(customOCRUrlText);
        $("#customOCRPriceDiscount").text(customOCRPriceDiscount);

        $("#customOCRCompany2").text(customOCRCompany);
        $("#customImage2").attr("src","img/partner/" + customImage2);
        $("#customOCRLink2").attr("href", customOCRUrl2).text(customOCRUrlText2);
        $("#customOCRPriceDiscount2").text(customOCRPriceDiscount2);
        	                            
		var fullCloset = $(".full-closet").length == 1;

        // Set up popup defaults
        $(".popup").dialog({ autoOpen: false, resizable: false, width:450, modal:true });
        
        // Shows the corresponding hidden div when a tab is clicked.
        $(".tab-menu ul li a").not(".more").css("cursor", "pointer").click(function() {
            $("#tabs .tab-container").hide();
            $(".tab-menu ul li a.current").removeClass("current").addClass("visited");
            $(this).addClass("current");
            var divToShow = $($(this).attr("name"));
            divToShow.show("highlight",{},1000);
        });
        
        if (!fullCloset) {
        
            $(".stars:not(.disabled) a").click(function() {
                // Get current rating
                var rating = $(this).prevAll("a").length + 1;
                
                // Check is not rated equal
                if (rating == parseInt($("em", $(this).parents(".star").eq(0)).text()))
                    return;
                    
                // Change styles
                $(this).prevAll("a").addClass("selected").css("cursor", "pointer");
                $(this).nextAll("a").removeClass("selected")
                $(this).addClass("selected").css("cursor", "pointer");
                $("em", $(this).parents(".star").eq(0)).html(rating);
                
                if (rating == 5) {
                    $("#rated5").dialog("open");
                }
            });
            
		    $("#btnRemoveOutfit").click(function() {
		        $(".popup").dialog("close");
		        $item_tr.hide("explode",{},1000).remove();
		        informMessage("The item has been removed from your Outfits");
		        $item_tr = null;
		    });

		    $(".cancel").click(function() {
		        $item_tr = null;
		        $(".popup").dialog("close");
		    });
    				
		    $(".remove").click(function() {
		        $item_tr = $(this).parents("tr").eq(0);
		        $("#removeItem").dialog("open");
		    });
    		
		    $(".sendfriends").click(function() {
		        $("#sendToFriends").dialog("open");
		    });            

		    $(".friendrate em, .friendrate a").click(function() { $("#sendToFriends").dialog("open"); });
		    
		    $(".blogbutton").click(function() { $("#myblog").dialog("open"); });
        }
        
		$("input:check").click(checkboxPush);
		
		$("#outfit_search").click(function() {
            var strText = jQuery.trim($("#outfit_text").val().toLowerCase());
            var sortedBy =  jQuery.trim($("#outfit_sort").val()).toLowerCase();

		    // Emulate sorting by Friend Rating or Searching Black Pants
		    if (strText == "black pants")
		    {
                // Copy to orig table and remove inneccesary items (first 3).
                $finalTable = $origTable.clone(true);
                $("tbody tr:eq(0)",$finalTable).remove();
                $("tbody tr:gt(2)",$finalTable).remove();
                
		        $("#outfit").remove();
		        $("#tabs-1").append($finalTable).show("highlight",{},1000);
		        $("#recordcount").text("3");
                loadGridEvents();
		    }
		    else 
		    {
		        
		        if( sortedBy == "activity/function" || sortedBy == "friend rating") {
		            // Sort items by index array defined.
		            var sortedItems = new Array();
		            var arr = null;
		            
		            if (sortedBy == "friend rating")
		                arr = [ 0,5,6,7,8,9,1,2,3 ];
		            else
		                arr = [ 4,3,2,1, 9,8,7,6,0 ]
		            
		            for(i=0; i<arr.length; i++)
                        sortedItems.push($("tbody tr",$origTable).eq(arr[i]).clone(true));
                        
                    $finalTable = $origTable.clone(true);
                    $("tbody tr",$finalTable).remove();
                    
                    for(i=0;i<sortedItems.length;i++)
                        $("tbody",$finalTable).append(sortedItems[i]);

		            $("#outfit").remove();
		            $("#tabs-1").append($finalTable).show("highlight",{},1000);
		            $("#recordcount").text("3");
                    loadGridEvents();          
		        }
		        else {
		            // Reshow all pants.
		            $("#outfit").remove();
		            $("#tabs-1").append($origTable).show("highlight",{},1000);
                    loadGridEvents();		        
		        }
		        
		        $("#recordcount").text("10");
		    }
		    
		});
		
        // Save original table for sorting purposes
        $origTable = $("#outfit").clone(true);
        
        loadGridEvents();
    });
    
    function loadGridEvents() {
		// there's the gallery and the trash
		var $gallery = $('.tab-container').eq(0), $wishlist = $('#wishlist'), $shoppinglist = $('#shoppinglist');

		// let the gallery items be draggable
		$('div.item-outfit').draggable({
			cancel: 'a.ui-icon',// clicking an icon won't initiate dragging
			revert: 'invalid', // when not dropped, the item will revert back to its initial position
			containment: 'document', // stick to demo-frame if present
			opacity: 0.7,
			helper: cloneMe,
			cursor: 'auto'
		});
		
		// let the trash be droppable, accepting the gallery items
		$wishlist.droppable({
			accept: 'div.item-updater',
			hoverClass: 'ui-state-highlight',
			tolerance: 'touch',
			drop: function(ev, ui) {
				addItem(ui.draggable, $("#wishlist .container"),true);
			}
		});
		
		// let the trash be droppable, accepting the gallery items
		$shoppinglist.droppable({
			accept: 'div.item-updater',
			hoverClass: 'ui-state-highlight',
			tolerance: 'touch',
			drop: function(ev, ui) {
				addItem(ui.draggable, $("#shoppinglist .container"),false);
			}
		});
		
		$(".explain").bt( { position: "top" } ).css("cursor","pointer");
    }
    
    /* Clones the draggable item and sets a fixed width to correctly show on major browsers */
	function cloneMe(ev) 
	{
	    return $(this).clone().width("150px");
	}
    
    /* Executes when any check is clicked in the list */
    function checkboxPush() 
    {
        var checked = ($(this).is(":checked"));
        var $item = $(this).parents("div.item-updater");
        
        if ($(this).hasClass("list") )
            if (checked) 
                addItem($item, $("#wishlist .container"),true);
            else
                removeFromCheck($item, $("#wishlist .container"), true);
        else if ($(this).hasClass("buy") )
            if (checked) 
                addItem($item, $("#shoppinglist .container"),false);
            else
                removeFromCheck($item, $("#shoppinglist .container"), false);
    }

    /* Helper for id differential on each droppable list */
    function cl(wishlist)
    {
        if (wishlist)
            return "wl_";
        else
            return "el_";
    }
    
    /* Adds an item to the list */
	function addItem($item, $list, wishlist) 
	{
	    if ($("#" + cl(wishlist) + $item.attr("id"), $list).length > 0) 
	    {
	        $item.draggable('option', 'revert', true);
	        return;
	    }
	    
		$currentItem = $item.children("h1").eq(0).clone();
		if ($item.children("h2").length == 1)
		    $currentItem.append(" - " + $item.children("h2").eq(0).text());
		$currentItem.attr("id", cl(wishlist) + $item.attr("id"));
		$linkClose = $("<a></a>").addClass("remove").text("[x]").click(removeItem).css("cursor","pointer");
		$currentItem.append($linkClose);
		
		if (wishlist) 
		{
            $item.find(":check .list").attr("checked","checked");
		}
		else
		{
            $item.find(":check .buy").attr("checked","checked");
		}
		
		$currentItem.appendTo($list).fadeIn();
	}

    /* Remove item from the list when clicked on it*/
	function removeItem() 
	{   
        var itemid = $(this).parent().attr("id").replace(cl(1),"").replace(cl(0),"");
	
	    $item = $("div.item-updater#" + itemid);
        
        if ($(this).parents("#wishlist").length > 0)
            $item.find(":check .list").attr("checked","");
	    else
	        $item.find(":check .buy").attr("checked","");
	        
        $item.draggable('option', 'revert', false);
	    $(this).parent().fadeOut().remove();
	}   
	
    /* Remove item from the list when clicked ion checkbox */
	function removeFromCheck($item, $list, wishlist) 
	{
        $item.draggable('option', 'revert', false);
	    $("#" + cl(wishlist) + $item.attr("id"), $list).fadeOut().remove();
	}
