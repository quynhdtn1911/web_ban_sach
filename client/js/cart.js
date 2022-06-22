function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
const user_id = getUrlParameter('user_id');
var home = $("#home")
home.attr("href", `/shop.html?user_id=${user_id}`)
$("#order_link").attr("href", `/order.html?user_id=${user_id}`)
// alert(home.attr('href'))
var cart_info = $("#cart_info")
var btnDelete = $("#btnDelete")
var btnBuy = $("#btnBuy")
var txtTotal = $("#total")
var cartTotal = $("#cart_total")
var cartCount = $("#cart_count span")
$.ajax({  
    url: `http://localhost:5000/cart/${user_id}`,  
    method:'get',   
    dataType: 'json', 
    success:function(response){  
        if(response){  
            var htmlCart = ``
            var data = response.data
            const localhost_url = 'http://localhost:5000/images/'
            let t = 0
            for(const book_order of data){
                let image = localhost_url + (book_order.book.image ? book_order.book.image : 'default_book_img.jpg')
                let total = book_order.book.price*book_order.quantity
                t += total
                htmlCart += `<li class="cart_list_item">
                <input type="checkbox" id='${book_order._id}' />
                <div class="cart_item clearfix">
                    <div class="cart_item_image"><img src=${image} alt=""></div>
                    <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                        <div class="cart_item_name cart_info_col">
                            <div class="cart_item_title">Tên sách</div>
                            <div class="cart_item_text">${book_order.book.name}</div>
                        </div>
                        <div class="cart_item_color cart_info_col">
                            <div class="cart_item_title">Tác giả</div>
                            <div class="cart_item_text">${book_order.book.author.name}</div>
                        </div>
                        <div class="cart_item_quantity cart_info_col">
                            <div class="cart_item_title">Số lượng</div>
                            <div class="cart_item_text">${book_order.quantity}</div>
                        </div>
                        <div class="cart_item_price cart_info_col">
                            <div class="cart_item_title">Giá</div>
                            <div class="cart_item_text">${book_order.book.price}</div>
                        </div>
                        <div class="cart_item_total cart_info_col">
                            <div class="cart_item_title">Tổng tiền</div>
                            <div class="cart_item_text">${total}</div>
                        </div>
                    </div>
                </div>
            </li>`
            }
            txtTotal.html(t)
            if(t > 0) cartTotal.html(t)
            if(data.length > 0) cartCount.html(data.length)
            cart_info.html(htmlCart)
            btnDelete.on('click', () => {
                let selected_book_order_list = $("input[type='checkbox']:checked")
                let book_order_delete_list = []
                for(let i = 0; i < selected_book_order_list.length; ++i){
                    book_order_delete_list.push(selected_book_order_list[i].id)
                }
                $.ajax({  
                    url:`http://localhost:5000/cart/${user_id}/delete`,  
                    method:'post',   
                    data: {
                        book_order_delete_list
                    },
                    dataType: 'json', 
                    success:function(response){  
                        if(response){  
                            location.reload()
                        }else{  
                            alert('some error occurred try again');  
                        }  
                    },  
                    error:function(response){  
                        alert('server error occured')  
                    }  
                });  
            })
            btnBuy.on('click', () => {
                $('.form_order').css('display', 'block')
                $('#cart_buttons').css('display', 'none')
            })
            $('#btnExit').on('click', () => {
                $('.form_order').css('display', 'none')
                $('#cart_buttons').css('display', 'block')
            })
            $('#btnConfirm').on('click', () => {
                let selected_book_order_list = $("input[type='checkbox']:checked")
                let book_order_list = []
                for(let i = 0; i < selected_book_order_list.length; ++i){
                    book_order_list.push(selected_book_order_list[i].id)
                }
                let address = $('input[name="address"]').val()
                let shipment = $('select[name="shipment"]').val()
                $.ajax({  
                    url:`http://localhost:5000/order/${user_id}/add`,  
                    method:'post',   
                    data: {
                        book_order_list,
                        address,
                        shipment
                    },
                    dataType: 'json', 
                    success:function(response){  
                        if(response){  
                            location.reload()
                        }else{  
                            alert('some error occurred try again');  
                        }  
                    },  
                    error:function(response){  
                        alert('server error occured')  
                    }  
                });  
            })
        }else{  
            alert('some error occurred try again');  
        }  
    },  
    error:function(response){  
        alert('server error occured')  
    }  
});  