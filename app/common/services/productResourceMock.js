/**
 * Created by marilynwagner on 2/26/17.
 */

(function () {
    "use strict";

    var app = angular //we'll use app.run to perform intitialization -- app.run takes function passed in as parameter and executes it when module is loaded; in function must do 2 things 1) define default data (our mocking data) and 2) need define fake responses to web service callse
        .module("productResourceMock",
            ["ngMockE2E"]); //2nd parameter is dependency -- depends on ngMockE2E module

    app.run(function ($httpBackend) {
        var products = [  //this is our mocking data
            {
                "productId": 1,
                "productName": "Flat Screen TV",
                "productCode": "GDN-00ll",
                "releaseDate": "March 19, 2009",
                "description": "48-Inch 1080p LED TV",  //was "Leaf rake with 48-inch handle"
                "cost": 290.00,
                "price": 599.95,
                "category": "television",
                "tags": [ "electronics", "flat", "screen", "TV", "television" ],
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/48997/flat-screen.png"//was 26215/Leaf-Rake.png
            },
            {
                "productId": 2,
                "productName": "Circuit Board",
                "productCode": "GDN-0023",
                "releaseDate": "March 18, 2010",
                "description": '22.5" x 15" Plated Circuit Board', //was "15 gallon capacity rolling garden cart"
                "cost": 53.00,
                "price": 132.99,
                "category": "circuit",
                "tags": [ "electronics", "board", "chip", "circuit" ],
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/231023/computer-circuit-board.png"  //was 58471/garden-cart.png
            },
            {
                "productId": 5,
                "productName": "Robot",
                "productCode": "TBX-0048",
                "releaseDate": "May 21, 2013",
                "description": "Industrial Robot with 125kg Payload", //was "Curved claw steel hammer"
                "cost": 6380.00,
                "price": 8950.99,
                "category": "robot",
                "tags": [ "electronics", "robot", "science fiction" ],
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/225969/Robot.png" //was 73/rejon-Hammer.png
            },
            {
                "productId": 8,
                "productName": "CRT Projector",
                "productCode": "TBX-0022",
                "releaseDate": "May 15, 2009",
                "description": '7" MEC Digital 480p CRT Projector', //was "15-inch steel blade hand saw"
                "cost": 2300.95,
                "price": 4162.55,
                "category": "television",
                "tags": [ "electronics", "CRT", "projector", "television", "TV" ],
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/194309/crt-projector.png" //was 27070/saw.png
            },
            {
                "productId": 10,
                "productName": "Video Game Controller",
                "productCode": "GMG-0042",
                "releaseDate": "October 15, 2002",
                "description": "Standard two-button video game controller", //was "Standard two-button video game controller"
                "cost": 9.00,
                "price": 35.95,
                "category": "game",
                "tags": [ "electronics", "controller", "video game"],
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xboxcontroller-01.png" //was 120337/xboxcontroller-01.png
            }
        ]; //end of products array

        var productUrl = "/api/products"; //define fake responses to web server calls - start with url we expect to intercept (before goes to backend)
                            //need to defined what happens when get request is sent to theis url - we return full list of products
         $httpBackend.whenGET(productUrl).respond(products); // this says when there is GET request on the defined url respond with the entire array of products -- we need to DEFINE THIS AS DEPENDENCY in main app module -- go to app.js and add "productResourceMock"
        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var product = {"productId": 0};
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                 for (var i=0; i<products.length; i++) {
                     if (products[i].productId == id) {
                         product = products[i];
                         break;
                     }
                 };
             }
             return [200, product, {}];
        });


        $httpBackend.whenPOST(productUrl).respond(function (method, url, data) {
            var product = angular.fromJson(data);

            if (!product.productId) {
                //new product ID
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            }
            else {
                //Updated product
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == product.productId) {
                        products[i] = product;
                        break;
                    }
                };
            }
            return [200, product, {}];

        });

        // Pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough();


        /*$httpBackend.whenGET(productUrl + "/1").respond(products);
        $httpBackend.whenGET(productUrl + "/2").respond(products);*/

    }) //is this end of app.run????  YES


}());