var book_info = $("#book_info")
var book_img = $("#book_img")
var cartTotal = $("#cart_total")
var cartCount = $("#cart_count span")
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
const user_id = getUrlParameter('user_id');
var book_id = getUrlParameter("book_id")
var home = $("#home")
home.attr("href", `/shop.html?user_id=${user_id}`)
$("#cart").attr('href', `/cart.html?user_id=${user_id}`)
$("#order_link").attr('href', `/order.html?user_id=${user_id}`)
$.ajax({  
    url:`http://localhost:5000/book/${book_id}`,  
    method:'get',   
    dataType: 'json', 
    success:function(book){  
        if(book){  
            var htmlBook = ``
            const localhost_url = 'http://localhost:5000/images/'
            let image = localhost_url + (book.image ? book.image : 'default_book_img.jpg')
            book_img.attr('src', image)
            // <div class="product_text"><p>${book.description}</p></div>
            htmlBook += `<div class="product_description">
                                <div class="product_category">${book.generes}</div>
                                <div class="product_name">${book.name}</div>
                                <div class="product_author">${book.author.name}</div>
                                <div class="order_info d-flex flex-row">
                                    <form action="#">
                                        <div class="clearfix" style="z-index: 1000;">

                                            <!-- Product Quantity -->
                                            <div class="product_quantity clearfix">
                                                <span>Số lượng: </span>
                                                <input id="quantity_input" type="text" pattern="[0-9]*" value="1">
                                                <div class="quantity_buttons">
                                                    <div id="quantity_inc_button" class="quantity_inc quantity_control"><i class="fas fa-chevron-up"></i></div>
                                                    <div id="quantity_dec_button" class="quantity_dec quantity_control"><i class="fas fa-chevron-down"></i></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="product_price">${book.price}</div>
                                        <div class="button_container">
                                            <button id="btn_add_to_cart" type="button" class="button cart_button">Thêm vào giỏ hàng</button>
                                            <div class="product_fav"><i class="fas fa-heart"></i></div>
                                        </div>
                                    </form>
                                </div>
                            </div>`
            book_info.html(htmlBook)
            var quantity_input = $("#quantity_input")
            $("#quantity_inc_button").on("click", () => {
                var old_value = parseInt(quantity_input.val())
                if(old_value == 10) this.prop('disable', true)
                else{
                    old_value += 1
                    quantity_input.val(old_value)
                }
            })
            $("#quantity_dec_button").on("click", () => {
                var old_value = parseInt(quantity_input.val())
                if(old_value == 0) this.prop('disable', true)
                else{
                    old_value -= 1
                    quantity_input.val(old_value)
                }
            })
            var btnAddToCart = $("#btn_add_to_cart")
            btnAddToCart.on("click", () => {
                let quantity = parseInt(quantity_input.val())
                $.ajax({  
                    url:`http://localhost:5000/cart/${user_id}/add`,  
                    method:'post',
                    data: {
                        bookId: book_id,
                        quantity
                    },  
                    dataType: 'json', 
                    success:function(response){  
                        if(response){  
                            location.replace(`/cart.html?user_id=${user_id}`)
                        }else{  
                            alert('some error occurred try again');  
                        }  
                    },  
                    error:function(response){  
                        alert('server error occured')  
                    }  
                });  
            })
            //cart
            $.ajax({  
                url: `http://localhost:5000/cart/${user_id}`,  
                method:'get',   
                dataType: 'json', 
                success:function(response){  
                    if(response){  
                        var data = response.data
                        let t = 0
                        for(const book_order of data){
                            let total = book_order.book.price*book_order.quantity
                            t += total
                        }
                        if(t > 0) cartTotal.html(t)
                        if(t > 0) cartCount.html(data.length)
                    }else{  
                        alert('some error occurred try again');  
                    }  
                },  
                error:function(response){  
                    alert('server error occured')  
                }  
            });  
                        
        }
        else{  
            alert('some error occurred try again');  
        }  
    },  
    error:function(response){  
        alert('server error occured')  
    }  
})
