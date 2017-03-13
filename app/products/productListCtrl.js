/**
 * Created by marilynwagner on 2/24/17.
 */
(function() {
    "use strict"; //after .controller, this 2nd parameter (ProductListCtrl) is a REFERENCE to the controller; note don't need $scope because we're using "Controller As"
    angular
        .module("productManagement") //with Controller as do NOT need $scope
        .controller("ProductListCtrl",
            ["productResource",
            ProductListCtrl]);


    function ProductListCtrl(productResource) { //name of function MUST match name above  //LATER WE WANT TO GET RID OF HARD CODED DATA so we modified code here --  needed to ask angular to pass a reference to productResource service to this specific controller function -- how do? we passed parameter productResource
        var vm = this;

        productResource.query(function(data) {  //query method sends GET request to url defined in $resource function , the parameter is the callback function that is called upon receiving successful http response  -- the response is (data) - the JSON data returned from query -- the resulting data is assigned to products (of vm.products) as part of the model -- note query is a GET that expects a JSON array in response
            vm.products = data;

        });

        vm.showImage = true; //note ng-show and ng-hide affect DISPLAY but do NOT affect fetching process -- so ng-hide will NOT improve performance (see Network in Dev Tools).  If change ng-show to ng-if

        vm.toggleImage = function() {

            vm.showImage = !vm.showImage;
        }
    }
}());


