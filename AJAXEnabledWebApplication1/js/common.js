var customSponsorText = "QVC.com";
var customSponsorLink = "http://www.qvc.com/";

var customOCRCompany = "QVC.com";
var customOCRCompanyLink = "http://www.qvc.com/";

var customOCRPriceDiscount = "$19.60";
var customOCRUrl = "http://www.belk.com/AST/Main/Belk_Primary/Handbags_And_Accessories/Shop/Accessories/Fashion_Jewelry/Necklaces/PRD~580044129131/Kristin+Davis+Gold+Tone+Teardrop+Pendant+with+Coral+Stones.jsp?off=1";
var customOCRUrlText = "Kristin Davis Gold Tone Teardrop Pendant with Coral Stones";
var customOCRDescription = "Kristin Davis Gold Description Goes Here";
var customImage = "belk.jpg";

var customOCRPriceDiscount2 = "$44.00";
var customOCRUrl2 = "http://www.qvc.com/qic/qvcapp.aspx/view.2/app.detail/params.item.A88290.desc.Du-JourR-Short-Sleeve-Textured-Satin-Blouse-wPleat-Details";
var customOCRUrlText2 = "Du Jour(R) Short Sleeve Textured Satin Blouse w/Pleat Details";
var customOCRDescription2 = "Du Jour(R) Short Sleeve Textured Satin Blouse w/Pleat Details";
var customImage2 = "belk2.jpg";

function informMessage(message, $inside) {
    var $close = $("<a></a>").text("[x]").click(function() { $(this).parent().hide().remove(); });
    var $div = $('<div class="alert-info"></div>').text(message).append($close);
    
    if ($inside == null)
        $("body").prepend($div)
    else
        $inside.preprend($div.css("position", "relative"));
        
    $div.show('blind',{},200, 
        function() 
        {
            setTimeout(function() { $(".alert-info").hide("blind", {}, 500, function() { $(this).remove(); }); }, 3000);
        });
}