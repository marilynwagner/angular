/*
 * Created by marilynwagner on 2/24/17.
 */
/*  2-Building First Page: 16) MODULE most Angular apps have ONE main module but they can REFERENCE any number of other modules.  e.g our main product management application is defined with main module which can reference another module that uses common code  */
/*  2-Building First Page: 16) Cont'd WHAT DOES MODULE DO? 1-Module defines an Angular application */
/*  2-Building First Page: 16) cont'd 2-Module tracks ALL application code through registration process  - as each part of application code is built, it can register itself with the module.*/
/*  2-Building First Page: 16) cont'd 3-Tracks all dependencies for the application (on external modules 4-Keeps the application modularized */
/*  2-Building First Page: 18) remember to add ng-app="productManagement" to body tag in index.html and add script tag for app.js*/
/*  2-Building First Page: 18) cont'd if just have var app= blah it's in the global namespace (BAD IDEA) -- must wrap in IIFE (immediately invoked function expression that prevents global declarations JS variables and functions defined within a function have local scope*/
/*  2-Building First Page: 18) cont'd NEXT is EditController     IIFE format - note function is self executing if put () before the ; (after the function declaration) BUT parser treats function as function declaration, NOT a function expression.  Function declaration requires a name - see her blogpost on this - must wrap entire function in ()-implies contents must be expression */
/* (function () {
        "use strict"; //puts entire contents of IIFE in strict mode (e.g. unassigned var will throw exception now
        //Define main module
        var app = angular.module("productManagement", []);
    }());
 */
(function () {
    "use strict";
    var app = angular.module("productManagement",//2-Building First Page: 17)use angular module method to create module -- this module has 2 overloads: setter and getter method; setter method (defines module) (angular.module("productManagement",[]); which requires 2 parameters - 1st is module name  (we set it to application name) 2nd is array of dependencies or injectables; dependency is reference to any other module or library that this module uses.  - if none, must have empty array; and getter method: angular.module("productManagement"); use ONE parameter - name of module.  with getter method you look up and GET the reference to an EXISTING module; parameter in this case is the name of the module -- this is useful when have to register controllers --
                            ["common.services",
                            "ui.router",
                            "ui.mask",//added because need this in our form
                            "ui.bootstrap", //added for datepicker
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
                                    return productResource.get(
                                        { productId: productId }).$promise;
                                }
                        }
                })
        }]

    );

} ());

/*
 productManagement is name of app; [] is array of any dependencies or injectibles (reference to any other modules or library that this module uses)  this is the SETTER METHOD -- we're adding app variable to the global namespace - how solve this? with IIFE (helps prevent global declarations) that's why we're adding function around the variable --function declaration v. expression -- add additional () around entire code

 to build controller start with IIFE -- then look up module -- then need to register the controller with module, so need reference to it-- module GETTER METHOD -- then write code for controller
 with "Controller As"
 $scope is not required as a parameter
 model and methods are defined on the controller itself
 in view, model and methods are referenced using an alias defined in the ng-controller
 $scope exists, but it's behind the scenes
 e.g. in html ng-controller="ProductListCtrl as vm" vm is short for view model
 Best Practices:
 Define each controller as a separate .js file
 Name controller in Pascal case
 Suffix the controller name with "Controller" or "Ctrl"
 Wrap the controller in IIFE
 */


/*
(function() {
    angular
        .module("productManagement")
        .controller("ProductListCtrl",
            ["$scope",
            function($scope) { //last element of array here is always function
            //code here
            }]);
}());*/
