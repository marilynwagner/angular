/*
 * Created by marilynwagner on 2/24/17.
 */

(function () {
    "use strict";
    var app = angular.module("productManagement",
                            ["common.services",
                            "ui.router",
                            "ui.mask",//added because need this in our form
                            "ui.bootstrap", //added for datepicker
                            "angularCharts",
                            "productResourceMock"]); //add "common.services here so main app knows about it
    app.config(["$stateProvider",
                "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "app/welcomeView.html"
                })
                //Products
                .state("productList", {
                    url: "/products", //url fragment identifier
                    templateUrl: "app/products/productListView.html",
                    controller: "ProductListCtrl as vm"
                })
                .state("productEdit", {
                    abstract: true, //don't want to activate edit state without one of it's child states being activated -- ui-router provides property called abstract for this
                    url: "/products/edit/:productId", //url fragment identifier
                    templateUrl: "app/products/productEditView.html",
                    controller: "ProductEditCtrl as vm",
                    resolve: {  //note this was copied from the resolve from the .state("productDetail")
                        productResource: "productResource",

                        product: function (productResource, $stateParams) {
                            var productId = $stateParams.productId;
                            return productResource.get(
                                { productId: productId }).$promise;
                        }
                    }
                })
                .state("productEdit.info", {//note the three states below are NESTED states
                    url: "/info", //url fragment identifier
                    templateUrl: "app/products/productEditInfoView.html"
                })
                .state("productEdit.price", {
                    url: "/price", //url fragment identifier
                    templateUrl: "app/products/productEditPriceView.html"
                })
                .state("productEdit.tags", {
                    url: "/tags", //url fragment identifier
                    templateUrl: "app/products/productEditTagsView.html"
                })
                //edit pages need to retrieve a single product -- can use resolve to retrieve single product -- can add resolve to just the PARENT state yet use the resulting product in each nested child state - just copy and paste the resolve from the .state("productDetail")
                .state("productDetail", {
                    url: "/products/:productId", //url fragment identifier
                    templateUrl: "app/products/productDetailView.html",
                    controller: "ProductDetailCtrl as vm",
                    resolve: {
                        productResource: "productResource",

                        product: function (productResource, $stateParams) {
                                    var productId = $stateParams.productId;
                                    return productResource.get({ productId: productId }).$promise;
                        }
                    }
                })

                .state("priceAnalytics", {
                    url: "/priceAnalytics", //url fragment identifier
                    templateUrl: "app/prices/priceAnalyticsView.html",
                    controller: "PriceAnalyticsCtrl",
                    resolve: {
                        productResource: "productResource",

                        products: function (productResource) {
                            return productResource.query().$promise;
                        }
                    }
                })
        }]

    );

}());


