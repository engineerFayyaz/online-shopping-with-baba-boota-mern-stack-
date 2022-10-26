
$("img.modalImage").on("load", function () {

    $(".loadingMask").hide();
});
function addToCart(elem) {

    var ProductID = "";
    var ProductTitle = "";
    var ProductImage = "";
    var ProductPrice = "";
    var SaleCircle = "";
    var ProductBadge = "";

    $('#mSaleCircle').html("");
    $("#mBadge").html("");

    var intValue = 0;
    ProductID = $(elem).attr("productid");
    $("#mProductImage").attr("src", "");
    if (ProductID == "" || ProductID == undefined) {
        ProductID = $("#txtMainProductID").val();
        intValue = 1;

    }
    else {
        intValue = 2;
    }

    ProductTitle = $("#ProductTitle-" + ProductID).attr("producttitle");
    ProductImage = $("#ProductImage-" + ProductID).attr("productimage");
    ProductPrice = $("#ProductPrice-" + ProductID).attr("productprice");
    SaleCircle = $("#productCircle-" + ProductID).html();
    ProductBadge = $("#ProductBadge-" + ProductID).html();

    $('#mSaleCircle').html("");
    $("#mBadge").html("");

    $(".counterMain").val(1);

    $("#mProductImage").attr("src", ProductImage);
    $("#mProductTitle").html(ProductTitle);
    $("#mProductPrice").html(ProductPrice);
    if (SaleCircle != "" && SaleCircle != undefined) {
        $('#mSaleCircle').html(SaleCircle);
    }

    if (ProductBadge != "" && ProductBadge != undefined) {
        $('#mBadge').html(ProductBadge);
    }

    $('#quickViewModel').modal("hide");

    if (intValue == 2) {
        $('#myModal').modal("show");
    }
    $(".loadingMask").show();
    var Quantity = parseInt($("#txtMainProductCounter").val());

    var url = "/AjaxCalling/ShopingCartAdd?ProductID=" + ProductID + "&Quantity=" + Quantity;
    $.post(url, function (data) {

        if (data != null) {
            var AllItemHtml = "";
            var JsonData = JSON.parse(data);
            var ProductCount = JsonData.NumberOfProducts;
            $("#cartCounts").html(ProductCount);

            if (JsonData.OrderProducts.length > 0) {
                for (var i = 0; i < JsonData.OrderProducts.length; i++) {

                    AllItemHtml += "<div class='item'><div class='image'>" +
                                                        "<a class='image-link' href='' title='Y3II - 8 GB - Black'>" +
                                                            "<img class='lazy image -loaded' width='44' height='54' src='/images/ProductImages/Products150x182/" + JsonData.OrderProducts[i].ProductImage + "' alt='" + JsonData.OrderProducts[i].Product.Title + "' >" +
                                                        "</a>" +
                                                    "</div>" +
                                                    "<div class='info'>" +
                                                        "<a class='link' target='_blank' href='/product/" + JsonData.OrderProducts[i].Product.Url + "' title='" + JsonData.OrderProducts[i].Product.Title + "'>" +
                                                            "<span></span> " + JsonData.OrderProducts[i].Product.Title + "<br />" + JsonData.OrderProducts[i].Quantity + " x " + JsonData.OrderProducts[i].ProductPrice +
                                                        "</a>" +
                                                        "<a style='display:none;' class='remove js-link' >Remove</a>" +
                                                    "</div>" +
                                                    "<div class='price' dir='ltr'>" +
                                                    "<span data-currency-iso='PKR'>Rs.</span> <span>&nbsp;" + (parseInt(JsonData.OrderProducts[i].ProductPrice) * parseInt(JsonData.OrderProducts[i].Quantity)) + "</span>" +
                                                    "</div></div>"
                }
                if (AllItemHtml != "") {
                    $("#CartEmpty").hide();
                    $("#CartItems").show();
                    $("#CartItems").html("");
                    $("#CartItems").html(AllItemHtml);
                    $("#CartTotalAmmount").html("");
                    $("#CartTotalAmmount").html(JsonData.TotalPayment);
                    //$("#cartItemsTotal").val(JsonData.TotalPayment);

                    $("#ModalCartTotal").html(JsonData.TotalPayment);
                    $("#ModalCartDeliveryTotal").html(JsonData.DeliveryCharges);
                    $("#cartFooter").show();
                }
                else {
                    $("#CartEmpty").show();
                    $("#CartItems").hide();
                    $("#cartFooter").hide();
                }

            }
        }
    });
    $("#txtMainProductCounter").val(1);
}
$(document).ready(function () {
    if ($(window).width() > 640) {
        var height = 66;
        $(window).scroll(function () {
            if ($(this).scrollTop() > height) {
                $('.main-menu').addClass('navbar-fixed-top');
            }
            else if ($(this).scrollTop() <= height) {
                $('.main-menu').removeClass('navbar-fixed-top');
            }
        });
        $(window).scroll();
    }
    else {
        $('.main-menu').addClass('navbar-fixed-top');
    }

    $(".owl-prev").html('<i class="fa fa-angle-left"></i>');
    $(".owl-next").html('<i class="fa fa-angle-right"></i>');
    $('.webloader').css("display", "none");
});
var qProductID = 0;
function QuickView(elem) {
    debugger
    debugger
    qProductID = $(elem).attr("quickproductid");
    $("#txtMainProductID").val(qProductID);
    var qProductID = $(elem).attr("quickproductid");
    var ProductTitle = $("#ProductTitle-" + qProductID).attr("producttitle");
    var ProductImage = $("#ProductImage-" + qProductID).attr("productimage");
    var ProductPrice = $("#ProductPrice-" + qProductID).attr("productprice");
    var SaleCircle = $("#productCircle-" + qProductID).html();
    var ProductBadge = $("#ProductBadge-" + qProductID).html();
    var ProductBadgeID = $("#pBadge-" + qProductID).attr("pbadgeid");
    var ProductSku = $("#pProductSku-" + qProductID).val();
    $("#qProductSku").text("SKU: " + ProductSku);
    $("#qSaleCircle").html("");
    $("#qBadge").html("");

    if (SaleCircle != "" && SaleCircle != undefined) {
        $('#qSaleCircle').html(SaleCircle);
    }

    if (ProductBadge != "" && ProductBadge != undefined) {
        $('#qBadge').html(ProductBadge);
    }


    $("#txtMainProductCounter").val(1);
    $(".counterMain").val(1);
    $("#qProductImage").attr("src", "");
    $("#qProductImage").attr("src", ProductImage);
    $("#qProductTitle").html(ProductTitle);
    $("#qProductPrice").html(ProductPrice);
    if (ProductBadgeID > 0 && ProductBadgeID == 3) {
        $("#btnAddCart").attr('disabled', 'disabled');
        $("#btnAddCart").removeAttr('onclick');
    }
    else {
        $("#btnAddCart").removeAttr('disabled');
        $("#btnAddCart").attr('onclick', 'addToCart(this)');
    }
    $('#quickViewModel').modal("show");
    $(".loadingMask").show();
}
function MultiCheckBoxesFillAjax(FunctionName, AjaxCallingUrlWithParameters) {

    $.post(AjaxCallingUrlWithParameters, function (data) {
        if (data != null) {
            FunctionName(data);
        }
    });
}


var MakeUrl = "";
var ModelUrl = "";
var VersionUrl = "";
var LoadHtml = "<div class='leaderImage'><img src='/images/loading-main.gif' /></div>"
function GetMakeID(elem) {
    $("#CarModelArea").html(LoadHtml);
    $(".models").removeClass("active");
    $(".versions").removeClass("active");
    var SelectedValues = $(elem).attr("data-make");
    MakeUrl = $(elem).attr("data-url");

    $("#SubmitBtn").removeAttr("disabled");
    $(".make").each(function () {
        var thisUrl = $(this).attr("data-url");
        if (MakeUrl == thisUrl) {
            $(this).addClass("active");
        }
        else {
            $(this).removeClass("active");
        }
    });


    var MakeID = $(elem).attr("id");
    $('#FinalFilterValue').val(MakeID);
    MultiCheckBoxesFillAjax(ModelBindHtml, "/AjaxCalling/GetCarModelbyMakeID?MakeIDs=" + SelectedValues);
    $("#SubmitBtn").attr("href", "/product-category/cars/" + MakeUrl)

    $("#CarVersionArea").html("");
}
function GetModelID(elem) {
    $("#CarVersionArea").html(LoadHtml);
    $(".models").addClass("active");
    $(".versions").removeClass("active");
    $(elem).siblings().removeClass("active");
    $(elem).addClass("active");
    var SelectedValues = $(elem).attr("data-model");
    ModelUrl = $(elem).attr("data-url");
    var ModelID = $(elem).attr("id");
    MultiCheckBoxesFillAjax(VersionBindHtml, "/AjaxCalling/GetCarVersionsbyModelID?ModelIDs=" + SelectedValues);
    $("#SubmitBtn").attr("href", "/product-category/cars/" + MakeUrl + "/" + ModelUrl)

}
function GetVersoinID(elem) {
    $(".versions").addClass("active");
    $(elem).siblings().removeClass("active");
    $(elem).addClass("active");
    var SelectedValues = $(elem).attr("data-version");
    VersionUrl = $(elem).attr("data-url");
    var ModelID = $(elem).attr("id");
    $("#SubmitBtn").attr("href", "/product-category/cars/" + MakeUrl + "/" + ModelUrl + "/" + VersionUrl)
}


function ModelBindHtml(Response) {
    debugger
    var CheckBoxHtml = "";
    if (Response.length > 0) {
        CheckBoxHtml = "<h5 class='listing-title'>Popular</h5>";
        for (var i = 0; i < Response.length; i++) {
            if (Response[i].CarFilterModels != null && Response[i].CarFilterModels.length > 0) {
                for (var x = 0; x < Response[i].CarFilterModels.length; x++) {
                    if (Response[i].CarFilterModels[x].ListCategoryID == 1 || Response[i].CarFilterModels[x].ListCategoryID == null) {
                        CheckBoxHtml += "<li class='model' data-url='" + Response[i].CarFilterModels[x].Url + "' data-model='" + Response[i].CarFilterModels[x].ID + "' onclick='GetModelID(this)' id='model-" + Response[i].CarFilterModels[x].ID + "'><a href='javascript:void(0)'>" + Response[i].CarFilterModels[x].Name + " <i class='fa fa-angle-right'></i></a></li>";
                    }
                }
            }
            else {
                CheckBoxHtml += "<div class='alert alert-info'>No Brand Found</div>";
            }

        }
        CheckBoxHtml += "<h5 class='listing-title'>Others</h5>";
        for (var i = 0; i < Response.length; i++) {
            if (Response[i].CarFilterModels != null && Response[i].CarFilterModels.length > 0) {
                for (var x = 0; x < Response[i].CarFilterModels.length; x++) {
                    if (Response[i].CarFilterModels[x].ListCategoryID == 2) {
                        CheckBoxHtml += "<li class='model' data-url='" + Response[i].CarFilterModels[x].Url + "' data-model='" + Response[i].CarFilterModels[x].ID + "' onclick='GetModelID(this)' id='model-" + Response[i].CarFilterModels[x].ID + "'><a href='javascript:void(0)'>" + Response[i].CarFilterModels[x].Name + " <i class='fa fa-angle-right'></i></a></li>";
                    }
                }
            }
            else {
                CheckBoxHtml += "<div class='alert alert-info'>No Brand Found</div>";
            }


        }
    }

    $("#CarModelArea").css("display", "block");
    $("#CarModelArea").html(CheckBoxHtml);

}
function VersionBindHtml(Response) {

    var CheckBoxHtml = "";
    if (Response.length > 0) {
        debugger;

        for (var i = 0; i < Response.length; i++) {
            if (Response[i].CarFilterVersions != null && Response[i].CarFilterVersions.length > 0) {
                for (var x = 0; x < Response[i].CarFilterVersions.length; x++) {

                    CheckBoxHtml += "<li class='version' data-url='" + Response[i].CarFilterVersions[x].Url + "' data-version='" + Response[i].CarFilterVersions[x].ID + "' onclick='GetVersoinID(this)' id='model-" + Response[i].CarFilterVersions[x].ID + "'><a href='javascript:void(0)'>" + Response[i].CarFilterVersions[x].Name + "</a></li>";

                }
            }
            else {
                CheckBoxHtml += "<div class='alert alert-info'>No Version Found</div>";
            }


        }

    }

    $("#CarVersionArea").css("display", "block");
    $("#CarVersionArea").html(CheckBoxHtml);
}
//$(document).ready(function () {
//    if (window.location.pathname == '/') {
//        $(".topSearchBar").remove();
//    }
//});


$('.btn-produt-counter').click(function (e) {

    e.preventDefault();
    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == 'minus') {

            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if (type == 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
                $(".minus-btn").attr('disabled', false);
            }
            if (parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
    var LatestCounter = parseInt(input.val());
    $("#txtMainProductCounter").val(LatestCounter);
});

$(document).ready(function () {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});
