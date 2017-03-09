/**
 * Created by marilynwagner on 3/1/17.
 */
(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("ProductEditCtrl",
        ["product",
            "$state",
            "productService",
            ProductEditCtrl]);

    function ProductEditCtrl(product, $state, productService) {<!--adding $state here because of cancel button function below  -->
        var vm = this;

        vm.product = this;

        vm.product = product; <!--note: not using copy here -- every operation, product detailed display eg, etc always get latest product data from web server - this ensures we see any changes made by any other users and prevents need for a copy-->

        vm.priceOption = "percent";

        vm.marginPercent = function() {
            return productService.calculateMarginPercent(vm.product.price,
                                                            vm.product.cost)
        };
        vm.calculatePrice = function() {
            var price = 0;

            if (vm.priceOption == 'amount') {
                price = productService.calculatePriceFromMarkupAmount(
                    vm.product.cost, vm.markupAmount);
            }

            if (vm.priceOption == 'percent') {
                price = productService.calculatePriceFromMarkupPercent(
                    vm.product.cost, vm.markupPercent);
            }
            vm.product.price = price;

        };

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        }
        else {
            vm.title = "New Product"
        }

        vm.open = function ($event) { //for datepicker - when click on calendar
            $event.preventDefault(); //prevents any default action from being triggered
            $event.stopPropagation(); //prevents event from being propagated

            vm.opened = !vm.opened; //if calendar open, click defines that it should be closed and vice versa

        };

        vm.submit = function () { //note we're adding function as parameter to $save property-- from toastr -- toastr allows you to create js notification after hit save button - download JUST toaster.js AND toaster.css from the big folder --https://github.com/CodeSeven/toastr  -->
            vm.product.$save(function (data) {
                toastr.success("Save Successful");
            });
        }

        vm.cancel = function () {
            $state.go('productList');
        }

        vm.addTags = function (tags) {
            if (tags) {
                var array = tags.split(',');
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                vm.newTags = "";
            }
            else {
                alert("Please enter one or more tags separated by commas");
            }
        }

        vm.removeTag = function (idx) {
            vm.product.tags.splice(idx, 1);
        }
    }
}());
