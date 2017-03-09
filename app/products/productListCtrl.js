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
        //need to 1) define the model for binding to the view and define methods for any actions in the view
        /*vm.products = [ // we need to replace this hard coded data with calls to RESTful web service using $resource -- data should NOT reside here
            {   "productId": 1,
                "productName": "Leaf Rake",
                "productCode": "GDN-00ll",
                "releaseDate": "March 19, 2009",
                "description": "Leaf rake with 48-inch handle",
                "cost": 9.00,
                "price": 19.95,
                "category": "garden",
                "tags": [ "leaf", "tool" ],
                "imageUrl": 'http://openclipart.org/image/300px/svg_to_png/26215/Leaf-Rake.png'
            },
            {
                "productId": 5,
                "productName": "Hammer",
                "productCode": "TBX-0048",
                "releaseDate": "May 21, 2013",
                "description": "Curved claw steel hammer",
                "cost": 1.00,
                "price": 8.99,
                "category": "toolbox",
                "tags": [ "tool" ],
                "imageUrl": 'http://openclipart.org/image/300px/svg_to_png/73/rejon-Hammer.png'
            }
        ];*/
        vm.showImage = true; //note ng-show and ng-hide affect DISPLAY but do NOT affect fetching process -- so ng-hide will NOT improve performance (see Network in Dev Tools).  If change ng-show to ng-if

        vm.toggleImage = function() {

            vm.showImage = !vm.showImage;
        }
    }
}());


    //Faking the Web Service: $httpBackend (Angular's fake HTTP backend implementation
    //  mocks the calls to the Web Service
    //  returns static data to the application
    //  2 implementations:
        // ngMock - for unit testing applications
        // ngMockE2E for end-to-end testing or backend-less development
        // we'll use ngMockE2E because we do NOT want a backend HOW DO?
            //find Ang library containing ngMockE2E and download ngMockE2E module and insert script tags in index.html -- go to https://angularjs.org -- click Download and click Browse Additional Modules - find angular-mocks.js
            //create new module that depends on ngMockE2E
            //set up static data
            //define the fake responses to the Web Server calls
            //add new module as a dependency in the Main Module
            //any time you want to remove the mocking, just remove the dependency