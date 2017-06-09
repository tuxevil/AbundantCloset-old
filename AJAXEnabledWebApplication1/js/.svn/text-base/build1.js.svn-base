    $(document).ready(function() {
        $("#btnBuildCloset").css("cursor","pointer").click(goToStep2);
        
        // Shows the corresponding hidden div when a tab is clicked.
        $(".tab-menu ul li a").not(".more").css("cursor", "pointer").click(function() {
            $("#tabs .tab-container").hide();
            $(".tab-menu ul li a.current").removeClass("current").addClass("visited");
            $(this).addClass("current");
            var divToShow = $($(this).attr("name"));
            divToShow.show("highlight",{},1000);
        });
        
		// there's the gallery and the trash
		var $gallery = $('.tab-container').eq(0), $wishlist = $('#wishlist'), $shoppinglist = $('#shoppinglist');

		// let the gallery items be draggable
		$('div.item').draggable({
			cancel: 'a.ui-icon',// clicking an icon won't initiate dragging
			revert: 'invalid', // when not dropped, the item will revert back to its initial position
			containment: 'document', // stick to demo-frame if present
			opacity: 0.7,
			helper: cloneMe,
			cursor: 'auto'
		});
		
		// let the trash be droppable, accepting the gallery items
		$wishlist.droppable({
			accept: 'div.item',
			hoverClass: 'ui-state-highlight',
			tolerance: 'touch',
			drop: function(ev, ui) {
				addItem(ui.draggable, $("#wishlist .container"),true);
			}
		});
		
		// let the trash be droppable, accepting the gallery items
		$shoppinglist.droppable({
			accept: 'div.item',
			hoverClass: 'ui-state-highlight',
			tolerance: 'touch',
			drop: function(ev, ui) {
				addItem(ui.draggable, $("#shoppinglist .container"),false);
			}
		});
		
		$("input:check").click(checkboxPush);
    });
    
    function goToStep2() 
    {
        $("#taberror").hide();
        var visited = $("#tabs ul li a.visited").length;
        var valid = true;
        
        if ( visited >= 5) 
            window.location = "build2.htm";
        else 
             $("#taberror").show('highlight',{},4000).hide('highlight',{},2000);
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
        var $item = $(this).parents("div.item");
        
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
	
	    $item = $("div.item#" + itemid);
        
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
