var config = {
    apiKey: "AIzaSyDkitWyt4i-cGxlDzC1Uh6MrT9UVIfB5VQ",
    authDomain: "siit-imc.firebaseapp.com",
    databaseURL: "https://siit-imc.firebaseio.com",
    projectId: "siit-imc",
    storageBucket: "siit-imc.appspot.com",
    messagingSenderId: "459048435439",
};

firebase.initializeApp(config);
$(document).ready(function () {
    $.getJSON('https://siit-imc.firebaseio.com/products.json')
        .done(function (response) {
            var productsList = '<ul class="products">';
            $.each(response, function (index, products) {
                console.log(index);
                console.log(products);
                if (products.quantity > 0) {
                    productsList += '<li class="item available">';
                } else {
                    productsList += '<li class="item sold-out">'
                }
                productsList += '<img src=".//google.png" alt="picture">' + '<br>' + '<br>';
                productsList += products.user_name + '<br>' + "Price: $" + products.price;
                productsList += `<button onclick="location.href='./details/details.html'" type="button" class="btn btn-default">Details</button>`;
            });
            productsList += "</ul>";
            $('#productsList').html(productsList);
        })
       // '<button class="btn btn-default" >Details</button>'
})

