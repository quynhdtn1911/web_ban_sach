function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
const user_id = getUrlParameter('user_id');
var home = $("#home")
home.attr("href", `/shop.html?user_id=${user_id}`)
$("#cart").attr("href", `/cart.html?user_id=${user_id}`)
// alert(home.attr('href'))
var order_info = $("#order_info")
var btnDelete = $("#btnDelete")
var btnBuy = $("#btnBuy")
var txtTotal = $("#total")
var cartTotal = $("#cart_total")
var cartCount = $("#cart_count span")
$.ajax({  
    url: `http://localhost:5000/order/${user_id}`,  
    method:'get',   
    dataType: 'json', 
    success:function(response){  
        if(response){  
            var htmlOrder = ``
            var data = response.data
            const localhost_url = 'http://localhost:5000/images/'
            for(const order of data){
                let t = 0
                let createdDate = new Date(order.createdAt)
                let day = createdDate.getDate(), month = createdDate.getMonth() + 1, year = createdDate.getFullYear()
                let date = day + "-" + month + "-" + year
                for(const book_order of order.bookOrders){
                    let image = localhost_url + (book_order.book.image ? book_order.book.image : 'default_book_img.jpg')
                    let total = book_order.book.price*book_order.quantity
                    t += total
                    htmlOrder += `<li class="cart_list_item">
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
                                <div class="cart_item_title">Ngày mua</div>
                                <div class="cart_item_text">${date}</div>
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
                if(order.shipment == 0) t += 30000
                else t += 20000
                htmlOrder += `<div class="order_total">
                <div class="order_total_content text-md-right">
                    <div class="order_total_title">Tổng tiền:</div>
                    <div class="order_total_amount">${t}</div>
                </div>
            </div>`
            }
            order_info.html(htmlOrder)
        }else{  
            alert('some error occurred try again');  
        }  
    },  
    error:function(response){  
        alert('server error occured')  
    }  
});  