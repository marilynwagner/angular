/**
 * Created by marilynwagner on 2/28/17.
 */
(function () {
    "use strict";

    angular
        .module("productManagement")
        // .controller("ProductDetailCtrl",
        //             ProductDetailCtrl); //reference to our ProductDetailCtrl function -- reference because always REFER to object and function (complex data types) as opposed to simple data types like string, boolean -- Later we changed this code-see below
            .controller("ProductDetailCtrl", //once we pass in product as parameter to function we need to modify registration to define product in min safe array -- 2nd parameter must be array and product is first element in array (string)
                        ["product",
                        "productService",
                        ProductDetailCtrl]);
    function ProductDetailCtrl(product, productService) {  //when get rid of hard coding enter product as parameter
        var vm = this;

        vm.product = product; // I commented out hard coding of product see below
            /*{
            "productId": 2,
            "productName": "Garden Cart",
            "productCode": "GDN-0023",
            "releaseDate": "March 18, 2010",
            "description": "15 gallon capacity rolling garden cart",
            "cost": 20.00,
            "price": 32.99,
            "category": "garden",
            "tags": ["barrow", "cart", "wheelbarrow"],
            "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden-cart.png"
        };*/

        // vm.product = product; note above decided to hard code the data
        vm.title = "Product Detail: " + vm.product.productName;

        vm.marginPercent = productService.calculateMarginPercent(vm.product.price,
                                                                vm.product.cost);

        if (vm.product.tags) {
            vm.product.tagList = vm.product.tags.toString();

        }
    }
}());