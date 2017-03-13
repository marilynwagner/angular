/**
 * Created by marilynwagner on 2/25/17.
 */

(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("productResource", //here register new factory with module using the factory method of module -- first parameter is name of factory service "productResource" - second parameter is array 1st element in array are string names of the parameters is what will be passed to function  ($resource), last element of array is factory service function - we'll set it to a reference to that function -- productResource
                ["$resource",
                productResource]);

    function productResource($resource) {  //define function here
        return $resource("/api/products/:productId") //set up communication with web services - we're returning the $resource object
    }


}());